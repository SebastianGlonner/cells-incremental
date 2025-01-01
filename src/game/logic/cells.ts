let cells = 10;
let cores: CoreDef[] = [
    {
        count: 0,
        cellsPerTick: 1,
        price: 10,
        priceMulti: 1.2,
        actions: {
            buyable: true
        }
    },
    {
        count: 0,
        cellsPerTick: 10,
        price: 1000,
        priceMulti: 1.2,
        actions: {
            buyable: false
        }
    },
    {
        count: 0,
        cellsPerTick: 100,
        price: 100000,
        priceMulti: 1.2,
        actions: {
            buyable: false
        }
    },
    {
        count: 0,
        cellsPerTick: 1000,
        price: 10000000,
        priceMulti: 1.2,
        actions: {
            buyable: false
        }
    },
    {
        count: 0,
        cellsPerTick: 10000,
        price: 1000000000,
        priceMulti: 1.2,
        actions: {
            buyable: false
        }
    }
];

export interface CoreDef {
    count: number;
    cellsPerTick: number;
    price: number;
    priceMulti: number;
    actions: {
        buyable: boolean;
    }
}

export interface CellsData {
    cells: number;

    cores: CoreDef[];
}

class Controller {
    tick() {
        cores.forEach(core => {
            if (core.count > 0) {
                cells += core.count * core.cellsPerTick;

            }

            core.actions.buyable = this.canBuyCore(core);
        })
    }

    buyCell() {
        cells++;
    }

    buyCore(index: number): boolean {
        const core = cores[index];

        if (!this.canBuyCore(core)) {
            return false;
        }

        core.count++;

        cells -= core.price;

        core.price = Math.floor(core.price * core.priceMulti);

        return true;
    }

    private canBuyCore(core: CoreDef) {
        return core.price <= cells;
    }

    getData(): CellsData {
        return {
            cells: cells,
            cores: cores
        }
    }
}

export default new Controller();
