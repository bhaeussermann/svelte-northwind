<script lang="ts">
  import { Route, Router } from 'svelte-routing';

  import ListEmployees from './ListEmployees.svelte';
  import EditEmployee from './EditEmployee.svelte';
  import NotFound from '../NotFound.svelte';

  export let url = '';
</script>

<Router {url}>
  <Route path="/" component={ListEmployees} />
  <Route path="/add" component={EditEmployee} />
  <Route path="/:id" let:params>
    <EditEmployee employeeId={params.id} />
  </Route>
  <Route component={NotFound} />
</Router>
