<script lang="ts">
    import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
    import IconButton, { Icon } from '@smui/icon-button';
    import { mdiDeveloperBoard, mdiMenu } from "@mdi/js";
</script>

<TopAppBar variant="static" dense={true} color="primary">
    <Row>
        <Section>
            <IconButton >
              <Icon tag="svg" viewBox="0 0 24 24">
                <path fill="currentColor" d={mdiMenu} />
              </Icon>
            </IconButton>
            <Title>Cells Incremental</Title>
        </Section>
        <Section align="end" toolbar>
            <IconButton >
              <Icon tag="svg" viewBox="0 0 24 24">
                <path fill="currentColor" d={mdiDeveloperBoard} />
              </Icon>
            </IconButton>
        </Section>
    </Row>
</TopAppBar>
