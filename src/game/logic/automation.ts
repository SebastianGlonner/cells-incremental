import cells from "./cells";

class AutomationController {
    tick() {
        cells.getData().cores.forEach((element, i) => {
            cells.buyCore(i);
        });
    }
}

export default new AutomationController;