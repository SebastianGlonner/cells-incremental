import type { SavegameDataHandler } from "./savegame";

let cellsData: CellsData = {
    cells: 10n,
    cores: [
        {
            count: 0n,
            cellsPerTick: 1n,
            price: 10n,
            ascensionAt: 10n,
            priceMulti: 10n,
            actions: {
                buyable: true
            }
        },
        {
            count: 0n,
            cellsPerTick: 10n,
            price: 1000n,
            ascensionAt: 10n,
            priceMulti: 10n,
            actions: {
                buyable: false
            }
        },
        {
            count: 0n,
            cellsPerTick: 100n,
            price: 100000n,
            ascensionAt: 10n,
            priceMulti: 10n,
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
    ]
}

export interface CoreDef {
    count: bigint;
    cellsPerTick: bigint;
    price: bigint;
    ascensionAt: bigint;
    priceMulti: bigint;
    actions: {
        buyable: boolean;
    }
}

export interface CellsData {
    cells: bigint;

    cores: CoreDef[];
}

class Controller implements SavegameDataHandler<CellsData> {
    tick() {
        cellsData.cores.forEach(core => {
            if (core.count > 0) {
                cellsData.cells += core.count * core.cellsPerTick;

            }

            core.actions.buyable = this.canBuyCore(core);
        })
    }

    buyCell() {
        cellsData.cells++;
    }

    buyCore(index: number): boolean {
        const core = cellsData.cores[index];

        if (!this.canBuyCore(core)) {
            return false;
        }

        core.count++;

        cellsData.cells -= core.price;

        if (core.count % core.ascensionAt === 0n) {
            // core.price = Math.floor(core.price * core.priceMulti);
            core.price = core.price * core.priceMulti;
            core.cellsPerTick *= 2n;
        }

        return true;
    }

    private canBuyCore(core: CoreDef) {
        return core.price <= cellsData.cells;
    }

    getData(): CellsData {
        return cellsData;
    }

    getSavegameData(): CellsData {
        return this.getData();
    }
    loadSavegameData(data: CellsData): void {
        console.log('init client', data);
        cellsData = data;
    }
}

export default new Controller();
