$(function() {
    //start_timer_goTo_function
    /*   if (stWin == false) {
        var fiveMinutes = 60 * 20,
            display = document.querySelector('#time');
        startTimer(fiveMinutes, display);
    }*/

    $('.game_wrapp').fadeIn(600, "linear", function() {
        $('#initial_screen').delay(200).fadeIn(600, "linear");
    });

    $('.btn_training').click(function() {
        $('#initial_screen').fadeOut(600, "linear");
        $('#training').css({
            'opacity': ' 1'
        });
        $('#training').delay(200).fadeIn(600, "linear");
        vop = 1;
        stWin = true;
        stContent();
    });

    $('.btn_testing').click(function() {

    });



    //nuMstaK(nusStak);

    //Таймер
    function startTimer(duration, display) {
        var timer = duration,
            minutes, seconds;
        setInterval(function() {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                document.location.reload();
                timer = duration;
            }
        }, 1000);
    }

    //fullscreen

    var element = document.getElementById("gw");
    $('.fs').click(function() {


        if (element.requestFullScreen) {
            element.requestFullScreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
        console.log(window.offsetWidth);
    });
});


function stContent() {
    $.getJSON('js/main.json', function(data) {
        $.each(data, function(index) {
            var r = data.main_game.quest_feedback.length;
            var qu_lenght = data.main_game.quest.length;


            for (var i = 0; i < qu_lenght; i++) {
                var zadacha = data.main_game.quest[i];
                $('.splash').append('<section class="content_sp vop' + (i + 1) + '">' +
                    //Описание задачи
                    '<div class="subject">' +
                    '<span>' +
                    zadacha.quest_text +
                    '</span></div>' +
                    // Действие
                    ' <div class="caption">' +
                    '<h3>' + zadacha.quest_active +
                    '</h3></div>' +
                    //Вопросы
                    //во1
                    '<div class="option" id="v1" data="' + zadacha.quest_vo[0].ext.data +
                    '" data-nv="' + zadacha.quest_vo[0].ext.data_nv + '"><span>' +
                    zadacha.quest_vo[0].ext.tx + '</span></div>' +
                    //во2
                    '<div class="option" id="v2" data="' + zadacha.quest_vo[1].ext.data +
                    '" data-nv="' + zadacha.quest_vo[1].ext.data_nv + '"><span>' +
                    zadacha.quest_vo[1].ext.tx + '</span></div>' +
                    //во3
                    '<div class="option" id="v3" data="' + zadacha.quest_vo[2].ext.data +
                    '" data-nv="' + zadacha.quest_vo[2].ext.data_nv + '"><span>' +
                    zadacha.quest_vo[2].ext.tx + '</span></div>' +
                    //во4
                    '<div class="option" id="v4" data="' + zadacha.quest_vo[3].ext.data +
                    '" data-nv="' + zadacha.quest_vo[3].ext.data_nv + '"><span>' +
                    zadacha.quest_vo[3].ext.tx + '</span></div>' +
                    '</section>');

            }

            for (var i = 0; i < r; i++) {
                $('.coment_block').append('<div class="coment" id="k' + (i + 1) + '">' + data.main_game.quest_feedback[i].contetn_text + '</div>');
            }
        });
        initBtn();
    });
    $('.option').next().css("border-top", "0px ");

    function initBtn() {
        var count = 0;
        var score = 0;
        $('.option').click(function() {

            if (disabledClick === true) {
                return false;
            } else {
                if ($(this).attr('data') == 1) {
                    $(this).css('background', '#73a95f');
                    if (stWin == true) {
                        $('.cat_tr').addClass('nise');
                        $('.en_tr').addClass('en_nise');
                    }
                    if (stWin == false) {
                        $('.cat_tr2').addClass('nise');
                        $('.en_tr').addClass('en_nise');
                    }
                    $(this).find("span").css('color', '#FFF').css({
                        "font-weight": "bold"
                    });
                    var nv = $(this).attr('data-nv');
                    $('.coment_block').find('#k' + nv).delay(500).fadeIn().css('background', '#73a95f');
                    if (stWin == false) {
                        $('.coment_block_bot').find('#k' + nv).delay(500).fadeIn().css('background', '#73a95f');
                    }

                    if (count < 2) {
                        nuMstaK(10);
                    } else
                    if (count > 2 || count < 4) {
                        nuMstaK(20);
                    } else
                    if (count > 4 || count < 6) {
                        nuMstaK(30);
                    }
                    score++;
                } else {
                    $(this).css('background', '#DA2422');

                    if (stWin == true) {
                        $('.cat_tr').removeClass('nise');
                        $('.en_tr').removeClass('en_nise');
                    }
                    if (stWin == false) {
                        $('.cat_tr2').removeClass('nise');
                        $('.en_tr').removeClass('en_nise');
                    }
                    $(this).find("span").css('color', '#FFF').css({
                        "font-weight": "bold"
                    });
                    var nv = $(this).attr('data-nv');
                    $('.coment_block').find('#k' + nv).delay(500).fadeIn().css('background', '#DA2422');
                    if (stWin == false) {
                        $('.coment_block_bot').find('#k' + nv).delay(500).fadeIn().css('background', '#DA2422');
                    }
                }
                disabledClick = true;
                setTimeout(function() {
                    if (count < 5) {
                        count++;
                        console.log('game');
                        $('.option').css('background', '#fff');
                        $('.option').find("span").css('color', '#000').css({
                            "font-weight": "normal"
                        });
                        $(this).find('.coment').hide();
                        $('.coment_block').find('.coment').hide();
                        if (stWin == false) {
                            $('.coment_block_bot').find('.coment').hide();
                        }
                        disabledClick = false;
                        $('.vop' + vop).hide();
                        if (vop < 3) {
                            vop++;
                        } else {
                            vop = 1;
                        }

                        $('.vop' + vop).delay(200).fadeIn(600);
                    } else {
                        $('.verno').html('Верных ответов : ' + score);
                        $('.ne_verno').html('Не верных ответов : ' + (6 - score));
                        $('.bals').html('Набранно балов : ' + nusStak);

                        TweenMax.to('.content_sp', 0.7, { autoAlpha: 0, delay: 0.5 });
                        TweenMax.to('.coment_block', 0.8, { autoAlpha: 0 });
                        TweenMax.to('.score ', 1, { autoAlpha: 1, delay: 1.2 });
                        TweenMax.staggerFrom(['.verno', '.ne_verno', '.bals'], 1, {
                            autoAlpha: 0,
                            x: '+=45',
                            delay: 1.5
                        }, 0.25);
                        console.log(nusStak);
                    }
                }, time_nex);
            }
        });
        var disabledClick = false;
        var time_nex = 5000;
        var vop = 1;
        var stWin = false;


        var nusStak = $('.tec_num').attr('data');
        var lever = 1;

        function nuMstaK(ns) {
            nusStak = parseInt(nusStak) + parseInt(ns)

            if (nusStak < 120) {
                // $('.lains_in').css('width', (155 * nusStak) / 120 + 'px');
                TweenMax.to('.lains_in', 0.5, {
                    width: (155 * nusStak) / 120 + 'px'
                });
            }
            $('.tec_num').html(nusStak);

            console.log(nusStak);
        }
    }


}