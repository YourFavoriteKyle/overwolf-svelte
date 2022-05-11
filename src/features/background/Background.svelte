<script lang="ts">
  import { WINDOW_NAMES } from "../../app/consts";
  import { OWWindow, OWGameListener } from "@overwolf/overwolf-api-ts";
  import InGame from "../inGame/InGame.svelte";
  import Desktop from "../desktop/Desktop.svelte";
  import { currentWindow } from "../../stores/currentWindow";
  import { supportedGameRunningInfo } from "../../stores/supportedRunningGameInfo";
  import { onMount } from "svelte";
  import { Header } from "components";

  // TODO: Utilizing beforeUpdate() and afterUpdate() might be able to alleviate
  // some of the apparent timing issues with stores attempting to read
  // store data before they are finished initializing... FUCK async

  onMount(() => {
    const gameListener = new OWGameListener({
      onGameStarted: supportedGameRunningInfo.checkAndSet,
      onGameEnded: supportedGameRunningInfo.checkAndSet,
    });

    gameListener.start();

    // FIXME: WHY DOES THIS WORK HERE BUT NOT IN A DERIVED STORE???
    supportedGameRunningInfo.subscribe((gameInfo) =>
      currentWindow.setCurrentWindow(gameInfo)
    );
    currentWindow.subscribe((windowInfo) => {
      if (!(typeof windowInfo === "undefined")) {
        toggleWindows(windowInfo);
      }
    });
  });

  const desktopWindow = new OWWindow(WINDOW_NAMES.desktop);
  const inGameWindow = new OWWindow(WINDOW_NAMES.inGame);

  // TODO: This var needs to be replaced with currentWindow as
  // currentWindow should store an OWWindow instance
  let activeWindow: OWWindow;

  function toggleWindows(info: string) {
    if (info === WINDOW_NAMES.inGame) {
      activeWindow = inGameWindow;
      desktopWindow.close();
      inGameWindow.restore();
    }
    if (info === WINDOW_NAMES.desktop) {
      activeWindow = desktopWindow;
      inGameWindow.close();
      desktopWindow.restore();
    }
  }
</script>

{#if $currentWindow === WINDOW_NAMES.desktop}
  <Header {activeWindow} />
  <Desktop />
{:else if $currentWindow === WINDOW_NAMES.inGame}
  <!--
  FIXME: This issue can be resolved if activeWindow
  is replaced with the currentWindow store
 -->
  <InGame {activeWindow} />
{/if}
