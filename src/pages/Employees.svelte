<script lang="ts">
  import { onMount } from 'svelte';
  import type { Employee } from '../models/employee';
  import employeesService from '../services/employees-service';

  let employees: Employee[] = [];
  let errorMessage: string = null;

  onMount(async () => {
    try {
      employees = await employeesService.getAll();
    } catch (error) {
      errorMessage = 'Error retrieving employees: ' + error.message;
    }
  });
</script>

{#if errorMessage}
<div>{errorMessage}</div>
{:else}
<ul>
  {#each employees as employee}
    <li>{employee.firstName} {employee.lastName}</li>
  {/each}
</ul>
{/if}
