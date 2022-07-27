<script lang="ts">
  import CircularProgress from '@smui/circular-progress';

  export let topOffset = 0;
</script>

<CircularProgress
  style="height: 20px; width: 20px; margin-top: auto; margin-bottom: auto; padding-top: {topOffset}px;"
  indeterminate />
