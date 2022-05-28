<script lang="ts">
  import { OWHotkeys, OWGames, OWWindow } from "@overwolf/overwolf-api-ts";
  import { defaultHotkey } from "app/consts";
  import { Header } from "components";
  import { currentWindow } from "../../stores/currentWindow";
  import { onMount, afterUpdate, beforeUpdate } from "svelte";
  import { get, writable } from "svelte/store";
  import type { Writable } from "svelte/store";

  import { gameInfo, gameEvents } from "../background/LeagueEvents";

  let hotkeyText: string;
  let currentGameId: number;
  let infoLog: HTMLDivElement | undefined;
  let eventLog: HTMLDivElement | undefined;
  const infoLogVisible: Writable<boolean> = writable(false);
  const eventLogVisible: Writable<boolean> = writable(true);
  let infoScroll: boolean = true;
  let eventScroll: boolean = true;

  onMount(async () => {
    currentGameId = (await OWGames.getRunningGameInfo()).classId;
    hotkeyText = await OWHotkeys.getHotkeyText(
      defaultHotkey.toggle,
      currentGameId
    );
  });

  function checkScroll(log: HTMLDivElement) {
    return log && log.offsetHeight + log.scrollTop > log.scrollHeight - 20
      ? true
      : false;
  }

  beforeUpdate(() => {
    if (infoLog) infoScroll = checkScroll(infoLog);
    if (eventLog) eventScroll = checkScroll(eventLog);
  });

  afterUpdate(() => {
    if (infoLog && infoScroll) {
      infoLog.scrollTo(0, infoLog.scrollHeight);
    }

    if (eventLog && eventScroll) {
      eventLog.scrollTo(0, eventLog.scrollHeight);
    }
  });

  OWHotkeys.onHotkeyDown(defaultHotkey.toggle, () =>
    windowStateCheck(get(currentWindow)?.instance)
  );

  async function windowStateCheck(windowInstance?: OWWindow) {
    const windowState = await windowInstance?.getWindowState();
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

<div class="windowBackground">
  <Header activeWindow={$currentWindow?.instance} {hotkeyText} />
  <div class="toggleContainer">
    <button
      on:click={() => {
        $infoLogVisible = !$infoLogVisible;
      }}
    >
      {#if $infoLogVisible}
        Hide Info Log
      {:else}
        Show Info Log
      {/if}
    </button>
    <button on:click={() => ($eventLogVisible = !$eventLogVisible)}>
      {#if $eventLogVisible}
        Hide Event Log
      {:else}
        Show Event Log
      {/if}
    </button>
  </div>
  <div id="eventContainer" class="eventsContainer">
    {#if $eventLogVisible}
      <div class="eventColumn">
        <h1>Events</h1>
        <div bind:this={eventLog} class="eventData">
          {#each $gameEvents as event}
            <span>{JSON.stringify(event)}</span>
          {/each}
        </div>
      </div>
    {/if}
    {#if $infoLogVisible}
      <div class="eventColumn">
        <h1>Info Log</h1>
        <div bind:this={infoLog} class="eventData">
          {#each $gameInfo as info}
            <span>{JSON.stringify(info)}</span>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .toggleContainer {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }

  .toggleContainer > button {
    background: #333333;
    color: #fff;
    border: none;
    margin: 0.5em;
  }

  .windowBackground {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .eventsContainer {
    display: flex;
    width: 100%;
  }

  .eventColumn {
    display: flex;
    flex-direction: column;
    flex: 1 1 50%;
  }

  .eventColumn > h1 {
    color: #fff;
    font-size: 1.25em;
    font-weight: bold;
    text-align: center;
    margin: 0;
  }

  .eventData {
    background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0),
      20%,
      rgba(0, 0, 0, 0.75)
    );
    border-radius: 4px;
    overflow-x: hidden;
    overflow-y: auto;
    white-space: nowrap;
    padding: 10px;
    margin-top: 16px;
    color: #8d8d8d;
    height: calc(100vh - 185px);
    max-width: inherit;
    font-size: 13px;
  }

  .eventData span {
    white-space: pre-line;
    word-break: break-word;
    margin: 5px 0;
  }

  .eventData::-webkit-scrollbar {
    width: 10px;
  }

  .eventData::-webkit-scrollbar-track {
    background: #333333;
    border-left: 4px solid #464646;
    border-right: 4px solid #464646;
    margin: 3px 0px;
  }

  .eventData::-webkit-scrollbar-thumb {
    background: #8d8d8d;
    border-left: 4px solid #464646;
    border-right: 4px solid #464646;
  }
</style>
