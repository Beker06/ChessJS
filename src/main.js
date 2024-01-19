import * as dat from "dat.gui";
import "./components/ChessBoard.js";

const board = document.createElement("chess-board");

board.setFromFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w");

const gui = new dat.GUI();

const options = {
    pieces: "normal",
    theme: "bekerdev"
};

gui.add(options, "pieces", ["normal", "pixel"])
.onChange(data => board.changePieces(data));
gui.add(options, "theme", ["wood", "bekerdev", "forest", "classic", "ocean"])
.onChange(data => {
    const chessboard = document.querySelector("chess-board");
    chessboard.classList.remove("wood", "bekerdev", "forest", "classic", "ocean");
    chessboard.classList.add(data);
});

gui.close();