import cells from "./cells";

class AutomationController {
    tick() {
        return;
        cells.getData().cores.forEach((element, i) => {
            // cells.buyCore(i, 3);
        });
    }
}

export default new AutomationController;