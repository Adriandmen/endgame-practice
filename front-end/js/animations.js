/**
 * Drag start method.
 * @param {MouseEvent} event - Mouse event.
 * @param {HTMLElement} pieceDiv - Current piece as an HTML element.
 */
var dragStart = function (event, pieceDiv) {
    pieceDiv.classList.add("dragging");
    dragPiece.classList.remove(...chessPieceClasses);
    dragPiece.classList.add(chessPieceClasses.find(c => pieceDiv.classList.contains(c)));
    dragPiece.style.display = "block";
    dragging = true;
    currentDraggingPiece = pieceDiv;
    dragEvent(event);
}

/**
 * Dragging event method.
 * @param {MouseEvent} event - Current mouse event.
 */
var dragEvent = function (event) {
    if (dragging) {
        dragPiece.style.top = `${event.pageY - chessboard.topOffset() - dragPiece.clientHeight / 2}px`;
        dragPiece.style.left = `${event.pageX - chessboard.leftOffset() - dragPiece.clientWidth / 2}px`;    
    }
}

var dragEnd = function (event) {
    if (!dragging) {
        return;
    }

    currentDraggingPiece.classList.remove("dragging");
    dragPiece.style.display = "none";

    var dropLocation = chessboard.getSquareFromMouseEvent(event);
    chessboard.move(currentDraggingPiece, dropLocation);
    dragging = false;
}

window.onmousemove = dragEvent;
window.onmouseup = dragEnd;