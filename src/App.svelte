<script lang="ts">
  import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
  import Employees from './pages/Employees.svelte';
</script>

<main>
  <TopAppBar variant="static">
    <Row>
      <Section>
        <Title>Northwind Manager</Title>
      </Section>
    </Row>
  </TopAppBar>

  <Employees />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    padding: 1em;
  }
</style>
