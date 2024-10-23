const puzzleContainer = document.getElementById('puzzle-container');
const message = document.getElementById('message');

// Use the new image URL for the puzzle
const imageSrc = './metrobouw-interieur-metrostation-nieuwmarkt-bestanddeelnr-929-8951-d0c198.jpg';



// Store the correct positions for all pieces (assuming 4x3 grid)
const correctPositions = [
    { left: 0, top: 0 }, { left: 100, top: 0 }, { left: 200, top: 0 }, { left: 300, top: 0 },
    { left: 0, top: 100 }, { left: 100, top: 100 }, { left: 200, top: 100 }, { left: 300, top: 100 },
    { left: 0, top: 200 }, { left: 100, top: 200 }, { left: 200, top: 200 }, { left: 300, top: 200 }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

function

let draggedPiece = null;
let draggedPieceStartX = 0;
let draggedPieceStartY = 0;

function dragStart(event) {
    draggedPiece = event.target;
    draggedPieceStartX = event.clientX - draggedPiece.offsetLeft;
    draggedPieceStartY = event.clientY - draggedPiece.offsetTop;

    draggedPiece.style.opacity = '0.7';
}

function dragEnd(event) {
    if (!draggedPiece) return;

    const x = event.clientX - draggedPieceStartX;
    const y = event.clientY - draggedPieceStartY;

    const snappedLeft = Math.round(x / 100) * 100;
    const snappedTop = Math.round(y / 100) * 100;

    draggedPiece.style.left = `${snappedLeft}px`;
    draggedPiece.style.top = `${snappedTop}px`;

    draggedPiece.style.opacity = '1';
    draggedPiece = null;

    checkPuzzleCompletion();
}

function checkPuzzleCompletion() {
    const pieces = document.querySelectorAll('.piece');
    let solved = true;

    pieces.forEach((piece, index) => {
        const left = parseInt(piece.style.left);
        const top = parseInt(piece.style.top);

        if (left !== correctPositions[index].left || top !== correctPositions[index].top) {
            solved = false;
        }
    });

    if (solved) {
        message.innerHTML = 'Puzzle Solved!';
        // Optionally add sound or celebration effect here
    }
}

// Initialize the puzzle on page load
createPuzzle();
