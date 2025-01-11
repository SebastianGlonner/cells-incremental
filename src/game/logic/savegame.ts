import { Preferences } from '@capacitor/preferences';
import cells from './cells';

const reviver = (key: string, value: any) =>
    value !== null &&
    typeof value === "object" &&
    "$bigint" in value &&
    typeof value.$bigint === "string"
      ? BigInt(value.$bigint)
      : value;

export interface SavegameDataHandler<T> {
    getSavegameData(): T;
    loadSavegameData(data: T): void;
}

export default new class {

    private handler: Map<string, SavegameDataHandler<any>> = new Map();

    addProvider(name: string, handler: SavegameDataHandler<any>) {
        if (this.handler.get(name)) {
            throw new Error('Duplicate save game handler name')
        }

        this.handler.set(name, handler);
    }

    async saveAll() {
        this.handler.entries().forEach(async ([name, handler]) => {
            await Preferences.set({
                key: name,
                value: JSON.stringify(handler.getSavegameData())
            });
        });
    }

    async loadAll() {
        this.handler.entries().forEach(async ([name, handler]) => {
            const dataString = await Preferences.get({key: name});

            if (typeof dataString.value === 'string') {
                handler.loadSavegameData(JSON.parse(dataString.value, reviver));
            }
        });

    }
}