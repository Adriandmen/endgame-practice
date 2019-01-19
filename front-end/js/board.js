try { /* For autocompletion purposes only */ var Chess = require("chess.js").Chess; } catch { "none" }

class ChessBoard {

    /**
     * Instantiates a new chess board from the given position.
     * @param {String} position - The FEN position of the chess board.
     * @param {String} id - The id of the chess board div.
     */
    constructor(position, id) {
        this.position = position;
        this.id = id;
        this.board = document.getElementById(this.id);
        this.chess = new Chess(position);

        this.initBoard();
    }

    /**
     * Initializes the board on the HTML page, creating a new chess board.
     */
    initBoard() {

        // Create the chess board.
        SHTML.Divs(8, function(index, div) {
            div.classList.add("chess-board-row");

            // Create 8 tiles in that row.
            SHTML.Divs(8, function(letterIndex, currDiv, numberIndex) {
                currDiv.classList.add("chess-board-tile");
                currDiv.id = String.fromCharCode(97 + letterIndex) + (8 - numberIndex).toString();
            }, index).forEach(tile => div.appendChild(tile));

        }).forEach(row => this.board.appendChild(row));

        var pieceCount = 0;
        this.chess.SQUARES.forEach(tileId => {
            var currentPiece = this.chess.get(tileId);
            if (currentPiece !== null) {
                var pieceDiv = document.createElement("div");
                pieceDiv.classList.add("chess-piece");
                pieceDiv.setAttribute("position", tileId);
                pieceDiv.classList.add(ChessUtils.fenToCSSPiece(currentPiece.color, currentPiece.type));
                pieceDiv.style.transform = this.getTransformCSS(tileId);
                pieceDiv.id = `piece-${pieceCount}`;
                pieceDiv.onmousedown = function (event) {
                    dragStart(event, pieceDiv);
                }
                pieceCount++;
                this.board.appendChild(pieceDiv);
            }
        })
    }

    topOffset() {
        return document.getElementById("a8").getBoundingClientRect().top
        // return (document.getElementsByClassName("chessboard-container")[0].clientHeight - this.board.clientHeight) / 2;
    }

    leftOffset() {
        return document.getElementById("a8").getBoundingClientRect().left
        return (document.getElementsByClassName("chessboard-container")[0].clientWidth - this.board.clientWidth) / 2;
    }

    /**
     * Attempts to move a piece to the given square.
     * @param {HTMLElement} piece - The div representing the piece that is being moved.
     * @param {String} to - The square location to which the piece is moved.
     */
    move(piece, to) {

        var from = piece.getAttribute("position");

        console.log(from, to);

        // Check if the move is legal
        if (!this.canMove(from, to))
            return;
        
        this.chess.move({from: from, to: to});

        var currentPieceOnTo;
        for (const piece of document.getElementsByClassName("chess-piece")) {
            if (piece.getAttribute("position") === to) {
                currentPieceOnTo = piece;
                break;
            }
        }

        if (currentPieceOnTo !== undefined) {
            this.board.removeChild(currentPieceOnTo);
        }

        piece.setAttribute("position", to);
        piece.style.transform = this.getTransformCSS(to);
        document.getElementById("notation-pgn").innerHTML = this.chess.pgn({newline_char: "<br>"});
    }

    canMove(from, to) {
        return this.chess.moves({square: from, verbose: true}).find(move => move.to === to) !== undefined;
    }

    /**
     * Converts a mouse event object to a square on the chess board.
     * @param {MouseEvent} event - The mouse event.
     */
    getSquareFromMouseEvent(event) {
        var boardHeight = this.board.clientHeight;
        var boardWidth = this.board.clientWidth;
        var topPosition = event.pageY - this.topOffset();
        var leftPosition = event.pageX - this.leftOffset();

        // Check if the position is in bounds.
        if (topPosition < 0 || topPosition > boardHeight || leftPosition < 0 || leftPosition > boardWidth) {
            return null;
        }
        
        var x = Math.floor(leftPosition / (boardWidth / 8));
        var y = 7 - Math.floor(topPosition / (boardHeight / 8));
        return ChessUtils.positionToSquare(x, y);
    }

    /**
     * Returns the transform CSS from the given square. This method computes the translation needed to
     * place the piece on its corresponding square.
     * 
     * @param {string} square - The square location.
     * @returns {string} - The string containing the translation CSS property.
     */
    getTransformCSS(square) {
        var x = square.charCodeAt(0) - 97;
        var y = square.charCodeAt(1) - 49;

        console.log({x: x, y: y, loc: square});
        var horizontalTranslate = 0.125 * this.board.clientHeight * x;
        var verticalTranslate = 0.125 * this.board.clientWidth * (y + 1);
        return `translate(${horizontalTranslate}px, -${verticalTranslate}px)`;
    }
}