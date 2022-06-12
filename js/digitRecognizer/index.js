import Drawing from "./Drawing.js";

const canvas = document.getElementById('canvas');
const canvas2 = document.getElementById('canvas2');
const imgEle = document.getElementById('img');

const model = await tf.loadLayersModel('../../models/digitH5Model/model.json')
// let imgTensor = tf.browser.fromPixels(imgEle, 1);
// const nnResizeTensor = tf.image.resizeBilinear(
//     imgTensor,
//     [28, 28,],
//     true
// )
// await tf.browser.toPixels(nnResizeTensor, canvas2)

const drawing = new Drawing('canvas', 'clearBtn', 'predictBtn')

drawing.start();


// document.getElementById('predictBtn').addEventListener('click', async () => {
//     try {

//         const img = canvas2.getContext('2d').getImageData(0, 0, 28, 28);
//         let newArr = [];
//         for (let i = 0; i < 28; i++) {
//             newArr.push([]);
//             for (let j = 0; j < 28; j++) {
//                 const index = (i * 28 + j) * 4
//                 const count = img.data[index] + img.data[index + 1] + img.data[index + 2];

//                 let colour = 255;
//                 if (count > 510) colour = 0;
//                 newArr[i][j] = colour
//             }
//         }

//         const output = model.predict(tf.tensor([newArr]));
//         console.log(Array.from(output.dataSync()));

//         // let imgTensor = tf.browser.fromPixels(imgEle, 1);

//         // // console.log(imgTensor);
//         // const nnResizeTensor = tf.image.resizeBilinear(
//         //     imgTensor,
//         //     [28, 28,],
//         //     true
//         // )

//         // // imgTensor = imgTensor.reshape([28, 28, 1]);
//         // // imgTensor = tf.cast(imgTensor, 'float32');
//         // await tf.browser.toPixels(nnResizeTensor, canvas2)

//         // const img = canvas2.getContext('2d').getImageData(0, 0, 28, 28);
//         // console.log(img);

//         // const output = model.predict(imgEle)

//         // console.log(Array.from(output.dataSync()));


//     } catch (err) {
//         console.log(err);
//     }

// })

