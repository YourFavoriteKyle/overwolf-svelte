<script lang="ts">
  import { onMount } from "svelte";
  import { initLocales } from "../locales";
  import * as i18n from "svelte-i18n";
  import { isLoading, _ } from "svelte-i18n";
  import Background from "../features/background/Background.svelte";

  overwolf.settings.language.get(({ language }) => {
    initLocales();
    i18n.locale.set(language);
  });
</script>

<main>
  {#if $isLoading}
    Loading...
  {:else}
    <Background />
  {/if}
</main>
