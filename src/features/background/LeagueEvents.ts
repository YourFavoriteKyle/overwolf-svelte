import { OWGamesEvents } from "@overwolf/overwolf-api-ts";
import { REQUIRED_FEATURES } from "../../app/consts";

import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const gameInfo = (() => {
  const { set, update, subscribe }: Writable<any[]> = writable([]);
  return {
    set,
    update,
    subscribe,
  };
})();

export const gameEvents = (() => {
  const { set, update, subscribe }: Writable<any[]> = writable([]);
  return {
    set,
    update,
    subscribe,
  };
})();

export const gameEventsListener = (() => {
  return {
    start: () => _gameEventsListener.start(),
    stop: () => _gameEventsListener.stop(),
  };
})();

const _gameEventsListener = new OWGamesEvents(
  {
    onInfoUpdates: onInfoUpdate,
    onNewEvents: onNewEvent,
  },
  REQUIRED_FEATURES
);

function onInfoUpdate(info: any) {
  gameInfo.update((infoArray) => [...infoArray, info]);
}

function onNewEvent(event: any) {
  gameEvents.update((eventArray) => [...eventArray, event]);
}
