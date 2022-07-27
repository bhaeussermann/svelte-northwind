<script lang="ts">
  import type { SnackbarComponentDev } from '@smui/snackbar';
  import Snackbar, { Label as SnackbarLabel, Actions } from '@smui/snackbar';
  import IconButton from '@smui/icon-button';

  let snackbarComponent: SnackbarComponentDev;
  let errorMessage = '';

  export function show(errorText: string) {
    errorMessage = errorText;
    snackbarComponent.open();
  }
</script>

<Snackbar bind:this={snackbarComponent} class="error">
  <SnackbarLabel>{errorMessage}</SnackbarLabel>
  <Actions>
    <IconButton class="material-icons" title="Dismiss">close</IconButton>
  </Actions>
</Snackbar>
