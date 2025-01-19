<script lang="ts">
    import { mdiTimeline } from "@mdi/js";
    import Fab, { Icon } from '@smui/fab';

    const onclick = () => {
        
    }
</script>

<div class="container">
    <Fab {onclick}>
        <Icon tag="svg" viewBox="0 0 24 24">
          <path fill="currentColor" d={mdiTimeline} />
        </Icon>
    </Fab>
</div>

<style lang="scss">
    .container {
        width: 60px;
    }
</style>
