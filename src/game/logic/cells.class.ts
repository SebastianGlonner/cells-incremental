import { Big, BigDecimal } from "bigdecimal.js";
import type { GameTicker } from "./loop.class";
import type { SavegameDataHandler } from "./savegame";



let cellsData: CellsData = {
    cells: Big(66777749999999999999999999999999999999999999999999999999999999999986363735n),
    cores: [
        {
            count: Big(0),
            cellsPerTick: Big(1),
            price: Big(1),
            ascensionAt: Big(10),
            priceMulti: Big(10),
            actions: {
                buyable: true
            }
        },
        {
            count: Big(0),
            cellsPerTick: Big(10),
            price: Big(100),
            ascensionAt: Big(10),
            priceMulti: Big(10),
            actions: {
                buyable: false
            }
        },
        {
            count: Big(0),
            cellsPerTick: Big(100),
            price: Big(10000),
            ascensionAt: Big(10),
            priceMulti: Big(10),
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

cellsData.cores.forEach(core => {
    core.cellsPerTick = core.cellsPerTick.multiply(10000000000000000230000000000000541000000000000123000000152000050000n);
});

export interface CoreDef {
    count: BigDecimal;
    cellsPerTick: BigDecimal;
    price: BigDecimal;
    ascensionAt: BigDecimal;
    priceMulti: BigDecimal;
    actions: {
        buyable: boolean;
    }
}

export interface CellsData {
    cells: BigDecimal;

    cores: CoreDef[];
}

export default class Cells implements SavegameDataHandler<CellsData>, GameTicker {
    onTick() {
        const t = Big(1).add(3);
        cellsData.cores.forEach(core => {
            if (core.count.greaterThan(0)) {
                cellsData.cells = cellsData.cells.add(core.count.multiply(core.cellsPerTick));

            }

            core.actions.buyable = this.canBuyCore(core);
        })
    }

    buyCell() {
        cellsData.cells = cellsData.cells.add(1);
    }

    buyCore(index: number): boolean {
        const core = cellsData.cores[index];

        if (!this.canBuyCore(core)) {
            return false;
        }

        core.count = core.count.add(1);

        cellsData.cells = cellsData.cells.subtract(core.price);

        // if (core.count % core.ascensionAt === 0n) {
        //     // core.price = Math.floor(core.price * core.priceMulti);
        //     core.price = core.price * core.priceMulti;
        //     core.cellsPerTick *= 2n;
        // }

        return true;
    }

    private canBuyCore(core: CoreDef) {
        return core.price.lowerThanOrEquals(cellsData.cells);
    }

    getData(): CellsData {
        return cellsData;
    }

    getSavegameData(): CellsData {
        return this.getData();
    }
    loadSavegameData(data: CellsData): void {
        cellsData = data;
    }
    loadDefaultSavegameData() {
        
    }
}
