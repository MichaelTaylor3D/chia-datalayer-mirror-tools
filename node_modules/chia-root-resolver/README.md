# Chia Root Resolver

Chia Root Resolver is a simple module designed to resolve the path of the Chia Blockchain in your system. This module is useful for creating scripts or applications that interact with Chia Blockchain's files.

## Installation

Using npm:

```bash
npm install chia-root-resolver
```

## Usage

Here is a basic example on how to use this module:

```javascript
const { getChiaRoot } = require('chia-root-resolver');

console.log(getChiaRoot()); // Outputs: The path to your Chia Blockchain root.
```

This module provides the `getChiaRoot` function, which returns the root directory of the Chia Blockchain in your system. If the `CHIA_ROOT` environment variable is set, `getChiaRoot` returns the absolute path specified by this variable. If `CHIA_ROOT` isn't set, `getChiaRoot` assumes that Chia Blockchain's root directory is `~/.chia/mainnet` and returns the absolute path to this directory.

This function uses memoization, meaning it calculates the root directory's path the first time you call it and then returns the cached path in subsequent calls. This design improves performance when you call `getChiaRoot` multiple times.

## License

MIT License. See the `LICENSE` file for more details.
