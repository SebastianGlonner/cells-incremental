<script lang="ts">

    import type { Scene } from "phaser";
    import type { MainMenu } from "../game/phaser/scenes/MainMenu";
    import PhaserGame, { type TPhaserRef } from "../game/PhaserGame.svelte";
    import { uiBridge, type UiData } from "../game/logic/uiBridge";

    //  References to the PhaserGame component (game and scene are exposed)
    let phaserRef: TPhaserRef = { game: null, scene: null};

    const changeScene = () => {

        const scene = phaserRef.scene as MainMenu;

        if (scene)
        {

            // Call the changeScene method defined in the `MainMenu`, `Game` and `GameOver` Scenes
            scene.changeScene();

        }

    }

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Scene) => {

    }

    let currentAmountOfCells = 0;

    uiBridge.onUpdate((uiData: UiData) => {
        currentAmountOfCells = uiData.currentAmountOfCells;
    })
    
    const onclick = () => {
        uiBridge.action_buyCell();
    }

</script>

<div id="app">

    <div>Cells: {currentAmountOfCells}</div>
    <div><button {onclick}>Buy Cells</button></div>
    
    <!-- <div id="phaserContainer">
        <PhaserGame bind:phaserRef={phaserRef} currentActiveScene={currentScene} />
    </div> -->
</div>


<style>
    #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    /* #phaserContainer {
        margin-top: 200px;
        height: 400px;
        width: 400px;
    } */
    
</style>
