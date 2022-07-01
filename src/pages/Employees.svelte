<script lang="ts">
  let employees = [
    {
      firstName: 'John',
      lastName: 'Doe'
    },
    {
      firstName: 'Sally',
      lastName: 'Smith'
    }
  ];
</script>

<ul>
  {#each employees as employee}
    <li>{employee.firstName} {employee.lastName}</li>
  {/each}
</ul>
