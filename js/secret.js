$(document).ready(function () {

    var shoting_star = $("#shoting_star");
    var screen_width = parseFloat($("html").css("width").replace("px", ""));
    //alert(screen_width);
    setInterval(function () {

        shoting_star.css({
            "left": "200px",
            "top": "-300px"
        });


        var left = parseFloat(shoting_star.css("left").replace("px", ""));
        var top = parseFloat(shoting_star.css("top").replace("px", ""));

        // 

        //while (left < screen_width) 

        left += 2060;
        top += 1120;
        shoting_star.animate({
            left: left + "px",
            top: top + "px"
        }, 2500);
        //left = left + 39;
        //alert(left + " " + screen_width);



    }, 4000);

    function temp(event) {
        event.preventDefault();
        $('.cd-popup').addClass('is-visible');
    }


    //open popup
    $('.cd-popup-trigger').on('click', function (event) {
        event.preventDefault();
        $('.cd-popup').addClass('is-visible');
    });

    //close popup
    $('.cd-popup').on('click', function (event) {
        //		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
        //			event.preventDefault();
        //			$(this).removeClass('is-visible');
        //            $('.cd-popup-container').animate({opacity:"0"},300);
        //		}
    });
    //close popup when clicking the esc keyboard button
    $(document).keyup(function (event) {
        if (event.which === '27') {
            $('.cd-popup').removeClass('is-visible');
        }

    });


    var question = $("#question");
    var answer1 = $("#answer1");
    var answer2 = $("#answer2");
    var show_option = true;
    var group_id = 1;
    var text = [
        [0],
        [1, "你是小不点吗？", "不是啊", "是啊"],
        [2, "你也喜欢小不点吗？", "yeap", "nope"],
        [3, "真的吗？好吧 小不点最喜欢的数字是几？", "4", "5"],
        [4, "那你是男的还是女的？", "汉子", "妹子"],
        [5, "我们家小不点不好吗？不准不喜欢"],
        [6, "嗯 4是对的。FF过年给小不点发了多少红包呢？", "他都没发，哭晕", "算不过来呀"],
        [7, "5显然不对啊你真的是小不点吗？"],
        [8, "哇靠 你完啦 你已经被FF列入情敌名单了！！<br/>ps.你死了这条心吧 小不点不会喜欢你的"],
        [9, "哇靠 你也完啦 你也被FF列入情敌名单了！！虽然你是妹子.."],
        [10],
        [11],
        [12, "FF心都碎了啊 白花花的银子啊 你去的好冤啊...."],
        [13, "2^8-1 = 255，不光是你，小不点都可能算不出来<br/>再来，那你知道FF喜欢吃蚂蚁上树吗？", "难道不喜欢？", "喜欢啊"],
        [14],
        [15],
        [16],
        [17],
        [18],
        [19],
        [20],
        [21],
        [22],
        [23],
        [24],
        [25],
        [26, "谁说的？FF第一次吃蚂蚁上树就喜欢这个妹子了<br/>不是不是，就喜欢这个菜了"],
        [27, "能到这，看来你就是小不点了<br/>你知道这页是讲什么的吗？", "FF的秘密", "点左边啊点我干什么.."],
        [28],
        [29],
        [30],
        [31],
        [32],
        [33],
        [34],
        [35],
        [36],
        [37],
        [38],
        [39],
        [40],
        [41],
        [42],
        [43],
        [44],
        [45],
        [46],
        [47],
        [48],
        [49],
        [50],
        [51],
        [52],
        [53],
        [54, "FF的秘密你想知道吗？", "嗯呐", "墨迹死了不玩了"],
        [55, "囧...都说让你别点我了..."],
        [56],
        [57],
        [58],
        [59],
        [60],
        [61],
        [62],
        [63],
        [64],
        [65],
        [66],
        [67],
        [68],
        [69],
        [70],
        [71],
        [72],
        [73],
        [74],
        [75],
        [76],
        [77],
        [78],
        [79],
        [80],
        [81],
        [82],
        [83],
        [84],
        [85],
        [86],
        [87],
        [88],
        [89],
        [90],
        [91],
        [92],
        [93],
        [94],
        [95],
        [96],
        [97],
        [98],
        [99],
        [100],
        [101],
        [102],
        [103],
        [104],
        [105],
        [106],
        [107],
        [108, "那你去问他自己吧 秘密这种东西FF怎么可能写出来呢 →_→"],
        [109, "我靠你居然真的会点这个...那我不告诉你了"],
        [110],
        [111],
        [112],
        [113],
        [114],
        [115],
        [116],
        [117],
        [118],
        [119],
        [120],
        [121],
        [122],
        [123],
        [124],
        [125],
        [126],
        [127],
        [128],
        [129],
        [130],
        [131],
        [132],
        [133],
        [134],
        [135],
        [136],
        [137],
        [138],
        [139],
        [140],
        [141],
        [142],
        [143],
        [144],
        [145],
        [146]

    ];






    function set_content() {


        answer1.css("visibility", show_option ? "visible" : "hidden");
        answer2.css("visibility", show_option ? "visible" : "hidden");

        question.html(text[group_id][1]);
        answer1.html(text[group_id][2]);
        answer2.html(text[group_id][3]);
    }

    function show_box() {
        $('.cd-popup').addClass('is-visible');
        $('.cd-popup-container').animate({
            opacity: "1"
        }, 300);
    }

    function disappear_box() {
        $('.cd-popup').removeClass('is-visible');
        $('.cd-popup-container').animate({
            opacity: "0"
        }, 300);
    }


    function run() {
        // alert("aa");
        set_content();
        show_box();

    }

    var count5 = 0;

    function next_run() {
        if (group_id === 5) {
            count5++;
            if (count5 === 2) {
                text[5][1] = "都说了，我们家小不点特别好，不能不喜欢！！";
            } else if (count5 === 3) {
                text[5][1] = "你是来捣乱的，鉴定完毕";
                //                set_content();
                //                setTimeout(window.close(),700);

            } else if (count5 === 4) {
                //                window.open('', '_parent', '');
                //                window.top.opener = null;
                //                window.close();
            }

            show_option = false;
            setTimeout(function () {
                group_id = 2;
                show_option = true;
                disappear_box();
                next_run();
            }, 2000);
            //            answer1.css("visibility", "hidden");
            //            answer2.css("visibility", "hidden");
        } else if (group_id === 8 || group_id === 9) {
            show_option = false;
            setTimeout(function () {
                group_id = 1;
                show_option = true;
                disappear_box();
                next_run();
            }, 4500);

            setTimeout(run, 500);
        } else if (group_id === 12) {
            text[6][1] = "FF过年给小不点发了多少红包呢?";
            show_option = false;
            setTimeout(function () {
                group_id = 6;
                show_option = true;
                disappear_box();
                next_run();
            }, 2700);

        } else if (group_id === 7) {

            show_option = false;
            setTimeout(function () {
                group_id = 3;
                show_option = true;
                disappear_box();
                next_run();
            }, 2000);
        } else if (group_id === 26) {

            show_option = false;
            setTimeout(function () {
                group_id = 13;
                show_option = true;
                disappear_box();
                next_run();
            }, 3500);
        } else if (group_id === 55) {

            show_option = false;
            setTimeout(function () {
                group_id = 27;
                show_option = true;
                disappear_box();
                next_run();
            }, 2000);
        } else if (group_id === 108 || group_id === 109) {

            show_option = false;
            setTimeout(function () {
                group_id = 1;
                show_option = true;
                disappear_box();
                next_run();
            }, 4600);
        }





        setTimeout(run, 500);


    }


    setTimeout(run, 1500);
    answer1.on("click", function () {
        // alert(1);
        group_id = group_id * 2;
        disappear_box();
        next_run();
        return false;

    });
    answer2.on("click", function () {
        //alert(2);
        group_id = group_id * 2 + 1;
        disappear_box();
        next_run();
        return false;

    });




});

function test(e) {
    //alert("asd");
    e.preventDefault();

}