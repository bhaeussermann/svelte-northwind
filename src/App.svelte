<script lang="ts">
  import { Route, Router } from 'svelte-routing';
  import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
  import Employees from './pages/Employees/Employees.svelte';
  import ListEmployees from './pages/Employees/ListEmployees.svelte';
  import NotFound from './pages/NotFound.svelte';

  export let url = '';
</script>

<Router {url}>
  <main>
    <TopAppBar variant="static">
      <Row>
        <Section>
          <Title>Northwind Manager</Title>
        </Section>
      </Row>
    </TopAppBar>

    <Route path="/" component={ListEmployees} />
    <Route path="/employees/*" component={Employees} />
    <Route component={NotFound} />
  </main>
</Router>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    padding: 1em;
  }
</style>
