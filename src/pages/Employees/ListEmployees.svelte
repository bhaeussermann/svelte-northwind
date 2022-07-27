<script lang="ts">
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';

  import ErrorBar from '../../components/ErrorBar.svelte';
  import ConfirmationDialog from '../../components/ConfirmationDialog.svelte';
  import InlineProgressIndicator from '../../components/InlineProgressIndicator.svelte';
  import Button, { Label as ButtonLabel } from '@smui/button';
  import DataTable, { Head, Body, Row, Cell, Label as CellLabel, SortValue } from '@smui/data-table';
  import LinearProgress from '@smui/linear-progress';
  import IconButton from '@smui/icon-button';
  import SearchField from '../../components/SearchField.svelte';
  
  import type { Employee } from '../../models/employee';
  import employeesService from '../../services/employees-service';
  
  let errorBar: ErrorBar;
  let confirmationDialog: ConfirmationDialog;

  let isLoading = true;
  $: isNotLoading = !isLoading;
  let didLoad = false;
  let deletedEmployeeId: string = null;

  let employees: Employee[] = [];
  let displayedEmployees: Employee[] = [];
  let sortProperty: keyof Employee = 'lastName';
  let sortDirection: SortValue = SortValue.ASCENDING;
  let filterText = '';

  onMount(loadEmployees);

  async function loadEmployees() {
    isLoading = true;
    try {
      employees = await employeesService.getAll();
      refreshDisplayedEmployees();
      didLoad = true;
    } catch (error) {
      errorBar.show('Error retrieving employees: ' + error.message);
    } finally {
      isLoading = false;
    }
  }

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

  function addEmployee() {
    navigate('/employees/add');
  }

  function editEmployee(employeeId: string) {
    navigate('employees/' + employeeId);
  }

  async function confirmDeleteEmployee(employee: Employee) {
    const result = await confirmationDialog.confirm('Delete employee', `Delete employee ${employee.firstName} ${employee.lastName}?`);
    if (result) {
      try {
        deletedEmployeeId = employee.id;
        await employeesService.delete(employee.id);
      } catch (error) {
        errorBar.show('Error deleting employee: ' + error.message);
        return;
      } finally {
        deletedEmployeeId = null;
      }

      loadEmployees();
    }
  }
</script>

<div class="title-row">
  <h2 class="title">Employees</h2>

  {#if didLoad}
  <SearchField bind:value={filterText} on:input={refreshDisplayedEmployees} />
  {/if}
</div>

{#if didLoad}
<Button on:click={addEmployee}>
  <ButtonLabel>Add Employee</ButtonLabel>
</Button>
{/if}
<DataTable
  sortable
  bind:sort={sortProperty}
  bind:sortDirection
  on:SMUIDataTable:sorted={refreshDisplayedEmployees}
  style="width: 100%;">
  <Head>
    <Row>
      <Cell columnId="lastName">
        <CellLabel>Last name</CellLabel>
        <IconButton class="material-icons">arrow_upward</IconButton>
      </Cell>
      <Cell columnId="firstName">
        <CellLabel>First name</CellLabel>
        <IconButton class="material-icons">arrow_upward</IconButton>
      </Cell>
      <Cell columnId="title">
        <CellLabel>Title</CellLabel>
        <IconButton class="material-icons">arrow_upward</IconButton>
      </Cell>
      <Cell />
    </Row>
  </Head>
  <Body>
    {#each displayedEmployees as employee}
    <Row>
      <Cell>{employee.lastName}</Cell>
      <Cell>{employee.firstName}</Cell>
      <Cell>{employee.title}</Cell>
      <Cell>
        <Button on:click={() => editEmployee(employee.id)}>
          <ButtonLabel>Edit</ButtonLabel>
        </Button>
        <Button on:click={() => confirmDeleteEmployee(employee)}>
          <ButtonLabel>Delete</ButtonLabel>
        </Button>
        {#if employee.id === deletedEmployeeId}
        <InlineProgressIndicator topOffset={10} />
        {/if}
      </Cell>
    </Row>
    {/each}
  </Body>

  <LinearProgress indeterminate bind:closed={isNotLoading} slot="progress" />
</DataTable>

<ErrorBar bind:this={errorBar} />

<ConfirmationDialog bind:this={confirmationDialog} />

<style>
  .title-row {
    display: flex;
  }

  .title {
    flex-grow: 1;
  }
</style>
