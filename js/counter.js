window.onload = function onLoad() {

    function setShakeItself() {
        $('#title').addClass('shake-constant');
        $('#title').addClass('shake');

        $('#title').addClass('hover-stop');
        $('#title').removeClass('freez');
        $('#title').removeClass('shake-slow');


    }

    function setDisshakeItself() {
        $('#title').removeClass('shake-constant');
        $('#title').removeClass('hover-stop');
        $('#title').addClass('freez');
        $('#title').addClass('shake-slow');

    }

    // 标题移动
    $('#title').animate({
        left: '35%',
        top: '5%',
        fontSize: '40px'
    }, 2500, setDisshakeItself);

    setTimeout(setShakeItself, 3500);
    setTimeout(setDisshakeItself, 3800);



    function ShowTime() {
        //   alert("Asd");

        $("#title").removeClass("shake");
        $("#title").removeClass("freez");
        $("#title").removeClass("shake-slow");


        $("#title").css({
            "transform": "rotate(-5deg)",
            /* IE 9 */
            "-ms-transform": "rotate(-5deg)",
            /* Safari and Chrome */
            "-webkit-transform": "rotate(-5deg)",
            /* Opera */
            "-o-transform": "rotate(-5deg)",
            /* Firefox */
            "-moz-transform": "rotate(-5deg)"
        });
        $("#title").addClass("shake");
        $("#title").addClass("shake-slow");
        $("#title").addClass("freez");

    }

    setTimeout(ShowTime, 3850);
    //alert("asd");

    //秒
    var secondDiv = document.getElementById('second');
    var minuteDiv = document.getElementById('minute');
    var hourDiv = document.getElementById('hour');
    var dayDiv = document.getElementById('day');

    var secondProgressBar = new ProgressBar.Circle(secondDiv, {
        duration: 10,
        color: "#d83610",
        trailColor: "#ddd",
        trailWidth: 8,
        strokeWidth: 8
    });

    var minuteProgressBar = new ProgressBar.Circle(minuteDiv, {
        duration: 10,
        color: "#fba623",
        trailColor: "#ddd",
        trailWidth: 8,
        strokeWidth: 8
    });
    var houreProgressBar = new ProgressBar.Circle(hourDiv, {
        duration: 10,
        color: "#afe835",
        trailColor: "#ddd",
        trailWidth: 8,
        strokeWidth: 8
    });
    var dayProgressBar = new ProgressBar.Circle(dayDiv, {
        duration: 10,
        color: "#00838f",
        trailColor: "#ddd",
        trailWidth: 8,
        strokeWidth: 8
    });

    var days = 0;
    var minutes = 0;
    var seconds = 0;
    var begin = new Date(2014, 10, 16, 0, 0, 0, 0);




    setInterval(function setSecond() {
        var now = new Date();
        var interval = now - begin;


        var milliseconds = parseInt(interval % 1000);
        var seconds = parseInt(interval / 1000 % 60);
        var minutes = parseInt(interval / 1000 / 60 % 60);
        var hours = parseInt(interval / 1000 / 60 / 60 % 24);
        var days = parseInt(interval / 1000 / 60 / 60 / 24);


        //alert(days);

        secondProgressBar.animate((seconds * 1000 + milliseconds) / 60000, function () {
            secondProgressBar.setText(seconds+"秒");
        });
        minuteProgressBar.animate((minutes * 60 + seconds) / 3600, function () {
            minuteProgressBar.setText(minutes+"分钟");
        });
        houreProgressBar.animate((hours * 60 + minutes) / 1440, function () {
            houreProgressBar.setText(hours+"小时");
        });
        dayProgressBar.animate((days * 24 + hours) / 8760, function () {
            dayProgressBar.setText(days+"天");
        });


    }, 100);





};


