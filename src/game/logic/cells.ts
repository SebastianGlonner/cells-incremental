let currentAmountOfCells = 0;

class Server {
    buyCell() {
        currentAmountOfCells++;
    }

    getCurrentAmountOfCells() {
        return currentAmountOfCells;
    }
}

export const cellServer = new Server();
