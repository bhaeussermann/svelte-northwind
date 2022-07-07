<script lang="ts">
  import { onMount } from 'svelte';
  import DataTable, { Head, Body, Row, Cell, Label, SortValue } from '@smui/data-table';
  import IconButton from '@smui/icon-button';
  import LinearProgress from '@smui/linear-progress';
  import type { Employee } from '../models/employee';
  import employeesService from '../services/employees-service';

  let didLoad = false;
  let errorMessage: string = null;
  let employees: Employee[] = [];
  let sortedEmployees: Employee[] = [];
  let sortProperty: keyof Employee = 'lastName';
  let sortDirection: SortValue = SortValue.ASCENDING;

  onMount(async () => {
    try {
      employees = await employeesService.getAll();
      refreshSortedEmployees();
      didLoad = true;
    } catch (error) {
      errorMessage = 'Error retrieving employees: ' + error.message;
    }
  });

  function refreshSortedEmployees() {
    sortedEmployees = [...employees];
    sortedEmployees.sort((employee1, employee2) => {
      const compareValue = employee1[sortProperty].localeCompare(employee2[sortProperty]);
      return sortDirection === SortValue.ASCENDING ? compareValue : -compareValue;
    });
  }
</script>

<h2>Employees</h2>

{#if errorMessage}
<div>{errorMessage}</div>
{:else}
<DataTable
  sortable
  bind:sort={sortProperty}
  bind:sortDirection
  on:SMUIDataTable:sorted={refreshSortedEmployees}
  style="width: 100%;">
  <Head>
    <Row>
      <Cell columnId="lastName">
        <Label>Last name</Label>
        <IconButton class="material-icons">arrow_upward</IconButton>
      </Cell>
      <Cell columnId="firstName">
        <Label>First name</Label>
        <IconButton class="material-icons">arrow_upward</IconButton>
      </Cell>
      <Cell columnId="title">
        <Label>Title</Label>
        <IconButton class="material-icons">arrow_upward</IconButton>
      </Cell>
    </Row>
  </Head>
  <Body>
    {#each sortedEmployees as employee}
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
