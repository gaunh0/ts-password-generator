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
    let characters = '';
    if (options.includeLowercase) characters += lettersLower;
    if (options.includeUppercase) characters += lettersUpper;
    if (options.includeNumbers) characters += numbers;
    if (options.includeSymbols) characters += symbols;

    if (characters.length === 0) {
        throw new Error('No character sets selected!');
    }

    let password = '';
    const usedChars = new Set<string>();

    for (let i = 0; i < length; i++) {
        let char = '';
        do {
            char = characters.charAt(Math.floor(Math.random() * characters.length));
        } while (
            options.noDuplicateCharacters && usedChars.has(char)
        );

        if (options.noSequentialCharacters && i > 0) {
            const lastChar = password.charAt(password.length - 1);
            const charCodeDiff = char.charCodeAt(0) - lastChar.charCodeAt(0);
            if (Math.abs(charCodeDiff) === 1) continue; // Skip sequential characters
        }

        if (options.noDuplicateCharacters) usedChars.add(char);
        password += char;
    }

    // Ensure the password begins with a letter if required
    if (options.beginWithLetter && !/^[a-zA-Z]/.test(password)) {
        const letterSet = (options.includeLowercase ? lettersLower : '') +
            (options.includeUppercase ? lettersUpper : '');
        if (letterSet.length === 0) {
            throw new Error('No letters available to begin the password!');
        }
        password = letterSet.charAt(Math.floor(Math.random() * letterSet.length)) + password.slice(1);
    }

    return password;
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
