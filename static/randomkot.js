$.LoadingOverlaySetup({
    background      : "rgba(34, 47, 62, 0.8)",
    imageAnimation  : "1.5s fadein",
    imageColor      : "#1dd1a1"
});

async function fetchApi(text, filter, size, color){
    $("#kicak").LoadingOverlay("show");
    const ms = Date.now();
    if(text===""){
        text = " ";
    }
    let response = await fetch("https://cataas.com/cat/says/"+ text +"?filter="+ filter +"&size=" + size + "&color=" + color + "&dummy=" + ms);
    // ?dummy=ms jest dodane po to, zeby fetch nie pobieral obrazka zapisanego w catche
    let cat = await response.blob();
    let catUrl = URL.createObjectURL(cat);
    $("#kicak").LoadingOverlay("hide");
    return catUrl;
}

async function generateCat(text, filter, size, color){
    let catUrl = await fetchApi(text, filter, size, color);
    $("#kicak").css('background-image','url('+catUrl+')');
    $("#download").attr("href", catUrl);
    $("#full-image").attr("src", catUrl);
}

function toggleSettings(){
    $("#catForm").css("display", $("#catForm").css("display") === "flex" ? "none" : "flex");
}

function toggleFullImage(){
    $("#full-img").css("display", $("#full-img").css("display") === "block" ? "none" : "block");
}

$(document).on("submit", "#catForm", function(e) {
    e.preventDefault();
    let text = event.target.text.value;
    let filter = $("#select-filter").val();
    let size = event.target.size.value;
    let color = $("#select-color").val();
    generateCat(text, filter, size, color);
})

$(window).on("load", function(e){
    generateCat("Wpisz swoj tekst"," ","40");
})
