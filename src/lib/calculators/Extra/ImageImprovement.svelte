<script lang="ts">
    import { onMount, tick } from "svelte";
    import { writable } from "svelte/store";

    // State management
    let personFile: File | null = null;
    let silhouetteFile: File | null = null;
    let personImage: HTMLImageElement | null = null;
    let silhouetteDataUrl: string | null = null;

    // Canvas settings
    let previewCanvas: HTMLCanvasElement;
    let stageWidth = 1200;
    let stageHeight = 1200;

    // Layer order
    const layerOrder = writable<"personFirst" | "silhouetteFirst">(
        "personFirst",
    );

    // Image resize state
    const resize = writable({
        width: stageWidth,
        height: stageHeight,
        maintainAspect: true,
    });

    // Transform state for person image
    const transform = writable({
        px: stageWidth / 2,
        py: stageHeight / 2,
        scale: 1,
        rotation: 0,
        borderRadius: 0, // 0 to 100% (percentage of min dimension)
    });

    // Filter state for person image
    const filters = writable({
        brightness: 0,
        contrast: 0,
        sharpen: 0,
        smooth: 0,
    });

    // Background controls
    const background = writable({
        brightness: 0, // -100 to 100
        contrast: 0, // -100 to 100
        hue: 0, // -180 to 180
        saturation: 0, // -100 to 100
        opacity: 0.08, // 0 to 1
        scale: 0.7, // 0.1 to 3
        repeat: false, // Toggle repeat
        repeatX: 3, // 1 to 20
        repeatY: 3, // 1 to 20
        px: 0, // -stageWidth/2 to stageWidth/2
        py: 0, // -stageHeight/2 to stageHeight/2
        rotation: 0, // -180 to 180
        borderRadius: 0, // 0 to 50% (percentage of min dimension)
    });

    // History for undo/redo
    let history: Array<{
        transform: any;
        filters: any;
        resize: any;
        background: any;
        layerOrder: any;
    }> = [];
    let historyIndex = -1;

    // UI state
    let loading = false;
    let info = "";
    let aiEndpoint = "";
    let selectedLayer: "person" | "silhouette" | null = null;

    // Debounce utility
    function debounce<T extends (...args: any[]) => void>(
        fn: T,
        delay: number,
    ) {
        let timeout: NodeJS.Timeout;
        return (...args: Parameters<T>) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn(...args), delay);
        };
    }

    onMount(() => {
        const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'>
            <rect width="100%" height="100%" fill="none"/>
            <g fill="black">
                <path d="M200 30c45 0 80 35 80 80 0 18-6 34-16 47-18 25-40 52-64 52s-46-27-64-52c-10-13-16-29-16-47 0-45 35-80 80-80zM90 320c0-44 74-80 110-80s110 36 110 80v40H90v-40z"/>
            </g>
        </svg>`;
        silhouetteDataUrl =
            "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
        saveState();
        debouncedRender();
    });

    function saveState() {
        transform.subscribe((t) => {
            filters.subscribe((f) => {
                resize.subscribe((r) => {
                    background.subscribe((b) => {
                        layerOrder.subscribe((lo) => {
                            if (historyIndex < history.length - 1) {
                                history = history.slice(0, historyIndex + 1);
                            }
                            history.push({
                                transform: { ...t },
                                filters: { ...f },
                                resize: { ...r },
                                background: { ...b },
                                layerOrder: lo,
                            });
                            historyIndex++;
                            if (history.length > 50) {
                                history.shift();
                                historyIndex--;
                            }
                        })();
                    })();
                })();
            })();
        })();
    }

    async function onPersonFile(e: Event) {
        const t = e.target as HTMLInputElement;
        personFile = t.files?.[0] ?? null;
        if (!personFile) {
            info = "No file selected";
            return;
        }
        loading = true;
        try {
            personImage = await loadImageFromFile(personFile);
            if (!personImage.width || !personImage.height) {
                throw new Error("Invalid image dimensions");
            }
            const scaleFactor =
                Math.min(
                    stageWidth / (personImage.width || 1),
                    stageHeight / (personImage.height || 1),
                ) * 0.8;
            transform.set({
                px: stageWidth / 2,
                py: stageHeight / 2,
                scale: scaleFactor,
                rotation: 0,
                borderRadius: 0,
            });
            await autoCropToFace(personImage);
            saveState();
            await tick();
            await debouncedRender();
            info = "Profile image loaded successfully";
        } catch (e) {
            info = `Error loading image: ${e.message}`;
            personImage = null;
        } finally {
            loading = false;
        }
    }

    async function onSilhouetteFile(e: Event) {
        const t = e.target as HTMLInputElement;
        silhouetteFile = t.files?.[0] ?? null;
        if (!silhouetteFile) {
            info = "No background file selected";
            return;
        }
        loading = true;
        try {
            silhouetteDataUrl = await fileToDataUrl(silhouetteFile);
            saveState();
            await tick();
            await debouncedRender();
            info = "Background image loaded successfully";
        } catch (e) {
            info = `Error loading background: ${e.message}`;
        } finally {
            loading = false;
        }
    }

    function fileToDataUrl(f: File): Promise<string> {
        return new Promise((res, rej) => {
            const r = new FileReader();
            r.onload = () => res(String(r.result));
            r.onerror = rej;
            r.readAsDataURL(f);
        });
    }

    function loadImageFromFile(f: File): Promise<HTMLImageElement> {
        return new Promise((res, rej) => {
            const img = new Image();
            fileToDataUrl(f)
                .then((url) => {
                    img.crossOrigin = "anonymous";
                    img.onload = () => res(img);
                    img.onerror = () => rej(new Error("Failed to load image"));
                    img.src = url;
                })
                .catch(rej);
        });
    }

    async function autoCropToFace(img: HTMLImageElement) {
        try {
            if ("FaceDetector" in window) {
                // @ts-ignore
                const fd = new FaceDetector({
                    fastMode: true,
                    maxDetectedFaces: 1,
                });
                const detections = await fd.detect(img);
                if (detections?.length > 0) {
                    const d = detections[0].boundingBox;
                    const faceWidth = d.width;
                    const desiredFaceWidth = stageWidth * 0.4;
                    const newScale =
                        (desiredFaceWidth / faceWidth) * (img.width ? 1 : 1);
                    const faceCenterX = d.x + d.width / 2;
                    const faceCenterY = d.y + d.height / 2;
                    transform.set({
                        ...$transform,
                        scale: newScale,
                        px:
                            stageWidth / 2 -
                            (faceCenterX - img.width / 2) * newScale,
                        py:
                            stageHeight / 2 -
                            (faceCenterY - img.height / 2) * newScale,
                        borderRadius: 0,
                    });
                    info = "Auto-centered to detected face";
                    return;
                }
            }
            transform.set({
                ...$transform,
                px: stageWidth / 2,
                py: stageHeight / 2,
                borderRadius: 0,
            });
            info = "Face detection not supported or no face found";
        } catch (e) {
            transform.set({
                ...$transform,
                px: stageWidth / 2,
                py: stageHeight / 2,
                borderRadius: 0,
            });
            info = `Face detection error: ${e.message}`;
        }
    }

    async function removeBackground() {
        if (!personImage || !personFile) {
            info = "No profile image to process";
            return;
        }
        loading = true;
        info = "Removing background...";
        try {
            const canvas = document.createElement("canvas");
            canvas.width = personImage.width;
            canvas.height = personImage.height;
            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(personImage, 0, 0);

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;

            // Simple color-based background removal (thresholding)
            const threshold = 200; // Adjust based on testing
            const refColor = getReferenceBackgroundColor(
                data,
                canvas.width,
                canvas.height,
            );
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const colorDiff = Math.sqrt(
                    (r - refColor.r) ** 2 +
                        (g - refColor.g) ** 2 +
                        (b - refColor.b) ** 2,
                );
                if (colorDiff < threshold) {
                    data[i + 3] = 0; // Set alpha to 0 for background
                }
            }
            ctx.putImageData(imgData, 0, 0);

            // Convert canvas to PNG blob
            const blob = await new Promise<Blob>((resolve) => {
                canvas.toBlob((b) => resolve(b!), "image/png");
            });
            personFile = new File([blob], "background_removed.png", {
                type: "image/png",
            });
            personImage = await loadImageFromFile(personFile);

            saveState();
            await tick();
            await debouncedRender();
            info = "Background removed successfully";
        } catch (e) {
            info = `Background removal failed: ${e.message}`;
        } finally {
            loading = false;
        }
    }

    function getReferenceBackgroundColor(
        data: Uint8ClampedArray,
        width: number,
        height: number,
    ) {
        // Sample corner pixels to estimate background color
        const corners = [
            0, // Top-left
            (width - 1) * 4, // Top-right
            (height - 1) * width * 4, // Bottom-left
            ((height - 1) * width + (width - 1)) * 4, // Bottom-right
        ];
        let rSum = 0,
            gSum = 0,
            bSum = 0,
            count = 0;
        for (const idx of corners) {
            rSum += data[idx];
            gSum += data[idx + 1];
            bSum += data[idx + 2];
            count++;
        }
        return {
            r: rSum / count,
            g: gSum / count,
            b: bSum / count,
        };
    }

    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    function pointerDown(e: PointerEvent) {
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        (e.target as Element).setPointerCapture(e.pointerId);
        if (e.altKey) {
            selectedLayer = "silhouette";
        } else {
            selectedLayer = "person";
        }
    }

    function pointerMove(e: PointerEvent) {
        if (!dragging) return;
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        if (selectedLayer === "person") {
            transform.update((t) => ({
                ...t,
                px: t.px + dx,
                py: t.py + dy,
            }));
        } else if (selectedLayer === "silhouette") {
            background.update((b) => ({
                ...b,
                px: b.px + dx,
                py: b.py + dy,
            }));
        }
        lastX = e.clientX;
        lastY = e.clientY;
        debouncedRender();
        saveState();
    }

    function pointerUp(e: PointerEvent) {
        dragging = false;
        try {
            (e.target as Element).releasePointerCapture(e.pointerId);
        } catch {}
        selectedLayer = null;
    }

    function updateCanvasSize() {
        stageWidth = $resize.width;
        stageHeight = $resize.height;
        transform.update((t) => ({
            ...t,
            px: stageWidth / 2,
            py: stageHeight / 2,
        }));
        background.update((b) => ({
            ...b,
            px: 0,
            py: 0,
        }));
        saveState();
        debouncedRender();
    }

    const render = async () => {
        if (!previewCanvas) {
            info = "Canvas not initialized";
            return;
        }
        const ctx = previewCanvas.getContext("2d");
        if (!ctx) {
            info = "Failed to get canvas context";
            return;
        }
        previewCanvas.width = stageWidth;
        previewCanvas.height = stageHeight;
        ctx.clearRect(0, 0, stageWidth, stageHeight);

        // Draw layers based on order
        if ($layerOrder === "personFirst") {
            if (silhouetteDataUrl) await drawSilhouette(ctx, silhouetteDataUrl);
            if (personImage) await drawPerson(ctx);
        } else {
            if (personImage) await drawPerson(ctx);
            if (silhouetteDataUrl) await drawSilhouette(ctx, silhouetteDataUrl);
        }
    };

    async function drawPerson(ctx: CanvasRenderingContext2D) {
        if (!personImage) {
            info = "No profile image loaded";
            return;
        }
        const off = document.createElement("canvas");
        const offCtx = off.getContext("2d")!;
        const sw = (personImage.width || 1) * $transform.scale;
        const sh = (personImage.height || 1) * $transform.scale;
        off.width = Math.ceil(sw);
        off.height = Math.ceil(sh);
        offCtx.clearRect(0, 0, off.width, off.height);

        // Apply border radius (use circle for 100%)
        const radius = ($transform.borderRadius / 100) * Math.min(sw, sh);
        offCtx.beginPath();
        if ($transform.borderRadius >= 100) {
            // Draw a perfect circle
            offCtx.arc(
                off.width / 2,
                off.height / 2,
                Math.min(sw, sh) / 2,
                0,
                2 * Math.PI,
            );
        } else {
            // Draw rounded rectangle
            offCtx.moveTo(radius, 0);
            offCtx.arcTo(off.width, 0, off.width, off.height, radius);
            offCtx.arcTo(off.width, off.height, 0, off.height, radius);
            offCtx.arcTo(0, off.height, 0, 0, radius);
            offCtx.arcTo(0, 0, off.width, 0, radius);
        }
        offCtx.closePath();
        offCtx.clip();

        offCtx.save();
        offCtx.translate(off.width / 2, off.height / 2);
        offCtx.rotate(($transform.rotation * Math.PI) / 180);
        offCtx.drawImage(
            personImage,
            -(personImage.width || 1) / 2,
            -(personImage.height || 1) / 2,
            personImage.width || 1,
            personImage.height || 1,
        );
        offCtx.restore();

        let imgData = offCtx.getImageData(0, 0, off.width, off.height);
        applyBrightnessContrast(
            imgData.data,
            $filters.brightness,
            $filters.contrast,
        );
        if ($filters.smooth > 0)
            stackBlurImageData(imgData, Math.round($filters.smooth));
        if ($filters.sharpen > 0)
            imgData = applyUnsharpMask(imgData, $filters.sharpen);
        offCtx.putImageData(imgData, 0, 0);

        ctx.save();
        ctx.translate($transform.px, $transform.py);
        ctx.rotate(($transform.rotation * Math.PI) / 180);
        ctx.drawImage(off, -off.width / 2, -off.height / 2);
        ctx.restore();
    }

    async function drawSilhouette(
        ctx: CanvasRenderingContext2D,
        dataUrl: string,
    ) {
        return new Promise<void>((res) => {
            const img = new Image();
            img.onload = () => {
                const tileW = (img.width || 200) * $background.scale;
                const tileH = (img.height || 200) * $background.scale;
                const p = document.createElement("canvas");
                p.width = tileW;
                p.height = tileH;
                const pc = p.getContext("2d")!;
                pc.clearRect(0, 0, tileW, tileH);
                pc.fillStyle = "#ffffff";
                pc.fillRect(0, 0, tileW, tileH);

                // Apply border radius
                const radius =
                    ($background.borderRadius / 100) * Math.min(tileW, tileH);
                pc.beginPath();
                pc.moveTo(radius, 0);
                pc.arcTo(tileW, 0, tileW, tileH, radius);
                pc.arcTo(tileW, tileH, 0, tileH, radius);
                pc.arcTo(0, tileH, 0, 0, radius);
                pc.arcTo(0, 0, tileW, 0, radius);
                pc.closePath();
                pc.clip();

                pc.save();
                pc.translate(tileW / 2, tileH / 2);
                pc.rotate(($background.rotation * Math.PI) / 180);
                pc.translate($background.px, $background.py);
                pc.globalAlpha = $background.opacity;
                pc.drawImage(img, -tileW / 2, -tileH / 2, tileW, tileH);
                pc.restore();

                let bgData = pc.getImageData(0, 0, tileW, tileH);
                applyColorAdjustments(
                    bgData.data,
                    $background.brightness,
                    $background.contrast,
                    $background.hue,
                    $background.saturation,
                );
                pc.putImageData(bgData, 0, 0);

                if ($background.repeat) {
                    const tilesX = Math.max(
                        1,
                        Math.min(20, $background.repeatX),
                    );
                    const tilesY = Math.max(
                        1,
                        Math.min(20, $background.repeatY),
                    );
                    const pattern = ctx.createPattern(p, "repeat")!;
                    ctx.fillStyle = pattern;
                    ctx.fillRect(0, 0, stageWidth, stageHeight);
                } else {
                    ctx.save();
                    ctx.translate(stageWidth / 2, stageHeight / 2);
                    ctx.rotate(($background.rotation * Math.PI) / 180);
                    ctx.translate($background.px, $background.py);
                    ctx.drawImage(p, -tileW / 2, -tileH / 2);
                    ctx.restore();
                }
                res();
            };
            img.onerror = () => {
                ctx.fillStyle = "#f6f6f6";
                ctx.fillRect(0, 0, stageWidth, stageHeight);
                info = "Failed to load background image";
                res();
            };
            img.crossOrigin = "anonymous";
            img.src = dataUrl;
        });
    }

    function applyBrightnessContrast(
        data: Uint8ClampedArray,
        brightnessVal: number,
        contrastVal: number,
    ) {
        const brightness = (brightnessVal / 100) * 255;
        const contrast = contrastVal / 100;
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

        for (let i = 0; i < data.length; i += 4) {
            data[i] = clamp(factor * (data[i] - 128) + 128 + brightness); // Red
            data[i + 1] = clamp(
                factor * (data[i + 1] - 128) + 128 + brightness,
            ); // Green
            data[i + 2] = clamp(
                factor * (data[i + 2] - 128) + 128 + brightness,
            ); // Blue
            // Alpha (data[i + 3]) remains unchanged
        }
    }

    function applyColorAdjustments(
        data: Uint8ClampedArray,
        brightnessVal: number,
        contrastVal: number,
        hueVal: number,
        saturationVal: number,
    ) {
        const brightness = (brightnessVal / 100) * 255;
        const contrast = contrastVal / 100;
        const contrastFactor =
            (259 * (contrast * 255 + 255)) /
            (255 * (259 - contrast * 255) || 1);
        const hueRad = (hueVal * Math.PI) / 180;
        const saturationFactor = 1 + saturationVal / 100;

        for (let i = 0; i < data.length; i += 4) {
            let r = clamp(contrastFactor * (data[i] - 128) + 128 + brightness);
            let g = clamp(
                contrastFactor * (data[i + 1] - 128) + 128 + brightness,
            );
            let b = clamp(
                contrastFactor * (data[i + 2] - 128) + 128 + brightness,
            );

            let [h, s, l] = rgbToHsl(r, g, b);
            h = (h + hueRad) % (2 * Math.PI);
            if (h < 0) h += 2 * Math.PI;
            s = clamp(s * saturationFactor, 0, 1);
            [r, g, b] = hslToRgb(h, s, l);

            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
        }
    }

    function rgbToHsl(
        r: number,
        g: number,
        b: number,
    ): [number, number, number] {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0,
            s = 0,
            l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h *= Math.PI / 3;
        }
        return [h, s, l];
    }

    function hslToRgb(
        h: number,
        s: number,
        l: number,
    ): [number, number, number] {
        let r, g, b;
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p: number, q: number, t: number) => {
                if (t < 0) t += 2 * Math.PI;
                if (t > 2 * Math.PI) t -= 2 * Math.PI;
                if (t < Math.PI / 3) return p + ((q - p) * 3 * t) / Math.PI;
                if (t < Math.PI) return q;
                if (t < (2 * Math.PI) / 3)
                    return (
                        p + ((q - p) * ((2 * Math.PI) / 3 - t) * 3) / Math.PI
                    );
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            h /= 2 * Math.PI;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    function clamp(v: number, min = 0, max = 255) {
        return Math.min(max, Math.max(min, v));
    }

    function applyUnsharpMask(imgData: ImageData, amount = 1) {
        const w = imgData.width,
            h = imgData.height;
        const src = imgData.data;
        const out = new Uint8ClampedArray(src.length);
        const amt = amount * 0.6;
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const idx = (y * w + x) * 4;
                for (let c = 0; c < 3; c++) {
                    let v = src[idx + c] * (1 + amt);
                    let neighbors = 0;
                    [
                        [1, 0],
                        [-1, 0],
                        [0, 1],
                        [0, -1],
                        [1, 1],
                        [-1, -1],
                        [1, -1],
                        [-1, 1],
                    ].forEach(([dx, dy]) => {
                        const nx = x + dx,
                            ny = y + dy;
                        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                            neighbors++;
                            v -= src[(ny * w + nx) * 4 + c] * (amt / 8);
                        }
                    });
                    out[idx + c] = clamp(v);
                }
                out[idx + 3] = src[idx + 3];
            }
        }
        return new ImageData(out, w, h);
    }

    function stackBlurImageData(imageData: ImageData, radius: number) {
        if (radius < 1) return;
        const w = imageData.width,
            h = imageData.height;
        const src = imageData.data;
        const tmp = new Uint8ClampedArray(src.length);
        tmp.set(src);
        const iterations = Math.min(3, Math.max(1, Math.round(radius / 2)));
        for (let it = 0; it < iterations; it++) {
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    let r = 0,
                        g = 0,
                        b = 0,
                        a = 0,
                        cnt = 0;
                    for (let k = -radius; k <= radius; k++) {
                        const nx = x + k;
                        if (nx >= 0 && nx < w) {
                            const idx = (y * w + nx) * 4;
                            r += tmp[idx];
                            g += tmp[idx + 1];
                            b += tmp[idx + 2];
                            a += tmp[idx + 3];
                            cnt++;
                        }
                    }
                    const outIdx = (y * w + x) * 4;
                    src[outIdx] = Math.round(r / cnt);
                    src[outIdx + 1] = Math.round(g / cnt);
                    src[outIdx + 2] = Math.round(b / cnt);
                    src[outIdx + 3] = Math.round(a / cnt);
                }
            }
            tmp.set(src);
            for (let x = 0; x < w; x++) {
                for (let y = 0; y < h; y++) {
                    let r = 0,
                        g = 0,
                        b = 0,
                        a = 0,
                        cnt = 0;
                    for (let k = -radius; k <= radius; k++) {
                        const ny = y + k;
                        if (ny >= 0 && ny < h) {
                            const idx = (ny * w + x) * 4;
                            r += tmp[idx];
                            g += tmp[idx + 1];
                            b += tmp[idx + 2];
                            a += tmp[idx + 3];
                            cnt++;
                        }
                    }
                    const outIdx = (y * w + x) * 4;
                    src[outIdx] = Math.round(r / cnt);
                    src[outIdx + 1] = Math.round(g / cnt);
                    src[outIdx + 2] = Math.round(b / cnt);
                    src[outIdx + 3] = Math.round(a / cnt);
                }
            }
            tmp.set(src);
        }
    }

    function downloadPNG() {
        render().then(() => {
            previewCanvas.toBlob((blob) => {
                if (!blob) {
                    info = "Failed to generate PNG";
                    return;
                }
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = `profile_${stageWidth}x${stageHeight}.png`;
                a.click();
                URL.revokeObjectURL(a.href);
            }, "image/png");
        });
    }

    async function aiEnhance() {
        if (!aiEndpoint) {
            info =
                "No AI endpoint configured. Add your endpoint to the aiEndpoint variable.";
            return;
        }
        if (!personFile) {
            info = "Upload person photo first.";
            return;
        }
        loading = true;
        info = "Uploading to AI endpoint...";
        try {
            const form = new FormData();
            form.append("file", personFile);
            const res = await fetch(aiEndpoint, { method: "POST", body: form });
            if (!res.ok) throw new Error("AI endpoint returned " + res.status);
            const blob = await res.blob();
            personFile = new File([blob], "ai_enhanced.png", {
                type: blob.type,
            });
            personImage = await loadImageFromFile(personFile);
            info = "AI enhancement complete";
            saveState();
            await render();
        } catch (e: any) {
            info = `AI enhance failed: ${e?.message ?? e}`;
        } finally {
            loading = false;
        }
    }

    function undo() {
        if (historyIndex > 0) {
            historyIndex--;
            transform.set(history[historyIndex].transform);
            filters.set(history[historyIndex].filters);
            resize.set(history[historyIndex].resize);
            background.set(history[historyIndex].background);
            layerOrder.set(history[historyIndex].layerOrder);
            updateCanvasSize();
        }
    }

    function redo() {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            transform.set(history[historyIndex].transform);
            filters.set(history[historyIndex].filters);
            resize.set(history[historyIndex].resize);
            background.set(history[historyIndex].background);
            layerOrder.set(history[historyIndex].layerOrder);
            updateCanvasSize();
        }
    }

    const applyPreset = (preset: string) => {
        switch (preset) {
            case "vivid":
                filters.set({
                    brightness: 20,
                    contrast: 20,
                    sharpen: 1,
                    smooth: 0,
                });
                break;
            case "soft":
                filters.set({
                    brightness: 10,
                    contrast: -10,
                    sharpen: 0,
                    smooth: 3,
                });
                break;
            case "dramatic":
                filters.set({
                    brightness: -10,
                    contrast: 30,
                    sharpen: 2,
                    smooth: 0,
                });
                break;
        }
        saveState();
        debouncedRender();
    };

    function handleResizeWidth(e: Event) {
        const width = Number((e.target as HTMLInputElement).value);
        if ($resize.maintainAspect && personImage) {
            const aspectRatio = personImage.height / personImage.width;
            resize.set({
                width,
                height: Math.round(width * aspectRatio),
                maintainAspect: $resize.maintainAspect,
            });
        } else {
            resize.update((r) => ({ ...r, width }));
        }
        updateCanvasSize();
    }

    function handleResizeHeight(e: Event) {
        const height = Number((e.target as HTMLInputElement).value);
        if ($resize.maintainAspect && personImage) {
            const aspectRatio = personImage.width / personImage.height;
            resize.set({
                width: Math.round(height * aspectRatio),
                height,
                maintainAspect: $resize.maintainAspect,
            });
        } else {
            resize.update((r) => ({ ...r, height }));
        }
        updateCanvasSize();
    }

    function resetTransform() {
        transform.set({
            px: stageWidth / 2,
            py: stageHeight / 2,
            scale: personImage
                ? Math.min(
                      stageWidth / (personImage.width || 1),
                      stageHeight / (personImage.height || 1),
                  ) * 0.8
                : 1,
            rotation: 0,
            borderRadius: 0,
        });
        saveState();
        debouncedRender();
    }

    function resetFilters() {
        filters.set({ brightness: 0, contrast: 0, sharpen: 0, smooth: 0 });
        saveState();
        debouncedRender();
    }

    function resetBackground() {
        background.set({
            brightness: 0,
            contrast: 0,
            hue: 0,
            saturation: 0,
            opacity: 0.08,
            scale: 0.7,
            repeat: false,
            repeatX: 3,
            repeatY: 3,
            px: 0,
            py: 0,
            rotation: 0,
            borderRadius: 0,
        });
        saveState();
        debouncedRender();
    }

    function resetResize() {
        resize.set({
            width: 1200,
            height: 1200,
            maintainAspect: true,
        });
        updateCanvasSize();
    }

    function swapLayerOrder() {
        layerOrder.update((lo) =>
            lo === "personFirst" ? "silhouetteFirst" : "personFirst",
        );
        saveState();
        debouncedRender();
    }

    const debouncedRender = debounce(render, 50);
</script>

<div class="p-6 max-w-7xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Profile Image Editor</h2>
    <div class="flex flex-col lg:flex-row gap-6">
        <div class="w-full lg:w-1/3 space-y-6">
            <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-lg font-semibold mb-2">Input</h3>
                <div class="control">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="block text-sm font-medium text-gray-700"
                        >Profile Photo</label
                    >
                    <input
                        type="file"
                        accept="image/*"
                        on:change={onPersonFile}
                        class="mt-1 block w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                <div class="control mt-4">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="block text-sm font-medium text-gray-700"
                        >Background Image (Optional)</label
                    >
                    <input
                        type="file"
                        accept="image/*,.svg"
                        on:change={onSilhouetteFile}
                        class="mt-1 block w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p class="mt-1 text-sm text-gray-500">
                        Default silhouette used if none uploaded.
                    </p>
                </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                    <h3 class="text-lg font-semibold">Layer Order</h3>
                    <button
                        on:click={swapLayerOrder}
                        class="px-2 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                    >
                        Swap Layers
                    </button>
                </div>
                <p class="text-sm text-gray-600">
                    Current: {$layerOrder === "personFirst"
                        ? "Profile on Top"
                        : "Background on Top"}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                    Click canvas to drag profile image. Alt+click to drag
                    background.
                </p>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                    <h3 class="text-lg font-semibold">Canvas Size</h3>
                    <button
                        on:click={resetResize}
                        class="px-2 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                        >Reset</button
                    >
                </div>
                <div class="control">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="block text-sm font-medium text-gray-700"
                        >Width (px)</label
                    >
                    <input
                        type="number"
                        min="100"
                        max="4000"
                        bind:value={$resize.width}
                        on:input={handleResizeWidth}
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <div class="control mt-2">
                    <label class="block text-sm font-medium text-gray-700"
                        >Height (px)</label
                    >
                    <input
                        type="number"
                        min="100"
                        max="4000"
                        bind:value={$resize.height}
                        on:input={handleResizeHeight}
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>
                <div class="control mt-2">
                    <label
                        class="flex items-center text-sm font-medium text-gray-700"
                    >
                        <input
                            type="checkbox"
                            bind:checked={$resize.maintainAspect}
                            on:change={updateCanvasSize}
                            class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        Maintain Aspect Ratio
                    </label>
                </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                    <h3 class="text-lg font-semibold">
                        Profile Image Transform
                    </h3>
                    <button
                        on:click={resetTransform}
                        class="px-2 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                        >Reset</button
                    >
                </div>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <div class="control">
                    <label class="block text-sm font-medium text-gray-700"
                        >Scale</label
                    >
                    <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.01"
                        bind:value={$transform.scale}
                        on:input={() => {
                            debouncedRender();
                            saveState();
                        }}
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <div class="control mt-2">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="block text-sm font-medium text-gray-700"
                        >Rotate</label
                    >
                    <input
                        type="range"
                        min="-180"
                        max="180"
                        step="1"
                        bind:value={$transform.rotation}
                        on:input={() => {
                            debouncedRender();
                            saveState();
                        }}
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <div class="control mt-2">
                    <label class="block text-sm font-medium text-gray-700"
                        >Border Radius (%)</label
                    >
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        bind:value={$transform.borderRadius}
                        on:input={() => {
                            debouncedRender();
                            saveState();
                        }}
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                    <h3 class="text-lg font-semibold">Profile Image Filters</h3>
                    <button
                        on:click={resetFilters}
                        class="px-2 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                        >Reset</button
                    >
                </div>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <div class="control">
                    <label class="block text-sm font-medium text-gray-700"
                        >Brightness</label
                    >
                    <input
                        type="range"
                        min="-100"
                        max="100"
                        step="1"
                        bind:value={$filters.brightness}
                        on:input={() => {
                            debouncedRender();
                            saveState();
                        }}
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <div class="control mt-2">
                    <label class="block text-sm font-medium text-gray-700"
                        >Contrast</label
                    >
                    <input
                        type="range"
                        min="-100"
                        max="100"
                        step="1"
                        bind:value={$filters.contrast}
                        on:input={() => {
                            debouncedRender();
                            saveState();
                        }}
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <div class="control mt-2">
                    <label class="block text-sm font-medium text-gray-700"
                        >Smooth</label
                    >
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        bind:value={$filters.smooth}
                        on:input={() => {
                            debouncedRender();
                            saveState();
                        }}
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <div class="control mt-2">
                    <label class="block text-sm font-medium text-gray-700"
                        >Sharpen</label
                    >
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.25"
                        bind:value={$filters.sharpen}
                        on:input={() => {
                            debouncedRender();
                            saveState();
                        }}
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                    <h3 class="text-lg font-semibold">Background Settings</h3>
                    <button
                        on:click={resetBackground}
                        class="px-2 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                        >Reset</button
                    >
                </div>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <div class="control">
                    <label class="block text-sm font-medium text-gray-700"
                        >Brightness</label
                    >
                    <input
                        type="range"
                        min="-100"
                        max="100"
                        step="1"
                        bind:value={$background.brightness}
                        on:input={() => {
                            debouncedRender();
                            saveState();
                        }}
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <div class="control mt-2">
                    <label class="block text-sm font-medium text-gray-700"
                        >Contrast</label
                    >
                    <input
                        type="range"
                        min="-100"
                        max="100"
                        step="1"
                        bind:value={$background.contrast}
                        on:input={() => {
                            debouncedRender();
                            saveState();
                        }}
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <div class="control mt-2">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="block text-sm font-medium text-gray-700"
                        >Hue</label
                    >
                    <input
                        type="range"
                        min="-180"
                        max="180"
                        step="1"
                        bind:value={$background.hue}
                        on:input={() => {
                            debouncedRender();
                            saveState();
                        }}
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <div class="control mt-2">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="block text-sm font-medium text-gray-700"
                        >Saturation</label
                    >
                    <input
                        type="range"
                        min="-100"
                        max="100"
                        step="1"
                        bind:value={$background.saturation}
                        on:input={() => {
                            debouncedRender();
                            saveState();
                        }}
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <div class="control mt-2">
                    <label class="block text-sm font-medium text-gray-700"
                        >Opacity</label
                    >
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        bind:value={$background.opacity}
                        on:input={() => {
                            debouncedRender();
                            saveState();
                        }}
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <div class="control mt-2">
                    <label class="block text-sm font-medium text-gray-700"
                        >Scale</label
                    >
                    <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.01"
                        bind:value={$background.scale}
                        on:input={() => {
                            debouncedRender();
                            saveState();
                        }}
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <div class="control mt-2">
                    <label
                        class="flex items-center text-sm font-medium text-gray-700"
                    >
                        <input
                            type="checkbox"
                            bind:checked={$background.repeat}
                            on:change={() => {
                                debouncedRender();
                                saveState();
                            }}
                            class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        Repeat Background
                    </label>
                </div>
                {#if $background.repeat}
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <div class="control mt-2">
                        <label class="block text-sm font-medium text-gray-700"
                            >Horizontal Repeats</label
                        >
                        <input
                            type="range"
                            min="1"
                            max="20"
                            step="1"
                            bind:value={$background.repeatX}
                            on:input={() => {
                                debouncedRender();
                                saveState();
                            }}
                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <div class="control mt-2">
                        <label class="block text-sm font-medium text-gray-700"
                            >Vertical Repeats</label
                        >
                        <input
                            type="range"
                            min="1"
                            max="20"
                            step="1"
                            bind:value={$background.repeatY}
                            on:input={() => {
                                debouncedRender();
                                saveState();
                            }}
                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                {/if}
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <div class="control mt-2">
                    <label class="block text-sm font-medium text-gray-700"
                        >X Position</label
                    >
                    <input
                        type="range"
                        min={-stageWidth / 2}
                        max={stageWidth / 2}
                        step="1"
                        bind:value={$background.px}
                        on:input={() => {
                            debouncedRender();
                            saveState();
                        }}
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <div class="control mt-2">
                    <label class="block text-sm font-medium text-gray-700"
                        >Y Position</label
                    >
                    <input
                        type="range"
                        min={-stageHeight / 2}
                        max={stageHeight / 2}
                        step="1"
                        bind:value={$background.py}
                        on:input={() => {
                            debouncedRender();
                            saveState();
                        }}
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <div class="control mt-2">
                    <label class="block text-sm font-medium text-gray-700"
                        >Rotation</label
                    >
                    <input
                        type="range"
                        min="-180"
                        max="180"
                        step="1"
                        bind:value={$background.rotation}
                        on:input={() => {
                            debouncedRender();
                            saveState();
                        }}
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <div class="control mt-2">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="block text-sm font-medium text-gray-700"
                        >Border Radius (%)</label
                    >
                    <input
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                        bind:value={$background.borderRadius}
                        on:input={() => {
                            debouncedRender();
                            saveState();
                        }}
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-lg font-semibold mb-2">Actions</h3>
                <div class="flex flex-wrap gap-2">
                    <button
                        on:click={() =>
                            transform.update((t) => ({
                                ...t,
                                scale: t.scale * 1.05,
                            }))}
                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        on:click={saveState}>Zoom +</button
                    >
                    <button
                        on:click={() =>
                            transform.update((t) => ({
                                ...t,
                                scale: t.scale / 1.05,
                            }))}
                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        on:click={saveState}>Zoom -</button
                    >
                    <button
                        on:click={undo}
                        disabled={historyIndex <= 0}
                        class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
                        >Undo</button
                    >
                    <button
                        on:click={redo}
                        disabled={historyIndex >= history.length - 1}
                        class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
                        >Redo</button
                    >
                </div>
                <div class="mt-4 flex flex-wrap gap-2">
                    <button
                        on:click={() => applyPreset("vivid")}
                        class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                        >Vivid Preset</button
                    >
                    <button
                        on:click={() => applyPreset("soft")}
                        class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                        >Soft Preset</button
                    >
                    <button
                        on:click={() => applyPreset("dramatic")}
                        class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                        >Dramatic Preset</button
                    >
                </div>
                <div class="mt-4 flex gap-2">
                    <button
                        on:click={downloadPNG}
                        disabled={loading || !personImage}
                        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                        >Download PNG</button
                    >
                    <button
                        on:click={aiEnhance}
                        disabled={loading || !personImage}
                        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                        >AI Enhance</button
                    >
                    <button
                        on:click={removeBackground}
                        disabled={loading || !personImage}
                        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                        >Remove Background</button
                    >
                </div>
            </div>

            {#if info}
                <div
                    class="mt-2 p-3 bg-gray-100 rounded-md text-sm text-gray-700"
                >
                    {info}
                </div>
            {/if}

            {#if loading}
                <div class="mt-2 flex items-center gap-2">
                    <div
                        class="animate-spin rounded-full h-5 w-5 border-2 border-t-blue-600"
                    ></div>
                    <span class="text-sm text-gray-700">Processing...</span>
                </div>
            {/if}
        </div>

        <div class="w-full lg:w-2/3">
            <div class="sticky top-4">
                <div
                    class="relative border border-gray-200 rounded-lg shadow-lg"
                    style="aspect-ratio: {$resize.width}/{$resize.height}; max-width: 640px;"
                >
                    <canvas
                        bind:this={previewCanvas}
                        width={stageWidth}
                        height={stageHeight}
                        on:pointerdown={pointerDown}
                        on:pointermove={pointerMove}
                        on:pointerup={pointerUp}
                        style="width: 100%; height: 100%; touch-action: none; display: block; border-radius: 6px; background: white;"
                        aria-label="Image preview canvas"
                    ></canvas>
                </div>
                <p class="mt-2 text-sm text-gray-500">
                    Click to drag profile image, Alt+click to drag background.
                    Use sliders to adjust appearance. Click Download when ready.
                </p>
            </div>
        </div>
    </div>
</div>

<style>
    :global(body) {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    .control input[type="range"] {
        accent-color: #2563eb;
    }

    .control input[type="number"] {
        width: 100px;
    }

    @media (max-width: 640px) {
        .control input[type="range"] {
            width: 100%;
        }
        .control input[type="number"] {
            width: 100%;
        }
        .sticky {
            position: static !important;
        }
    }
</style>
