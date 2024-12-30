<script lang="ts">
    import type { Scene } from "phaser";
    import type { MainMenu } from "../game/phaser/scenes/MainMenu";
    import PhaserGame, { type TPhaserRef } from "../game/PhaserGame.svelte";
    import uiBridge, { type UiData } from "../game/logic/uiBridge";
    import { onMount } from "svelte";
    import { loopController } from "../game/logic/loop";

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

    let currentAmountOfCells = 0;

    uiBridge.onUpdate((uiData: UiData) => {
        currentAmountOfCells = uiData.cells.cells;
    });

    const onclick = () => {
        uiBridge.action_buyCell();
    };

    const buyCreator = () => {
        uiBridge.action_buyCreator();
    };
</script>

<div id="app">
    <div class="cells">
        <h1 class="underline ">Cells: {currentAmountOfCells}</h1>
        <div>
            <button {onclick}>Buy Cells</button>
        </div>

        <div>
            <button onclick={buyCreator}>Buy Creator 1</button>
        </div>
    </div>

    <!-- <div id="phaserContainer">
        <PhaserGame bind:phaserRef={phaserRef} currentActiveScene={currentScene} />
    </div> -->
</div>

<style lang="postcss">
    #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .cells {
        text-align: center;
    }

    /* #phaserContainer {
        margin-top: 200px;
        height: 400px;
        width: 400px;
    } */
</style>
