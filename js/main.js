$(function() {
    $.getJSON('js/main.json', function(data) {
        $.each(data, function(index) {
            var r = data.main_game.quest_feedback.length;
            for (var i = 0; i < r; i++) {
                $('.coment_block').append('<div class="coment" id="k' + (i + 1) + '">' + data.main_game.quest_feedback[i].contetn_text + '</div>');
            }
        });
    });
});

$(function() {

    var disabledClick = false;
    var time_nex = 5000;
    var vop = 1;
    var stWin = false;

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
        $('#training').css({ 'opacity': ' 1' });
        $('#training').delay(200).fadeIn(600, "linear");
        vop = 1;
        stWin = true;
    });

    $('.btn_testing').click(function() {
        $('#initial_screen').fadeOut(600, "linear");
        $('#testing').css({
            'opacity': ' 1'
        });
        $('#testing').delay(200).fadeIn(600, "linear");
        vop = 1;
        stWin = false;
    });


    $('.option').next().css("border-top", "0px ");

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

                nuMstaK(1);
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
                console.log(vop);
                $('.vop' + vop).delay(200).fadeIn(600);
            }, time_nex);
        }
    });
    var nusStak = $('.tec_num').attr('data');

    function nuMstaK(ns) {
        nusStak = parseInt(nusStak) + parseInt(ns)
        if (nusStak < 1500) {
            $('.lains_in').css('width', (155 * nusStak) / 12 + 'px');
        }
        //  $('.lains_in').css('width', (155 * nusStak) / 1500 + 'px');
        $('.tec_num').html(nusStak);

        console.log(nusStak);
    }
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