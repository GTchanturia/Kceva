<script>
    /**
     * Random Password Generator Component
     * Generate secure random passwords with customizable options
     */
    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Button from "$lib/components/ui/Button.svelte";

    // Password options
    let passwordLength = 12;
    let includeUppercase = true;
    let includeLowercase = true;
    let includeNumbers = true;
    let includeSymbols = true;
    let excludeSimilar = false;
    let excludeAmbiguous = false;

    // Generated passwords
    let generatedPasswords = [];
    let numberOfPasswords = 1;
    let errorMessage = "";
    let toastMessage = "";

    // Character sets
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const similarChars = "il1Lo0O";
    const ambiguousChars = "{}[]()/\\'\"`~,;.<>";

    // Password strength levels
    const strengthLevels = {
        0: {
            text: "Very Weak",
            color: "text-red-600",
            bg: "bg-red-100",
            border: "border-red-200",
        },
        1: {
            text: "Weak",
            color: "text-orange-600",
            bg: "bg-orange-100",
            border: "border-orange-200",
        },
        2: {
            text: "Fair",
            color: "text-yellow-600",
            bg: "bg-yellow-100",
            border: "border-yellow-200",
        },
        3: {
            text: "Good",
            color: "text-blue-600",
            bg: "bg-blue-100",
            border: "border-blue-200",
        },
        4: {
            text: "Strong",
            color: "text-green-600",
            bg: "bg-green-100",
            border: "border-green-200",
        },
        5: {
            text: "Very Strong",
            color: "text-purple-600",
            bg: "bg-purple-100",
            border: "border-purple-200",
        },
    };

    // Generate character set based on options
    function getCharacterSet() {
        let charset = "";

        if (includeUppercase) charset += uppercase;
        if (includeLowercase) charset += lowercase;
        if (includeNumbers) charset += numbers;
        if (includeSymbols) charset += symbols;

        if (excludeSimilar) {
            charset = charset
                .split("")
                .filter((char) => !similarChars.includes(char))
                .join("");
        }

        if (excludeAmbiguous) {
            charset = charset
                .split("")
                .filter((char) => !ambiguousChars.includes(char))
                .join("");
        }

        return charset;
    }

    // Fisher-Yates shuffle for secure randomization
    function shuffleString(str) {
        let array = str.split("");
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join("");
    }

    // Generate a single password
    function generatePassword() {
        const charset = getCharacterSet();

        if (charset.length === 0) {
            errorMessage = "Please select at least one character type.";
            return "";
        }

        let password = "";

        // Ensure at least one character from each selected type
        if (
            includeUppercase &&
            uppercase.some((char) => charset.includes(char))
        ) {
            const availableUppercase = uppercase
                .split("")
                .filter((char) => charset.includes(char));
            password +=
                availableUppercase[
                    Math.floor(Math.random() * availableUppercase.length)
                ];
        }

        if (
            includeLowercase &&
            lowercase.some((char) => charset.includes(char))
        ) {
            const availableLowercase = lowercase
                .split("")
                .filter((char) => charset.includes(char));
            password +=
                availableLowercase[
                    Math.floor(Math.random() * availableLowercase.length)
                ];
        }

        if (includeNumbers && numbers.some((char) => charset.includes(char))) {
            const availableNumbers = numbers
                .split("")
                .filter((char) => charset.includes(char));
            password +=
                availableNumbers[
                    Math.floor(Math.random() * availableNumbers.length)
                ];
        }

        if (includeSymbols && symbols.some((char) => charset.includes(char))) {
            const availableSymbols = symbols
                .split("")
                .filter((char) => charset.includes(char));
            password +=
                availableSymbols[
                    Math.floor(Math.random() * availableSymbols.length)
                ];
        }

        // Fill the rest of the password length
        for (let i = password.length; i < passwordLength; i++) {
            password += charset[Math.floor(Math.random() * charset.length)];
        }

        // Shuffle the password
        return shuffleString(password);
    }

    // Calculate password strength
    function calculateStrength(password) {
        let score = 0;

        // Length bonus
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (password.length >= 16) score++;

        // Character variety bonus
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        // Penalty for common patterns
        if (/(.)\1{2,}/.test(password)) score--; // Repeated characters
        if (/123|abc|qwe|asd|zxc|password/i.test(password)) score--; // Common sequences

        return Math.max(0, Math.min(5, score));
    }

    // Generate multiple passwords
    function generatePasswords() {
        errorMessage = "";
        generatedPasswords = [];

        if (
            !includeUppercase &&
            !includeLowercase &&
            !includeNumbers &&
            !includeSymbols
        ) {
            errorMessage = "Please select at least one character type.";
            return;
        }

        for (let i = 0; i < numberOfPasswords; i++) {
            const password = generatePassword();
            if (!password) return;

            const strength = calculateStrength(password);
            generatedPasswords.push({
                password,
                strength,
                id: Math.random().toString(36).substr(2, 9),
            });
        }
    }

    // Copy password to clipboard
    async function copyToClipboard(password) {
        try {
            if (typeof navigator !== "undefined" && navigator.clipboard) {
                await navigator.clipboard.writeText(password);
                toastMessage = "Password copied to clipboard!";
                setTimeout(() => (toastMessage = ""), 3000);
            } else {
                toastMessage =
                    "Clipboard API not supported. Please copy manually.";
                setTimeout(() => (toastMessage = ""), 3000);
            }
        } catch (err) {
            toastMessage = "Failed to copy password.";
            setTimeout(() => (toastMessage = ""), 3000);
        }
    }

    // Estimate time to crack
    function estimateCrackTime(password) {
        const charset = getCharacterSet();
        const combinations = Math.pow(charset.length, password.length);
        const guessesPerSecond = 1000000000; // 1 billion guesses per second
        const secondsToCrack = combinations / (2 * guessesPerSecond); // Average case

        if (secondsToCrack < 60) return "Less than a minute";
        if (secondsToCrack < 3600)
            return `${Math.round(secondsToCrack / 60)} minutes`;
        if (secondsToCrack < 86400)
            return `${Math.round(secondsToCrack / 3600)} hours`;
        if (secondsToCrack < 31536000)
            return `${Math.round(secondsToCrack / 86400)} days`;
        if (secondsToCrack < 31536000000)
            return `${Math.round(secondsToCrack / 31536000)} years`;
        return "Centuries";
    }

    // Auto-generate on relevant input changes
    $: if (
        passwordLength ||
        includeUppercase ||
        includeLowercase ||
        includeNumbers ||
        includeSymbols ||
        excludeSimilar ||
        excludeAmbiguous ||
        numberOfPasswords
    ) {
        generatePasswords();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Error Message -->
    {#if errorMessage}
        <Card>
            <div class="p-6 bg-red-50 border border-red-200 text-red-600">
                {errorMessage}
            </div>
        </Card>
    {/if}

    <!-- Toast Notification -->
    {#if toastMessage}
        <div
            class="fixed top-4 right-4 p-4 bg-green-100 text-green-700 rounded-lg shadow-lg"
        >
            {toastMessage}
        </div>
    {/if}

    <!-- Password Generator Options -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Random Password Generator
            </h2>
            <p class="text-gray-600 mb-6">
                Generate secure, random passwords with customizable options.
                Perfect for creating strong passwords for your accounts.
            </p>

            <div class="space-y-6">
                <!-- Password Length and Count -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        type="number"
                        label="Password Length"
                        bind:value={passwordLength}
                        min="4"
                        max="128"
                        step="1"
                        aria-label="Set password length"
                    />
                    <Input
                        type="number"
                        label="Number of Passwords"
                        bind:value={numberOfPasswords}
                        min="1"
                        max="10"
                        step="1"
                        aria-label="Set number of passwords to generate"
                    />
                </div>

                <!-- Character Type Options -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold text-gray-900">
                        Character Types
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label class="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                bind:checked={includeUppercase}
                                class="checkbox checkbox-primary"
                                aria-label="Include uppercase letters"
                            />
                            <span class="text-gray-700"
                                >Uppercase Letters (A-Z)</span
                            >
                        </label>
                        <label class="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                bind:checked={includeLowercase}
                                class="checkbox checkbox-primary"
                                aria-label="Include lowercase letters"
                            />
                            <span class="text-gray-700"
                                >Lowercase Letters (a-z)</span
                            >
                        </label>
                        <label class="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                bind:checked={includeNumbers}
                                class="checkbox checkbox-primary"
                                aria-label="Include numbers"
                            />
                            <span class="text-gray-700">Numbers (0-9)</span>
                        </label>
                        <label class="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                bind:checked={includeSymbols}
                                class="checkbox checkbox-primary"
                                aria-label="Include symbols"
                            />
                            <span class="text-gray-700">Symbols (!@#$%^&*)</span
                            >
                        </label>
                    </div>
                </div>

                <!-- Advanced Options -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold text-gray-900">
                        Advanced Options
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label class="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                bind:checked={excludeSimilar}
                                class="checkbox checkbox-primary"
                                aria-label="Exclude similar characters"
                            />
                            <span class="text-gray-700"
                                >Exclude Similar Characters (i, l, 1, L, o, 0,
                                O)</span
                            >
                        </label>
                        <label class="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                bind:checked={excludeAmbiguous}
                                class="checkbox checkbox-primary"
                                aria-label="Exclude ambiguous characters"
                            />
                            <span class="text-gray-700"
                                >Exclude Ambiguous Characters ({ambiguousChars})</span
                            >
                        </label>
                    </div>
                </div>

                <!-- Generate Button -->
                <div class="text-center">
                    <Button
                        variant="primary"
                        on:click={generatePasswords}
                        aria-label="Generate new passwords"
                    >
                        🔐 Generate New Passwords
                    </Button>
                </div>
            </div>
        </div>
    </Card>

    <!-- Generated Passwords -->
    {#if generatedPasswords.length > 0}
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Generated Passwords
                </h3>
                <div class="space-y-4">
                    {#each generatedPasswords as { password, strength, id }}
                        {@const strengthInfo = strengthLevels[strength]}
                        <div class="p-4 border border-gray-200 rounded-lg">
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center space-x-3">
                                    <span
                                        class="px-2 py-1 text-xs font-medium rounded-full {strengthInfo.bg} {strengthInfo.color} {strengthInfo.border} border"
                                    >
                                        {strengthInfo.text}
                                    </span>
                                    <span class="text-sm text-gray-500">
                                        {password.length} characters
                                    </span>
                                </div>
                                <Button
                                    variant="outline"
                                    on:click={() => copyToClipboard(password)}
                                    aria-label={`Copy password: ${password}`}
                                >
                                    📋 Copy
                                </Button>
                            </div>
                            <div
                                class="font-mono text-lg bg-gray-50 p-3 rounded border break-all"
                            >
                                {password}
                            </div>
                            <div class="mt-2 text-sm text-gray-600">
                                Estimated crack time: {estimateCrackTime(
                                    password,
                                )}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>
    {/if}

    <!-- Password Security Tips -->
    <Card>
        <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
                Password Security Tips
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <div class="flex items-start space-x-3">
                        <span class="text-green-600 text-xl">✅</span>
                        <div>
                            <h4 class="font-semibold text-gray-900">
                                Use Long Passwords
                            </h4>
                            <p class="text-gray-600 text-sm">
                                Aim for at least 12 characters. Longer passwords
                                are exponentially harder to crack.
                            </p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3">
                        <span class="text-green-600 text-xl">✅</span>
                        <div>
                            <h4 class="font-semibold text-gray-900">
                                Mix Character Types
                            </h4>
                            <p class="text-gray-600 text-sm">
                                Include uppercase, lowercase, numbers, and
                                symbols for maximum security.
                            </p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3">
                        <span class="text-green-600 text-xl">✅</span>
                        <div>
                            <h4 class="font-semibold text-gray-900">
                                Use Unique Passwords
                            </h4>
                            <p class="text-gray-600 text-sm">
                                Never reuse passwords across different accounts
                                or services.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="flex items-start space-x-3">
                        <span class="text-red-600 text-xl">❌</span>
                        <div>
                            <h4 class="font-semibold text-gray-900">
                                Avoid Personal Information
                            </h4>
                            <p class="text-gray-600 text-sm">
                                Don't use names, birthdays, addresses, or other
                                personal details.
                            </p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3">
                        <span class="text-red-600 text-xl">❌</span>
                        <div>
                            <h4 class="font-semibold text-gray-900">
                                Avoid Common Patterns
                            </h4>
                            <p class="text-gray-600 text-sm">
                                Stay away from "123456", "password", or keyboard
                                patterns like "qwerty".
                            </p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3">
                        <span class="text-blue-600 text-xl">💡</span>
                        <div>
                            <h4 class="font-semibold text-gray-900">
                                Use a Password Manager
                            </h4>
                            <p class="text-gray-600 text-sm">
                                Consider using a password manager to store and
                                generate unique passwords.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Card>

    <!-- Character Set Information -->
    <Card>
        <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
                Character Set Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-3">
                    <div class="p-3 bg-gray-50 rounded-lg">
                        <h4 class="font-semibold text-gray-900 mb-1">
                            Current Character Set Size
                        </h4>
                        <p class="text-2xl font-bold text-blue-600">
                            {getCharacterSet().length} characters
                        </p>
                    </div>
                    <div class="p-3 bg-gray-50 rounded-lg">
                        <h4 class="font-semibold text-gray-900 mb-1">
                            Possible Combinations
                        </h4>
                        <p class="text-lg font-bold text-green-600">
                            {Math.pow(
                                getCharacterSet().length,
                                passwordLength,
                            ).toExponential(2)}
                        </p>
                    </div>
                </div>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span>Uppercase letters:</span>
                        <span class="font-medium"
                            >{includeUppercase ? "26" : "0"} characters</span
                        >
                    </div>
                    <div class="flex justify-between">
                        <span>Lowercase letters:</span>
                        <span class="font-medium"
                            >{includeLowercase ? "26" : "0"} characters</span
                        >
                    </div>
                    <div class="flex justify-between">
                        <span>Numbers:</span>
                        <span class="font-medium"
                            >{includeNumbers ? "10" : "0"} characters</span
                        >
                    </div>
                    <div class="flex justify-between">
                        <span>Symbols:</span>
                        <span class="font-medium"
                            >{includeSymbols ? symbols.length : "0"} characters</span
                        >
                    </div>
                </div>
            </div>
        </div>
    </Card>
</div>
