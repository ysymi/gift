jQuery(document).ready(function ($) {
    //final width --> this is the quick view image slider width
    //maxQuickWidth --> this is the max-width of the quick-view panel
    var sliderFinalWidth = 400,
        maxQuickWidth = 900;

    //open the quick view panel
    $('.cd-trigger').on('click', function (event) {
        var selectedImage = $(this).parent('.cd-item').children('img'),
            slectedImageUrl = selectedImage.attr('src');

        set_viewbox(slectedImageUrl);
        $('body').addClass('overlay-layer');
        animateQuickView(selectedImage, sliderFinalWidth, maxQuickWidth, 'open');

        //update the visible slider image in the quick view panel
        //you don't need to implement/use the updateQuickView if retrieving the quick view data with ajax
        updateQuickView(slectedImageUrl);
    });

    var text = [
        ["背影", "12月的下午，应该是一起去吃饭，没有看到你的转身，但是留下了这个让人向往的背影。因为就只看到背影，我都能想到你欢快的样子"], //0
        ["嘻嘻", "你永远都是俏皮可爱的妹子，连穿正装这么严肃的时候，都能表现出来活泼的一面，你说FF喜欢你哪里呢？偷笑"],
        ["么么哒", "不懂为什么要弄成黄色的照片，反正你自己设置的联系人头像，然后写的名字“软糖好棒”，看久了，好想被你亲一口"],
        ["火烧红", "这是你之前的头像，我也很喜欢，瞬间喜欢的那种，没有太认真找这个出处，只是觉得你喜欢这个头像，而我觉得这个妹子肯定很可爱"],
        ["出场服", "这件太阳队的出场服自己超喜欢，而且送给了自己超喜欢的女生，不知道还有什么比这种事情让人心情愉悦，开心到不能自拔的"],
        ["红配绿", "主题依旧是你，虽然内盆小树已经被FF活活养死了，想念一下它刚开始生机勃勃的时候，跟笑得好开心的小不点绝配的，"], //5
        ["女生", "这个高跟鞋真的是很漂亮的，曲线优美，黑色靓丽，好像还有个粉色的丝带，超级好看的高跟鞋，说明小不点品味在这放的呢，超级女生的小不点，就是好喜欢啊"],
        ["笑脸", "玩泥巴玩的好开心，笑起来好好看，生活中离我最近的治愈的画面就是你的笑脸，FF现在简直有一种被糖甜死的感觉，真的是幸福呢"],
        ["你在哪", "要是你找不到自己了，我告诉你啊，饭桌对面的毛衣看到没？吃饭途中会睡着的姑娘，上哪找去"],
        ["微笑", "桌子上的瓶瓶罐罐，插满毛笔，七彩的颜色都用一遍，好像显得你很大师一样，不过我在手机里看到这个图片的时候，第一眼看到的就是上扬的嘴角"],
        ["草帽", "翻你朋友圈的时候，这张图片就好喜欢啊，虽然是在乡下，但是绿绿的看着多舒服，关键是你啊，I found you like a cow girl， don't you？"], //10
        ["情侣装", "我也有件这样的衣服，毫不犹豫找出自己的大红色外套，蓝书包，结果出来就能碰到你，这不是天赐良机是什么，好吧做人要低调，可我就是开心"],
        ["影子", "知道这个是什么影子吗?什么时间？什么地点？都有谁？纪念这个有我们第一次的地方，"],
        ["醉了", "这句网络用语内天发生在你身上了有木有？我都帮你挡那么多酒，你还醉。你的脸好红，我忍不住偷偷摸了下，好烫呀"],
        ["酷炫", "就是这个酷炫的姿势，和天生一对的高度差，每次看到这个，都有一种心里超满足的感觉，你说这个照片里是不是住了个丘比特，每次我看他他就射我一箭"],
        ["啦啦啦", "小不点声音不知道多好听。记得第一次去唱歌，点了一首以后站在中间的你，踩着轻盈的步伐，迎着歌曲的节奏，这个画面FF真是happy死了"], //15
       
    ]

    function set_viewbox(url) {
        $("#view_box").attr('src', url);
        //alert(url.substr(14, 2));
        var id = parseInt(url.substr(14, 2));
        //alert($("#title").text());
        $("#title").text(text[id][0]);
        $("#content").text(text[id][1]);
    }

    //close the quick view panel
    $('body').on('click', function (event) {
        if ($(event.target).is('.cd-close') || $(event.target).is('body.overlay-layer')) {
            closeQuickView(sliderFinalWidth, maxQuickWidth);
        }
    });
    $(document).keyup(function (event) {
        //check if user has pressed 'Esc'
        if (event.which == '27') {
            closeQuickView(sliderFinalWidth, maxQuickWidth);
        }
    });

    //quick view slider implementation
    $('.cd-quick-view').on('click', '.cd-slider-navigation a', function () {
        updateSlider($(this));
    });

    //center quick-view on window resize
    $(window).on('resize', function () {
        if ($('.cd-quick-view').hasClass('is-visible')) {
            window.requestAnimationFrame(resizeQuickView);
        }
    });

    function updateSlider(navigation) {
        var sliderConatiner = navigation.parents('.cd-slider-wrapper').find('.cd-slider'),
            activeSlider = sliderConatiner.children('.selected').removeClass('selected');
        if (navigation.hasClass('cd-next')) {
            (!activeSlider.is(':last-child')) ? activeSlider.next().addClass('selected'): sliderConatiner.children('li').eq(0).addClass('selected');
        } else {
            (!activeSlider.is(':first-child')) ? activeSlider.prev().addClass('selected'): sliderConatiner.children('li').last().addClass('selected');
        }
    }

    function updateQuickView(url) {

        $('.cd-quick-view .cd-slider li').removeClass('selected').find('img[src="' + url + '"]').parent('li').addClass('selected');

    }

    function resizeQuickView() {
        var quickViewLeft = ($(window).width() - $('.cd-quick-view').width()) / 2,
            quickViewTop = ($(window).height() - $('.cd-quick-view').height()) / 2;
        $('.cd-quick-view').css({
            "top": quickViewTop,
            "left": quickViewLeft,
        });
    }

    function closeQuickView(finalWidth, maxQuickWidth) {
        var close = $('.cd-close'),
            activeSliderUrl = close.siblings('.cd-slider-wrapper').find('.selected img').attr('src'),
            selectedImage = $('.empty-box').find('img');
        //update the image in the gallery
        if (!$('.cd-quick-view').hasClass('velocity-animating') && $('.cd-quick-view').hasClass('add-content')) {
            selectedImage.attr('src', activeSliderUrl);
            animateQuickView(selectedImage, finalWidth, maxQuickWidth, 'close');
        } else {
            closeNoAnimation(selectedImage, finalWidth, maxQuickWidth);
        }
    }

    function animateQuickView(image, finalWidth, maxQuickWidth, animationType) {
        //store some image data (width, top position, ...)
        //store window data to calculate quick view panel position
        var parentListItem = image.parent('.cd-item'),
            topSelected = image.offset().top - $(window).scrollTop(),
            leftSelected = image.offset().left,
            widthSelected = image.width(),
            heightSelected = image.height(),
            windowWidth = $(window).width(),
            windowHeight = $(window).height(),
            finalLeft = (windowWidth - finalWidth) / 2,
            finalHeight = finalWidth * heightSelected / widthSelected,
            finalTop = (windowHeight - finalHeight) / 2,
            quickViewWidth = (windowWidth * .8 < maxQuickWidth) ? windowWidth * .8 : maxQuickWidth,
            quickViewLeft = (windowWidth - quickViewWidth) / 2;

        if (animationType == 'open') {
            //hide the image in the gallery
            parentListItem.addClass('empty-box');
            //place the quick view over the image gallery and give it the dimension of the gallery image
            $('.cd-quick-view').css({
                "top": topSelected,
                "left": leftSelected,
                "width": widthSelected,
            }).velocity({
                //animate the quick view: animate its width and center it in the viewport
                //during this animation, only the slider image is visible
                'top': finalTop + 'px',
                'left': finalLeft + 'px',
                'width': finalWidth + 'px',
            }, 1000, [400, 20], function () {
                //animate the quick view: animate its width to the final value
                $('.cd-quick-view').addClass('animate-width').velocity({
                    'left': quickViewLeft + 'px',
                    'width': quickViewWidth + 'px',
                }, 300, 'ease', function () {
                    //show quick view content
                    $('.cd-quick-view').addClass('add-content');
                });
            }).addClass('is-visible');
        } else {
            //close the quick view reverting the animation
            $('.cd-quick-view').removeClass('add-content').velocity({
                'top': finalTop + 'px',
                'left': finalLeft + 'px',
                'width': finalWidth + 'px',
            }, 300, 'ease', function () {
                $('body').removeClass('overlay-layer');
                $('.cd-quick-view').removeClass('animate-width').velocity({
                    "top": topSelected,
                    "left": leftSelected,
                    "width": widthSelected,
                }, 500, 'ease', function () {
                    $('.cd-quick-view').removeClass('is-visible');
                    parentListItem.removeClass('empty-box');
                });
            });
        }
    }

    function closeNoAnimation(image, finalWidth, maxQuickWidth) {
        var parentListItem = image.parent('.cd-item'),
            topSelected = image.offset().top - $(window).scrollTop(),
            leftSelected = image.offset().left,
            widthSelected = image.width();

        //close the quick view reverting the animation
        $('body').removeClass('overlay-layer');
        parentListItem.removeClass('empty-box');
        $('.cd-quick-view').velocity("stop").removeClass('add-content animate-width is-visible').css({
            "top": topSelected,
            "left": leftSelected,
            "width": widthSelected,
        });
    }


    $(".cd-trigger").on('mouseenter', function () {
        // alert(1);
        $(this).animate({
            opacity: "1"
        }, 200);
    });

    $(".cd-trigger").on('mouseleave', function () {
        $(this).animate({
            opacity: "0"
        }, 200);
    });



});