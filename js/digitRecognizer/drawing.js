import exportJsonData from '../exportJsonData.js'

export default class Drawing {
    #size = 300
    #canvas
    #ctx
    #clearBtn
    #predictBtn
    #moving = false;
    #canvas2

    #model


    constructor(canvasId, clearBtnId, predictBtnId, size) {
        this.#canvas = document.getElementById(canvasId);
        this.#clearBtn = document.getElementById(clearBtnId);
        this.#predictBtn = document.getElementById(predictBtnId);
        this.#canvas2 = document.getElementById('canvas2')

        size && (this.#size = size);

        this.#ctx = this.#canvas.getContext('2d');


        this.#ctx.strokeStyle = "black";




        if (!this.#canvas) return;
        this.#canvas.height = this.#size;
        this.#canvas.width = this.#size;

        this.#ctx.lineWidth = 15;

    }

    async #initModel() {
        this.#model = await tf.loadLayersModel('../../models/digitH5Model/model.json')
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

            await this.#predict();
        })

        this.#canvas.addEventListener('mousemove', (e) => {
            if (!this.#moving) return;

            // const { offsetX, offsetY, x, y, clientX, clientY, screenX, screenY, pageX, pageY, layerX, layerY } = e;
            // console.table({ offsetX, offsetY, x, y, clientX, clientY, screenX, screenY, pageX, pageY, layerX, layerY });

            this.#ctx.lineTo(e.offsetX, e.offsetY);
            this.#ctx.stroke();
        })

        this.#clearBtn.addEventListener('click', () => { this.#clear(); })

        this.#predictBtn.addEventListener('click', () => {
            this.#predict();
        })
    }

    #clear() {
        this.#ctx.clearRect(0, 0, this.#size, this.#size)
        this.#ctx.fillStyle = "white";
        this.#ctx.fillRect(0, 0, this.#size, this.#size);
    }
    async #predict() {
        let imgTensor = tf.browser.fromPixels(this.#canvas, 1);
        const nnResizeTensor = tf.image.resizeBilinear(
            imgTensor,
            [28, 28,],
            true
        )

        await tf.browser.toPixels(nnResizeTensor, this.#canvas2)

        const img = this.#canvas2.getContext('2d').getImageData(0, 0, 28, 28)

        // console.log(this.#canvas2.toDataURL())//getImageData(0, 0, 28, 28))

        try {

            let newArr = [];
            for (let i = 0; i < 28; i++) {
                newArr.push([]);
                for (let j = 0; j < 28; j++) {
                    const index = (i * 28 + j) * 4
                    const count = img.data[index] + img.data[index + 1] + img.data[index + 2];

                    let colour = 255;
                    if (count > 510) colour = 0;
                    newArr[i][j] = colour
                }
            }

            // console.log(newArr);

            // exportJsonData(JSON.stringify(newArr))
            const output = this.#model.predict(tf.tensor([newArr]));
            document.getElementById('value').textContent = Array.from(output.dataSync()).findIndex(value => value === 1)

        } catch (err) {
            console.log(err);
        }

    }


    async start() {
        await this.#initModel();
        this.#init();
    }
}

