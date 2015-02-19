$(document).ready(function () {
    var i = 0,j=0,k=0;
    $(".menubar").click(function () {
        $(".text-window").css("display", "none").animate({ bottom: "-100%" }, 600);
        $(".bottom-left-circle").animate({ bottom: 0 });
        
        $(".bottom-right-circle").find("i").removeClass("fa-angle-double-down").addClass("fa-angle-double-up").end().animate({ bottom: 0 }, 600);
        $(".clip-images").animate({ bottom: "-30%" }, 600).css({ "display": "none" });

        if (i == 0) {
            $("main").animate({ "left": $(".left-side-nav").css("width") },{duration:600,easing:'easeInOutQuart'});
            i = 1;
        }
        else {
            $("main").animate({ "left": 0 }, { duration: 600, easing: 'easeOutBack' });
            i = 0;
        }
        $(".clip-images").animate({ bottom: "-30%" }, 600).css({ "display": "none" });
       
    });

    $(".menubar-right").click(function () {
      
        if (j == 0) {
            $("main").animate({ "left":100-parseInt($(".right-side-nav").css("width").replace("%","")) }, { duration: 600, easing: 'easeInOutBack' });
            j = 1;
        }
        else {
            $("main").animate({ "left": 0 }, { duration: 600, easing: 'easeOutBack' });
            j = 0;
        }
       
    });
    
    $(".bottom-right-circle").click(function () {
        $("main").css("left", "0");
        if (k == 0) {
            $(".bottom-right-circle").find("i").removeClass("fa-angle-double-up").addClass("fa-angle-double-down");
        $(".clip-images").css({"display":"block"}).animate({ bottom: 0 }, 600);
            $(this).animate({ bottom: $(".clip-images").css("height") }, 600);

            k = 1;
        }
        else {
            $(".bottom-right-circle").find("i").removeClass("fa-angle-double-down").addClass("fa-angle-double-up");
            $(".clip-images").animate({ bottom:"-30%" }, 600).css({ "display": "none" });
            $(this).animate({ bottom: 0 }, 600);
            k = 0;
        }
    });
    //$(".overlay").click(function () {
    //    $(".overlay").fadeOut(800);
    //    $(".preview-canvas").fadeOut(800);
    //});

    $("#files").on('change', function (e) {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e){
                $("#image1").attr("src", e.target.result);
                $("#template").find("img").attr("src", e.target.result);
                
                $(".user-ul").append($("#template").html());


                $(".user-ul").find("div").last().draggable({
                    cursor: 'move',
                    helper: 'clone',
                    scroll: false,
                    appendTo: '#drawing-canvas',
                    start: function () { },
                    stop: function (event, ui) { }
                }).mousedown(function () { });
            }
            reader.readAsDataURL(this.files[0]);
        }
    });

    $(".tabs").on('click','li',function () {
        if ($(this).attr("id") == "smily") {
            $("#Smilies").show();
            $("#user-images").hide();
            $(".tabs").find(".activeTab").removeClass("activeTab");
            $(this).addClass("activeTab");
        }
        else {
            $(".tabs").find(".activeTab").removeClass("activeTab");
            $(this).addClass("activeTab");
            $("#Smilies").hide();
           
            $("#user-images").show();
        }
    });
    var textflag = 0;
    $(".bottom-left-circle").click(function () {
        $("main").css("left", "0");
        if (textflag == 0) {
            $(".text-window").css({"bottom":"-100%","display":"block"}).animate({ bottom: 0 }, 600);
            $(".bottom-left-circle").animate({ bottom: $(".text-window").css("height") });
            textflag = 1;
        }
        else {
            $(".text-window").css("display", "none").animate({ bottom: "-100%" }, 600);
            $(".bottom-left-circle").animate({ bottom:0 });
            textflag = 0;
        }
     
    });
  
});
