import { WINDOW_NAMES } from "../app/consts";
import { writable, Writable } from "svelte/store";
import { OWWindow } from "@overwolf/overwolf-api-ts";

// export const windows: Readable<Record<string, OWWindowInfo>> = readable(
//   {},
//   function init(set) {
//     let _windows: Record<string, OWWindowInfo> = {};
//     for (let windowName in WINDOW_NAMES) {
//       _windows[windowName] = <OWWindowInfo>{
//         name: windowName,
//         instance: new OWWindow(windowName),
//       };
//     }
//     set(_windows);

//     return set({});
//   }
// );

// export const windows: Writable<Record<string, OWWindow>> = writable(init());

// function init() {
//   let _windows: Record<string, OWWindow> = {};
//   for (let windowName in WINDOW_NAMES) {
//     _windows[windowName] = new OWWindow(windowName);
//   }
//   return _windows;
// }
