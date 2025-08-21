<script>
    import { onMount } from "svelte";

    let monthlyBudget = 1000;
    let expenses = [];
    let newExpense = { name: "", amount: "", category: "Other" };

    // Categories
    const categories = [
        "Food & Groceries",
        "Rent / Mortgage",
        "Utilities (Water, Electricity, Gas)",
        "Internet & Phone",
        "Transport (Fuel, Public Transit, Taxi)",
        "Car (Insurance, Maintenance, Loan)",
        "Health (Insurance, Medicines, Doctor)",
        "Education (Tuition, Books, Courses)",
        "Childcare & Family",
        "Entertainment (Movies, Games, Events)",
        "Shopping (Clothes, Gadgets, Home)",
        "Dining Out & Cafes",
        "Travel & Vacation",
        "Fitness & Sports (Gym, Equipment)",
        "Insurance (Life, Home, Other)",
        "Taxes",
        "Savings",
        "Investment (Stocks, Crypto, Bonds)",
        "Charity & Donations",
        "Subscriptions (Netflix, Spotify, etc.)",
        "Personal Care (Salon, Cosmetics)",
        "Pets (Food, Vet, Toys)",
        "Emergency Fund",
        "Gifts & Celebrations",
        "Other",
    ];
    // Load from localStorage
    onMount(() => {
        const savedBudget = localStorage.getItem("budget");
        const savedExpenses = localStorage.getItem("expenses");
        if (savedBudget) monthlyBudget = JSON.parse(savedBudget);
        if (savedExpenses) expenses = JSON.parse(savedExpenses);
    });

    // Save to localStorage
    function saveData() {
        localStorage.setItem("budget", JSON.stringify(monthlyBudget));
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    // Add new expense
    function addExpense() {
        if (!newExpense.name || !newExpense.amount) return;
        expenses = [
            ...expenses,
            {
                ...newExpense,
                amount: parseFloat(newExpense.amount),
                id: Date.now(),
            },
        ];
        newExpense = { name: "", amount: "", category: "Other" };
        saveData();
    }

    // Delete expense
    function deleteExpense(id) {
        expenses = expenses.filter((e) => e.id !== id);
        saveData();
    }

    // Totals
    $: totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    $: remaining = monthlyBudget - totalExpenses;
    $: percentUsed = Math.min((totalExpenses / monthlyBudget) * 100, 100);
</script>

<div class="max-w-3xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-center mb-6">💼 Budget Planner</h1>

    <!-- Budget Input -->
    <div class="bg-white shadow-md rounded-2xl p-6 mb-6">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label class="font-semibold">Monthly Budget (€)</label>
        <input
            type="number"
            bind:value={monthlyBudget}
            on:change={saveData}
            class="mt-2 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        <!-- Progress Bar -->
        <div class="mt-4">
            <div class="flex justify-between text-sm font-medium mb-1">
                <span>Spent: €{totalExpenses}</span>
                <span>Remaining: €{remaining}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-4">
                <!-- svelte-ignore element_invalid_self_closing_tag -->
                <div
                    class={`h-4 rounded-full transition-all duration-500 ${
                        percentUsed < 75
                            ? "bg-green-500"
                            : percentUsed < 100
                              ? "bg-yellow-500"
                              : "bg-red-500"
                    }`}
                    style="width: {percentUsed}%"
                />
            </div>
        </div>
    </div>

    <!-- Add Expense -->
    <div class="bg-white shadow-md rounded-2xl p-6 mb-6">
        <h2 class="text-xl font-bold mb-4">➕ Add Expense</h2>
        <div class="grid md:grid-cols-3 gap-3">
            <input
                placeholder="Name"
                bind:value={newExpense.name}
                class="p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
                placeholder="Amount"
                type="number"
                bind:value={newExpense.amount}
                class="p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <select
                bind:value={newExpense.category}
                class="p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            >
                {#each categories as cat}
                    <option>{cat}</option>
                {/each}
            </select>
        </div>
        <button
            on:click={addExpense}
            class="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-lg shadow-md transition"
        >
            Add Expense
        </button>
    </div>

    <!-- Expense List -->
    <div class="bg-white shadow-md rounded-2xl p-6">
        <h2 class="text-xl font-bold mb-4">📊 Expenses</h2>

        {#if expenses.length === 0}
            <p class="text-gray-500">No expenses yet.</p>
        {:else}
            <ul class="space-y-3">
                {#each expenses as e (e.id)}
                    <li
                        class="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
                    >
                        <div>
                            <span class="font-semibold">{e.name}</span>
                            <span class="text-sm text-gray-500"
                                >({e.category})</span
                            >
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-medium">€{e.amount}</span>
                            <button
                                on:click={() => deleteExpense(e.id)}
                                class="text-red-500 hover:text-red-700 font-bold"
                            >
                                ✕
                            </button>
                        </div>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</div>

<style>
</style>
