<script lang="ts">
    import savegame from "../../game/logic/savegame";


    
    const onclick = () => {
        savegame.saveAll();
    }
</script>

<aside class="menu">
    <p class="menu-label">General</p>
    <ul class="menu-list">
        <li><a href="/">Cells</a></li>
        <li><a href="/research">Research</a></li>
    </ul>
    <hr />
    <ul class="menu-list">
        <li><a href="/stats">Stats</a></li>
    </ul>
    <hr />
    <button class="button" {onclick}>SaveGame</button>
</aside>

<style lang="scss">
    /* #phaserContainer {
        margin-top: 200px;
        height: 400px;
        width: 400px;
    } */
</style>
