<script lang="ts">
    /**
     * TdeeCalculator.svelte
     * Fully-featured frontend TDEE calculator
     *
     * Features:
     * - Units: Metric / Imperial
     * - Formulas: Mifflin-St Jeor, Revised Harris-Benedict, Katch-McArdle (needs body fat)
     * - Activity multipliers & custom multiplier
     * - Goals: Maintain / Lose / Gain with selectable rate (0.25, 0.5, 1 kg/week)
     * - Macronutrient suggestions (protein by kg, fat %, carbs fill)
     * - Timeline estimate for target weight
     * - Save/load profiles to localStorage, export JSON/CSV, import JSON
     * - Accessible and responsive UI
     *
     * User: Giorgi likes full code — here it is.
     */

    import { onMount } from "svelte";

    type Sex = "male" | "female" | "other";
    type Units = "metric" | "imperial";
    type Formula = "mifflin" | "harris" | "katch"; // katch requires body fat %
    type Goal = "maintain" | "lose" | "gain";

    interface Profile {
        id: string;
        name: string;
        createdAt: number;
        units: Units;
        sex: Sex;
        age: number;
        heightCm: number; // stored in cm
        weightKg: number; // stored in kg
        bodyFatPct?: number | null;
        activity: number; // multiplier
        formula: Formula;
        goal: Goal;
        rateKgPerWeek: number; // positive number, e.g. 0.5
    }

    const LS_KEY = "tdee-profiles-v1";
    const LS_LAST = "tdee-last-v1";

    /* --- Helpers --- */
    function uid() {
        return Math.random().toString(36).slice(2) + Date.now().toString(36);
    }

    function cmToFeetInches(cm: number) {
        const inches = cm / 2.54;
        const feet = Math.floor(inches / 12);
        const rem = Math.round(inches - feet * 12);
        return { feet, inches: rem };
    }
    function feetInchesToCm(feet: number, inches: number) {
        return (feet * 12 + inches) * 2.54;
    }
    function kgToLbs(kg: number) {
        return kg * 2.2046226218;
    }
    function lbsToKg(lbs: number) {
        return lbs / 2.2046226218;
    }

    function round(n: number, p = 0) {
        const m = Math.pow(10, p);
        return Math.round(n * m) / m;
    }

    function caloriesForRate(rateKgPerWeek: number) {
        // 1 kg fat ~ 7700 kcal (approx). rate per week => daily kcal deficit/surplus
        return (rateKgPerWeek * 7700) / 7;
    }

    /* --- Activity options --- */
    const ACTIVITY_PRESETS: { label: string; multiplier: number }[] = [
        { label: "Sedentary (little or no exercise)", multiplier: 1.2 },
        { label: "Lightly active (1–3 days/week)", multiplier: 1.375 },
        { label: "Moderately active (3–5 days/week)", multiplier: 1.55 },
        { label: "Very active (6–7 days/week)", multiplier: 1.725 },
        {
            label: "Extra active (physical job / intense training)",
            multiplier: 1.9,
        },
    ];

    /* --- State & defaults --- */
    let units: Units = "metric";
    let name = "My profile";
    let sex: Sex = "male";
    let age = 30;
    let heightCm = 180; // metric storage
    let weightKg = 75;
    let bodyFatPct: number | null = null;
    let activityMultiplier = ACTIVITY_PRESETS[1].multiplier;
    let formula: Formula = "mifflin";
    let goal: Goal = "maintain";
    let rateKgPerWeek = 0.5;

    let customMultiplier = false;
    let customMultiplierValue = activityMultiplier;

    let profiles: Profile[] = [];
    let lastProfileId: string | null = null;

    /* --- Persistence --- */
    onMount(() => {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
            try {
                profiles = JSON.parse(saved) as Profile[];
            } catch (e) {
                console.warn("Failed to parse profiles", e);
            }
        }
        const last = localStorage.getItem(LS_LAST);
        if (last) lastProfileId = last;

        if (lastProfileId) {
            const p = profiles.find((x) => x.id === lastProfileId);
            if (p) applyProfileToForm(p);
        }
    });

    function persistProfiles() {
        localStorage.setItem(LS_KEY, JSON.stringify(profiles));
    }

    function saveCurrentProfile() {
        const p: Profile = {
            id: uid(),
            name: name || `Profile ${profiles.length + 1}`,
            createdAt: Date.now(),
            units,
            sex,
            age,
            heightCm,
            weightKg,
            bodyFatPct: bodyFatPct == null ? null : bodyFatPct,
            activity: customMultiplier
                ? customMultiplierValue
                : activityMultiplier,
            formula,
            goal,
            rateKgPerWeek,
        };
        profiles = [p, ...profiles];
        persistProfiles();
        lastProfileId = p.id;
        localStorage.setItem(LS_LAST, p.id);
    }

    function applyProfileToForm(p: Profile) {
        units = p.units;
        sex = p.sex;
        age = p.age;
        heightCm = p.heightCm;
        weightKg = p.weightKg;
        bodyFatPct = p.bodyFatPct ?? null;
        activityMultiplier = p.activity;
        formula = p.formula;
        goal = p.goal;
        rateKgPerWeek = p.rateKgPerWeek;
        name = p.name;
        customMultiplier = false;
        customMultiplierValue = p.activity;
        lastProfileId = p.id;
        localStorage.setItem(LS_LAST, p.id);
    }

    function removeProfile(id: string) {
        if (!confirm("Delete this profile?")) return;
        profiles = profiles.filter((p) => p.id !== id);
        persistProfiles();
        if (lastProfileId === id) {
            lastProfileId = null;
            localStorage.removeItem(LS_LAST);
        }
    }

    /* --- Import / Export --- */
    function exportProfilesJSON() {
        const blob = new Blob([JSON.stringify(profiles, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `tdee-profiles-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
    function exportProfilesCSV() {
        const headers = [
            "id",
            "name",
            "createdAt",
            "units",
            "sex",
            "age",
            "heightCm",
            "weightKg",
            "bodyFatPct",
            "activity",
            "formula",
            "goal",
            "rateKgPerWeek",
        ];
        const lines = [headers.join(",")];
        for (const p of profiles) {
            const vals = [
                p.id,
                `"${p.name.replace(/"/g, '""')}"`,
                new Date(p.createdAt).toISOString(),
                p.units,
                p.sex,
                String(p.age),
                String(p.heightCm),
                String(p.weightKg),
                p.bodyFatPct == null ? "" : String(p.bodyFatPct),
                String(p.activity),
                p.formula,
                p.goal,
                String(p.rateKgPerWeek),
            ];
            lines.push(vals.join(","));
        }
        const blob = new Blob([lines.join("\n")], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `tdee-profiles-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }
    function onImportProfiles(e: Event) {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const data = JSON.parse(String(reader.result));
                if (Array.isArray(data)) {
                    profiles = data as Profile[];
                    persistProfiles();
                    alert("Profiles imported");
                } else {
                    alert("Invalid file format");
                }
            } catch (err) {
                alert("Import failed: invalid JSON");
            }
            input.value = "";
        };
        reader.readAsText(file);
    }

    /* --- Unit conversions for UI --- */
    let uiHeightFeet = 0;
    let uiHeightInches = 0;
    let uiWeightLbs = 0;

    $: if (units === "imperial") {
        const hi = cmToFeetInches(heightCm);
        uiHeightFeet = hi.feet;
        uiHeightInches = hi.inches;
        uiWeightLbs = round(kgToLbs(weightKg), 1);
    } else {
        // metric direct mapping
        uiHeightFeet = 0;
        uiHeightInches = 0;
        uiWeightLbs = round(kgToLbs(weightKg), 1);
    }

    /* Keep heightKg/weightKg in sync when user edits imperial fields */
    function onHeightImperialChange(feet: number, inches: number) {
        heightCm = round(feetInchesToCm(feet, inches), 1);
    }
    function onWeightLbsChange(lbs: number) {
        weightKg = round(lbsToKg(lbs), 2);
    }

    /* --- Equations --- */
    function bmrMifflin(
        sex: Sex,
        weightKg: number,
        heightCm: number,
        age: number,
    ) {
        // Mifflin-St Jeor
        const s = sex === "male" ? 5 : sex === "female" ? -161 : -78;
        return 10 * weightKg + 6.25 * heightCm - 5 * age + s;
    }

    function bmrHarris(
        sex: Sex,
        weightKg: number,
        heightCm: number,
        age: number,
    ) {
        // Revised Harris-Benedict (1984)
        if (sex === "male") {
            return 13.397 * weightKg + 4.799 * heightCm - 5.677 * age + 88.362;
        } else if (sex === "female") {
            return 9.247 * weightKg + 3.098 * heightCm - 4.33 * age + 447.593;
        }
        // average
        return (
            (bmrHarris("male", weightKg, heightCm, age) +
                bmrHarris("female", weightKg, heightCm, age)) /
            2
        );
    }

    function bmrKatch(bodyFatPct: number, weightKg: number) {
        // Katch-McArdle uses lean body mass (LBM)
        const lbm = weightKg * (1 - bodyFatPct / 100);
        return 370 + 21.6 * lbm;
    }

    /* --- Compute totals --- */
    $: activeMultiplier = customMultiplier
        ? customMultiplierValue
        : activityMultiplier;

    $: bmr = (() => {
        if (formula === "mifflin")
            return bmrMifflin(sex, weightKg, heightCm, age);
        if (formula === "harris")
            return bmrHarris(sex, weightKg, heightCm, age);
        if (formula === "katch") {
            if (bodyFatPct == null || isNaN(bodyFatPct)) return NaN;
            return bmrKatch(bodyFatPct, weightKg);
        }
        return NaN;
    })();

    $: tdee = isFinite(Number(bmr)) ? bmr * activeMultiplier : NaN;

    /* Goal adjustments */
    $: dailyAdjustment =
        goal === "maintain"
            ? 0
            : goal === "lose"
              ? -caloriesForRate(rateKgPerWeek)
              : caloriesForRate(rateKgPerWeek);
    $: dailyTarget = isFinite(tdee) ? round(tdee + dailyAdjustment, 0) : NaN;

    /* Macronutrients suggestions */
    $: proteinPerKg = goal === "gain" ? 1.6 : 1.8; // simple heuristic: gain slightly lower protein? keep 1.6-2.2; using 1.6-1.8
    // We'll present a range for protein: 1.2 - 2.2 depending on goal
    function proteinRangePerKg(goal: Goal) {
        if (goal === "lose") return [1.6, 2.4]; // higher protein during cut
        if (goal === "gain") return [1.4, 2.0];
        return [1.2, 1.8];
    }

    $: [protLowKg, protHighKg] = proteinRangePerKg(goal);

    $: proteinGramsLow = round(protLowKg * weightKg, 0);
    $: proteinGramsHigh = round(protHighKg * weightKg, 0);

    $: fatPctLow = 0.2; // 20% kcal from fat
    $: fatPctHigh = 0.35; // 35%

    $: fatGramsLow = isFinite(dailyTarget)
        ? round((dailyTarget * fatPctLow) / 9, 0)
        : NaN;
    $: fatGramsHigh = isFinite(dailyTarget)
        ? round((dailyTarget * fatPctHigh) / 9, 0)
        : NaN;

    /* Carbs fill remaining calories after protein & fat - show ranges */
    function macrosForProteinFat(
        proteinG: number,
        fatG: number,
        kcalTarget: number,
    ) {
        const proteinKcal = proteinG * 4;
        const fatKcal = fatG * 9;
        const carbsKcal = Math.max(0, kcalTarget - proteinKcal - fatKcal);
        const carbsG = round(carbsKcal / 4, 0);
        return { carbsG, proteinG, fatG };
    }

    /* timeline: estimate weeks to reach +/- weight, simple linear model */
    function weeksToChangeKg(deltaKg: number, rateKgPerWeekAbs: number) {
        if (rateKgPerWeekAbs <= 0) return Infinity;
        return Math.abs(deltaKg) / rateKgPerWeekAbs;
    }

    /* small inline mini chart points for visualization */
    $: miniChartPoints = (() => {
        if (!isFinite(dailyTarget)) return [];
        // show three points: maintenance (tdee), target (dailyTarget), and bmr baseline
        return [
            { label: "BMR", value: round(bmr, 0) },
            { label: "TDEE", value: round(tdee, 0) },
            { label: "Target", value: round(dailyTarget, 0) },
        ];
    })();

    /* small utility: clamp numeric input */
    function clampNum(v: number, min = -Infinity, max = Infinity) {
        if (isNaN(v)) return min;
        return Math.max(min, Math.min(max, v));
    }

    /* allow quick presets for common weight-loss speeds */
    const RATE_PRESETS = [0.25, 0.5, 1]; // kg per week
</script>

<div
    class="tdee container"
    style="max-width:1000px;margin:0 auto;padding:1rem;"
>
    <h2 style="font-size:1.4rem;margin-bottom:0.25rem;">⚡ TDEE Calculator</h2>
    <p style="margin:0 0 1rem;color:#555">
        Estimate your daily calories and macronutrient targets for fat loss,
        maintenance, or muscle gain. Data stays in your browser.
    </p>

    <div class="grid" style="display:grid;grid-template-columns:1fr;gap:1rem;">
        <!-- INPUT PANEL -->
        <div
            class="card"
            style="padding:1rem;border-radius:12px;background:#fff;box-shadow:0 1px 6px rgba(0,0,0,0.04);"
        >
            <h3 style="margin:0 0 0.5rem;font-size:1.05rem;">Profile</h3>

            <div style="display:flex;flex-wrap:wrap;gap:.5rem;">
                <label style="flex:1 1 200px;">
                    Name
                    <input
                        aria-label="Profile name"
                        bind:value={name}
                        style="width:100%;padding:.5rem;border-radius:8px;border:1px solid #ddd;margin-top:.25rem"
                    />
                </label>

                <label style="min-width:170px;">
                    Units
                    <select
                        bind:value={units}
                        style="width:100%;padding:.5rem;border-radius:8px;border:1px solid #ddd;margin-top:.25rem"
                    >
                        <option value="metric">Metric (cm / kg)</option>
                        <option value="imperial">Imperial (ft/in / lb)</option>
                    </select>
                </label>

                <label style="min-width:170px;">
                    Sex
                    <select
                        bind:value={sex}
                        style="width:100%;padding:.5rem;border-radius:8px;border:1px solid #ddd;margin-top:.25rem"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other (use average)</option>
                    </select>
                </label>

                <label style="min-width:140px;">
                    Age
                    <input
                        type="number"
                        min="10"
                        max="120"
                        bind:value={age}
                        style="width:100%;padding:.5rem;border-radius:8px;border:1px solid #ddd;margin-top:.25rem"
                    />
                </label>
            </div>

            <div
                style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.75rem;"
            >
                {#if units === "metric"}
                    <label style="flex:1 1 150px;">
                        Height (cm)
                        <input
                            type="number"
                            min="50"
                            max="300"
                            bind:value={heightCm}
                            style="width:100%;padding:.5rem;border-radius:8px;border:1px solid #ddd;margin-top:.25rem"
                        />
                    </label>
                    <label style="flex:1 1 150px;">
                        Weight (kg)
                        <input
                            type="number"
                            min="20"
                            max="600"
                            step="0.1"
                            bind:value={weightKg}
                            style="width:100%;padding:.5rem;border-radius:8px;border:1px solid #ddd;margin-top:.25rem"
                        />
                    </label>
                {:else}
                    <label style="min-width:120px;">
                        Height ft
                        <input
                            type="number"
                            min="3"
                            max="8"
                            bind:value={uiHeightFeet}
                            on:change={() =>
                                onHeightImperialChange(
                                    uiHeightFeet,
                                    uiHeightInches,
                                )}
                            style="width:100%;padding:.5rem;border-radius:8px;border:1px solid #ddd;margin-top:.25rem"
                        />
                    </label>
                    <label style="min-width:120px;">
                        Height in
                        <input
                            type="number"
                            min="0"
                            max="11"
                            bind:value={uiHeightInches}
                            on:change={() =>
                                onHeightImperialChange(
                                    uiHeightFeet,
                                    uiHeightInches,
                                )}
                            style="width:100%;padding:.5rem;border-radius:8px;border:1px solid #ddd;margin-top:.25rem"
                        />
                    </label>
                    <label style="min-width:150px;">
                        Weight (lb)
                        <input
                            type="number"
                            min="40"
                            max="1400"
                            step="0.1"
                            bind:value={uiWeightLbs}
                            on:change={() => onWeightLbsChange(uiWeightLbs)}
                            style="width:100%;padding:.5rem;border-radius:8px;border:1px solid #ddd;margin-top:.25rem"
                        />
                    </label>
                {/if}

                <label style="min-width:170px;">
                    Body Fat % (optional)
                    <input
                        type="number"
                        min="2"
                        max="70"
                        step="0.1"
                        bind:value={bodyFatPct}
                        style="width:100%;padding:.5rem;border-radius:8px;border:1px solid #ddd;margin-top:.25rem"
                        placeholder="e.g. 18"
                    />
                </label>

                <label style="min-width:220px;">
                    Activity level
                    <select
                        bind:value={activityMultiplier}
                        disabled={customMultiplier}
                        style="width:100%;padding:.5rem;border-radius:8px;border:1px solid #ddd;margin-top:.25rem"
                    >
                        {#each ACTIVITY_PRESETS as p}
                            <option value={p.multiplier}
                                >{p.label} — ×{p.multiplier}</option
                            >
                        {/each}
                    </select>
                </label>

                <label style="display:flex;align-items:center;gap:.5rem;">
                    <input type="checkbox" bind:checked={customMultiplier} />
                    Custom multiplier
                    {#if customMultiplier}
                        <input
                            type="number"
                            step="0.01"
                            min="1"
                            max="3"
                            bind:value={customMultiplierValue}
                            on:change={() =>
                                (customMultiplierValue = clampNum(
                                    customMultiplierValue,
                                    1,
                                    3,
                                ))}
                            style="width:100px;padding:.35rem;border-radius:8px;border:1px solid #ddd;margin-left:.5rem"
                        />
                    {/if}
                </label>
            </div>

            <div
                style="margin-top:.75rem;display:flex;gap:.5rem;flex-wrap:wrap;align-items:center;"
            >
                <label style="min-width:160px;">
                    Formula
                    <select
                        bind:value={formula}
                        style="width:100%;padding:.5rem;border-radius:8px;border:1px solid #ddd;margin-top:.25rem;"
                    >
                        <option value="mifflin"
                            >Mifflin–St Jeor (recommended)</option
                        >
                        <option value="harris">Revised Harris–Benedict</option>
                        <option value="katch" disabled={bodyFatPct == null}
                            >Katch–McArdle (requires body fat)</option
                        >
                    </select>
                </label>

                <label style="min-width:160px;">
                    Goal
                    <select
                        bind:value={goal}
                        style="width:100%;padding:.5rem;border-radius:8px;border:1px solid #ddd;margin-top:.25rem;"
                    >
                        <option value="maintain">Maintain</option>
                        <option value="lose">Lose fat</option>
                        <option value="gain">Gain weight</option>
                    </select>
                </label>

                <label style="min-width:220px;">
                    Rate (kg/week)
                    <select
                        bind:value={rateKgPerWeek}
                        style="width:100%;padding:.5rem;border-radius:8px;border:1px solid #ddd;margin-top:.25rem;"
                    >
                        <option value={0.25}>0.25 kg/week (conservative)</option
                        >
                        <option value={0.5}>0.5 kg/week (common)</option>
                        <option value={1}>1 kg/week (aggressive)</option>
                    </select>
                </label>

                <button
                    on:click={saveCurrentProfile}
                    style="background:#0b74ff;color:white;padding:.5rem 0.8rem;border-radius:9px;border:none;margin-left:auto"
                    >Save profile</button
                >
            </div>
        </div>

        <!-- OUTPUT PANEL -->
        <div
            class="card"
            style="padding:1rem;border-radius:12px;background:#fff;box-shadow:0 1px 6px rgba(0,0,0,0.04);"
        >
            <h3 style="margin:0 0 .5rem;font-size:1.05rem;">Results</h3>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;">
                <div
                    style="padding:.6rem;border-radius:8px;background:#fafafa;"
                >
                    <div style="font-size:.85rem;color:#666">BMR</div>
                    <div style="font-weight:700;font-size:1.2rem;">
                        {isFinite(bmr) ? `${round(bmr, 0)} kcal` : "—"}
                    </div>
                    <div style="font-size:.75rem;color:#888;margin-top:.25rem">
                        Basal Metabolic Rate — calories burned at rest
                    </div>
                </div>

                <div
                    style="padding:.6rem;border-radius:8px;background:#fafafa;"
                >
                    <div style="font-size:.85rem;color:#666">
                        TDEE (maintenance)
                    </div>
                    <div style="font-weight:700;font-size:1.2rem;">
                        {isFinite(tdee) ? `${round(tdee, 0)} kcal` : "—"}
                    </div>
                    <div style="font-size:.75rem;color:#888;margin-top:.25rem">
                        Daily energy expenditure with activity
                    </div>
                </div>

                <div
                    style="padding:.6rem;border-radius:8px;background:#fafafa;"
                >
                    <div style="font-size:.85rem;color:#666">
                        Daily target ({goal})
                    </div>
                    <div style="font-weight:700;font-size:1.2rem;">
                        {isFinite(dailyTarget) ? `${dailyTarget} kcal` : "—"}
                    </div>
                    <div style="font-size:.75rem;color:#888;margin-top:.25rem">
                        Adjusted by {goal === "maintain"
                            ? "0"
                            : `${round(Math.abs(dailyAdjustment), 0)} kcal/day`}
                        ({goal})
                    </div>
                </div>

                <div
                    style="padding:.6rem;border-radius:8px;background:#fafafa;"
                >
                    <div style="font-size:.85rem;color:#666">
                        Activity multiplier
                    </div>
                    <div style="font-weight:700;font-size:1.2rem;">
                        ×{round(activeMultiplier, 2)}
                    </div>
                    <div style="font-size:.75rem;color:#888;margin-top:.25rem">
                        Used multiplier for TDEE
                    </div>
                </div>
            </div>

            <!-- mini svg chart -->
            <div style="margin-top:.75rem;">
                <svg
                    width="100%"
                    height="60"
                    viewBox="0 0 300 60"
                    preserveAspectRatio="none"
                    style="background:#fff;border-radius:8px;"
                >
                    {#if miniChartPoints.length}
                        {@const maxVal =
                            Math.max(...miniChartPoints.map((p) => p.value)) *
                            1.05}
                        {@const minVal =
                            Math.min(...miniChartPoints.map((p) => p.value)) *
                            0.95}
                        {#each miniChartPoints as p, i}
                            {@const x =
                                20 +
                                i * (260 / (miniChartPoints.length - 1 || 1))}
                            {@const y =
                                50 -
                                ((p.value - minVal) / (maxVal - minVal || 1)) *
                                    38}
                            <circle
                                cx={x}
                                cy={y}
                                r="4"
                                fill={i === 2 ? "#0b74ff" : "#333"}
                                opacity="0.95"
                            />
                            <text
                                {x}
                                y={y - 8}
                                font-size="10"
                                text-anchor="middle"
                                fill="#333">{p.value}</text
                            >
                            <text
                                {x}
                                y="55"
                                font-size="10"
                                text-anchor="middle"
                                fill="#666">{p.label}</text
                            >
                            {#if i < miniChartPoints.length - 1}
                                {@const next = miniChartPoints[i + 1]}
                                {@const x2 =
                                    20 +
                                    (i + 1) *
                                        (260 /
                                            (miniChartPoints.length - 1 || 1))}
                                {@const y2 =
                                    50 -
                                    ((next.value - minVal) /
                                        (maxVal - minVal || 1)) *
                                        38}
                                <line
                                    x1={x}
                                    y1={y}
                                    {x2}
                                    {y2}
                                    stroke="#ddd"
                                    stroke-width="2"
                                />
                            {/if}
                        {/each}
                    {/if}
                </svg>
            </div>

            <!-- Macros -->
            <div
                style="margin-top:.75rem;display:grid;grid-template-columns:1fr 1fr;gap:.5rem;"
            >
                <div
                    style="padding:.6rem;border-radius:8px;background:#fff;border:1px solid #f0f0f0;"
                >
                    <div style="font-size:.9rem;color:#666">Protein</div>
                    <div style="font-weight:700;font-size:1.1rem;">
                        {proteinGramsLow}–{proteinGramsHigh} g / day
                    </div>
                    <div style="font-size:.75rem;color:#888;margin-top:.25rem">
                        (~{protLowKg}-{protHighKg} g/kg)
                    </div>
                </div>

                <div
                    style="padding:.6rem;border-radius:8px;background:#fff;border:1px solid #f0f0f0;"
                >
                    <div style="font-size:.9rem;color:#666">Fat</div>
                    <div style="font-weight:700;font-size:1.1rem;">
                        {fatGramsLow}–{fatGramsHigh} g / day
                    </div>
                    <div style="font-size:.75rem;color:#888;margin-top:.25rem">
                        {Math.round(fatPctLow * 100)}–{Math.round(
                            fatPctHigh * 100,
                        )}% of kcal
                    </div>
                </div>
            </div>

            <div style="margin-top:.6rem;">
                <div style="font-size:.85rem;color:#666">Carbs (approx)</div>

                {#if isFinite(dailyTarget)}
                    {@const protExample = proteinGramsHigh}
                    {@const fatExample = fatGramsLow}
                    {@const c = macrosForProteinFat(
                        protExample,
                        fatExample,
                        dailyTarget,
                    )}
                    <div style="font-weight:700;font-size:1.05rem;">
                        ~{c.carbsG} g carbs (example using {protExample}g
                        protein & {fatExample}g fat)
                    </div>
                    <div style="font-size:.75rem;color:#888;margin-top:.25rem">
                        Adjust protein/fat to change carbs.
                    </div>
                {:else}
                    <div style="color:#999">
                        Enter valid profile values to compute macros.
                    </div>
                {/if}
            </div>

            <!-- timeline -->
            <div style="margin-top:.75rem;">
                <h4 style="margin:0 0 .25rem">Timeline estimate</h4>
                <div style="font-size:.9rem;color:#666">
                    {#if goal === "maintain"}
                        Maintaining weight — no timeline.
                    {:else if rateKgPerWeek > 0}
                        You selected {rateKgPerWeek} kg/week. At this rate:
                        <div style="margin-top:.35rem;font-weight:700;">
                            To change 1 kg: ~{round(1 / rateKgPerWeek, 1)} weeks
                        </div>
                        <div
                            style="margin-top:.25rem;font-weight:600;color:#444"
                        >
                            Example estimates:
                            <ul style="margin:.4rem 0 0;padding-left:1rem">
                                <li>
                                    Lose 5 kg: ~{round(
                                        weeksToChangeKg(5, rateKgPerWeek),
                                        1,
                                    )} weeks
                                </li>
                                <li>
                                    Gain 5 kg: ~{round(
                                        weeksToChangeKg(5, rateKgPerWeek),
                                        1,
                                    )} weeks
                                </li>
                            </ul>
                        </div>
                    {:else}
                        Choose a non-zero rate.
                    {/if}
                </div>
            </div>

            <!-- Save / export -->
            <div
                style="margin-top:.85rem;display:flex;gap:.5rem;flex-wrap:wrap;"
            >
                <button
                    on:click={exportProfilesJSON}
                    style="background:#111827;color:white;padding:.5rem .8rem;border-radius:8px;border:none"
                    >Export Profiles JSON</button
                >
                <button
                    on:click={exportProfilesCSV}
                    style="background:#111827;color:white;padding:.5rem .8rem;border-radius:8px;border:none"
                    >Export Profiles CSV</button
                >
                <label
                    style="background:#fff;border:1px dashed #ddd;padding:.4rem .6rem;border-radius:8px;cursor:pointer"
                >
                    Import profiles
                    <input
                        type="file"
                        accept="application/json"
                        on:change={onImportProfiles}
                        style="display:none"
                    />
                </label>
            </div>
        </div>

        <!-- PROFILES -->
        <div
            class="card"
            style="padding:1rem;border-radius:12px;background:#fff;box-shadow:0 1px 6px rgba(0,0,0,0.04);"
        >
            <h3 style="margin:0 0 .5rem;font-size:1.05rem;">
                Saved Profiles ({profiles.length})
            </h3>
            {#if profiles.length === 0}
                <div style="color:#666">
                    No saved profiles yet. Create one with "Save profile".
                </div>
            {:else}
                <div
                    style="display:flex;flex-direction:column;gap:.5rem;margin-top:.5rem;"
                >
                    {#each profiles as p}
                        <div
                            style="display:flex;align-items:center;gap:.6rem;padding:.5rem;border-radius:8px;border:1px solid #f0f0f0"
                        >
                            <div style="flex:1;min-width:0;">
                                <div style="font-weight:700">{p.name}</div>
                                <div style="font-size:.8rem;color:#666">
                                    Age {p.age} • {round(p.weightKg, 1)} kg • {round(
                                        p.heightCm,
                                        1,
                                    )} cm • activity ×{p.activity}
                                </div>
                            </div>
                            <div style="display:flex;gap:.4rem;">
                                <button
                                    on:click={() => applyProfileToForm(p)}
                                    style="padding:.35rem .6rem;border-radius:8px;border:1px solid #ddd;background:#fff"
                                    >Load</button
                                >
                                <button
                                    on:click={() => {
                                        if (confirm("Export profile JSON?")) {
                                            const blob = new Blob(
                                                [JSON.stringify(p, null, 2)],
                                                { type: "application/json" },
                                            );
                                            const u = URL.createObjectURL(blob);
                                            const a =
                                                document.createElement("a");
                                            a.href = u;
                                            a.download = `profile-${p.name.replace(/\s+/g, "-")}.json`;
                                            a.click();
                                            URL.revokeObjectURL(u);
                                        }
                                    }}
                                    style="padding:.35rem .6rem;border-radius:8px;border:1px solid #ddd;background:#fff"
                                    >Export</button
                                >
                                <button
                                    on:click={() => removeProfile(p.id)}
                                    style="padding:.35rem .6rem;border-radius:8px;border:1px solid #ddd;background:#fff;color:#b91c1c"
                                    >Delete</button
                                >
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    :global(body) {
        background: #f3f4f6;
        font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            "Segoe UI",
            Roboto,
            "Helvetica Neue",
            Arial;
        color: #111827;
    }
    .container {
        padding-bottom: 2rem;
    }
    .card {
        transition: box-shadow 0.12s ease;
    }
    .card:hover {
        box-shadow: 0 6px 18px rgba(17, 24, 39, 0.06);
    }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    @media (min-width: 900px) {
        .grid {
            grid-template-columns: 1fr 1fr;
        }
        .grid > .card:first-child {
            grid-column: 1 / 2;
        }
    }
</style>
