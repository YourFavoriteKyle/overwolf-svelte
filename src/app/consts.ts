import type { OWWindow } from "@overwolf/overwolf-api-ts";

export const REQUIRED_FEATURES = ["game_info"];

export const RETRY_TIMEOUT = 10000;

export const WINDOW_NAMES = {
  background: "background",
  settings: "settings",
  development: "development",
  inGame: "in_game",
  desktop: "desktop",
};

export const Games: number[] = [7152, 132528];

export const defaultHotkey = { toggle: "in_game_show_hide" };
