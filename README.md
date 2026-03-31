# Useful CLI Tool

A modular and extensible CLI tool written in TypeScript.

## Getting Started

1. Install dependencies: `npm install`
2. Build: `npm run build`
3. Run tests: `npm test`
4. Run CLI: `node dist/cli.js --help`

## Commands

- `hello [name]`: prints greeting message.
- `list`: shows available commands.
- `calc <number> <operator> <number>`: performs basic arithmetic operations (+, -, *, /).

### Examples

```bash
# Basic calculations
node dist/cli.js calc 5 "+" 3      # Output: 5 + 3 = 8
node dist/cli.js calc 10 "-" 4     # Output: 10 - 4 = 6
node dist/cli.js calc 6 "*" 7      # Output: 6 * 7 = 42
node dist/cli.js calc 15 "/" 3     # Output: 15 / 3 = 5

# Decimal numbers
node dist/cli.js calc 3.5 "+" 2.1  # Output: 3.5 + 2.1 = 5.6
```

**Note for Windows users:** Some operators like `/` may need to be quoted to avoid command line interpretation.

## Notes

This project is configured as an ESM package and uses `.js` extensions for runtime imports in compiled output.

