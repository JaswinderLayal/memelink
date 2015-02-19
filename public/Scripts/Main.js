$(document).ready(function () {
    
    loadedImage = 0;
    
    //variable storing the src of uploaded image
    var uploadedImg = $("#uploadImage").val();
    console.log(uploadedImg);
    if (uploadedImg) {
        uploadedImg = uploadedImg.replace("public", "");
    }
    $(".colorSelector").spectrum({
        color: "#f00",
        change: function (color) {
            console.log(color);
            FillCanvas(color.toHexString());
          // #ff0000
        }
    });
    
    //Draw Image on Canvas
    DrawCanvas(uploadedImg);
    
    
    //$(window).load(function () {
    //    var windowSize = window.innerWidth;
    //    //get snapshot of canvas and extract URL of canvas Data
    //    prevCanvas = document.getElementById("mycanvas")
    //    var prevContext = prevCanvas.getContext("2d");
    //    canvasData = prevCanvas.toDataURL();
    //    //resizing for mobile devices
    //    if (windowSize < $("#mycanvas").attr("width").replace("px", "")) {
    //        var newWindowSize = windowSize - 30;
    //        $("#mycanvas").attr("width", newWindowSize);
    //        $("#mycanvas").attr("height", newWindowSize);
    //        $($(".draggable")[1]).css("top", (newWindowSize - 35) + "px");
    //        $($(".draggable")[1]).css("width", (newWindowSize - 35) + "px");
    //        $($(".draggable")[0]).css("width", (newWindowSize - 35) + "px");
    //        $("#canvas2").attr("width", newWindowSize);
    //        $("#canvas2").attr("height", newWindowSize);
    //        DrawCanvas(uploadedImg);
    //    }
    
    //});
    
    ////resizing Window
    //$(window).resize(function (e) {
    //    if (e.target != window)
    //        return false;
    //    var width = window.innerWidth;
    //    if (width < 480) {
    //        $("#mycanvas").attr("width", width);
    //        $("#mycanvas").attr("height", width);
    //        $("#canvas2").attr("width", width);
    //        $("#canvas2").attr("height", width);
    //        var context = prevCanvas.getContext("2d");
    //        var image = new Image();
    //        image.src = canvasData;
    //        context.clearRect(0, 0, prevCanvas.width, prevCanvas.height);
    //        context.drawImage(image, 0, 0, prevCanvas.width, prevCanvas.height);
    //        //var canvas2 = document.getElementById("canvas2");
    //        //var context2 = canvas2.getContext("2d");
    //        //context2.clearRect(0, 0, canvas2.width, canvas2.height);
    //        //$("#Paint").trigger("click");
    //        DrawImageFinal();
    
    //        //canvasData= document.getElementById("canvas2").toDataURL();
    
    
    //       // $($(".draggable")[1]).css("top", (width - 30) + "px");
    //        //context2.drawImage(image, 0, 0, prevCanvas.width, prevCanvas.height);
    
    //    }
    //    else {
    //        $("#canvas2").attr("width", "480px");
    //        $("#canvas2").attr("height", "480px");
    //        $("#mycanvas").attr("width", "480px");
    //        $("#mycanvas").attr("height", "480px");
    //        var context = prevCanvas.getContext("2d");
    //        var context2 = $("#canvas2").get(0).getContext("2d");
    //        var image = new Image();
    //        image.src = canvasData;
    //       // $($(".draggable")[1]).css("top", "450px");
    //        //context2.drawImage(image, 0, 0, prevCanvas.width, prevCanvas.height);
    //        //context.drawImage(image, 0, 0, prevCanvas.width, prevCanvas.height);
    //        context.clearRect(0, 0, prevCanvas.width, prevCanvas.height);
    //        context.drawImage(image, 0, 0, prevCanvas.width, prevCanvas.height);
    //        //var canvas2 = document.getElementById("canvas2");
    //        //var context2 = canvas2.getContext("2d");
    //        //context2.clearRect(0, 0, canvas2.width, canvas2.height);
    //        //$("#Paint").trigger("click");
    //        DrawImageFinal();
    //    }
    //    console.log(width);
    //});
    
    //dragging TextBoxes
    $(".draggable").draggable({ containment: "parent" }).resizable({
        containment: "parent",
        minHeight: 30,
        minWidth: 60,
        resize: function (event, ui) {
              
               
        }
    });
    
    //dragging clip images
    $(".draggableImages").draggable({
        cursor: 'move',
        helper: 'clone',
        scroll: false,
        appendTo: '#drawing-canvas',
        start: function () { },
        stop: function (event, ui) { }
    }).mousedown(function () { });
    
    //dropping clip Images
    $("#drawing-canvas").droppable({
        accept: ".draggableImages",
        activeClass: "ui-state-hover",
        hoverClass: "ui-state-active",
        drop: function (event, ui) {
            console.log(ui);
            var dropElem = ui.draggable[0];
            
            var clone = $(dropElem).clone();
            clone.removeClass("draggableImages").addClass("draggedImages");
            var spanItem = $("<span class='delete'>x</span>");
            var top = ui.position.top;
            var left = ui.position.left;
            clone.append(spanItem);
            clone.css("position", "absolute");
            clone.css("top", top);
            clone.css("left", left);
            
            clone.draggable({ containment: 'parent' , cursor: 'crosshair' }).resizable({
                maxHeight: 250,
                maxWidth: 250,
                minHeight: 50,
                minWidth: 50,
                aspectRatio: 9 / 9
            });
            $("#drawing-canvas").append(clone);
         
        }
    });
    
    
    
    //Changing text of Top TextBox
    $("#text1").keyup(function (e) {
        $("#textHold1").html($(this).val());
    });
    
    //Changing text of Bottom TextBox
    $("#text2").keyup(function (e) {
        $("#textHold2").html($(this).val());
    });
    
    //Change the font size of top TextBox
    $("#font-size1").change(function () {
        var fontSize = $("#font-size1").val();
        var draggables = $(".draggable");
        $(draggables[0]).css("height", (parseInt(fontSize) + 5));
        $("#textHold1").css("font-size", fontSize);
    });
    
    //Change the font size of bottom TextBox
    $("#font-size2").change(function () {
        var fontSize = $("#font-size2").val();
        var draggables = $(".draggable");
        $(draggables[1]).css("height", (parseInt(fontSize) + 5));
        $("#textHold2").css("font-size", fontSize);
    });
    
    //draw output Image
    function DrawImageFinal() {
        var draggables = $(".draggable");
        var font1 = $("#font-size1").val();
        var font2 = $("#font-size2").val();
        var offsetX = parseInt($(draggables[0]).css("left").match(/\d+/g).toString());
        var offsetY = parseInt($(draggables[0]).css("top").match(/\d+/g).toString()) + parseInt(font1) * 1.10;
        var offsetX1 = parseInt($(draggables[1]).css("left").match(/\d+/g).toString()) + 0.14 * font1;
        var offsetY1 = parseInt($(draggables[1]).css("top").match(/\d+/g).toString()) + parseInt(font2);
        var text = $(draggables[0]).text();
        var text1 = $(draggables[1]).text();
        canvas = document.getElementById("canvas2");
        
        var ctx = canvas.getContext("2d");
        
        //image draw
        
        var draggedImages = $(".draggedImages");
        
        
        
        //draw Upper text
        var maxWidth = $(draggables[0]).css("width").replace(/[^-\d\.]/g, '');
        maxWidth = parseInt(maxWidth);
        var drawingCanvas = document.getElementById("canvas2");
        
        var drawingContext = drawingCanvas.getContext("2d");
        drawingContext.fillStyle = "white";
        drawingContext.shadowColor = "black"
        drawingContext.shadowOffsetX = 1;
        drawingContext.shadowOffsetY = 3;
        drawingContext.shadowBlur = 1;
        drawingContext.drawImage(canvas1, 0, 0);
        
        drawingContext.font = font1 + "px Kristen";
        var lineHeight1 = 1.315 * font1;
        DrawText(drawingContext, text, lineHeight1, maxWidth, offsetX, offsetY);
        
        //draw lower text
        var maxWidth1 = $(draggables[1]).css("width").replace(/[^-\d\.]/g, '');
        maxWidth1 = parseInt(maxWidth1) + 0.1 * parseInt(font2);
        console.log(maxWidth);
        //var ctx=canvas.getContext("2d");
        var lineHeight2 = 1.315 * font2;
        drawingContext.font = font2 + "px Kristen";
        DrawText(drawingContext, text1, lineHeight2, maxWidth1, offsetX1, offsetY1);
        
        
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        
        ctx.imageSmoothingEnabled = true;
        DrawClipImages(draggedImages, function (imgarray) {
            console.log("---Image array ------");
            console.log(imgarray);
            for (var i = 0; i < imgarray.length; i++) {
                DrawClipImage(imgarray[i].img, imgarray[i].X, imgarray[i].Y, imgarray[i].W);
            }
            
            
        });
        
    }
    
    
    
    //Drawing on Canvas 2
    $("#Paint").on('click', function () {
        
        DrawImageFinal();
        
        $("body").css("overflow", "hidden");
        $("body,html").scrollTop(0);
        //$("body").css("overflow", "hidden");
        $(".overlay").fadeIn(800);
        $(".preview-canvas").fadeIn(800);
        if (window.innerWidth < 768) {
            $("#Save").css("display", "none");
        }
        else {
            $("#download-anchor").css("display", "none");
        }
    });
    
    $(".overlay,.close-preview").on('click', function () {
        $("body").css("overflow", "scroll");
        $(".overlay").fadeOut(200);
        $(".preview-canvas").fadeOut(200);
    });
    
    $("#Save").on('click', function () {
        
        var url = canvas.toDataURL();
        var imageUrl = {
            img: url
        };
        console.log(imageUrl);
        $.ajax({
            url: "/canvas",
            type: "POST",
            data: imageUrl
        }).success(function (data) {
            
            $("#download-image").css("display","block");
        });
    });
    
    $("#download-anchor").on('click', function () {
        $(this).attr("download", "image.jpg");
        $(this).attr("href", canvas.toDataURL());
    
    });
    
    
    $("#showImages").click(function () {
        $("#gallery").slideToggle("slow");
    });
    
    $("body,html").on('click', ".delete", function () {
        
        $(this).parents(".draggedImages").remove();
    });
    
    $("#scale").click(function () {
        var scaledCanvas = document.getElementById("scaled-canvas");
        var scaledContext = scaledCanvas.getContext("2d");
        var img = new Image();
        img.src = canvas.toDataURL();
        var newImage = resize(img, 10);
        
        scaledContext.drawImage(newImage, 0, 0, scaledCanvas.width, scaledCanvas.height);
    });
});

$("#file-upload").change(function (e) {
    if (!e.target.files[0].type.match(/image.*/)) {
        alert("The uploaded file is not an Image");
    }
    else {
        var reader = new FileReader();
        var drawingContext = canvas1.getContext("2d");
        reader.onload = function (e)
        {
            var image = new Image();
            image.src = e.target.result;
            
            
            image.onload = function () {
               
                var imageWidth = image.width;
                var imageHeight = image.height;
                //creating temporary context
                var tempCanvas = document.createElement("canvas");
                var tempContext = tempCanvas.getContext("2d");
                tempCanvas.width = imageWidth;
                tempCanvas.height = imageHeight;
                var i = 0;
                while (tempCanvas.width > 480 * 2) {
                    
                    console.log("Canvas Width" + tempCanvas.width);
                   
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
                    drawingContext.drawImage(image,0,0,480,480);
                }
                drawingContext.drawImage(tempCanvas,0,0,480,480);
            }
            

           
            
        }
        reader.readAsDataURL(this.files[0]);
    }

});

