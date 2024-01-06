/**
 * @property {Array} table;
 */
export default class Table {
    static table;
    constructor() {
        const temptable = [];
        for (let i = 0; i < 6; i++) {
            temptable[i] = [];
            for (let j = 0; j < 7; j++) {
                temptable[i][j] = 0;
            }
        }
        this.table = temptable;
    }

    reset() {
        const temptable = [];
        for (let i = 0; i < 6; i++) {
            temptable[i] = [];
            for (let j = 0; j < 7; j++) {
                temptable[i][j] = 0;
            }
        }
        this.table = temptable;
    }

    /**
     * Get the game of 4 table
     * @returns {Array}
     */
    getTable() {
        return this.table;
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} val
     */
    updateTable(x, y, val) {
        this.table[x][y] = val;
    }
    /**
     * Check if the last move resulted in a win
     * @param {number} x - X coordinate of the last move (row)
     * @param {number} y - Y coordinate of the last move (column)
     * @param {number} val - Value of the last move (1 for player yellow, 2 for player red)
     * @returns {boolean} - True if the last move is a winning move, false otherwise
     */
    checkWin(x, y, val) {
        // Check horizontally
        if (
            this.checkDirection(x, y, val, 1, 0) +
                this.checkDirection(x, y, val, -1, 0) >=
            4
        ) {
            return true;
        }
        // Check vertically
        if (
            this.checkDirection(x, y, val, 0, 1) +
                this.checkDirection(x, y, val, 0, -1) >=
            4
        ) {
            return true;
        }
        // Check diagonally (both directions)
        if (
            this.checkDirection(x, y, val, 1, 1) +
                this.checkDirection(x, y, val, -1, -1) >=
                4 ||
            this.checkDirection(x, y, val, 1, -1) +
                this.checkDirection(x, y, val, -1, 1) >=
                4
        ) {
            return true;
        }
        return false;
    }

    /**
     * Check if there are four consecutive pieces in a given direction
     * @param {number} x - X coordinate of the last move (row)
     * @param {number} y - Y coordinate of the last move (column)
     * @param {number} val - Value of the last move (1 for player yellow, 2 for player red)
     * @param {number} dx - X direction to check (1, 0, or -1)
     * @param {number} dy - Y direction to check (0, 1, or -1)
     * @returns {number} - Number of consecutive pieces in the given direction
     */
    checkDirection(x, y, val, dx, dy) {
        let count = 0;
        for (let i = -3; i <= 3; i++) {
            const newX = x + i * dx;
            const newY = y + i * dy;

            // Check if the coordinates are within the board
            if (newX >= 0 && newX < 6 && newY >= 0 && newY < 7) {
                if (this.table[newX][newY] === val) {
                    count++;
                } else {
                    break; // Stop counting if a different value is encountered
                }
            }
        }
        return count;
    }

    checkTie(){
        for(let i = 0; i<=5; i++){
            for(let j= 0; j<=6; j++){
                if(this.table[i][j] == 0) return false;
            }
        }
        return true;
    }
}
