# chia-datalayer-mirror-tools

`chia-datalayer-mirror-tools` is a package that simplifies the management of mirrors for your Chia datastore. It provides functionalities to get, add, and delete mirrors for a specific store, configure your settings, and more.

## Installation

Install the package using npm:

```bash
npm install chia-datalayer-mirror-tools
```

## Usage

First, require the module in your project:

```javascript
const MirrorTools = require("chia-datalayer-mirror-tools");
```

You can then utilize the various functions provided by the module to manage your Chia mirrors.

### Configuration

Configure the module with your specific settings:

```javascript
const defaultConfig = require("./defaultConfig"); // Your configuration file
MirrorTools.configure(defaultConfig);
```

Here's the default configuration:

```javascript
module.exports = {
  full_node_host: "https://localhost:8555",
  datalayer_host: "https://localhost:8562",
  wallet_host: "https://localhost:9256",
  certificate_folder_path: "~/.chia/mainnet/config/ssl",
  default_wallet_id: 1,
  default_fee: 300_000_000,
  default_mirror_coin_amount: 300_000_000,
};
```

### Adding a Mirror

Add a mirror to a store:

```javascript
const storeId = "your-store-id";
const url = "https://your-mirror-url";
MirrorTools.addMirror(storeId, url);
```

### Deleting a Mirror

Delete a specific mirror:

```javascript
MirrorTools.deleteMirror(storeId, url);
```

### Checking if a Mirror Exists

Check if a mirror exists for a store:

```javascript
const exists = await MirrorTools.doesMirrorExist(storeId, url);
```

### Get All Owned Mirrors

Get all owned mirrors for a specific store:

```javascript
const mirrors = await MirrorTools.getOwnedMirrors(storeId);
```

### Delete All Owned Mirrors

Delete all owned mirrors for a specific store:

```javascript
await MirrorTools.deleteAllOwnedMirrors(storeId);
```

### Add a Mirror for the Current Host

Add a mirror for the current host:

```javascript
await MirrorTools.addMirrorForCurrentHost(storeId);
```

## Contributing

If you want to contribute to the package, please fork the repository, create a branch for your feature or bug fix, and open a pull request.
