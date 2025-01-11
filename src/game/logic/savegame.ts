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
    loadDefaultSavegameData(): void;
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
        const entries = this.handler.entries().toArray();
        for (let i = 0; i < entries.length; i++) {
            await this.saveSingle(entries[i]);
        }
    }

    async loadAll() {
        const entries = this.handler.entries().toArray();
        for (let i = 0; i < entries.length; i++) {
            await this.loadSingle(entries[i]);
        }

    }

    private async saveSingle(entry: [string, SavegameDataHandler<any>]) {
        const [name, handler] = entry;
        await Preferences.set({
            key: name,
            value: JSON.stringify(handler.getSavegameData())
        });
    }

    private async loadSingle(entry: [string, SavegameDataHandler<any>]) {
        const [name, handler] = entry;
        const dataString = await Preferences.get({key: name});
        if (typeof dataString.value === 'string') {
            handler.loadSavegameData(JSON.parse(dataString.value, reviver));
        } else {
            console.log('load default: ', name)
            handler.loadDefaultSavegameData();
        }

    }
}