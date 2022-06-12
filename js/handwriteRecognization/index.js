import DrawingClass from "../DrawingClass.js";
import exportJsonData from "../exportJsonData.js";

const ENCODER = ['A', 'B', 'C', 'D', 'E', 'F',
    'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z',]
// canvas
const canvasEle = document.getElementById("canvas");
const canvasEle2 = document.getElementById("canvas2");

// Model
const model = await tf.loadLayersModel('../../models/handwrite/model.json');

// Drawing
const drawing = new DrawingClass('canvas', 'clearBtn');
drawing.start();

// Click predict
const predictBtn = document.getElementById('predictBtn')

predictBtn.addEventListener('click', async () => {
    // let img = canvasEle.getContext('2d').getImageData(0, 0, 200, 200).data;

    // console.log(img);
    // let _pixels = [];
    // let pixels = [];


    let imgTensor = tf.browser.fromPixels(canvasEle, 1);
    const nnResizeTensor = tf.image.resizeBilinear(
        imgTensor,
        [50, 50,],
        true
    )

    await tf.browser.toPixels(nnResizeTensor, canvasEle2)

    const img = canvasEle2.getContext('2d').getImageData(0, 0, 50, 50)

    // console.log(img.data);


    // white : 0
    // gray :125.5
    // black : 255
    try {

        let newArr = [];

        // let newArrForCompai = []
        for (let i = 0; i < 50; i++) {
            newArr.push([]);
            for (let j = 0; j < 50; j++) {
                const index = (i * 50 + j) * 4
                const count = img.data[index] + img.data[index + 1] + img.data[index + 2];

                let colour = 255;
                // if (count > 255) colour = 127.5;
                if (count > 510) colour = 0;
                newArr[i][j] = [colour]
            }
        }

        // for (let i = 0; i < 50 * 50; i++) {
        //     const count = img.data[i * 4] + img.data[i * 4 + 1] + img.data[i * 4 + 2];

        //     let colour = 255;
        //     // if (count > 255) colour = 127.5;
        //     if (count > 510) colour = 0;
        //     newArr[i] = colour
        // }


        // // const a = tf.reshape(tf.tensor(newArr), [1, 50, 50, 1])
        // exportJsonData(JSON.stringify(newArr));

        const a = tf.tensor([newArr])
        // const a = tf.tensor([testJson])
        // const a = tf.tensor([seeJson])

        // OUTPUT
        const output = model.predict(a);
        const resultArr = Array.from(output.dataSync())
        // console.log(resultArr);
        const max = Math.max(...resultArr);

        const result = resultArr.indexOf(max)
        console.log(result);
        // console.log(`encode : ${ENCODER[result + 1]}`);

    } catch (err) {
        console.log(err);
    }

})
