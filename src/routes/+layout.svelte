<script>
    import "../app.css";
    import Navigation from "$lib/components/Navigation.svelte";
    import TopBar from "$lib/components/TopBar.svelte";
    import DevPanel from "$lib/components/DevPanel.svelte";

    let { children } = $props();
</script>

<svelte:head>
    <title>Phaser Svelte Template</title>
</svelte:head>


<TopBar></TopBar>
<div class="appLayout">
    <Navigation></Navigation>

    <div class="content">
        {@render children()}
    </div>

    <DevPanel></DevPanel>
</div>

<style lang="scss">
    .appLayout {
        display: flex;
    }

    .content {
        flex-grow: 1;
    }
</style>
