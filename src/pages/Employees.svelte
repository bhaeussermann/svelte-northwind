<script lang="ts">
  import { onMount } from 'svelte';
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import LinearProgress from '@smui/linear-progress';
  import type { Employee } from '../models/employee';
  import employeesService from '../services/employees-service';

  let didLoad = false;
  let employees: Employee[] = [];
  let errorMessage: string = null;

  onMount(async () => {
    try {
      employees = await employeesService.getAll();
      didLoad = true;
    } catch (error) {
      errorMessage = 'Error retrieving employees: ' + error.message;
    }
  });
</script>

<h2>Employees</h2>

{#if errorMessage}
<div>{errorMessage}</div>
{:else}
<DataTable style="width: 100%;">
  <Head>
    <Row>
      <Cell>Last name</Cell>
      <Cell>First name</Cell>
      <Cell>Title</Cell>
    </Row>
  </Head>
  <Body>
    {#each employees as employee}
    <Row>
      <Cell>{employee.lastName}</Cell>
      <Cell>{employee.firstName}</Cell>
      <Cell>{employee.title}</Cell>
    </Row>
    {/each}
  </Body>

  <LinearProgress indeterminate bind:closed={didLoad} slot="progress" />
</DataTable>
{/if}
