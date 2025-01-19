<script lang="ts">
    import type { Scene } from "phaser";
    import type { MainMenu } from "../game/phaser/scenes/MainMenu";
    import PhaserGame, { type TPhaserRef } from "../game/PhaserGame.svelte";
    import UiBridge, { type UiData } from "../game/logic/uiBridge.class";
    import { onDestroy, onMount } from "svelte";
    import fmt from "$lib/fmt";
    import Cells, { type CellsData } from "../game/logic/cells.class";
    import container from "../game/logic/container";
    import LayoutGrid, { Cell } from "@smui/layout-grid";
    import Button from "@smui/button";

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
    <LayoutGrid>
        <Cell span={3}>
            Cells: {fmt.bigDecimal(cellsData?.cells)}
        </Cell>
        <Cell span={1}>
            <Button {onclick} class="button is-primary" touch variant="raised"
                >Buy Cells
            </Button>
        </Cell>
    </LayoutGrid>

    <LayoutGrid>
        {#each cellsData?.cores as core, i}
            <Cell span={3}>
                Cores: {fmt.bigDecimal(core.count)}<br />
                Price: {fmt.bigDecimal(core.price)}
            </Cell>
            <Cell span={1}>
                <Button
                    onclick={() => buyCore(i)}
                    touch variant="raised"
                    disabled={core.actions.buyable ? undefined : true}
                    >Buy Core {i + 1}
                </Button>
            </Cell>
        {/each}
    </LayoutGrid>

    <!-- <div id="phaserContainer">
        <PhaserGame bind:phaserRef={phaserRef} currentActiveScene={currentScene} />
    </div> -->
</div>

<style lang="scss">
    /* #phaserContainer {
        margin-top: 200px;
        height: 400px;
        width: 400px;
    } */
</style>
