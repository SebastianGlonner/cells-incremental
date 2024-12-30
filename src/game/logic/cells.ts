let cells = 0;
let cores = 0;

export interface CellsData {
    cells: number;
    cores: number;
}

class Controller {
    tick() {
        cells += cores;
    }

    buyCell() {
        cells++;
    }

    buyCoreCreator() {
        cores++;
    }

    getData(): CellsData {
        return {
            cells: cells,
            cores: cores
        }
    }
}

export default new Controller();
