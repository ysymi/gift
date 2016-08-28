var t = 0;

$(document).ready(function () {







    var myPresentation = function () {
        var wrapper = null;
        var defClass = null;
        var slides = null;
        var slidesNum = null;
        var nextButton = document.createElement('a');
        var prevButton = document.createElement('a');
        var currentSlide = t;

        function config(_params) {
            var params = _params || {};
            wrapper = params.wrapper || document.getElementById('slideShow');
            slides = params.slides || wrapper.getElementsByClassName('slide');
            slidesNum = slides.length;
            defClass = params.defClass || 'slide';
        }

        function init() {
            if (!wrapper) {
                config();
            }
            document.body.appendChild(nextButton);
            document.body.appendChild(prevButton);
            nextButton.className = 'next nav-button';
            prevButton.className = 'prev nav-button';

            cb_addEventListener(nextButton, 'click', goNext);
            cb_addEventListener(prevButton, 'click', goBack);
            cb_addEventListener(document, 'keyup', keyUpEv);
            showSlide(currentSlide);
            checkButtons()
        }

        function goNext() {
            if (slides[currentSlide + 1]) {
                ++currentSlide;
                step();
            }
        }

        function goBack() {
            if (slides[currentSlide - 1]) {
                --currentSlide;
                step();
            }
        }

        function step() {



            var player = document.getElementById("player");
            //video.paused();


            if (player.pause) {
                //  alert("playing")
                player.pause();
            }
            $(".video-area").attr("hidden", "hidden");
            //$(".picture-area").removeAttr("hidden");
            $(".picture-area").css("opacity", 1);

            setTimeout(function () {
                showSlide(currentSlide);
                // window.location.hash = currentSlide;
                t = currentSlide;
                checkButtons();
            }, 40);


            return false;
        }

        function checkButtons() {
            if (currentSlide === 0) {
                prevButton.className += ' hidden';
            } else if (currentSlide === slidesNum - 1) {
                nextButton.className += ' hidden';
            } else {
                nextButton.className = nextButton.className.replace(' hidden', '');
                prevButton.className = prevButton.className.replace(' hidden', '');
            }
        }

        function keyUpEv(event) {
            if (event.keyCode === 37) {
                goBack();
            } else if (event.keyCode === 39) {
                goNext();
            }
        }

        function showSlide(step) {
            var i = slidesNum;
            if (-1 < step && step < i) {
                while (i--) {
                    slides[i].className = defClass;
                }
                slides[step].className += ' current';

                if (step > 0) {
                    slides[step - 1].className += ' prev';
                }
                if (step + 1 < slidesNum) {
                    slides[step + 1].className += ' next';
                }
            } else {
                return false;
            }
        }

        return {
            config: config,
            init: init
        };
    }();

    /**
     * Cross-browser Event Listener
     **/

    function cb_addEventListener(obj, evt, fnc) {
        if (obj && obj.addEventListener) {
            obj.addEventListener(evt, fnc, false);
            return true;
        } else if (obj && obj.attachEvent) {
            return obj.attachEvent('on' + evt, fnc);
        }
        return false;
    }

    myPresentation.config({
        wrapper: document.getElementById('slideShow')
    });
    myPresentation.init();



    /* my sleft */

    $(".slide").mouseenter(function () {
        // alert("Asd//);

        var video = document.getElementById("player");


        if (video.paused === true) {


            var videoid = $(".current img").attr("src").charAt(11);
            videoid = parseInt(videoid);
            //alert("video/video" + videoid + ".mp4");
            $(".video-area video").attr("src", "video/video" + videoid + ".webm");
            //poster="cows.jpg"
            $(".video-area video").attr("poster", "image/teemo" + videoid + ".jpg");
        }


        var id = setInterval(function () {

            var v = $(".picture-area").css("opacity");
            //alert(v);
            if (v > 0) {
                $(".picture-area").css("opacity", v -= 0.01);
            }
        }, 7);

        setTimeout(function () {
            $(".video-area").removeAttr("hidden");
            //$(".picture-area").attr("hidden", "hidden");
            clearInterval(id);
        }, 1000);
    });








    //$(document).bind('mousemove',function()







});

function test() {


    // alert("Asd");

    var fullscreenEnabled =
        document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitFullscreenEnabled;



    //alert(fullscreenEnabled);
    var docElm = document.documentElement;
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
}