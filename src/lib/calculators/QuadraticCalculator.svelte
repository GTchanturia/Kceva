<script lang="ts">
    let a: number | "" = "";
    let b: number | "" = "";
    let c: number | "" = "";

    let roots: string[] = [];
    let steps: string[] = [];
    let error: string | null = null;
    let D: number | null = null; // Discriminant reactive variable

    const formatNum = (num: number) =>
        Number.isInteger(num) ? num.toString() : num.toFixed(4);

    function solveQuadratic() {
        roots = [];
        steps = [];
        error = null;
        D = null;

        if (a === "" || b === "" || c === "") {
            error = "Please enter all coefficients (a, b, c).";
            return;
        }

        if (Number(a) === 0) {
            if (Number(b) === 0) {
                error =
                    Number(c) === 0
                        ? "Infinite solutions (0=0)"
                        : "No solution";
            } else {
                const root = -Number(c) / Number(b);
                roots = [formatNum(root)];
                steps.push(
                    `Linear equation: ${b}x + ${c} = 0 → x = ${formatNum(root)}`,
                );
            }
            return;
        }

        const A = Number(a);
        const B = Number(b);
        const C = Number(c);

        D = B * B - 4 * A * C;
        steps.push(
            `Discriminant: D = b² - 4ac = ${B}² - 4 * ${A} * ${C} = ${formatNum(D)}`,
        );

        if (D > 0) {
            const sqrtD = Math.sqrt(D);
            const x1 = (-B + sqrtD) / (2 * A);
            const x2 = (-B - sqrtD) / (2 * A);
            roots = [formatNum(x1), formatNum(x2)];
            steps.push(
                `Two real roots: x₁ = ${formatNum(x1)}, x₂ = ${formatNum(x2)}`,
            );
        } else if (D === 0) {
            const x = -B / (2 * A);
            roots = [formatNum(x)];
            steps.push(`One real root (double root): x = ${formatNum(x)}`);
        } else {
            const real = -B / (2 * A);
            const imag = Math.sqrt(-D) / (2 * A);
            roots = [
                `${formatNum(real)} + ${formatNum(imag)}i`,
                `${formatNum(real)} - ${formatNum(imag)}i`,
            ];
            steps.push(`Two complex roots: x₁ = ${roots[0]}, x₂ = ${roots[1]}`);
        }
    }

    function clearForm() {
        a = b = c = "";
        roots = [];
        steps = [];
        error = null;
        D = null;
    }
</script>

<div class="solver-container">
    <h2>🧮 Quadratic Equation Solver</h2>
    <p class="subtitle">Equation form: <strong>ax² + bx + c = 0</strong></p>

    <div class="inputs">
        <div class="input-group">
            <label>a</label>
            <input type="number" bind:value={a} placeholder="Coefficient a" />
        </div>
        <div class="input-group">
            <label>b</label>
            <input type="number" bind:value={b} placeholder="Coefficient b" />
        </div>
        <div class="input-group">
            <label>c</label>
            <input type="number" bind:value={c} placeholder="Coefficient c" />
        </div>
    </div>

    <div class="buttons">
        <button class="solve-btn" on:click={solveQuadratic}>Solve</button>
        <button class="clear-btn" on:click={clearForm}>Clear</button>
    </div>

    {#if error}
        <p class="error">{error}</p>
    {/if}

    {#if roots.length}
        <div class="results">
            <p class="roots {D !== null && D < 0 ? 'complex' : 'real'}">
                Roots: {roots.join(", ")}
            </p>
            <div class="steps">
                <h4>Steps:</h4>
                <ol>
                    {#each steps as step}
                        <li>{step}</li>
                    {/each}
                </ol>
            </div>
        </div>
    {/if}
</div>

<style>
    /* Styles unchanged from previous version */
    .solver-container {
        max-width: 520px;
        margin: 2rem auto;
        padding: 2rem;
        background: #ffffff;
        border-radius: 15px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        font-family: "Inter", sans-serif;
    }

    h2 {
        text-align: center;
        font-size: 1.8rem;
        margin-bottom: 0.2rem;
    }

    .subtitle {
        text-align: center;
        color: #555;
        margin-bottom: 1.5rem;
    }

    .inputs {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .input-group {
        display: flex;
        flex-direction: column;
    }

    .input-group label {
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: #333;
    }

    input[type="number"] {
        padding: 0.5rem;
        border-radius: 10px;
        border: 1px solid #ddd;
        font-size: 1rem;
        outline: none;
        transition: all 0.2s;
    }

    input[type="number"]:focus {
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        background: #f9fafb;
    }

    .buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-bottom: 1rem;
    }

    button {
        padding: 0.6rem 1.5rem;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 10px;
        cursor: pointer;
        border: none;
        transition: all 0.2s;
    }

    .solve-btn {
        background: #10b981;
        color: white;
    }
    .solve-btn:hover {
        background: #059669;
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

    .results {
        margin-top: 1rem;
    }

    .roots {
        font-weight: 700;
        font-size: 1.2rem;
        text-align: center;
        padding: 0.5rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        background: #f3f4f6;
    }

    .roots.real {
        color: #10b981;
    }

    .roots.complex {
        color: #f59e0b;
    }

    .steps {
        background: #f9fafb;
        padding: 1rem;
        border-radius: 10px;
        font-size: 0.95rem;
        color: #333;
    }

    .steps h4 {
        margin-bottom: 0.5rem;
        font-weight: 600;
    }

    .steps li {
        margin-bottom: 0.25rem;
    }

    @media (max-width: 480px) {
        .inputs {
            grid-template-columns: 1fr;
        }
    }
</style>
