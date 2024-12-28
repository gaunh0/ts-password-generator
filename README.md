
# Password Generator

A customizable password generator written in TypeScript. It allows users to generate secure and flexible passwords with various options such as avoiding duplicate characters, excluding sequential characters, and ensuring specific character types are included.

## Features

- **Include Numbers**: Add numbers (e.g., `123456`) to the password.
- **Include Lowercase Characters**: Add lowercase letters (e.g., `abcxyz`).
- **Include Uppercase Characters**: Add uppercase letters (e.g., `ABCXYZ`).
- **Begin With a Letter**: Ensure the password starts with a letter (not a number or symbol).
- **Include Symbols**: Add special characters (e.g., `!@#$%^&*()`).
- **No Similar Characters**: Avoid visually similar characters like `i`, `I`, `l`, `1`, `o`, `0`.
- **No Duplicate Characters**: Prevent the same character from appearing multiple times.
- **No Sequential Characters**: Avoid consecutive sequences like `abc`, `789`, etc.
- **Clipboard Integration**: Automatically copy the generated password to your clipboard.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/password-generator.git
   cd password-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## Usage

1. Run the CLI:
   ```bash
   npm start
   ```

2. Follow the interactive prompts to generate a password:
   ```
   ? Enter the length of the password: 16
   ? Include numbers? Yes
   ? Include lowercase characters? Yes
   ? Include uppercase characters? Yes
   ? Include symbols? No
   ? Begin with a letter? Yes
   ? No duplicate characters? Yes
   ? No sequential characters? No
   ```

3. The generated password will be displayed in the terminal and automatically copied to your clipboard:
   ```
   Generated password: A5$zJ9q!xT
   Password copied to clipboard! You can now paste it anywhere.
   ```

## Options

| Option                 | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| **Length**             | Length of the generated password.                                          |
| **Include Numbers**    | Add numbers (e.g., `123456`).                                              |
| **Include Lowercase**  | Add lowercase letters (e.g., `abcxyz`).                                    |
| **Include Uppercase**  | Add uppercase letters (e.g., `ABCXYZ`).                                    |
| **Include Symbols**    | Add special characters (e.g., `!@#$%^&*()`).                               |
| **Begin With a Letter**| Ensure the password starts with a letter.                                  |
| **No Duplicate Characters** | Prevent the same character from appearing multiple times.             |
| **No Sequential Characters**| Avoid consecutive sequences like `abc`, `789`.                       |

## Development

1. To modify the source code, edit files in the `src` directory.
2. Compile the code:
   ```bash
   npm run build
   ```
3. Run the CLI:
   ```bash
   node dist/cli.js
   ```

## Dependencies

- [TypeScript](https://www.typescriptlang.org/)
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) - For interactive CLI prompts.
- [Clipboardy](https://github.com/sindresorhus/clipboardy) - For copying passwords to the clipboard.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Author

Developed by [gaunh0](https://github.com/gaunh0).
