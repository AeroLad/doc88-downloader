!function(){var jspower=window.jspower=window.jspower||{};if(jspower.injector)return;jspower.injector={fetchSync,SyncPromise},jspower.injector.importSync=url=>fetchSync(url).then(text=>eval(text),e=>console.error(e));let fetchedUrls={};function fetchSync(e){return fetchedUrls[e]||(fetchedUrls[e]=new SyncPromise((n,r)=>{var t=new XMLHttpRequest;t.addEventListener("error",e=>r(t.responseText)),t.open("GET",e,!1),t.send(),t.responseText&&n(t.responseText)}))}function SyncPromise(e){let n=this,r,t,o,i;return this.then=function(e,l){return(r=e,t=l,null!==o&&void 0!=o)?Promise.resolve(r(o)||o):null!==i&&void 0!=i?Promise.reject(t(i)||i):Promise.resolve(n)},e(e=>{(null===o||void 0==o)&&(null===i||void 0==i)&&(o=null===e||void 0==e||e,r&&r(e))},e=>{(null===o||void 0==o)&&(null===i||void 0==i)&&(i=null===e||void 0==e||e,t&&t(e))}),n}window.imports=jspower.injector.importSync,jspower.injector.importCors=url=>fetch(url).then(e=>e.text()).then(text=>eval(text)).catch(e=>console.error(e))}();
imports('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');

var pageArea = document.getElementById("pageNumInput").parentNode;
var pageNumInput = document.getElementById("pageNumInput");
var totalPages = parseInt(pageArea.innerText.replaceAll(" ", "").replace("/", ""));
var currentPage = 0;
var interval = 800;
var compression = "MEDIUM"; // 'NONE' || 'FAST' || 'MEDIUM' || 'SLOW'
var prePageButton = document.getElementById("prePageButton");
var nextPageButton = document.getElementById("nextPageButton");
var pdf = jspdf.jsPDF("portait","mm", "a4");

function findFirstPositive (f,b=1,d=(e,g,c)=>g<e?-1:0<f(c=e+g>>>1)?c==e||0>=f(c-1)?c:d(e,c-1):d(c+1,g)) {
    for (;0>=f(b);b<<=1);return d(b>>>1,b)|0
}

var dpi = findFirstPositive(x => matchMedia(`(max-resolution: ${x}dpi)`).matches)

async function downloadDocument() {
    console.log("Converting to PDF...")
    for (currentPage = 1; currentPage <= totalPages; currentPage++ ){
        var pageCanvas = document.getElementById("page_"+currentPage);
        if (pageCanvas == null) break;
        console.log("Converting: " + currentPage + " / " + totalPages);
        var image = pageCanvas.toDataURL("image/png",1);
        var imageWidth = pageCanvas.clientWidth * ( 1.0 / dpi) * 25.4;
        var imageHeight = pageCanvas.clientHeight * (1.0 / dpi) * 25.4;
        var scalingFactor = Math.min( pdf.internal.pageSize.getWidth() / imageWidth, pdf.internal.pageSize.getHeight() / imageHeight );
        if (currentPage != 1) { pdf.addPage(); }
        pdf.addImage(image,"PNG",0,0, imageWidth * scalingFactor, imageHeight * scalingFactor, null, compression);

    }
    await new Promise(resolve => setTimeout(resolve, 4000)); // Wait a few seconds before saving to ensure the last image has been added.
    pdf.save("output.pdf");
    console.log("Converted! Downloading...")
}

function ScrollDocument() {
    setTimeout(function () {
        currentPage += 1;
        console.log("Scrolling to: " + currentPage + " / " + totalPages);
        pageNumInput.dispatchEvent(new Event("focus"));
        pageNumInput.value = currentPage;
        pageNumInput.dispatchEvent(new Event("blur"));
        pageNumInput.blur();
        if (currentPage < totalPages) {
            ScrollDocument();
        } else {
            console.log("Finished scrolling");
            downloadDocument();
        }
    }, interval);
}
ScrollDocument();