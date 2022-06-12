window.addEventListener("load", () => {
    const canvas = document.getElementById('canvas');

    const ctx = canvas.getContext('2d');

    const getImgBtn = document.getElementById("getImageBtn");

    // Resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const drawing = new Drawing('canvas');

    drawing.start();
    getImgBtn.addEventListener("click", () => { drawing.getImg() })

})


class Drawing {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // console.log(this.ctx);

        this.name = "huan";
    }


    startPosition(e) {
        this.painting = true;

        // console.log(this.ctx);
        this.ctx.moveTo(e.clientX, e.clientY)
        this.ctx.lineWidth = 10;
        // this.ctx.lineWidth(10);

    }
    finishedPosition() {
        this.painting = false;
    }

    draw(e) {
        if (!this.painting) return;
        this.ctx.lineWidth = 0;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = "red";

        this.ctx.lineTo(e.clientX, e.clientY);
        this.ctx.stroke();
    }
    start() {
        canvas.addEventListener('mousedown', (e) => { this.startPosition(e) });
        canvas.addEventListener('mouseup', () => { this.finishedPosition() });
        canvas.addEventListener('mousemove', (e) => { this.draw(e) });
    }

    getImg() {
        let target = new Image();
        const imgUrl = this.canvas.toDataURL();

        const imgEle = document.querySelector(".img")
        imgEle.src = imgUrl;
    }
}