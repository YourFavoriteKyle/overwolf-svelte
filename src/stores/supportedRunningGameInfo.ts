import {
  OWGameListenerDelegate,
  OWGames,
  OWGameListener,
} from "@overwolf/overwolf-api-ts/dist";
import { Games, WINDOW_NAMES } from "../app/consts";
import { writable, Writable } from "svelte/store";

// export const currentGame: Writable<overwolf.games.RunningGameInfo> = writable();

// export async function toggleWindows(info: overwolf.games.RunningGameInfo) {
//   if (!info || (await !isSupportedGameRunning())) {
//     return;
//   }

//   if (info.isRunning) {
//     return true;
//   } else {
//     return false;
//   }
// }

function createSupportedGameRunningInfo() {
  const { subscribe, set, update }: Writable<overwolf.games.RunningGameInfo> =
    writable();

  return {
    subscribe,
    update,
    set,
    checkAndSet: (gameInfo: overwolf.games.RunningGameInfo) => {
      if (gameInfo && gameInfo.isRunning && Games.includes(gameInfo.classId)) {
        set(gameInfo);
      }
    },
  };
}

export const supportedGameRunningInfo = createSupportedGameRunningInfo();

// const gameListener = new OWGameListener({
//   onGameStarted: supportedGameRunning.checkSupportedAndSet,
//   onGameEnded: supportedGameRunning.checkSupportedAndSet,
// });

// gameListener.start();
