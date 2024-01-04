# Terms List Block

Thank you for using the Terms List Block plugin for WordPress. This plugin adds a "Terms List" block to your WordPress, showing a list of terms for a given taxonomy, or the taxonomy in use when used in a taxonomy archive template.

This repository is intended for development and contributions. To download the plugin directly to your WordPress, grab a release from this repository and install the ZIP file via the "Plugins > Add New Plugin" screen in your WordPress.

The remainder of this README file speaks to how to develop this plugin.

## Requirements

This plugin requires Node and NPM for development. If you don't have these tools, here is a short guide to get them installed.

To install Node.js and NPM (Node Package Manager) on your system, follow these steps:

1. **Node.js Installation:**
   - Visit the [Node.js official website](https://nodejs.org/).
   - Download the installer for your operating system (Windows, macOS, or Linux).
   - Run the installer and follow the on-screen instructions to install Node.js on your machine.

2. **Verify Installation:**
   - Open a command prompt or terminal.
   - Type `node -v` and press Enter. This command will display the installed Node.js version.
   - Similarly, type `npm -v` and press Enter to check the installed NPM version.

3. **Updating NPM (optional but recommended):**
   - To update NPM to the latest version, use the command `npm install -g npm@latest`.

Once Node.js and NPM are successfully installed, you can utilize NPM to manage packages, dependencies, and build processes within your WordPress plugin or any other project.

## Development

To begin development, clone this repository to your local machine.
Once cloned, open your Terminal and navigate to the newly cloned directory.

When getting started, run:

```npm install```

Once installed, run the following command to begin the build script while you code:

```npm start```

Additional scripts available include:

`build`: Build the plugin.
`format`: Adjust code formatting.
`lint:css`: Lint the plugin's CSS code.
`lint:js`: Lint the plugin's Javascript code.
`packages-update`: Update all NPM packages to the latest versions.
`plugin-zip`: Create a plugin ZIP file for distribution.
`start`: Run the build process and have Webpack watch for changes to JavaScript and CSS.
