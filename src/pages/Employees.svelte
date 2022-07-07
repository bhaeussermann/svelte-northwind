<script lang="ts">
  import { onMount } from 'svelte';

  import DataTable, { Head, Body, Row, Cell, Label, SortValue } from '@smui/data-table';
  import LinearProgress from '@smui/linear-progress';
  import IconButton from '@smui/icon-button';
  import SearchField from '../components/SearchField.svelte';
  
  import type { Employee } from '../models/employee';
  import employeesService from '../services/employees-service';

  let didLoad = false;
  let errorMessage: string = null;
  let employees: Employee[] = [];
  let displayedEmployees: Employee[] = [];
  let sortProperty: keyof Employee = 'lastName';
  let sortDirection: SortValue = SortValue.ASCENDING;
  let filterText = '';

  onMount(async () => {
    try {
      employees = await employeesService.getAll();
      refreshDisplayedEmployees();
      didLoad = true;
    } catch (error) {
      errorMessage = 'Error retrieving employees: ' + error.message;
    }
  });

  function refreshDisplayedEmployees() {
    displayedEmployees = employees.filter(e =>
      !filterText
      || (e.lastName.toLowerCase().indexOf(filterText) !== -1)
      || (e.firstName.toLowerCase().indexOf(filterText) !== -1)
      || (e.title.toLowerCase().indexOf(filterText) !== -1));
    displayedEmployees.sort((employee1, employee2) => {
      const compareValue = employee1[sortProperty].localeCompare(employee2[sortProperty]);
      return sortDirection === SortValue.ASCENDING ? compareValue : -compareValue;
    });
  }
</script>

<div class="title-row">
  <h2 class="title">Employees</h2>

  {#if didLoad}
  <SearchField bind:value={filterText} on:input={refreshDisplayedEmployees} />
  {/if}
</div>

{#if errorMessage}
<div>{errorMessage}</div>
{:else}
<DataTable
  sortable
  bind:sort={sortProperty}
  bind:sortDirection
  on:SMUIDataTable:sorted={refreshDisplayedEmployees}
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
    {#each displayedEmployees as employee}
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

<style>
  .title-row {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .title-row > * {
    margin-top: auto;
    margin-bottom: auto;
  }

  .title {
    flex-grow: 1;
  }
</style>
