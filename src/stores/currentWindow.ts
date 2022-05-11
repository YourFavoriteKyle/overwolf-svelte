import { WINDOW_NAMES } from "../app/consts";
import { writable, Writable } from "svelte/store";
import { isSupportedGameRunning } from "../utils";
import { OWGameListener } from "@overwolf/overwolf-api-ts";

// TODO: This needs to return and OWWindow instance
// This should really only store the currentWindow and not hold any logic
// activeWindow from Background.svelte simply uses the below logic to
// store the OWWindow instance, so why not store it here?
function createCurrentWindow() {
  const { subscribe, set, update }: Writable<string> = writable();

  return {
    subscribe,
    update,
    set,
    setCurrentWindow: async (gameInfo: overwolf.games.RunningGameInfo) => {
      set(
        (await isSupportedGameRunning()) && gameInfo.isRunning
          ? WINDOW_NAMES.inGame
          : WINDOW_NAMES.desktop
      );
    },
    init: async () =>
      set(
        (await isSupportedGameRunning())
          ? WINDOW_NAMES.inGame
          : WINDOW_NAMES.desktop
      ),
  };
}

export const currentWindow = createCurrentWindow();
