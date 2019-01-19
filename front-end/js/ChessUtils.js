class ChessUtils {

    /**
     * Converts an FEN represented piece to its corresponding CSS class.
     * @param {String} color - The color of the piece, denoted as 'w' or 'b'
     * @param {String} piece - The piece, denoted as 'p', 'n', 'r', 'b', 'q' or 'k'
     */
    static fenToCSSPiece(color, piece) {
        var cssClass = "";
        if (color === "w") {
            cssClass += "white-";
        } else if (color === "b") {
            cssClass += "black-";
        } else {
            throw Error(`Could not determine color from string '${color}'`);
        }

        switch (piece) {
            case "p":
                cssClass += "pawn";
                break;

            case "n":
                cssClass += "knight";
                break;

            case "r":
                cssClass += "rook";
                break;

            case "b":
                cssClass += "bishop";
                break;

            case "q":
                cssClass += "queen";
                break;

            case "k":
                cssClass += "king";
                break;

            default:
                throw Error(`Could not determine piedce from string '${color}'`);
        }

        return cssClass;
    }

    /**
     * Converts the location represented as a cartesian coordinate to a chess square.
     * @param {Number} x - The x location of the square.
     * @param {Number} y - The y location of the square.
     */
    static positionToSquare(x, y) {
        var letter = String.fromCharCode(x + 97);
        var number = String.fromCharCode(y + 49);

        return letter + number;
    }
}