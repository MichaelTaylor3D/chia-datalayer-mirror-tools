# Chia Config Loader

`chia-config-loader` is a simple utility that allows you to load Chia's configuration file in your project. This is the file thats located at /<your-chia-root>/config/config.yaml leverages memoization to optimize loading the configuration, ensuring that the file is read only once during the lifetime of your application.

If you have a system variable called CHIA_ROOT it will use this to locate the file. Otherwise it will default to `~/.chia/mainnet`

## Installation

You can install `chia-config-loader` using npm:

```bash
npm install chia-config-loader
```

## Usage

After importing `chia-config-loader` into your project, you can easily access Chia's configuration using the provided `getChiaConfig` function.

### Example

Here's how you can use `chia-config-loader` in your code:

```javascript
const { getChiaConfig } = require("chia-config-loader");

// Fetch Chia's configuration
const config = getChiaConfig();

// Access any desired configuration property
console.log(config.data_layer.host_port);
```

### Function

#### `getChiaConfig()`

Returns the Chia configuration object. The result is memoized, so subsequent calls to `getChiaConfig` return the same object without re-reading the file.

## Dependencies

This module depends on `chia-root-resolver` to find the root folder of the Chia blockchain software. Ensure that you have this package in your project if you're going to use `chia-config-loader`.

## License

MIT