let cells = 10n;
let cores: CoreDef[] = [
    {
        count: 0n,
        cellsPerTick: 1n,
        price: 10n,
        priceMulti: 1n,
        actions: {
            buyable: true
        }
    },
    {
        count: 0n,
        cellsPerTick: 10n,
        price: 1000n,
        priceMulti: 1n,
        actions: {
            buyable: false
        }
    },
    {
        count: 0n,
        cellsPerTick: 100n,
        price: 100000n,
        priceMulti: 1n,
        actions: {
            buyable: false
        }
    },
    // {
    //     count: 0,
    //     cellsPerTick: 1000,
    //     price: 10000000,
    //     priceMulti: 1.2,
    //     actions: {
    //         buyable: false
    //     }
    // },
    // {
    //     count: 0,
    //     cellsPerTick: 10000,
    //     price: 1000000000,
    //     priceMulti: 1.2,
    //     actions: {
    //         buyable: false
    //     }
    // }
];

export interface CoreDef {
    count: bigint;
    cellsPerTick: bigint;
    price: bigint;
    priceMulti: bigint;
    actions: {
        buyable: boolean;
    }
}

export interface CellsData {
    cells: bigint;

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

        // core.price = Math.floor(core.price * core.priceMulti);
        core.price = core.price * core.priceMulti;

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
