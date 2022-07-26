<script lang="ts">
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';

  import type { SnackbarComponentDev } from '@smui/snackbar';
  import IconButton from '@smui/icon-button';
  import Textfield from '@smui/textfield';
  import Button, { Label } from '@smui/button';
  import ProgressIndicator from '../../components/ProgressIndicator.svelte';
  import InlineProgressIndicator from '../../components/InlineProgressIndicator.svelte';
  import ErrorBar from '../../components/ErrorBar.svelte';

  import type { Employee } from '../../models/employee';
  import employeesService from '../../services/employees-service';

  export let employeeId: string = null;

  let isLoading = false;
  let didLoad = false;
  let isSaving = false;
  let errorMessage: string = null;
  let errorSnackbar: SnackbarComponentDev;

  let employee: Employee = {
    id: null,
    lastName: '',
    firstName: '',
    title: '',
    birthDate: null
  };

  $: isEditing = !!employeeId;

  onMount(async function() {
    if (!employeeId) {
      didLoad = true;
    } else {
      isLoading = true;
      try {
        employee = await employeesService.get(employeeId);
        didLoad = true;
      }
      catch (error) {
        showError('Error loading employee: ' + error.message);
      }
      finally {
        isLoading = false;
      }
    }
  });

  async function save() {
    isSaving = true;
    errorMessage = null;
    try {
      if (isEditing) {
        await employeesService.update(employee);
      } else {
        await employeesService.add(employee);
      }
      navigate('/employees');
    }
    catch (error) {
      showError('Error saving employee: ' + error.message);
    }
    finally {
      isSaving = false;
    }
  }

  function cancel() {
    navigate('/employees');
  }

  function showError(errorText: string) {
    errorMessage = errorText;
    errorSnackbar.open();
  }
</script>

<div class="title-row">
  <h2 class="title">{isEditing ? 'Edit' : 'Add'} employee</h2>
</div>

{#if isLoading}
<ProgressIndicator />
{/if}
{#if didLoad}
<form on:submit={event => { event.preventDefault(); save(); }}>
  <div>
    <Textfield bind:value={employee.lastName} label="Last name" required input$autofocus />
  </div>
  <div>
    <Textfield bind:value={employee.firstName} label="First name" required />
  </div>
  <div>
    <Textfield bind:value={employee.title} label="Title" required />
  </div>
  <div>
    <Textfield bind:value={employee.birthDate} label="Birth date" type="date" />
  </div>

  <div class="button-container">
    <Button type="submit">
      <Label>Save</Label>
    </Button>
    {#if isSaving}
    <InlineProgressIndicator />
    {/if}
    <Button color="secondary" on:click={cancel}>
      <Label>Cancel</Label>
    </Button>
  </div>
</form>
{/if}

<ErrorBar bind:snackbarComponent={errorSnackbar} {errorMessage} />

<style>
  .button-container {
    display: flex;
    margin: 15px 0;
  }
</style>
