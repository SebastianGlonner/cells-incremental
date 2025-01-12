import type UiBridge from "./uiBridge.class";
import uiBridge from "./uiBridge.class";


const loopConfig = new class {
    intervallSpeed = 1 / 30 * 1000; // 30 updates per second
    gameTickTime = 1000; // 1 second


    // dev values
    // intervallSpeed = 1000; // 30 updates per second
    // gameTickTime = 300; // 1 second
}

export interface GameTicker {
    onTick(): void;
}

export default class Loop {
    //#####
    // config
    //#####
    private intervallSpeed: number;
    private gameTickTime: number;

    //#####
    // state proptiers
    //#####
    private currentTime: number;
    private tickWaited: number;
    private tickers: { (): void }[] = []; // array of functions

    constructor(private uiBridge: UiBridge) {

    }

    start() {
        this.currentTime = Date.now();
        this.tickWaited = 0;

        this.intervallSpeed = loopConfig.intervallSpeed;
        this.gameTickTime = loopConfig.gameTickTime;

        setInterval(this.loop.bind(this), this.intervallSpeed);
    }

    loop() {
        const nextTime = Date.now();
        const delta = nextTime - this.currentTime;

        this.tickWaited += delta;

        while (this.tickWaited >= this.gameTickTime) {
            this.doGameTicks();

            this.tickWaited -= this.gameTickTime;
        }

        this.currentTime = nextTime;

        this.uiBridge.emitUpdate();
    }

    doGameTicks() {
        for (let i = 0; i < this.tickers.length; i++) {
            // this.tickers[i].onTick();
            this.tickers[i]();
        }
    }

    registerTicker(ticker: GameTicker) {
        this.tickers.push(ticker.onTick.bind(ticker));
    }
}