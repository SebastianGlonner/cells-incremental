<script lang="ts">
    import type { Scene } from "phaser";
    import type { MainMenu } from "../game/phaser/scenes/MainMenu";
    import PhaserGame, { type TPhaserRef } from "../game/PhaserGame.svelte";
    import uiBridge, { type UiData } from "../game/logic/uiBridge";
    import { onMount } from "svelte";
    import { loopController } from "../game/logic/loop";
    import type { CellsData } from "../game/logic/cells";
    import cells from "../game/logic/cells";

    onMount(() => {
        loopController.start();
    });

    //  References to the PhaserGame component (game and scene are exposed)
    let phaserRef: TPhaserRef = { game: null, scene: null };

    const changeScene = () => {
        const scene = phaserRef.scene as MainMenu;

        if (scene) {
            // Call the changeScene method defined in the `MainMenu`, `Game` and `GameOver` Scenes
            scene.changeScene();
        }
    };

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Scene) => {};

    let cellsData: CellsData = $state({} as CellsData);

    uiBridge.onUpdate((uiData: UiData) => {
        cellsData = uiData.cells;
    });

    const onclick = () => {
        cells.buyCell();
    };

    const buyCore = (index: number) => {
        cells.buyCore(index);
    };
</script>

<div class="container" style="background-color: #DDD">
    <div class="fixed-grid has-3-cols">
        <div class="grid">
            <div>Cells: {cellsData?.cells}</div>
            <div></div>
            <div>
                <button {onclick} class="button is-primary">Buy Cells</button>
            </div>
        </div>
        {#each cellsData?.cores as core, i}
            <div class="grid">
                <div>Cores: {core.count}</div>
                <div>Price: {core.price}</div>
                <div>
                    <button
                        onclick={() => buyCore(i)}
                        class="button is-primary"
                        disabled={core.actions.buyable
                            ? undefined
                            : true}>Buy Core {i + 1}</button
                    >
                </div>
            </div>
        {/each}

        <!-- <div id="phaserContainer">
        <PhaserGame bind:phaserRef={phaserRef} currentActiveScene={currentScene} />
    </div> -->
    </div>
</div>

<style lang="scss">
    /* #phaserContainer {
        margin-top: 200px;
        height: 400px;
        width: 400px;
    } */
</style>
