<script lang="ts">
  import { WINDOW_NAMES } from "app/consts";
  import { currentWindow } from "../stores/currentWindow";
  import type { OWWindow } from "@overwolf/overwolf-api-ts";

  export let activeWindow: OWWindow | undefined;
  export let hotkeyText: string = "";
  let header: HTMLHeadElement;
  let windowMaximized: boolean = false;

  function windowMinMax() {
    !windowMaximized ? activeWindow?.maximize() : activeWindow?.restore();
    windowMaximized = !windowMaximized;
  }
</script>

<header
  class="app-header draggable"
  bind:this={header}
  on:pointermove={() => activeWindow?.dragMove(header)}
>
  <div>
    <img src="/img/header_icon.svg" alt="overwolf icon" />
    {#if $currentWindow?.name === WINDOW_NAMES.desktop}
      <h1 class="app-header-text">Overwolf-Svelte Sample App</h1>
    {/if}
  </div>
  <span class="app-header-text hotkey-text"
    >Hotkey:
    <span>{hotkeyText}</span>
  </span>
  <div class="window-controls-group">
    <button
      class="icon window-control window-control-social discord"
      on:click={() =>
        overwolf.utils.openUrlInDefaultBrowser("https://discord.gg")}
    />
    <button
      class="icon window-control window-control-settings"
      on:click={() => (window.location.href = "overwolf://settings")}
    />
    {#if $currentWindow?.name === WINDOW_NAMES.desktop}
      <button
        class="window-control window-control-minimize"
        on:click={() => activeWindow?.minimize()}
      />
      {#if !windowMaximized}
        <button
          class="window-control window-control-maximize"
          on:click={windowMinMax}
        />
      {:else}
        <button
          class="window-control window-control-restore"
          on:click={windowMinMax}
        />
      {/if}
      <button
        class="window-control window-control-close"
        on:click={() => activeWindow?.close()}
      />
    {/if}
  </div>
</header>

<style>
  .app-header div {
    display: flex;
  }

  .app-header {
    display: flex;
    align-items: center;
    z-index: 9999;
    background-color: #272727;
    justify-content: space-between;
  }

  .app-header-text {
    font-style: normal;
    font-weight: normal;
    color: #8d8d8d;
    font-size: 14px;
    padding-left: 8px;
    margin: 0;
    cursor: inherit;
  }

  .app-header img {
    padding-left: 10px;
    margin: 0;
  }

  .app-header .hotkey-text {
    margin: 0 auto;
  }

  .app-header .hotkey-text span {
    color: #fff;
    font-weight: bold;
  }

  .app-header.draggable {
    user-select: none;
    cursor: grab;
  }

  .app-header.draggable:active {
    cursor: grabbing;
  }

  .window-controls-group {
    display: flex;
    z-index: 1001;
  }

  .window-controls-group > * {
    border: none;
  }

  .window-control {
    background-color: transparent;
    transition: background 0.15s ease-in-out;
  }

  .window-control:hover,
  .window-control:active {
    background-color: #464646;
  }

  .window-control:before {
    display: block;
    content: "";
    width: 30px;
    height: 30px;
    mask: url("../img/window_minimize.svg") center center no-repeat;
    -webkit-mask: url("../img/window_minimize.svg") center center no-repeat;
    background-color: #a8a8a8;
    transition: inherit;
  }

  .window-control:hover:before,
  .window-control:active:before {
    background-color: #dedede;
  }

  .window-control-minimize:before {
    mask-image: url("../img/window_minimize.svg");
    -webkit-mask-image: url("../img/window_minimize.svg");
  }

  .window-control-maximize:before {
    mask-image: url("../img/window_maximize.svg");
    -webkit-mask-image: url("../img/window_maximize.svg");
  }

  .window-control-restore:before {
    mask-image: url("../img/window_restore.svg");
    -webkit-mask-image: url("../img/window_restore.svg");
  }

  .window-control-settings:before {
    mask-image: url("../img/window_settings.svg");
    -webkit-mask-image: url("../img/window_settings.svg");
  }

  .window-control-close:before {
    mask-image: url("../img/window_close.svg");
    -webkit-mask-image: url("../img/window_close.svg");
  }

  .window-control-close:hover,
  .window-control-close:active {
    background-color: #c21913;
  }

  .window-control-close:hover:before,
  .window-control-close:active:before {
    background-color: #dedede;
  }

  .discord {
    --social-color: #7289da;
  }

  .discord:before {
    mask-image: url("../img/discord.svg");
    -webkit-mask-image: url("../img/discord.svg");
  }

  .window-control-social:hover,
  .window-control-social:active {
    color: white;
    background-color: var(--social-color);
  }
</style>
