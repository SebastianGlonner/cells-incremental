<script>
    import "bulma/bulma.scss";
    import Navigation from "$lib/components/Navigation.svelte";
    import TopBar from "$lib/components/TopBar.svelte";

    let { children } = $props();
</script>

<svelte:head>
    <title>Phaser Svelte Template</title>
</svelte:head>


<TopBar></TopBar>
<div class="appLayout">
    <Navigation></Navigation>

    {@render children()}
</div>

<style lang="scss">
    .appLayout {
        display: flex;
    }
</style>
