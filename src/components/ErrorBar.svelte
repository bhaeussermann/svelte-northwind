<script lang="ts">
  import type { SnackbarComponentDev } from '@smui/snackbar';
  import Snackbar, { Label as SnackbarLabel, Actions } from '@smui/snackbar';
  import IconButton from '@smui/icon-button';

  export let snackbarComponent: SnackbarComponentDev;
  export let errorMessage = '';
</script>

<Snackbar bind:this={snackbarComponent} class="error">
  <SnackbarLabel>{errorMessage}</SnackbarLabel>
  <Actions>
    <IconButton class="material-icons" title="Dismiss">close</IconButton>
  </Actions>
</Snackbar>
