<script lang="ts">
  import { Header } from "../../components";
  import { currentWindow } from "../../stores/currentWindow";
</script>

<Header activeWindow={$currentWindow?.instance} />
<div>Welcome to the desktop screen</div>
