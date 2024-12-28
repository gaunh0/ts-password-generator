#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import clipboardy from 'clipboardy';

const lettersLower = 'abcdefghjkmnpqrstuvwxyz'; // Exclude i, l, o
const lettersUpper = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Exclude I, L, O
const numbers = '23456789'; // Exclude 0, 1
const symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

/**
 * Generate a random password with the given options.
 */
/**
 * Generates a random password based on the given options.
 * @param length - The desired length of the password.
 * @param options - An object containing various password generation options:
 *   - includeNumbers: Whether to include numbers in the password.
 *   - includeLowercase: Whether to include lowercase letters.
 *   - includeUppercase: Whether to include uppercase letters.
 *   - includeSymbols: Whether to include symbols.
 *   - beginWithLetter: Whether the password must begin with a letter.
 *   - noDuplicateCharacters: Whether to avoid duplicate characters.
 *   - noSequentialCharacters: Whether to avoid sequential characters (e.g., "abc" or "123").
 * @returns The generated password as a string.
 */
function generatePassword(
    length: number,
    options: {
        includeNumbers: boolean;
        includeLowercase: boolean;
        includeUppercase: boolean;
        includeSymbols: boolean;
        beginWithLetter: boolean;
        noDuplicateCharacters: boolean;
        noSequentialCharacters: boolean;
    }
): string {
    let characters = ''; // Stores the allowed character set based on options.

    // Build the character set based on the options.
    if (options.includeLowercase) characters += lettersLower; // Add lowercase letters if allowed.
    if (options.includeUppercase) characters += lettersUpper; // Add uppercase letters if allowed.
    if (options.includeNumbers) characters += numbers; // Add numbers if allowed.
    if (options.includeSymbols) characters += symbols; // Add symbols if allowed.

    // Throw an error if no character sets are selected.
    if (characters.length === 0) {
        throw new Error('No character sets selected!');
    }

    let password = ''; // Stores the final generated password.
    const usedChars = new Set<string>(); // Keeps track of characters already used (to avoid duplicates).

    // Generate the password character by character.
    for (let i = 0; i < length; i++) {
        let char = '';

        // Ensure no duplicate characters if the option is selected.
        do {
            char = characters.charAt(Math.floor(Math.random() * characters.length)); // Pick a random character.
        } while (options.noDuplicateCharacters && usedChars.has(char)); // Retry if duplicates are not allowed.

        // Check for sequential characters if the option is selected.
        if (options.noSequentialCharacters && i > 0) {
            const lastChar = password.charAt(password.length - 1); // Get the last character in the password.
            const charCodeDiff = char.charCodeAt(0) - lastChar.charCodeAt(0); // Calculate the difference in char codes.
            if (Math.abs(charCodeDiff) === 1) continue; // Skip if the character is sequential.
        }

        // Add the character to the password and mark it as used (if avoiding duplicates).
        if (options.noDuplicateCharacters) usedChars.add(char);
        password += char;
    }

    // Ensure the password begins with a letter if the option is selected.
    if (options.beginWithLetter && !/^[a-zA-Z]/.test(password)) {
        const letterSet = (options.includeLowercase ? lettersLower : '') + (options.includeUppercase ? lettersUpper : '');
        // If no letters are available, throw an error.
        if (letterSet.length === 0) {
            throw new Error('No letters available to begin the password!');
        }
        // Replace the first character with a random letter.
        password = letterSet.charAt(Math.floor(Math.random() * letterSet.length)) + password.slice(1);
    }

    return password; // Return the final password.
}


// Prompt user for options using Inquirer
inquirer
    .prompt([
        {
            type: 'number',
            name: 'length',
            message: 'Enter the length of the password:',
            default: 12,
            validate: (input: number | undefined) => {
                if (typeof input === 'number' && input > 0) {
                    return true;
                }
                return 'Length must be a positive number';
            },
        },
        {
            type: 'confirm',
            name: 'includeNumbers',
            message: 'Include numbers?',
            default: true,
        },
        {
            type: 'confirm',
            name: 'includeLowercase',
            message: 'Include lowercase characters?',
            default: true,
        },
        {
            type: 'confirm',
            name: 'includeUppercase',
            message: 'Include uppercase characters?',
            default: true,
        },
        {
            type: 'confirm',
            name: 'includeSymbols',
            message: 'Include symbols?',
            default: false,
        },
        {
            type: 'confirm',
            name: 'beginWithLetter',
            message: 'Begin with a letter?',
            default: true,
        },
        {
            type: 'confirm',
            name: 'noDuplicateCharacters',
            message: 'No duplicate characters?',
            default: false,
        },
        {
            type: 'confirm',
            name: 'noSequentialCharacters',
            message: 'No sequential characters?',
            default: false,
        },
    ])
    .then((answers) => {
        try {
            const password = generatePassword(answers.length, answers);
            console.log(`Generated password: ${chalk.green(password)}`);
            clipboardy.writeSync(password);

        } catch (error) {
            console.error('Error:', error);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
