//鼠标的部分
var H = 0;
var stop_brush = false;

$(document).bind('mousemove touchmove', function (e) {
    e.preventDefault();
    var drawSize = 40;
    var drawType = "★"; //♥❤♀";
    var floatTypes = ['floatOne', 'floatTwo', 'floatThree', 'floatFour', 'floatFive'];
    var floatType = floatTypes[Math.floor(Math.random() * floatTypes.length)];
    var xPos = e.originalEvent.pageX;
    var yPos = e.originalEvent.pageY;

    if (stop_brush == false) {

        $('body').append('<div class="draw" style="font-size:' + drawSize + 'px;left:' + xPos + 'px;top:' + yPos + 'px;-webkit-animation:' + floatType + ' .9s 1;-moz-animation:' + floatType + ' .9s 1;color:hsla(' + H + ',100%,70%,1)">' + drawType + '</div>');

    }

    $('.draw').each(function () {
        var div = $(this);
        setTimeout(function () {
            $(div).remove();
        }, 800);
    });
});

setInterval(function () {
    if (H <= 360) {
        H += 3;
    } else {
        H = 0;
    }
}, 10);


//标签云部分

window.onload = function () {
    try {
        TagCanvas.Start('tag-show-area', 'tag-list', {
            textColour: '#ff0000',
            outlineColour: '#ffffff',
            reverse: true,
            depth: 0.5,
            maxSpeed: 0.05,
            minSpeed: 0.02,
            textHeight: 20,
            imageMode: 'image',
            minBrightness: 0.8,
            outlineMethod: 'none',
            //shape: "hcylinder",
            //lock: "x"
        });
    } catch (e) {
        // something went wrong, hide the canvas container
        document.getElementById('tag-show-area-div').style.display = 'none';
    }
};

$(document).ready(function () {
    
    
    var w = document.body.clientWidth;
    //alert(w);
    $("#tag-show-area").attr("width",(w*0.5).toString());
    $("#tag-show-area").attr("height",(w*0.5*0.85).toString());
    
    
    
    

    $("#tag-show-area-div").mouseover(function () {
        // alert("in");
        // var cursorType = $(this).css("cursor");
        // alert(cursorType);
        setInterval(watchCursor, 10);

        function watchCursor() {
            //alert("!");
            // alert($("#tag-show-area").css("cursor"));
            if ($("#tag-show-area").css("cursor") == "pointer") {
                // alert("ok ");
                stop_brush = true;
            } else {
                stop_brush = false;
            }

        }

    });
    
    

});