<script lang="ts">
  import { WINDOW_NAMES, Games, defaultHotkey } from "../../app/consts";
  import {
    OWWindow,
    OWGameListener,
    OWGames,
    OWHotkeys,
  } from "@overwolf/overwolf-api-ts";
  import InGame from "../inGame/InGame.svelte";
  import Desktop from "../desktop/Desktop.svelte";
  import { currentWindow } from "../../stores/currentWindow";
  import { runningGameInfo } from "../../stores/runningGameInfo";
  import { onMount } from "svelte";

  onMount(async () => {
    const gameListener = new OWGameListener({
      onGameStarted: checkState,
      onGameEnded: checkState,
    });

    const gameRunning = await OWGames.getRunningGameInfo();

    await checkState(gameRunning);

    gameListener.start();
  });

  const desktopWindow = new OWWindow(WINDOW_NAMES.desktop);
  const inGameWindow = new OWWindow(WINDOW_NAMES.inGame);

  async function checkState(gameInfo?: overwolf.games.RunningGameInfo) {
    const desktopState = await desktopWindow.getWindowState();
    const inGameState = await inGameWindow.getWindowState();

    if (gameInfo) {
      runningGameInfo.set(gameInfo);
    }
    if (!(gameInfo && gameInfo.isRunning && Games.includes(gameInfo.classId))) {
      toggleWindows(false);
    } else {
      toggleWindows(true);
    }

    function toggleWindows(supportedGameRunning: boolean) {
      if (!supportedGameRunning) {
        currentWindow.set({
          name: WINDOW_NAMES.desktop,
          instance: desktopWindow,
        });
        if (!(inGameState.window_state_ex === "hidden")) {
          inGameWindow.close();
        }
        if (desktopState.window_state_ex === "closed") {
          desktopWindow.restore();
        }
        return;
      }

      if (supportedGameRunning) {
        currentWindow.set({
          name: WINDOW_NAMES.inGame,
          instance: inGameWindow,
        });
        if (!(desktopState.window_state_ex === "closed")) {
          desktopWindow.close();
        }
        if (inGameState.window_state_ex === "hidden") {
          inGameWindow.restore();
        }
        return;
      }
    }
  }

  OWHotkeys.onHotkeyDown(defaultHotkey.toggle, () =>
    windowStateCheck(inGameWindow)
  );

  async function windowStateCheck(windowInstance: OWWindow) {
    const windowState = await windowInstance?.getWindowState();
    console.log(windowState);
    if (
      windowState?.window_state_ex === "normal" ||
      windowState?.window_state_ex === "maximized"
    ) {
      windowInstance?.minimize();
      return;
    }
    if (
      windowState?.window_state_ex === "minimized" ||
      windowState?.window_state_ex === "closed"
    ) {
      windowInstance?.restore();
      return;
    }
  }
</script>

{#if $currentWindow?.name === WINDOW_NAMES.desktop}
  <Desktop />
{:else if $currentWindow?.name === WINDOW_NAMES.inGame}
  <InGame />
{/if}
