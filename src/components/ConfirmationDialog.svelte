<script lang="ts">
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, { Label } from '@smui/button';

    let open = false;
    let title = '';
    let message = '';
    let resolveFunction: (_: boolean) => void;

    export function confirm(dialogTitle: string, dialogMessage: string): Promise<boolean> {
      title = dialogTitle;
      message = dialogMessage;
      open = true;
      return new Promise<boolean>(resolve => resolveFunction = resolve);
    }

    function handleDialogClosed(event: CustomEvent<{ action: string }>) {
      resolveFunction(event.detail.action === 'yes');
    }
</script>

<Dialog bind:open on:SMUIDialog:closed={handleDialogClosed}>
  <Title>{title}</Title>
  <Content>{message}</Content>
  <Actions>
    <Button action="yes">
      <Label>Yes</Label>
    </Button>
    <Button action="no">
      <Label>No</Label>
    </Button>
  </Actions>
</Dialog>
