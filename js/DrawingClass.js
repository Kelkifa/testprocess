export default class DrawingClass {
    #canvas
    #ctx

    #clearBtn

    #size = 200

    #moving = false;


    constructor(canvasId, clearBtnId) {
        this.#canvas = document.getElementById(canvasId);

        this.#ctx = this.#canvas.getContext('2d');
        this.#clearBtn = document.getElementById(clearBtnId);

        this.#ctx.strokeStyle = "black";




        if (!this.#canvas) return;
        this.#canvas.height = this.#size;
        this.#canvas.width = this.#size;

        this.#ctx.lineWidth = 10;

    }
    #init() {
        this.#clear();

        this.#canvas.addEventListener('mousedown', (e) => {
            this.#ctx.moveTo(e.offsetX, e.offsetY);

            this.#moving = true;

            this.#ctx.beginPath();

        })
        this.#canvas.addEventListener('mouseup', async () => {
            this.#moving = false;

            this.#ctx.moveTo(0, 0);

        })

        this.#canvas.addEventListener('mousemove', (e) => {
            if (!this.#moving) return;

            // const { offsetX, offsetY, x, y, clientX, clientY, screenX, screenY, pageX, pageY, layerX, layerY } = e;
            // console.table({ offsetX, offsetY, x, y, clientX, clientY, screenX, screenY, pageX, pageY, layerX, layerY });

            this.#ctx.lineTo(e.offsetX, e.offsetY);
            this.#ctx.stroke();
        })

        this.#clearBtn.addEventListener('click', () => {
            this.#clear();
        })
    }

    #clear() {
        this.#ctx.clearRect(0, 0, this.#size, this.#size)
        this.#ctx.fillStyle = "white";
        this.#ctx.fillRect(0, 0, this.#size, this.#size);
    }
    start() {
        this.#init();
    }
}

