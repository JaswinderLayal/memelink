function DrawCanvas(imgUrl) {
    canvas1 = document.getElementById("mycanvas");
    var context = canvas1.getContext("2d");
    var newcanvas = document.getElementById("canvas2");
    var newCtx = newcanvas.getContext("2d");
    var image = new Image();
    if (!imgUrl) {
        context.fillStyle = "#FDD53D";
        context.fillRect(0, 0, canvas1.width, canvas1.height);
        newCtx.fillStyle = "#FDD53D";
        newCtx.fillRect(0, 0, canvas1.width, canvas1.height);
    }
    else {
        image.src = imgUrl;
        image.onload = function () {
        context.drawImage(image, 0, 0, canvas1.width, canvas1.height);
        newCtx.drawImage(image, 0, 0, canvas1.width, canvas1.height);
       }
    }
    
  
}

function FillCanvas(color){
    canvas1 = document.getElementById("mycanvas");
    var context = canvas1.getContext("2d");
    var newcanvas = document.getElementById("canvas2");
    var newCtx = newcanvas.getContext("2d");
    var image = new Image();
    context.fillStyle = color;
    context.fillRect(0, 0, canvas1.width, canvas1.height);
    newCtx.fillStyle = color;
    newCtx.fillRect(0, 0, canvas1.width, canvas1.height);
 


}

//function to draw array of Images

function DrawClipImages(imgarray, callback) {
    
    var images = [];
    var loadedImages = 0;
    for (var i = 0; i < imgarray.length; i++) {
        var imageSrc = $(imgarray[i]).find("img").attr("src");
        var imageX = parseInt($(imgarray[i]).css("left").replace(/[^-\d\.]/g, ''));
        var imageY = parseInt($(imgarray[i]).css("top").replace(/[^-\d\.]/g, ''));
        var imageSzW = parseInt($(imgarray[i]).css("width").replace(/[^-\d\.]/g, ''));
        var imageSzH = parseInt($(imgarray[i]).css("height").replace(/[^-\d\.]/g, ''));
        var imageObj = {
            img: new Image(),
            X: imageX,
            Y: imageY,
            W: imageSzW,
            H: imageSzH
        };
        
        images[i] = imageObj;
        images[i].img.src = imageSrc;
        
        
        images[i].img.onload = function () {
            
            console.log("loading" + i + "image");
            if (++loadedImages >= imgarray.length) {
                console.log("callback called");
                callback(images);
            }
        };

    }

   


}

//Logic to TextWrap on Canvas
function DrawText(context, text, lineHeight, maxwidth, x, y) {
    
    var words = text.split(' ');
    var line = '';
    console.log(words);
    if (words.length == 1) {
        console.log("loop entered");
        if (context.measureText(text).width > maxwidth) {
            
            var wordsAlpha = text.split("");
            console.log(wordsAlpha);
            for (var j = 0; j < wordsAlpha.length; j++) {
                var newTestLine = line + wordsAlpha[j];
                if (context.measureText(newTestLine).width > maxwidth) {
                    context.fillText(line, x, y);
                    y += lineHeight;
                    line = wordsAlpha[j];
                }
                else {
                    line = newTestLine;
                }
            }
            context.fillText(line, x, y);
             
        }
        else {
            context.fillText(text, x, y);
        }
    }
    else {
        console.log(words);
        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxwidth) {
                
                if (context.measureText(words[n]).width > maxwidth) {
                    console.log("longer word " + words[n]);
                    
                    context.fillText(line, x, y);
                    line = "";
                    y += lineHeight;
                    var wordsAlpha = words[n].split("");
                    
                    for (var j = 0; j < wordsAlpha.length; j++) {
                        
                        var newTestLine = line + wordsAlpha[j];
                        if (context.measureText(newTestLine).width > maxwidth) {
                            context.fillText(line, x, y);
                            console.log("line =" + line);
                            y += lineHeight;
                            line = wordsAlpha[j];
                        }
                        else {
                            line = newTestLine;
                        }

                    }
                    
                    line += " ";
                }
                else {
                    context.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                }
           
            }
            else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
    }


}


function DrawClipImage(passedImage, offsetX, offsetY, newSize) {
    
    var canvas = document.getElementById("canvas2");
    var canvasContext = canvas.getContext("2d");
    var image = new Image();
    image.src = passedImage.src;
 
    var tempUrl = "";
    image.onload = function () {
        loadedImage++;
        var imageWidth = image.width;
        var imageHeight = image.height;
        //creating temporary context
        var tempCanvas = document.createElement("canvas");
        var tempContext = tempCanvas.getContext("2d");
        tempCanvas.width = imageWidth;
        tempCanvas.height = imageHeight;
        var i = 0;
        while (tempCanvas.width > newSize * 2) {

            console.log("Canvas Width" + tempCanvas.width);
            console.log("newSize" + newSize);
            tempCanvas.width = tempCanvas.width * 0.5;
            tempCanvas.height = tempCanvas.height * 0.5;
            if (i == 0) {
                tempContext.drawImage(image, 0, 0, tempCanvas.width, tempCanvas.height);
                tempUrl = tempCanvas.toDataURL();
            }
            else {
                tempContext.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
                var img = new Image();
                img.src = tempUrl;
                
                tempContext.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
                tempUrl = tempCanvas.toDataURL();
            }
            i++;
        }
        console.log(i);
       
        if (i == 0) {
            canvasContext.drawImage(image, offsetX, offsetY, newSize, newSize);
        }
        canvasContext.drawImage(tempCanvas, offsetX, offsetY, newSize, newSize);
    }
}

var resize = function (img, scale) {
    // Takes an image and a scaling factor and returns the scaled image
    
    // The original image is drawn into an offscreen canvas of the same size
    // and copied, pixel by pixel into another offscreen canvas with the 
    // new size.
    
    var widthScaled = img.width * scale;
    var heightScaled = img.height * scale;
    
    var orig = document.createElement('canvas');
    orig.width = img.width;
    orig.height = img.height;
    var origCtx = orig.getContext('2d');
    origCtx.drawImage(img, 0, 0);
    var origPixels = origCtx.getImageData(0, 0, img.width, img.height);
    
    var scaled = document.createElement('canvas');
    scaled.width = widthScaled;
    scaled.height = heightScaled;
    var scaledCtx = scaled.getContext('2d');
    var scaledPixels = scaledCtx.getImageData(0, 0, widthScaled, heightScaled);
    
    for (var y = 0; y < heightScaled; y++) {
        for (var x = 0; x < widthScaled; x++) {
            var index = (Math.floor(y / scale) * img.width + Math.floor(x / scale)) * 4;
            var indexScaled = (y * widthScaled + x) * 4;
            scaledPixels.data[ indexScaled ] = origPixels.data[ index ];
            scaledPixels.data[ indexScaled + 1 ] = origPixels.data[ index + 1 ];
            scaledPixels.data[ indexScaled + 2 ] = origPixels.data[ index + 2 ];
            scaledPixels.data[ indexScaled + 3 ] = origPixels.data[ index + 3 ];
        }
    }
    scaledCtx.putImageData(scaledPixels, 0, 0);
    return scaled;
}