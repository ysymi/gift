$(document).ready(function () {

    var show = false;

    setInterval(function () {
        var height = document.body.scrollTop;
        var opacity = $(".return-top").css("opacity");

        //alert(opacity); 
        if (show == false && height > 200) {

            $(".return-top").animate({
                "opacity": "1"
            }, 300);
            show = true;
        }

        if (show == true && height < 200) {
            $(".return-top").animate({
                "opacity": "0"
            }, 300);
            show = false;
        }


    }, 1000);




    $(".return-top").click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });



});