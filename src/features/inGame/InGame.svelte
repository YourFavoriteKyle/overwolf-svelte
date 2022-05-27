<script lang="ts">
  import { OWHotkeys, OWGames, OWWindow } from "@overwolf/overwolf-api-ts";
  import { defaultHotkey } from "app/consts";
  import { Header } from "components";
  import { currentWindow } from "../../stores/currentWindow";
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  let hotkeyText: string;
  let currentGameId: number;

  onMount(async () => {
    currentGameId = (await OWGames.getRunningGameInfo()).classId;
    hotkeyText = await OWHotkeys.getHotkeyText(
      defaultHotkey.toggle,
      currentGameId
    );
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

<Header activeWindow={$currentWindow?.instance} {hotkeyText} />
<div>Welcome to the InGame screen</div>
