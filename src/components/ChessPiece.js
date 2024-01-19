import PIECES from "../data/pieces.json";
import RULES from "../data/rules.json";

const getSkin = (theme, filename) => {
    const ext = theme === "normal" ? "svg" : "png";
    return `pieces/${theme}/${filename}.${ext}`;
};

class ChessPiece extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.theme = "normal";
    }

    static get styles() {
        return `
            :host {
                clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }

            .piece img {
                image-rendering: pixelated;
                filter: drop-shadow(0 0 1px #0006);
                cursor: pointer;
            }
        `;
    }

    connectedCallback() {
        this.type = this.getAttribute("type");
        this.color = Object.keys(PIECES).includes(this.type) ? "black" : "white";
        this.render();
    }

    get directions() {
        const type = this.type.toLowerCase();
        return RULES[type];
    }

    isWhite() {
        return this.color === "white";
    }

    isBlack() {
        return this.color === "black";
    }

    isPawn() {
        return this.type.toLowerCase() === "p";
    }

    isRook() {
        return this.type.toLowerCase() === "r";
    }

    isKing() {
        return this.type.toLowerCase() === "k";
    }

    isBishop() {
        return this.type.toLowerCase() === "b";
    }

    isKnight() {
        return this.type.toLowerCase() === "n";
    }

    isQueen() {
        return this.type.toLowerCase() === "q";
    }

    isOpponentOf(piece) {
        return this.color !== piece.color;
    }

    slide(source, target) {
        const cellSize = source.clientWidth;
        const x = (target.coords[0] - source.coords[0]) * cellSize;
        const y = (target.coords[1] - source.coords[1]) * cellSize;

        return new Promise((resolve) => {
        const animation = this.animate([
            { transform: "translate(0, 0) scale(1.2)", zIndex: 15 },
            { transform: `translate(${x}px, ${y}px) scale(1.2)`, zIndex: 15 }
        ], {
            duration: 500,
            iterations: 1
        });
        animation.onfinish = () => resolve();
        });
    }

    changeTheme(theme = "pixel") {
        this.theme = theme;
        const piece = PIECES[this.type.toUpperCase()];
        const img = this.shadowRoot.querySelector(".piece img");
        img.src = getSkin(theme, `${this.color}-${piece}`);
    }

    render() {
        const piece = PIECES[this.type.toUpperCase()];
        const url = getSkin(this.theme, `${this.color}-${piece}`);
        this.shadowRoot.innerHTML =`
        <style>${ChessPiece.styles}</style>
        <div class="piece">
            <img src="${url}" alt="${this.color} ${piece}" />
        </div>`;
    }
}

customElements.define("chess-piece", ChessPiece);