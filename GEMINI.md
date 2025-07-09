# Decker CLI Learnings

## Immediate Mode GUI
Decker utilizes an immediate-mode GUI system. This means that UI elements are drawn and their interactions handled on every frame. Direct manipulation of global state variables is how the UI is controlled.

## Key State Variables for UI Control
- `dr.color`: A boolean flag that controls whether the drawing mode is in color (1) or monochrome (0).
- `ev.hidemenu`: A boolean flag that controls the visibility of the drawing toolbars. Setting it to `0` makes the toolbars visible, while `1` hides them.
- `toolbars_enable`: This appears to be a higher-level flag that directly controls the visibility of the toolbars. Setting it to `1` enables them. It also triggers a `resize()` operation, which is crucial for the UI to re-render correctly after changes to toolbar visibility.
- `mark_dirty()`: This function is essential to call after modifying any UI-related state to signal that the display needs to be redrawn.
- `resize()`: This function forces a re-render of the UI and in particularly important when layout-affecting changes (like toolbar visibility) occur.

## Menu Structure
Decker's menus are dynamically built within the `mainloop` function.
- The "Toolbars" option is found under the "Drawing" menu, which is only visible when the application is in "draw" mode.
- The "Color" option is located under the "Style" menu.

## Electron Integration
To interact with Decker's internal state from an Electron wrapper, the `mainWindow.webContents.executeJavaScript()` method is used. This allows for direct execution of JavaScript code within the web content of the Electron window. The `did-finish-load` event of `mainWindow.webContents` is a suitable point to inject initial setup scripts, such as enabling toolbars and color mode by default.

## General Instructions
- Always update `GEMINI.md` with new learnings after confirming with the user that the feature is working.
