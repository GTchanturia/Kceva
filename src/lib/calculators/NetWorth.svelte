<script lang="ts">
    import { onMount } from "svelte";

    // ---------- Types ----------
    type RowType = "asset" | "liability";
    type CurrencyCode =
        | "EUR"
        | "USD"
        | "GBP"
        | "GEL"
        | "JPY"
        | "CHF"
        | "AUD"
        | "CAD"
        | "CNY"
        | "INR"
        | "SEK"
        | "NOK"
        | "DKK"
        | "PLN"
        | "CZK"
        | "HUF"
        | "TRY"
        | "AED"
        | "SAR"
        | "ILS"
        | "RON"
        | "BGN"
        | "RSD"
        | "UAH"
        | "KZT"
        | "RUB";

    interface Row {
        id: string;
        kind: RowType;
        name: string;
        category: string;
        amount: number; // stored as absolute value
        createdAt: number;
    }

    const LS_KEY = "net-worth-v2";

    // ---------- Currency metadata (flags + readable names) ----------
    const CURRENCIES: Record<
        CurrencyCode,
        { flag: string; name: string; locales?: string[] }
    > = {
        EUR: { flag: "🇪🇺", name: "Euro" },
        USD: { flag: "🇺🇸", name: "US Dollar" },
        GBP: { flag: "🇬🇧", name: "British Pound" },
        GEL: { flag: "🇬🇪", name: "Georgian Lari" },
        JPY: { flag: "🇯🇵", name: "Japanese Yen" },
        CHF: { flag: "🇨🇭", name: "Swiss Franc" },
        AUD: { flag: "🇦🇺", name: "Australian Dollar" },
        CAD: { flag: "🇨🇦", name: "Canadian Dollar" },
        CNY: { flag: "🇨🇳", name: "Chinese Yuan" },
        INR: { flag: "🇮🇳", name: "Indian Rupee" },
        SEK: { flag: "🇸🇪", name: "Swedish Krona" },
        NOK: { flag: "🇳🇴", name: "Norwegian Krone" },
        DKK: { flag: "🇩🇰", name: "Danish Krone" },
        PLN: { flag: "🇵🇱", name: "Polish Złoty" },
        CZK: { flag: "🇨🇿", name: "Czech Koruna" },
        HUF: { flag: "🇭🇺", name: "Hungarian Forint" },
        TRY: { flag: "🇹🇷", name: "Turkish Lira" },
        AED: { flag: "🇦🇪", name: "UAE Dirham" },
        SAR: { flag: "🇸🇦", name: "Saudi Riyal" },
        ILS: { flag: "🇮🇱", name: "Israeli New Shekel" },
        RON: { flag: "🇷🇴", name: "Romanian Leu" },
        BGN: { flag: "🇧🇬", name: "Bulgarian Lev" },
        RSD: { flag: "🇷🇸", name: "Serbian Dinar" },
        UAH: { flag: "🇺🇦", name: "Ukrainian Hryvnia" },
        KZT: { flag: "🇰🇿", name: "Kazakhstani Tenge" },
        RUB: { flag: "🇷🇺", name: "Russian Ruble" },
    };

    // ---------- Categories ----------
    const assetCategories = [
        "Cash",
        "Checking",
        "Savings",
        "Investments (Stocks/Bonds/Crypto)",
        "Retirement (401k/IRA/Pension)",
        "Real Estate / Property",
        "Vehicle",
        "Business Equity",
        "Collectibles",
        "Other Asset",
    ];

    const liabilityCategories = [
        "Credit Cards",
        "Mortgage",
        "Auto Loan",
        "Student Loan",
        "Personal Loan",
        "Taxes Owed",
        "Buy Now Pay Later",
        "Other Liability",
    ];

    // ---------- State ----------
    let rows: Row[] = [];

    // Default: EUR, hide symbols (we show flag + ISO instead)
    let currency: CurrencyCode = "EUR";
    let showSymbol = false;

    // new row composer
    let newKind: RowType = "asset";
    let newName = "";
    let newCategory = assetCategories[0];
    let newAmount: string = "";

    // UI helpers
    let search = "";
    let filterKind: RowType | "all" = "all";
    let filterCategory: string | "all" = "all";

    // ---------- Persistence ----------
    onMount(() => {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                rows = parsed.rows ?? [];
                currency = parsed.currency ?? currency;
                showSymbol = parsed.showSymbol ?? showSymbol;
            } catch (e) {
                console.warn("Failed to parse saved data", e);
            }
        }
    });

    function persist() {
        localStorage.setItem(
            LS_KEY,
            JSON.stringify({ rows, currency, showSymbol }),
        );
    }

    // ---------- Utilities ----------
    function uid() {
        return Math.random().toString(36).slice(2) + Date.now().toString(36);
    }

    function fmt(n: number) {
        // If showSymbol is off, format as decimal with 2dp (no currency symbol)
        if (!showSymbol) {
            return new Intl.NumberFormat(undefined, {
                style: "decimal",
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            }).format(n);
        }
        // otherwise show currency
        try {
            return new Intl.NumberFormat(undefined, {
                style: "currency",
                currency,
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            }).format(n);
        } catch {
            return n.toFixed(2);
        }
    }

    function toAbs(numLike: string | number) {
        const n =
            typeof numLike === "number" ? numLike : parseFloat(numLike || "0");
        return isNaN(n) ? 0 : Math.abs(n);
    }

    // ---------- CRUD ----------
    function addRow() {
        if (!newName.trim()) return;
        const amount = toAbs(newAmount);
        if (amount <= 0) return;

        rows = [
            ...rows,
            {
                id: uid(),
                kind: newKind,
                name: newName.trim(),
                category: newCategory,
                amount,
                createdAt: Date.now(),
            },
        ];

        newName = "";
        newAmount = "";
        persist();
    }

    function removeRow(id: string) {
        rows = rows.filter((r) => r.id !== id);
        persist();
    }

    function updateRow(id: string, patch: Partial<Row>) {
        rows = rows.map((r) => (r.id === id ? { ...r, ...patch } : r));
        persist();
    }

    function resetAll() {
        if (!confirm("Clear all net worth data?")) return;
        rows = [];
        persist();
    }

    // ---------- Export ----------
    function exportJSON() {
        const blob = new Blob(
            [JSON.stringify({ rows, currency, showSymbol }, null, 2)],
            { type: "application/json" },
        );
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `net-worth-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    function exportCSV() {
        const headers = [
            "id",
            "kind",
            "name",
            "category",
            "amount",
            "createdAt",
        ];
        const lines = [headers.join(",")];
        for (const r of rows) {
            const vals = [
                r.id,
                r.kind,
                `"${r.name.replace(/"/g, '""')}"`,
                `"${r.category.replace(/"/g, '""')}"`,
                r.amount.toString(),
                new Date(r.createdAt).toISOString(),
            ];
            lines.push(vals.join(","));
        }
        const csv = lines.join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `net-worth-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    function onImportFile(e: Event) {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const data = JSON.parse(String(reader.result));
                rows = Array.isArray(data.rows) ? data.rows : [];
                currency = (data.currency as CurrencyCode) ?? currency;
                showSymbol = data.showSymbol ?? showSymbol;
                persist();
            } catch {
                alert("Invalid JSON file");
            }
            input.value = "";
        };
        reader.readAsText(file);
    }

    // ---------- Derived totals ----------
    $: assets = rows.filter((r) => r.kind === "asset");
    $: liabilities = rows.filter((r) => r.kind === "liability");
    $: totalAssets = assets.reduce((s, r) => s + r.amount, 0);
    $: totalLiabilities = liabilities.reduce((s, r) => s + r.amount, 0);
    $: netWorth = totalAssets - totalLiabilities;
    $: debtToAsset = totalAssets > 0 ? totalLiabilities / totalAssets : 0;

    // ---------- Filters ----------
    $: filtered = rows.filter((r) => {
        if (filterKind !== "all" && r.kind !== filterKind) return false;
        if (filterCategory !== "all" && r.category !== filterCategory)
            return false;
        if (search) {
            const q = search.toLowerCase();
            if (
                !r.name.toLowerCase().includes(q) &&
                !r.category.toLowerCase().includes(q)
            )
                return false;
        }
        return true;
    });

    // ---------- Donut chart helpers ----------
    const R = 42; // radius
    const C = 2 * Math.PI * R; // circumference

    function pieData(list: Row[]) {
        const map = new Map<string, number>();
        for (const r of list) {
            map.set(r.category, (map.get(r.category) || 0) + r.amount);
        }
        const total = Array.from(map.values()).reduce((a, b) => a + b, 0);
        const entries = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
        return { total, entries };
    }

    function donutSlices(entries: [string, number][]) {
        const sum = entries.reduce((s, [, v]) => s + v, 0) || 1;
        let acc = 0;
        return entries.map(([label, value]) => {
            const frac = value / sum;
            const dash = C * frac;
            const gap = 2;
            const offset = C * (acc / sum);
            acc += value;
            return { label, value, dash: Math.max(0, dash - gap), offset };
        });
    }

    // Reactive data for donuts
    $: assetsData = pieData(assets);
    $: liabilitiesData = pieData(liabilities);
    $: assetsSlices = donutSlices(assetsData.entries);
    $: liabilitiesSlices = donutSlices(liabilitiesData.entries);

    // ---------- Quick presets ----------
    const quickAssetPresets: Omit<Row, "id" | "createdAt">[] = [
        {
            kind: "asset",
            name: "Emergency Fund",
            category: "Savings",
            amount: 2000,
        },
        {
            kind: "asset",
            name: "Brokerage",
            category: "Investments (Stocks/Bonds/Crypto)",
            amount: 5000,
        },
        {
            kind: "asset",
            name: "Car (Market Value)",
            category: "Vehicle",
            amount: 9000,
        },
    ];
    const quickLiabilityPresets: Omit<Row, "id" | "createdAt">[] = [
        {
            kind: "liability",
            name: "Visa Card",
            category: "Credit Cards",
            amount: 800,
        },
        {
            kind: "liability",
            name: "Auto Loan",
            category: "Auto Loan",
            amount: 4500,
        },
    ];

    function applyPreset(p: Omit<Row, "id" | "createdAt">) {
        rows = [...rows, { id: uid(), createdAt: Date.now(), ...p }];
        persist();
    }

    // ---------- UX: reset category when switching kind ----------
    $: if (newKind === "asset" && !assetCategories.includes(newCategory)) {
        newCategory = assetCategories[0];
    }
    $: if (
        newKind === "liability" &&
        !liabilityCategories.includes(newCategory)
    ) {
        newCategory = liabilityCategories[0];
    }
</script>

<div class="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
    <!-- Header -->
    <header
        class="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-6 shadow-sm"
    >
        <div
            class="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
            <div>
                <h1 class="text-3xl font-extrabold tracking-tight">
                    🏦 Net Worth Calculator
                </h1>
                <p class="text-indigo-100">
                    Track assets, liabilities, and visualize your wealth — data
                    stays on your device.
                </p>
            </div>

            <div class="flex flex-wrap items-center gap-2">
                <!-- Currency select with flags -->
                <label class="sr-only" for="currency">Currency</label>
                <select
                    id="currency"
                    bind:value={currency}
                    on:change={persist}
                    class="border border-white/30 bg-white/10 backdrop-blur rounded-2xl px-3 py-2"
                >
                    {#each Object.keys(CURRENCIES) as code}
                        {@const c = CURRENCIES[code as CurrencyCode]}
                        <option value={code}>
                            {c.flag}
                            {code} — {c.name}
                        </option>
                    {/each}
                </select>

                <!-- Toggle symbols (off by default) -->
                <label
                    class="inline-flex items-center gap-2 text-sm bg-white/10 border border-white/20 rounded-2xl px-3 py-2"
                >
                    <input
                        type="checkbox"
                        bind:checked={showSymbol}
                        on:change={persist}
                    />
                    Show currency symbols
                </label>

                <!-- Export / Import / Reset -->
                <div class="flex gap-2">
                    <button
                        class="px-3 py-2 rounded-2xl bg-white text-indigo-700 hover:bg-indigo-50"
                        on:click={exportJSON}
                        title="Download JSON backup">Export JSON</button
                    >
                    <button
                        class="px-3 py-2 rounded-2xl bg-white text-indigo-700 hover:bg-indigo-50"
                        on:click={exportCSV}
                        title="Download CSV">Export CSV</button
                    >

                    <label
                        class="px-3 py-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 cursor-pointer"
                    >
                        Import JSON
                        <input
                            type="file"
                            accept="application/json"
                            class="hidden"
                            on:change={onImportFile}
                        />
                    </label>
                    <button
                        class="px-3 py-2 rounded-2xl bg-rose-600 hover:bg-rose-700"
                        on:click={resetAll}
                        title="Clear all data">Reset</button
                    >
                </div>
            </div>
        </div>

        <!-- Summary strip -->
        <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
            <div class="rounded-2xl bg-white/10 p-4">
                <div class="text-indigo-100 text-sm">Currency</div>
                <div class="text-xl font-semibold flex items-center gap-2">
                    <span class="text-2xl">{CURRENCIES[currency].flag}</span>
                    <span>{currency}</span>
                    <span class="text-indigo-200 text-sm"
                        >({CURRENCIES[currency].name})</span
                    >
                </div>
            </div>
            <div class="rounded-2xl bg-white/10 p-4">
                <div class="text-indigo-100 text-sm">Total Assets</div>
                <div class="text-xl font-semibold">{fmt(totalAssets)}</div>
            </div>
            <div class="rounded-2xl bg-white/10 p-4">
                <div class="text-indigo-100 text-sm">Total Liabilities</div>
                <div class="text-xl font-semibold">{fmt(totalLiabilities)}</div>
            </div>
            <div class="rounded-2xl bg-white/10 p-4">
                <div class="text-indigo-100 text-sm">Net Worth</div>
                <div
                    class="text-xl font-extrabold {netWorth >= 0
                        ? 'text-emerald-200'
                        : 'text-rose-200'}"
                >
                    {fmt(netWorth)}
                </div>
                <div class="text-indigo-200 text-xs mt-1">
                    Debt/Asset Ratio: {(debtToAsset * 100).toFixed(1)}%
                </div>
            </div>
        </div>
    </header>

    <!-- Charts -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Assets by Category -->
        <div class="rounded-3xl bg-white shadow-sm p-5 border">
            <div class="flex items-center justify-between mb-3">
                <h3 class="font-semibold">Assets by Category</h3>
                <span class="text-sm text-gray-500">{assets.length} items</span>
            </div>

            {#if assets.length === 0}
                <p class="text-gray-500 text-sm">No assets yet.</p>
            {:else}
                <div class="flex items-center gap-6">
                    <svg
                        viewBox="0 0 120 120"
                        width="160"
                        height="160"
                        class="shrink-0"
                    >
                        <g transform="translate(60,60)">
                            <circle
                                r={R}
                                cx="0"
                                cy="0"
                                fill="transparent"
                                stroke="#e5e7eb"
                                stroke-width="16"
                            />
                            {#each assetsSlices as s, i}
                                <circle
                                    r={R}
                                    cx="0"
                                    cy="0"
                                    fill="transparent"
                                    stroke="#10b981"
                                    stroke-opacity={0.9 - i * 0.08}
                                    stroke-width="16"
                                    stroke-dasharray={`${s.dash} ${C}`}
                                    stroke-dashoffset={-s.offset}
                                    transform="rotate(-90)"
                                />
                            {/each}
                        </g>
                    </svg>

                    <div class="flex-1 min-w-0">
                        <div class="text-sm text-gray-500 mb-1">
                            Total: {fmt(assetsData.total)}
                            <span class="ml-2 text-gray-400"
                                >({CURRENCIES[currency].flag} {currency})</span
                            >
                        </div>
                        <ul class="space-y-1 text-sm">
                            {#each assetsData.entries as [label, value]}
                                <li class="flex justify-between">
                                    <span class="truncate pr-3">{label}</span>
                                    <span class="font-medium">{fmt(value)}</span
                                    >
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            {/if}
        </div>

        <!-- Liabilities by Category -->
        <div class="rounded-3xl bg-white shadow-sm p-5 border">
            <div class="flex items-center justify-between mb-3">
                <h3 class="font-semibold">Liabilities by Category</h3>
                <span class="text-sm text-gray-500"
                    >{liabilities.length} items</span
                >
            </div>

            {#if liabilities.length === 0}
                <p class="text-gray-500 text-sm">No liabilities yet.</p>
            {:else}
                <div class="flex items-center gap-6">
                    <svg
                        viewBox="0 0 120 120"
                        width="160"
                        height="160"
                        class="shrink-0"
                    >
                        <g transform="translate(60,60)">
                            <circle
                                r={R}
                                cx="0"
                                cy="0"
                                fill="transparent"
                                stroke="#e5e7eb"
                                stroke-width="16"
                            />
                            {#each liabilitiesSlices as s, i}
                                <circle
                                    r={R}
                                    cx="0"
                                    cy="0"
                                    fill="transparent"
                                    stroke="#ef4444"
                                    stroke-opacity={0.9 - i * 0.08}
                                    stroke-width="16"
                                    stroke-dasharray={`${s.dash} ${C}`}
                                    stroke-dashoffset={-s.offset}
                                    transform="rotate(-90)"
                                />
                            {/each}
                        </g>
                    </svg>

                    <div class="flex-1 min-w-0">
                        <div class="text-sm text-gray-500 mb-1">
                            Total: {fmt(liabilitiesData.total)}
                            <span class="ml-2 text-gray-400"
                                >({CURRENCIES[currency].flag} {currency})</span
                            >
                        </div>
                        <ul class="space-y-1 text-sm">
                            {#each liabilitiesData.entries as [label, value]}
                                <li class="flex justify-between">
                                    <span class="truncate pr-3">{label}</span>
                                    <span class="font-medium">{fmt(value)}</span
                                    >
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            {/if}
        </div>
    </section>

    <!-- Composer & Presets -->
    <section class="rounded-3xl bg-white shadow-sm p-5 border space-y-4">
        <h3 class="font-semibold">Add Item</h3>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
            <select bind:value={newKind} class="border rounded-2xl px-3 py-2">
                <option value="asset">Asset</option>
                <option value="liability">Liability</option>
            </select>

            <select
                bind:value={newCategory}
                class="border rounded-2xl px-3 py-2"
            >
                {#if newKind === "asset"}
                    {#each assetCategories as c}<option value={c}>{c}</option
                        >{/each}
                {:else}
                    {#each liabilityCategories as c}<option value={c}
                            >{c}</option
                        >{/each}
                {/if}
            </select>

            <input
                placeholder="Name (e.g., Savings Account)"
                class="border rounded-2xl px-3 py-2"
                bind:value={newName}
            />

            <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Amount"
                class="border rounded-2xl px-3 py-2"
                bind:value={newAmount}
                on:keydown={(e) => {
                    if (e.key === "Enter") addRow();
                }}
            />

            <button
                class="rounded-2xl bg-emerald-600 text-white px-4 py-2 hover:bg-emerald-700"
                on:click={addRow}>Add</button
            >
        </div>

        <div class="flex flex-wrap gap-2 text-sm">
            <span class="text-gray-500">Quick add:</span>
            {#each quickAssetPresets as p}
                <button
                    class="px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 border"
                    on:click={() => applyPreset(p)}>{p.name}</button
                >
            {/each}
            {#each quickLiabilityPresets as p}
                <button
                    class="px-3 py-1 rounded-full bg-rose-50 hover:bg-rose-100 border"
                    on:click={() => applyPreset(p)}>{p.name}</button
                >
            {/each}
        </div>
    </section>

    <!-- Filters -->
    <section class="rounded-3xl bg-white shadow-sm p-5 border">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
                placeholder="Search name/category"
                class="border rounded-2xl px-3 py-2"
                bind:value={search}
            />
            <select
                class="border rounded-2xl px-3 py-2"
                bind:value={filterKind}
            >
                <option value="all">All Types</option>
                <option value="asset">Assets</option>
                <option value="liability">Liabilities</option>
            </select>
            <select
                class="border rounded-2xl px-3 py-2"
                bind:value={filterCategory}
            >
                <option value="all">All Categories</option>
                {#each assetCategories as c}<option value={c}>{c}</option
                    >{/each}
                {#each liabilityCategories as c}<option value={c}>{c}</option
                    >{/each}
            </select>
            <div class="flex items-center text-sm text-gray-500">
                {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </div>
        </div>
    </section>

    <!-- Table -->
    <section class="rounded-3xl bg-white shadow-sm border overflow-x-auto">
        <table class="min-w-full text-sm">
            <thead class="bg-gray-50 text-gray-600 sticky top-0 z-10">
                <tr>
                    <th class="text-left px-4 py-3">Type</th>
                    <th class="text-left px-4 py-3">Name</th>
                    <th class="text-left px-4 py-3">Category</th>
                    <th class="text-right px-4 py-3">
                        Amount
                        <span class="ml-2 text-xs text-gray-400"
                            >({CURRENCIES[currency].flag}
                            {currency}{showSymbol ? " • symbol" : ""})</span
                        >
                    </th>
                    <th class="px-4 py-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {#if filtered.length === 0}
                    <tr>
                        <td colspan="5" class="text-center text-gray-500 py-6">
                            No items yet. Add your first asset or liability
                            above.
                        </td>
                    </tr>
                {/if}
                {#each filtered as r (r.id)}
                    <tr class="border-t hover:bg-gray-50/70 transition-colors">
                        <td class="px-4 py-3">
                            <span
                                class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium {r.kind ===
                                'asset'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-rose-50 text-rose-700'}"
                            >
                                {r.kind === "asset" ? "Asset" : "Liability"}
                            </span>
                        </td>
                        <td class="px-4 py-3">
                            <input
                                class="w-full bg-transparent border rounded-xl px-2 py-1 focus:bg-white"
                                bind:value={r.name}
                                on:change={(e) =>
                                    updateRow(r.id, {
                                        name: (e.target as HTMLInputElement)
                                            .value,
                                    })}
                            />
                        </td>
                        <td class="px-4 py-3">
                            <select
                                class="border rounded-xl px-2 py-1"
                                bind:value={r.category}
                                on:change={(e) =>
                                    updateRow(r.id, {
                                        category: (
                                            e.target as HTMLSelectElement
                                        ).value,
                                    })}
                            >
                                {#if r.kind === "asset"}
                                    {#each assetCategories as c}<option
                                            value={c}>{c}</option
                                        >{/each}
                                {:else}
                                    {#each liabilityCategories as c}<option
                                            value={c}>{c}</option
                                        >{/each}
                                {/if}
                            </select>
                        </td>
                        <td class="px-4 py-3 text-right">
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                class="w-40 text-right bg-transparent border rounded-xl px-2 py-1 focus:bg-white"
                                bind:value={r.amount}
                                on:change={(e) =>
                                    updateRow(r.id, {
                                        amount: toAbs(
                                            (e.target as HTMLInputElement)
                                                .value,
                                        ),
                                    })}
                            />
                        </td>
                        <td class="px-4 py-3 text-center">
                            <button
                                class="text-rose-600 hover:text-rose-800"
                                title="Delete"
                                on:click={() => removeRow(r.id)}>✕</button
                            >
                        </td>
                    </tr>
                {/each}
            </tbody>
            <tfoot class="bg-gray-50">
                <tr class="font-semibold">
                    <td class="px-4 py-3" colspan="3">Totals</td>
                    <td class="px-4 py-3 text-right">
                        Assets: {fmt(totalAssets)} · Liabilities: {fmt(
                            totalLiabilities,
                        )}
                    </td>
                    <td class="px-4 py-3"></td>
                </tr>
            </tfoot>
        </table>
    </section>
</div>

<style>
    :global(body) {
        background: #f7fafc;
    }
    /* subtle focus */
    input:focus,
    select:focus,
    button:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
    }
</style>
