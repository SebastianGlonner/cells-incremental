<script>
    import "bulma/bulma.scss";
    import Navigation from "../components/Navigation.svelte";
    import "reflect-metadata";
</script>

<svelte:head>
    <title>Phaser Svelte Template</title>
</svelte:head>

<div class="appLayout">
    <Navigation></Navigation>

    <slot />
</div>

<style lang="scss">
    .appLayout {
        display: flex;
    }
</style>
