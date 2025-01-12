<script lang="ts">
    import type { Scene } from "phaser";
    import type { MainMenu } from "../game/phaser/scenes/MainMenu";
    import PhaserGame, { type TPhaserRef } from "../game/PhaserGame.svelte";
    import UiBridge, { type UiData } from "../game/logic/uiBridge.class";
    import { onDestroy, onMount } from "svelte";
    import type { CellsData } from "../game/logic/Cells.class";
    import fmt from "$lib/fmt";
    import Cells from "../game/logic/cells.class";
    import container from "../game/logic/container";

    let cells: Cells;
    let uiBridge: UiBridge;
    let uiUpdateEvent: any;
    onMount(() => {
        cells = container.resolve(Cells);
        uiBridge = container.resolve(UiBridge);
        uiUpdateEvent = uiBridge.onUpdate((uiData: UiData) => {
            cellsData = uiData.cells;
        });
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

    const onclick = () => {
        cells.buyCell();
    };

    const buyCore = (index: number) => {
        cells.buyCore(index);
    };

    onDestroy(() => {
        uiBridge.offUpdate(uiUpdateEvent);
    });
</script>

<div class="container" style="background-color: #DDD">
    <div class="fixed-grid has-3-cols">
        <div class="grid">
            <div>Cells: {fmt.bigInt(cellsData?.cells)}</div>
            <div></div>
            <div>
                <button {onclick} class="button is-primary">Buy Cells</button>
            </div>
        </div>
        {#each cellsData?.cores as core, i}
            <div class="grid">
                <div>Cores: {fmt.bigInt(core.count)}</div>
                <div>Price: {fmt.bigInt(core.price)}</div>
                <div>
                    <button
                        onclick={() => buyCore(i)}
                        class="button is-primary"
                        disabled={core.actions.buyable ? undefined : true}
                        >Buy Core {i + 1}</button
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
