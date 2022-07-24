<script lang="ts">
  import { navigate } from 'svelte-routing';

  import Textfield from '@smui/textfield';
  import Button, { Label } from '@smui/button';
  import InlineProgressIndicator from '../../components/InlineProgressIndicator.svelte';

  import type { Employee } from '../../models/employee';
  import employeesService from '../../services/employees-service';

  let isSaving = false;
  let errorMessage: string = null;
  let employee: Employee = {
    lastName: '',
    firstName: '',
    title: '',
    birthDate: null
  };

  async function save() {
    isSaving = true;
    try {
      await employeesService.add(employee);
      navigate('/employees');
    }
    catch (error) {
      errorMessage = 'Error saving employee: ' + error.message;
    }
    finally {
      isSaving = false;
    }
  }

  function cancel() {
    navigate('/employees');
  }
</script>

<div class="title-row">
  <h2 class="title">Add employee</h2>

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
        <Label>Add</Label>
      </Button>
      {#if isSaving}
      <InlineProgressIndicator />
      {/if}
      <Button color="secondary" on:click={cancel}>
        <Label>Cancel</Label>
      </Button>
    </div>
  </form>

  {#if errorMessage}
  <div class="error">{errorMessage}</div>
  {/if}
</div>

<style>
  .button-container {
    margin: 15px 0;
  }
</style>
