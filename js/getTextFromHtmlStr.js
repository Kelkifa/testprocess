
const testInput = document.getElementById('testInput');
const debounceEle = document.getElementById('debounce');
const throlleEle = document.getElementById('throlle');

testInput.addEventListener('keyup', handleInputChange);


const updateDebounce = debounce((text) => { debounceEle.textContent = text; console.log(`debound ${Math.round(Math.random() * 10)}`); }, 1000)

const updateThrolle = throlle((text) => { throlleEle.textContent = text; console.log(`throlle ${Math.round(Math.random() * 10)}`) }, 1000);

function handleInputChange(e) {
    updateDebounce(e.target.value);
    updateThrolle(e.target.value);
}


function debounce(callback, delay) {
    let timeOut;
    return (...args) => {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => { callback(...args) }, delay);
    }
}

function throlle(callback, delay) {
    let isPending = false;
    let waitingArg = null;

    return (...args) => {
        if (isPending === true) {
            waitingArg = args;
            return;
        }

        isPending = true;
        setTimeout(() => {
            if (waitingArg === null) {
                callback(...args);
            } else {
                callback(...waitingArg)
                waitingArg = null
            }
            isPending = false;
        }, delay);
    }
}