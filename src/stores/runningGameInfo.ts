import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

function createRunningGameInfo() {
  const {
    subscribe,
    set,
    update,
  }: Writable<overwolf.games.RunningGameInfo | null> = writable();

  return {
    subscribe,
    update,
    set,
  };
}

export const runningGameInfo = createRunningGameInfo();
