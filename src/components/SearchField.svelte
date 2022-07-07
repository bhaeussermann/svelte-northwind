<script lang="ts">
  import Textfield from '@smui/textfield';
  import Icon from '@smui/textfield/icon';

  export let value = '';
</script>

<Textfield
  class="search-field"
  variant="outlined"
  label="Search"
  bind:value
  on:input>
  <Icon class="material-icons" slot="trailingIcon">search</Icon>
</Textfield>
