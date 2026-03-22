var background = scroll1;
var quill;

function changeImage(imgUrl) {
    console.warn("What?");
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
    buildEditor();
    buildCanvas();
}

function buildEditor() {
    const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['image'],

  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];
    quill = new Quill('#editor', {
        modules: {
            syntax: true,
            toolbar: toolbarOptions,
        },
        placeholder: 'Compose an epic...',
        theme: 'snow', // or 'bubble'
    });
    quill.on('text-change', (delta, olddelta, source) => {
        buildCanvas();
    });
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
    var imagebox = document.getElementById("imagebox");
    var height = document.getElementById("height").value;
    var width = document.getElementById("width").value;
    var top = document.getElementById("topmargin").value;
    var left = document.getElementById("leftmargin").value;
    var right = document.getElementById("rightmargin").value;
    imagebox.style.backgroundImage = "url('" + background + "')";
    imagebox.style.backgroundRepeat = "no-repeat";
    imagebox.style.backgroundSize = "100% 100%";
    imagebox.style.height = height + "px";
    imagebox.style.width = width + "px";
    imagebox.style.paddingTop = top + "px";
    imagebox.style.paddingLeft = left + "px";
    imagebox.style.paddingRight = right + "px";

    var msg = quill.getSemanticHTML();
    var sandbox = document.getElementById("sandbox");
    sandbox.innerHTML = msg;
}

function getNlLines(ctx, text, maxWidth) {
    return text.split(/\r?\n/).flatMap((x) => getLines(ctx, x, maxWidth));
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
    const source = document.getElementById("imagebox");

    html2canvas(source).then(function(canvas) {// Create a Blob from the canvas data
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'canvas-image.png';
            a.click();
            URL.revokeObjectURL(url); // Clean up after download
        }, 'image/png');
    });
}