# Gemini's Notes for "Lecter"

This document contains notes and observations about the Decker project to aid in the development of Lecter, an Electron-based wrapper for the JavaScript version of Decker.

## Project Goal

The primary goal is to wrap the existing JavaScript implementation of Decker, found in the `decker/js` directory, into a standalone desktop application using Electron. The new application will be named "Lecter".

## Core Components

*   **Main Application:** The web version of Decker is located at `decker/js/decker.html`. This is the main entry point for the Electron application to load.
*   **Application Logic:** The core logic is in `decker/js/decker.js`. It handles rendering, user interaction, and the Lil scripting environment.
*   **Scripting Language (Lil):** Decker uses a custom scripting language named "Lil". The interpreter is implemented in JavaScript at `decker/js/lil.js`. Scripts are embedded within `.deck` files.
*   **File Format (`.deck`):** Decker's documents are text-based `.deck` files. These files define a stack of cards and their contents, including widgets (buttons, fields, canvases) and associated Lil scripts. The format appears to be human-readable and structured with curly braces `{}`.
*   **Examples:** The `decker/examples/` directory contains numerous `.deck` files that serve as excellent references for Decker's capabilities, from simple GUIs to games like Breakout and Sokoban.

## How to Run

The JavaScript version of Decker, `decker.html`, is a build artifact. To generate it, you must run `make web-decker` from within the `decker` directory. This will concatenate the necessary JavaScript files (`decker.js`, `lil.js`, etc.) into the final `decker.html` file.

For the Lecter application, this generated `decker.html` is the file that the main Electron process will need to load into a `BrowserWindow`.

I will remember to review this document after implementing each feature and update it with any new facts I learn about the project.

## Key Files & Directories

*   `decker/js/decker.html`: The HTML shell for the web application.
*   `decker/js/decker.js`: The main application logic.
*   `decker/js/lil.js`: The Lil scripting language interpreter.
*   `decker/js/danger.js`: Contains potentially non-portable or unsafe APIs. This might be relevant for future work if we need to extend functionality beyond the sandbox.
*   `decker/c/`: Contains a C-language implementation of Decker, which is not directly relevant for the Electron wrapper task but provides context about the project's scope.

## Future Considerations

*   **File System Access:** The web version of Decker uses browser-based file dialogs. The Electron version could be enhanced to provide more direct file system access, but this should be done carefully to maintain security and compatibility.
*   **`danger.js`:** This file implies an "escape hatch" for more powerful scripting. If advanced features are needed, this is the place to look, but it will likely break portability with the web version.
*   **Cross-Platform:** Electron is cross-platform, but any use of `danger.js` or native Node.js modules could introduce platform-specific code that needs to be managed.
