<script>
    let n = "";
    let r = "";
    let result = null;
    let error = "";

    function factorial(num) {
        if (num < 0) return NaN;
        let fact = 1;
        for (let i = 2; i <= num; i++) fact *= i;
        return fact;
    }

    function calculatePermutation() {
        error = "";
        result = null;

        const nNum = parseInt(n);
        const rNum = parseInt(r);

        if (isNaN(nNum) || isNaN(rNum)) {
            error = "Please enter valid numbers";
            return;
        }
        if (rNum > nNum) {
            error = "r cannot be greater than n";
            return;
        }

        result = factorial(nNum) / factorial(nNum - rNum);
    }
</script>

<div class="calculator">
    <h2>Permutation Calculator 🔀</h2>
    <p class="description">Calculate P(n, r) = n! / (n - r)!</p>

    <div>
        <input type="number" bind:value={n} placeholder="n" min="0" />
        <input type="number" bind:value={r} placeholder="r" min="0" />
    </div>

    <button on:click={calculatePermutation}>Calculate</button>

    {#if error}
        <p class="error">{error}</p>
    {/if}

    {#if result !== null}
        <p class="result">Result: {result}</p>
    {/if}
</div>

<style>
    .calculator {
        max-width: 400px;
        margin: 3rem auto;
        padding: 2rem;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        text-align: center;
    }

    h2 {
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
    }

    p.description {
        font-size: 0.95rem;
        color: #666;
        margin-bottom: 1.5rem;
    }

    input {
        width: 80px;
        padding: 0.5rem;
        margin: 0.3rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 1rem;
        transition: 0.2s;
    }

    input:focus {
        border-color: #4f46e5;
        outline: none;
        box-shadow: 0 0 5px rgba(79, 70, 229, 0.3);
    }

    button {
        padding: 0.55rem 1.2rem;
        margin-top: 0.5rem;
        background: #4f46e5;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        transition: 0.2s;
    }

    button:hover {
        background: #3730a3;
    }

    .error {
        color: #e11d48;
        margin-top: 0.8rem;
    }

    .result {
        margin-top: 1rem;
        font-size: 1.2rem;
        background: #f3f4f6;
        padding: 0.8rem;
        border-radius: 8px;
        font-weight: bold;
        color: #111827;
    }

    @media (max-width: 480px) {
        input {
            width: 60px;
            font-size: 0.9rem;
        }
        button {
            font-size: 0.9rem;
        }
    }
</style>
