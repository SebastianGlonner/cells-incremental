let currentAmountOfCells = 0;

class Server {
    buyCell() {
        currentAmountOfCells++;
    }
}

export const cellServer = new Server();
