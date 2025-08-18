<script lang="ts">
    let base: number | "" = "";
    let exponent: number | "" = "";
    let result: string | null = null;
    let steps: string[] = [];
    let error: string | null = null;

    function formatResult(num: number): string {
        return num.toLocaleString("de-DE");
    }

    function calculate() {
        result = null;
        steps = [];
        error = null;

        if (base === "" || exponent === "") {
            error = "Please enter both base and exponent.";
            return;
        }

        const b = Number(base);
        const e = Number(exponent);

        if (b === 0 && e <= 0) {
            error = "0 cannot be raised to 0 or a negative exponent.";
            return;
        }

        const res = Math.pow(b, e);
        result = formatResult(res);

        steps.push(`Step 1: Base = ${b}, Exponent = ${e}`);
        if (Number.isInteger(e) && e >= 0) {
            steps.push(`Step 2: Multiply base by itself ${e} time(s)`);
            let calc = 1;
            for (let i = 1; i <= e; i++) {
                calc *= b;
                steps.push(
                    `After multiplying ${i} time(s): ${formatResult(calc)}`,
                );
            }
        } else if (e < 0) {
            steps.push(`Step 2: Convert negative exponent: b^(-e) = 1 / b^e`);
            steps.push(
                `Step 3: Calculate 1 / (${b} ^ ${-e}) = ${formatResult(res)}`,
            );
        } else {
            steps.push(
                `Step 2: Fractional exponent: result = ${formatResult(res)}`,
            );
        }
    }

    function clearForm() {
        base = exponent = "";
        result = null;
        steps = [];
        error = null;
    }

    function copyResult() {
        if (result) navigator.clipboard.writeText(result);
    }
</script>

<div class="calculator-container">
    <h2>⚡ Exponent Calculator</h2>
    <p class="subtitle">
        Compute <strong>base<sup>exponent</sup></strong> with step-by-step guidance
    </p>

    <div class="inputs">
        <div class="input-group">
            <input type="number" bind:value={base} placeholder=" " />
            <label>Base</label>
        </div>
        <div class="input-group">
            <input type="number" bind:value={exponent} placeholder=" " />
            <label>Exponent</label>
        </div>
    </div>

    <div class="buttons">
        <button class="calculate-btn" on:click={calculate}>Calculate</button>
        <button class="clear-btn" on:click={clearForm}>Clear</button>
    </div>

    {#if error}
        <p class="error">{error}</p>
    {/if}

    {#if result}
        <div class="result-container">
            <p class="result">{result}</p>
            <button class="copy-btn" on:click={copyResult}>📋 Copy</button>
        </div>

        <div class="steps">
            <h4>Steps:</h4>
            <ol>
                {#each steps as step}
                    <li>{step}</li>
                {/each}
            </ol>
        </div>
    {/if}
</div>

<style>
    .calculator-container {
        max-width: 700px;
        margin: 3rem auto;
        padding: 2.5rem;
        background: #f8fafc;
        border-radius: 20px;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        font-family: "Inter", sans-serif;
        transition: all 0.3s;
    }

    h2 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 0.5rem;
        color: #111827;
    }

    .subtitle {
        text-align: center;
        color: #6b7280;
        margin-bottom: 2rem;
        font-size: 1rem;
    }

    .inputs {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    .input-group {
        position: relative;
        display: flex;
        flex-direction: column-reverse;
    }

    .input-group input {
        padding: 0.8rem 0.75rem;
        border-radius: 12px;
        border: 1px solid #d1d5db;
        font-size: 1rem;
        outline: none;
        background: #ffffff;
        transition: all 0.3s;
    }

    .input-group input:focus {
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    }

    .input-group label {
        position: absolute;
        top: 0.5rem;
        left: 0.75rem;
        font-size: 0.85rem;
        color: #6b7280;
        pointer-events: none;
        transition: all 0.2s;
    }

    .input-group input:focus + label,
    .input-group input:not(:placeholder-shown) + label {
        top: -0.6rem;
        left: 0.7rem;
        font-size: 0.75rem;
        background: #f8fafc;
        padding: 0 0.25rem;
        color: #6366f1;
    }

    .buttons {
        display: flex;
        gap: 1.2rem;
        justify-content: center;
        margin-bottom: 1.5rem;
    }

    button {
        padding: 0.7rem 1.8rem;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 12px;
        cursor: pointer;
        border: none;
        transition: all 0.2s;
    }

    .calculate-btn {
        background: #6366f1;
        color: white;
    }
    .calculate-btn:hover {
        background: #4f46e5;
    }

    .clear-btn {
        background: #ef4444;
        color: white;
    }
    .clear-btn:hover {
        background: #b91c1c;
    }

    .error {
        color: #ef4444;
        font-weight: 600;
        text-align: center;
        margin-top: 0.5rem;
    }

    .result-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        overflow-x: auto;
        padding: 0.7rem;
        background: #e0f2fe;
        border-radius: 12px;
        margin-bottom: 1rem;
    }

    .result-container .result {
        font-weight: 700;
        font-size: 1.3rem;
        white-space: nowrap;
        color: #0369a1;
    }

    .copy-btn {
        background: #10b981;
        color: white;
        border: none;
        padding: 0.3rem 0.8rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s;
    }

    .copy-btn:hover {
        background: #059669;
    }

    .steps {
        background: #f9fafb;
        padding: 1.2rem;
        border-radius: 15px;
        font-size: 0.95rem;
        color: #374151;
    }

    .steps h4 {
        margin-bottom: 0.5rem;
        font-weight: 600;
    }

    .steps li {
        margin-bottom: 0.25rem;
    }

    @media (max-width: 768px) {
        .calculator-container {
            padding: 2rem;
        }
        .inputs {
            grid-template-columns: 1fr;
        }
    }
</style>
