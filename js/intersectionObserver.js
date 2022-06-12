
const inter = new IntersectionObserver((entries) => { console.log(entries); })

const testEle = document.querySelector('.test.last');


// console.log(testEle);


inter.observe(testEle)

