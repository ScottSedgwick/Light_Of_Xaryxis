var background = 'images/scroll1.png';
var mtop = 0.160;
var mleft = 0.170;
var mwidth = 0.650;
var quill;

function changeImage(imgUrl, top, left, width) {
    background = imgUrl;
    mtop = top;
    mleft = left;
    mwidth = width;
    buildCanvas();
}

function buildThumbnails() {
    buildEditor();
    buildCanvas();
}

function buildEditor() {
    const Font = Quill.import('attributors/class/font');
    Font.whitelist = ['sans-serif','serif', 'monospace', 'roboto', 'firacode', 'nunito', 'inter', 'rubik', 'dm-sans']; 
    Quill.register(Font, true);

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['image'],

        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': Font.whitelist }],
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

function buildCanvas() {
    var imagebox = document.getElementById("imagebox");
    var height = document.getElementById("height").value;
    var width = document.getElementById("width").value;
    var ptop = height * mtop;
    var pleft = width * mleft;
    var pwidth = width * mwidth;

    imagebox.style.backgroundImage = "url('" + background + "')";
    imagebox.style.backgroundRepeat = "no-repeat";
    imagebox.style.backgroundSize = "100% 100%";
    imagebox.style.height = height + "px";
    imagebox.style.width = width + "px";
    imagebox.style.paddingTop = ptop + "px";
    imagebox.style.paddingLeft = pleft + "px";

    var msg = quill.getSemanticHTML();
    var sandbox = document.getElementById("sandbox");
    sandbox.style.maxWidth = pwidth + "px";
    sandbox.innerHTML = msg.replace(/&nbsp;/g, " ");
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

async function exportImage() {
    const source = document.getElementById("imagebox");
    try {
        htmlToImage
            .toPng(source)
            .then(function(dataUrl) {
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = 'scroll.png';
                a.click();
            });
    } catch (error) {
        console.error(error);
    }
}