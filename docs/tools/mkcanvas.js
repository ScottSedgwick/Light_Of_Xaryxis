var background = scroll1;

function changeImage(imgUrl) {
    background = imgUrl;
    buildCanvas();
}

function buildThumbnails() {
    const height = 100;
    const width = 100;
    buildThumbnail(height, width, "scroll1", scroll1);
    buildThumbnail(height, width, "scroll2", scroll2);
    buildThumbnail(height, width, "scroll3", scroll3);
    buildThumbnail(height, width, "scroll4", scroll4);
    buildCanvas();
}

function buildThumbnail(h, w, el, img) {
    const canvas = document.getElementById(el);
    canvas.height = h;
    canvas.width = w;
    const ctx = canvas.getContext("2d");
    var image = new Image();
    image.onload = function() {
        ctx.drawImage(image, 0, -5, h, w);
    }
    image.src = img;
}

function buildCanvas() {
    const canvas = document.getElementById("sandbox");
    var height = Number(document.getElementById("height").value);
    var topmargin = Number(document.getElementById("topmargin").value);
    var width = Number(document.getElementById("width").value);
    var leftmargin = Number(document.getElementById("leftmargin").value);
    var rightmargin = Number(document.getElementById("rightmargin").value);
    var font = document.getElementById("font").value;
    var fontheight = Number(document.getElementById("fontsize").value);

    canvas.height = height;
    canvas.width = width;
    const ctx = canvas.getContext("2d");

    ctx.font = fontheight + "px " + font;
    const msg = document.getElementById("txtmsg").value;
    //const msg = "This is a test message.  Please ignore. Go about your business.";
    const lines = getLines(ctx, msg, width - leftmargin - rightmargin);

    var image = new Image;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, width, height);
        for (var i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], leftmargin, topmargin + i * fontheight, width - leftmargin - rightmargin);
        }
    };
    image.src = background;
}

function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

function exportImage() {
    const canvas = document.getElementById("sandbox");
    // Create a Blob from the canvas data
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'canvas-image.png';
        a.click();
        URL.revokeObjectURL(url); // Clean up after download
    }, 'image/png');
}