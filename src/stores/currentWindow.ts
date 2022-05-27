import { writable, Writable } from "svelte/store";
import type { WindowID } from "../typings/WindowID";

function createCurrentWindow() {
  const { subscribe, set, update }: Writable<WindowID | undefined> = writable();

  return {
    subscribe,
    update,
    set,
  };
}

export const currentWindow = createCurrentWindow();
