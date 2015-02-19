var http = require('http');
var gm = require('gm').subClass({ imageMagick: true });
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var session = require('express-session');
var port = process.env.port || 1337;
var express = require('express');
var bodyParser = require('body-parser');
var connectFlash = require('connect-flash');
var request = require('request');
var app = express();
app.set("view engine", "jade");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser({ limit: '50mb' }));
app.use(session({ secret: "I love Js" }));
app.use(connectFlash());
var exec = require('child_process').exec;
var upload = false;
var multer1 = multer({
    dest: './public/uploads/image',
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);
        upload = true;
    }
});

//exec("gm", function (error, stdout, stderr) {
//  // Validate the output with one of the parameters.
//});
app.get("/", function (req, res) {
    
    //var gm = require('gm').subClass({ imageMagick: true }); //tried this one too 
    
    res.render("index", { mainImage: req.flash("mainImage") });
});

var download = function (uri, filename, callback) {
    
    request.head(uri, function (err, res, body) {
        
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
        
        var r = request(uri).pipe(fs.createWriteStream(filename));
        r.on('close', callback);
    });
};



var fontSize = 20;
app.post("/imagesubmit", function (request, response) {
    var body = request.body;
    console.log(body);
    
    gm('./public/img/romantic.jpg').resize(490, 490)
.stroke("#000000", -1).font("Arial-Light.ttf", fontSize)

.drawText(parseInt(body.img[0].left), parseInt(body.img[0].top) + fontSize, body.img[0].text)
.drawText(parseInt(body.img[1].left), (parseInt(body.img[1].top) > 490)?460:parseInt(body.img[1].top) + fontSize, body.img[1].text).shadow(19, 10)
.write("./p.jpg", function (err) {
        if (!err) console.log('done');
    });
 
});
app.get("/canvas", function (req, res) {
    res.render("canvas", { mainImage: req.flash("mainImage") });

});
app.post("/canvas", function (req, res) {
    console.log("drawing image saved");
    var imageUrl = req.body.img;
    var savedImageFile = "./img" + Date.now() + ".jpg";
    var data = imageUrl.replace(/^data:image\/\w+;base64,/, "");
    var buffer = new Buffer(data, "base64");
    fs.writeFile(savedImageFile, buffer);
    req.session.image = savedImageFile;
    res.end();
});
app.get("/draw", function (req, res) {
    res.render("canvasTutorial");
});

app.post("/uploadPic", multer1, function (req, res) {
    if (upload) {
        gm(req.files.file.path)
        .resize(480, 480)
        .noProfile()
        .write('./public/uploads/imageresize/' + req.files.file.name, function (err) {
            if (!err) {
                console.log('done');
                fs.unlink(req.files.file.path, function (err) {
                    if (!err)
                        console.log("deleted");
                });
            }
        });
        
        req.flash("mainImage", "/uploads/imageresize/" + req.files.file.name);
        console.log(req.files.file.name);
        res.redirect("/");
    }
});

app.get("/image", function (req, res) {
    console.log("Image download Event fired");
    console.log(req.session.image);
    if (!req.session.image) {
        res.end("Save Image First");
    }
    else {
        res.setHeader('Content-disposition', 'attachment; filename=img.jpg');
        res.setHeader('Content-type', "image/jpeg");
        var imgstream = fs.createReadStream(req.session.image);
        imgstream.pipe(res);
        var had_error = false;
        imgstream.on('error', function (err) {
            had_error = true;
        });
        imgstream.on('end', function (err) {
            fs.unlink(req.session.image, function (err) {
                if (!err) {
                    console.log("deleted");
                }     
            });
        });
    }
    
    
});


http.createServer(app).listen(port);