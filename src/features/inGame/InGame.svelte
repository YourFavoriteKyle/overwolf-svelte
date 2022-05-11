<script context="module" lang="ts">
  import { OWHotkeys } from "@overwolf/overwolf-api-ts";
  import { defaultHotkey } from "app/consts";
  import { onMount } from "svelte";
  import { supportedGameRunningInfo } from "stores/supportedRunningGameInfo";
  import type { OWWindow } from "@overwolf/overwolf-api-ts";
  import { Header } from "components";

  export let activeWindow: OWWindow;

  // onMount(async () => {
  //   return;
  // });

  async function getHotkeyText() {
    // FIXME: This call should be taking the game instance classId
    // clearly it's not required but would require replacing activeWindow with
    // currentWindow to be able to effectively access the OWWindow instance
    return await OWHotkeys.getHotkeyText(defaultHotkey.toggle);
  }
</script>

<script lang="ts">
</script>

<Header {activeWindow} />
<div>Welcome to the InGame screen</div>
