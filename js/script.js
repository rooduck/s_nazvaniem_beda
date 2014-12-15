//INCLUDING PARTS IN ONE, U DON'T NEED THIS IN DEV I THINK
$(function(){
    $("#header").load("include/header.html");
    $(".site_filter").load("include/menu.html");
    $(".all_streams_wrapper, .all_rooms_wrapper").load("include/streams_list.html");
    $(".top_category_rating").load("include/category_rating.html");
    $(".block_before_streams").load("include/back_block.html");
    $(".chat_buttons").load("include/chat_buttons.html");
    $(".chat_wrapper").load("include/chat.html");
    $(".room_userlist_page").load("include/room_userlist.html");
    $(".bottom_media_zone").load("include/stream_anounses.html");
    $(".article_list").load("include/article_list.html");
    $(".best_articles").load("include/best_articles.html");
    $(".create_news").load("include/create_article.html");
    $(".article_comments_wrapper").load("include/article_comments.html");
    $(".create_stream_popup").load("include/popup_create_stream.html");
    $(".valute_popup").load("include/popup_valute.html");
    $(".add_cash_popup").load("include/popup_add_cash.html");
    $(".restore_pwd_popup").load("include/popup_forgot_password.html");
    $(".registration_popup").load("include/popup_registration.html");
    $(".search_popup").load("include/popup_search.html");
    $(".options_popup").load("include/popup_options.html");
    $(".sysmess_wrapper").load("include/popup_sysmess.html");
    $(".how_much_donate_popup").load("include/popup_donate.html");
    $(".change_pwd_popup").load("include/popup_change_password.html");
    $(".check_pwd_popup").load("include/popup_check_passw.html");
    $(".other_category_choose").load("include/popup_choose_category.html");
    $(".create_room_popup").load("include/popup_create_room.html");
    $(".autorization_popup").load("include/popup_authorization.html");
});

// PLUGIN FOR FILLING A CIRCLE, NOT SURE IF WE STILL NEED IT
(function($){
    $.fn.rotator = function(options){
        var settings = $.extend({
            starting: 0,
            ending: 100,
            percentage: true,
            color: 'green',
            lineWidth: 7,
            timer: 10,
            radius: 40,
            fontStyle: 'Tahome',
            fontSize: '20pt',
            fontColor: 'darkblue',
            backgroundColor: 'lightgray',
            num: 0,
            callback: function () {
            }
        }, options);

        this.empty().append("<canvas height ="+57 + " width="+57+" id='my-canvas"+settings.num+"'/ ></canvas>");
        var canvas = document.getElementById('my-canvas'+settings.num);
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        var radius = settings.radius;
        var context = canvas.getContext("2d");
        if(settings.backgroundColor){
            var ctx = canvas.getContext('2d');
            ctx.arc(x, y, radius, 0, 2*Math.PI, false);
            ctx.strokeStyle = settings.backgroundColor;
            ctx.lineWidth = settings.lineWidth;
            ctx.stroke();
        }
        var steps = settings.ending - settings.starting;
        var step = settings.starting;
        var z = setInterval(function(){
            var text;
            if(settings.percentage){text = step + "%";}else{text = step;}
            var start_angle = (1.5 + (step/50)-0.01)*Math.PI;
            var end_angle = (1.5 + (++step/50))*Math.PI;
            context.beginPath();
            context.arc(x, y, radius, start_angle, end_angle, false);
            context.lineWidth = settings.lineWidth;
            context.strokeStyle = settings.color;
            context.stroke();
            context.font = settings.fontSize + ' ' + settings.fontStyle;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = settings.fontColor;
            context.clearRect(x - parseInt(settings.fontSize)*1.5, y - parseInt(settings.fontSize)/2, parseInt(settings.fontSize)*3, parseInt(settings.fontSize));
            context.fillText(text, x , y );
            if(step >= steps){
                window.clearInterval(z);
                if(settings.percentage){text = step + "%";}else{text = step;}
                context.clearRect(x - parseInt(settings.fontSize)*1.5, y - parseInt(settings.fontSize)/2, parseInt(settings.fontSize)*3, parseInt(settings.fontSize));
                context.fillText(text, x , y );
                if(typeof(settings.callback) == 'function'){
                    settings.callback.call(this);
                }
            }
        }, settings.timer);
    };
}(jQuery));

$(document).ready(function(){
    setTimeout(function() {

        /*SOME GLOBAL EVENTS*/

        //pretty switcher
        $(".cb-enable").click(function(){
            var parent = $(this).parents('.switch');
            $('.cb-disable',parent).removeClass('selected');
            $(this).addClass('selected');
            $('.checkbox',parent).attr('checked', true);
        });
        $(".cb-disable").click(function(){
            var parent = $(this).parents('.switch');
            $('.cb-enable',parent).removeClass('selected');
            $(this).addClass('selected');
            $('.checkbox',parent).attr('checked', false);
        });

        //hide containers without new messages
        $('.menu_number').each(function(){
            if($(this).text().length <=0)
                $(this).hide();
        });

        //use this for all site select
        $("select").selectBoxIt();

        //remove filter from stream pic
        setStreamHover();

        //trackbar at room create popup
        set_scale_lvl();

        /*HEADER*/

        //show user_popup_profile
        $('.user_pic').click(function(){
            $(this).find('.user_pic_arrow').toggle();
            if ($('#user_popup').css('visibility')=='hidden')
            {
                $('#user_popup').css('visibility','visible');
                $('.user_popup_body').css('top','88px');
            }
            else
            {
                $('#user_popup').css('visibility','hidden');
                $('.user_popup_body').css('top','-9999px');
            }
        });

        //changing class to active user_popup_menu and switch tabs
        $('#user_popup_menu li').click(function(){
            $('#user_popup_menu li').each(function(){
                $(this).removeClass('active_li');
                $(this).find('a').removeClass('active');
            });
            $(this).addClass('active_li');
            $(this).find('a').addClass('active');

            $(".user_popup_body").each(function(){
                $(this).css('visibility','hidden');
            });

            //show popup user's category
            if ( $(this).find('a').hasClass("seven_menu_pic") )
                $(".user_achievements").css('visibility','visible');
            else if ( $(this).find('a').hasClass("third_menu_pic") )
                $(".user_messages").css('visibility','visible');
            else if ( $(this).find('a').hasClass("second_menu_pic") )
                $(".user_streams").css('visibility','visible');
            else if ( $(this).find('a').hasClass("first_menu_pic") )
                $(".user_profile").css('visibility','visible');
        });

        //menu in user popup cabinet, achievments
        $('.submenu.achievements li').click(function(){
            $('.submenu.achievements li').each(function(){
                $(this).removeClass('active');
            });
            $(this).addClass('active');
        });

        //menu in user popup cabinet, favorites
        $('.submenu.streams li').click(function(){
            $('.submenu.streams li').each(function(){
                $(this).removeClass('active');
            });
            $(this).addClass('active');
        });

        //change chat list in messages
        $('.user_message_list_row').click(function(){
            $('.user_message_list_row').each(function(){
                $(this).removeClass('active');
            });
            $(this).addClass('active');
        });

        //calculating width for x-scrolled blocks (in px instead of %)
        var horizontal_block_podpiski_width = $(".user_streams_list .favorite_stream").size()*265;//265 - outerWidth
        $(".user_streams_list_wrapper").css('width',horizontal_block_podpiski_width);
        var horizontal_block_ignorelist_width = $(".user_streams_ignore_list .favorite_stream").size()*265;//265 - outerWidth
        $(".user_streams_ignore_list_wrapper").css('width',horizontal_block_ignorelist_width);

        //del from favorite, ignorelist
        $('.favorite_del').click(function(){
            $('.stream_popup_del').show();
        });

        $('.stream_popup_del .blue_a_button.yes, .stream_popup_del .blue_a_button.no').click(function(){
            $('.stream_popup_del').hide();
        });

        //favorite submenu switcher
        $('.submenu_li.podpiski').click(function(){
            $('.user_streams_wrapper').show();
            $('.user_streams_ignore_wrapper').hide();
        });

        $('.submenu_li.ignorelist').click(function(){
            $('.user_streams_wrapper').hide();
            $('.user_streams_ignore_wrapper').show();
        });


        /*TOP MENU*/

        //left part switch class
        $('.top_streams_menu .left_menu_column_text span').click(function(){
            $('.top_streams_menu .left_menu_column_text span').each(function(){
                $(this).removeClass('active');
                $('.top_streams_menu .menu_lines div').removeClass('active');
            });
            if ($(this).hasClass('first'))
                $('.top_streams_menu .menu_lines .first_topmenu_line').addClass('active');
            else if ($(this).hasClass('second'))
                $('.top_streams_menu .menu_lines .second_topmenu_line').addClass('active');
            else if ($(this).hasClass('third'))
                $('.top_streams_menu .menu_lines .third_topmenu_line').addClass('active');
            $(this).addClass('active');
        });

        //menu switch active
        $('.top_streams_menu .first_cat_level  .cifri_wrapper, .top_streams_menu .second_cat_level  .cifri_wrapper, .top_streams_menu .third_cat_level .cifri_wrapper').click(function(){
            $(this).each(function(){
                $(this).removeClass('active');
            });
            $(this).addClass('active');
        });




        /*STREAM AND ROOM LIST*/

        //top category rating
        $(".rating_list_wrapper").carouFredSel({
            items               : 15,
            auto:{play:false},
            circular: false,
            infinite: false,
            direction           : "up",
            responsive	: false,
            prev        : ".next_rating_page",
            next        : ".prev_rating_page",
            scroll : {
                items           : 15,
                easing          : "linear",
                duration        : 1000,
                pauseOnHover    : true
            }
        });




        /*OPEN ROOM*/

        //room_option_page switcher
        $('.room_page_name').click(function(){
            if ($(this).hasClass('option'))
            {
                $('.room_block_switcher .room_page_name').removeClass('active');
                $(this).addClass('active');
                $('.room_userlist_page').hide();
                $('.room_options_page').show();
            }
            else if ($(this).hasClass('list'))
            {
                $('.room_block_switcher .room_page_name').removeClass('active');
                $(this).addClass('active');
                $('.room_options_page').hide();
                $('.room_userlist_page').show();
            }
        });

        //room slide users block list
        $('.slide_block span').click(function(){
            if ($(this).parent().next().css("display")=="none")
                $(this).parent().next().slideDown("fast");
            else
                $(this).parent().next().slideUp("fast");
        });




        /*BROADCAST SCHEDULE*/

        $(".the_hardest_part_wrapper").carouFredSel({
            items               : {visible: 4,minimum:4},
            auto:{play:false},
            circular: false,
            infinite: false,
            duration:"left",
            responsive	: false,
            prev        : {button: ".prev_raspisanie",direction:"left",easing:"linear"},
            next        : {button: ".next_raspisanie",direction:"right",easing:"linear"},
            scroll : {
                items           : 4,
                easing          : "linear",
                duration        : 1000,
                pauseOnHover    : true
            }
        });




        /*ARTICLES*/

        /*menu*/

        //content_left_streamers_menu
        $('.content_streams_menu .left_menu_column_text span').click(function(){
            $('.content_streams_menu .left_menu_column_text span').each(function(){
                $(this).removeClass('active');
                $('.content_streams_menu .menu_lines div').removeClass('active');
            });

            if ($(this).hasClass('first'))
                $('.content_streams_menu .menu_lines .first_topmenu_line').addClass('active');
            else if ($(this).hasClass('second'))
                $('.content_streams_menu .menu_lines .second_topmenu_line').addClass('active');
            else if ($(this).hasClass('third'))
                $('.content_streams_menu .menu_lines .third_topmenu_line').addClass('active');
            else if ($(this).hasClass('fourth'))
                $('.content_streams_menu .menu_lines .fourth_topmenu_line').addClass('active');
            $(this).addClass('active');
        });

        //menu switch active
        $('.content_streams_menu .first_cat_level .cifri_wrapper, .content_streams_menu .second_cat_level .cifri_wrapper, .content_streams_menu .third_cat_level .cifri_wrapper').click(function(){
            $(this).each(function(){
                $(this).removeClass('active');
            });
            $(this).addClass('active');
        });

        /*best of articles*/

        //slider
        $(".material_list_wrapper").carouFredSel({
            items               : 9,
            auto:{play:false},
            circular: false,
            infinite: false,
            direction           : "up",
            responsive	: false,
            prev        : ".the_best_prev_page",
            next        : ".the_best_next_page",
            scroll : {
                items           : 9,
                easing          : "linear",
                duration        : 1000,
                pauseOnHover    : false
            }
        });

        //switcher
        $('.material_list_switcher .list_switcher').click(function(){
            $('.list_switcher').each(function(){
                $(this).removeClass('active');
            });
            $(this).addClass('active');
        });

        /*filter under list*/

        //change active filter preview article class
        $('.best_filter1 .articles_show_filter span').click(function(){
            $(".best_filter1 .articles_show_filter span").removeClass('selected');
            $(this).addClass('selected');
        });
        $('.best_filter2 .articles_show_filter span').click(function(){
            $(".best_filter2 .articles_show_filter span").removeClass('selected');
            $(this).addClass('selected');
        });

        /*COMMENTS ARTICLE*/
        $('.comment_hover_left_border').each(function(){
            $(this).css("height",$(this).parent().height()-2);
        });

        //changing classes in comment rating
        $('.comment_rating_wrapper .up_comment_rating').click(function(){
            $(this).addClass('selected');
            $(this).parent().find('.down_comment_rating').removeClass('selected');
        });

        $('.comment_rating_wrapper .down_comment_rating').click(function(){
            $(this).addClass('selected');
            $(this).parent().find('.up_comment_rating').removeClass('selected');
        });

        //show smiles popup in article comments
        $('.enter_comment .smiles_img').click(function(){
            if ($('.click_user_popup2').css('display')=='none')
                $('.click_user_popup2').show();
            else $('.click_user_popup2').hide();
        });
        $('.close_open_popup2').click(function(){
            $('.click_user_popup2').hide();
        });

        //article comments hover
        $('.article_comment_row').hover(function(){
                $(this).find('.comment_hover_left_border:first').show();
                $(this).find('.up_rating:first').css("visibility","visible");
                $(this).find('.down_rating:first').css("visibility","visible");
                $(this).find('.user_comment_options:first').css("visibility","visible");
                return;
            },
            function() {
                $(this).find('.comment_hover_left_border:first').hide();
                $(this).find('.up_rating:first').css("visibility","hidden");
                $(this).find('.down_rating:first').css("visibility","hidden");
                $(this).find('.user_comment_options:first').css("visibility","hidden");
                $(this).find('.total_comment_rating').show();
                $(this).find('.how_much_left_popup').hide();
                $(this).find('.article_comment_rating').hide();
            });




        /*POPUPS INITIALIZATION AND WORK INSIDE*/

        //close
        $('.close_category').click(function(){
            $(this).parent().css('visibility','hidden');
            $('.fade').hide();
        });

        //close popup rating
        $('.close_rating').click(function(){
            $(this).parent().hide();
            $('.up_rating, .down_rating').removeClass('selected');
        });

        //popup s valutoi OLD VERSION
        $('.li_second').click(function(){
            $('.hide_popup').hide();
            $('.valute_popup').show();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.valute_popup').hide();
            }
            else {
                $('.user_main_menu .some_li').find('div').removeClass('active');
                $(this).addClass('active');
                $('.valute_popup').show();
            }
        });

        //valute popup tabs
        $('.operacii_tabs .oper_tab').click(function(){
            $('.operacii_tabs .oper_tab').each(function(){
                $(this).removeClass('active');
                $('.lenta_operacii').hide();
            });
            $(this).addClass('active');
            if ($(this).hasClass('first_tab'))
                $('.lenta_operacii.tab1').show();
            else if ($(this).hasClass('second_tab'))
                $('.lenta_operacii.tab2').show();
            else if ($(this).hasClass('third_tab'))
                $('.lenta_operacii.tab3').show();
            else if ($(this).hasClass('fourth_tab'))
                $('.lenta_operacii.tab4').show();
        });

        //clicking the button at valute_popup
        $('.add_cash_button').click(function(){
            $('.hide_popup').hide();
            $('.add_cash_popup').show();
        });

        //popup search
        $('.user_main_menu .li_first').click(function(){
            $('.hide_popup').hide();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.search_popup').hide();
            } else {
                if($(window).width()>1200)
                    $('.search_popup').css('right',($(window).width()-1200)/2+11+'px');
                else
                    $('.search_popup').css('right','');
                $('.user_main_menu .some_li').find('div').removeClass('active');
                $(this).addClass('active');
                $('.search_popup').show();
            }
        });

        //option popup
        $('.user_main_menu .li_fourth').click(function(){
            $('.hide_popup').hide();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.options_popup').hide();

            } else {
                if($(window).width()>1200)
                    $('.options_popup').css('right',($(window).width()-1200)/2+11+'px');
                else
                    $('.options_popup').css('right','');
                $('.user_main_menu .some_li').find('div').removeClass('active');
                $(this).addClass('active');
                $('.options_popup').show();
            }
        });

        //forget_passw_popup
        $('a.text_popup').click(function(){
            $('.restore_pwd_popup').css("visibility","visible");
            $('.autorization_popup').css("visibility","hidden");
            $('fade').show();
        });

        //create stream popup in top menu
        $('.user_main_menu .li_third').click(function(){
            $('.hide_popup').hide();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.create_stream_popup').css('visibility','hidden');

            } else {
                $('.user_main_menu .some_li').find('div').removeClass('active');
                $(this).addClass('active');
                $('.create_stream_popup').css('visibility','visible');
                $('.fade').show();
            }
        });

        //create stream popup button
        $('.create_stream_but').click(function(){
            $('.create_stream_popup').css('visibility','visible');
            $('.fade').show();
        });

        //create room popup
        $('.create_room_but').click(function(){
            $('.fade').show();
            $('.create_room_popup').find('.create_new_room').text("Создать комнату");
            $('.create_room_popup').css('visibility','visible');
        });

        //redact room popup
        $('.redact_room').click(function(){
            $('.create_room_popup').find('.create_new_room').text("Изменить");
            $('.fade').show();
            $('.create_room_popup').css('visibility','visible');
        });

        //change register captcha pic at registration popup
        $('.captcha_pic').click(function(){
            $('.captcha_pic').each(function(){
                $(this).removeClass('true');
                $(this).find('span').removeClass('true_captcha');
            });
            $(this).addClass('true');
            $(this).find('span').addClass('true_captcha');
        });

        //show popup how much donate
        $('.support_add').click(function(){
            $('.how_much_donate_popup').show();
        });


        //TODO: refactor
        //show registration popup
        $('.reg, .top_streams_menu_create .text span, .content_menu_create .text span').click(function(){
            $('.hide_popup').hide();
            $('.user_main_menu .some_li').find('div').removeClass('active');
            $('.registration_popup').show();
        });

        $('.registration_popup .close_btn').click(function(){
            $('.registration_popup').hide();
            $('.user_main_menu .some_li').find('div').removeClass('active');
        });
        $('.valute_popup .close_btn').click(function(){
            $('.valute_popup').hide();
            $('.user_main_menu .some_li').find('div').removeClass('active');
        });
        $('.create_stream_popup .close_btn').click(function(){
            $('.create_stream_popup').hide();
            $('.user_main_menu .some_li').find('div').removeClass('active');
        });
        $('.add_cash_popup .close_btn').click(function(){
            $('.add_cash_popup').hide();
            $('.user_main_menu .some_li').find('div').removeClass('active');
        });
        $('.how_much_donate_popup .close_btn').click(function(){
            $('.how_much_donate_popup').hide();
        });

        //show forget password popup
        $('.forgot').click(function(){
            $('.hide_popup').hide();
            $('.user_main_menu .some_li').find('div').removeClass('active');
            $('.restore_pwd_popup').css('visibility',"visible");
        });
        $('.restore_pwd_popup .close_btn').click(function(){
            $('.restore_pwd_popup').css('visibility',"hidden");
        });

        //close sysmessage
        $('.close_sysmess_popup').click(function(){
            $(this).parent().fadeOut(500); //maybe we can del this code instead of hidding?
        });

        //show number of people in choose category popup
        $('.category_choose-category').hover(function(){
                $(this).find('.category_choose_people').show();
                $(this).find('.black_filtr').css("background","rgba(0,0,0,0)");
            },
            function() {
                $(this).find('.category_choose_people').hide();
                $(this).find('.black_filtr').css("background","rgba(0,0,0,0.5)");
            });

        /*hide popups when clicking on the page*/
        $(document).click(function(event) {

            //WHO IN CHAT
            if ($(event.target).closest(".who_is_in_chat").length || $(event.target).closest(".people_in_this_chat span").length) return;
            else
                $(".who_is_in_chat").hide();
            //ACTION LIST WHEN CLICK ON USER NICK IN CHAT
            if ($(event.target).closest(".click_user_popup.action_user").length) return;
            else
                $(".click_user_popup.action_user").hide();
            //CHAT OPTIONS
            if ($(event.target).closest(".click_user_popup.option_popup").length || $(event.target).closest(".options.chat_pic").length) return;
            else {
                $('.option_popup').hide();
                $('.options.chat_pic').removeClass('active');
            }
            //ARTICLE COMMENTS SMILES
            if ($(event.target).closest(".click_user_popup2 .chat_list_wrapper2").length || $(event.target).closest(".enter_comment .smiles_img").length) return;
            else
                $('.click_user_popup2').hide();
            //CHAT SMILES
            if (!$(event.target).hasClass('chat_smiles') && $(event.target).closest(".smaili").length || $(event.target).closest(".smiles.chat_pic").length) return;
            else {
                $('.smaili').hide();
                $('.smiles.chat_pic').removeClass('active');
            }
            //CHAT POLL
            if ($(event.target).closest(".golosovalka").length || $(event.target).closest(".poll.chat_pic").length) return;
            else {
                $('.golosovalka').hide();
                $('.poll.chat_pic').removeClass('active');
            }
            //CHAT POLL
            if ($(event.target).closest(".vote_poll").length || $(event.target).closest(".poll2.chat_pic").length) return;
            else {
                $('.vote_poll').hide();
                $('.poll2.chat_pic').removeClass('active');
            }
            //CHAT POLL
            if ($(event.target).closest(".poll_results").length || $(event.target).closest(".poll3.chat_pic").length) return;
            else {
                $('.poll_results').hide();
                $('.poll3.chat_pic').removeClass('active');
            }
            //OPTIONS IN TOP HEADER LINE
            if ($(event.target).closest(".options_popup").length || $(event.target).closest(".li_fourth").length) return;
            else {
                $('.options_popup').hide();
                $('.li_fourth').removeClass('active');
            }
            //SEARCH IN TOP HEADER LINE
            if ($(event.target).closest(".search_popup").length || $(event.target).closest(".li_first").length) return;
            else {
                $('.search_popup').hide();
                $('.li_first').removeClass('active');
            }
            event.stopPropagation();
        });




        /*STREAMER PAGE*/

        //change players
        $('.players_switcher span').click(function(){
            $('.players_switcher span').removeClass('active');
            $(this).addClass('active');
        });

        //changing classes at stream_page
        $('.streamer_subscribed_star').click(function(){
            if ($(this).hasClass('subscribed'))
                $(this).removeClass('subscribed');
            else $(this).addClass('subscribed');
        });

        //subsribe on stream
        $('.subsribe').click(function(){
            $(this).toggleClass('true');
        });

        /*CHAT*/

        window.script_Chat_list_users = function(){
            $('.who_is_in_chat').show();
        }

        //show action on streamer nick click
        $('.chat_streamer_action .text').click(function(){
            $('.popup_actions_list').css('width',$('.chat_streamer_action .text').outerWidth(true));
            $('.popup_actions_list').toggle(400);
        });

        //hide after clicking the option
        $('.popup_actions_list .action_name_row').click(function(){
            $('.popup_actions_list').fadeOut(400);
        });

        //hide user_in_chat_list when clicking on someone's nick
        $('.user_in_chat_row').click(function(){
            $('.who_is_in_chat').hide();
        });

        //update click
        $('.user_in_chat_list').bind("DOMSubtreeModified",function(){
            $('.user_in_chat_row').click(function(){
                $('.who_is_in_chat').hide();
            });
        });

        //channel chats list
        $('.selected_channel').click(function(){
            if ($('.popup_chats_list').css('display')=='none')
                $('.popup_chats_list').show();
            else
                $('.popup_chats_list').hide();
        });
        $('.channel_name_row').click(function(){
            $('.popup_chats_list').hide();
            $('.channel_name_row').removeClass('active');
            $(this).addClass('active');
            $('.selected_channel .text').text($(this).find('.chat_name').text());
        });

        //hint buttons under the chat
        $('.chat_pic').hover(function(){
                $(this).find('.chat_hint').show();
            },
            function() {
                $(this).find('.chat_hint').hide();
            });

        //changing activeClass at icons and show popups
        $('.chat_pic').click(function() {

            $('.click_user_popup').hide();
            if ($(this).hasClass('active'))
                $(this).removeClass('active');
            else {
                if ($('.mat_filter').hasClass('active')) {
                    $('.chat_pic').removeClass('active');
                    $('.mat_filter').addClass('active');
                }
                else
                    $('.chat_pic').removeClass('active');
                $(this).addClass('active');
            }
            if ($(this).hasClass('options')) {
                if ($(this).hasClass('active'))
                    $('.click_user_popup.option_popup').show();
                else
                    $('.click_user_popup.option_popup').hide();
            }
            else if ($(this).hasClass('smiles')) {
                if ($(this).hasClass('active'))
                    $('.click_user_popup.smaili').show();
                else
                    $('.click_user_popup.smaili').hide();
            }
            else if ($(this).hasClass('poll')) {
                if ($(this).hasClass('active'))
                    $('.click_user_popup.golosovalka').show();
                else
                    $('.click_user_popup.golosovalka').hide();
            }
            else if ($(this).hasClass('poll2')) {
                if ($(this).hasClass('active'))
                    $('.click_user_popup.vote_poll').show();
                else
                    $('.click_user_popup.vote_poll').hide();
            }
            else if ($(this).hasClass('poll3')) {
                if ($(this).hasClass('active'))
                    $('.click_user_popup.poll_results').show();
                else
                    $('.click_user_popup.poll_results').hide();
            }
        });

        //popup users in chat
        $('.people_in_this_chat .text').click(function(){
            if ($('.user_chats .mat_filter').hasClass('active'))
            {
                $('.user_chats .chat_pic').removeClass('active');
                $('.mat_filter').addClass('active');
            }
            else
                $('.user_chats .chat_pic').removeClass('active');
            if ( $('.who_is_in_chat').is(':visible'))
                $('.click_user_popup').hide();
            else
            {
                $('.click_user_popup').hide();
                $('.who_is_in_chat').show();
            }
        });
        //close popup
        $('.close_open_popup').click(function(){
            $('.click_user_popup').hide();
        });

        //toogle option class
        $('.click_user_popup_row.chat_opt').click(function() {
            if ($(this).hasClass('enabled')) {
                $(this).removeClass('enabled');
                $(this).addClass('disabled');
            }
            else  {
                $(this).removeClass('disabled');
                $(this).addClass('enabled');
            }
        });

        //add new input for answers in poll
        var input_clicks=3;
        $('.add_answer').click(function(){
            input_clicks++;
            $('.answer_input').each(function(){
                $(this).find("input").attr('value',$(this).find("input").val())
            });
            $html = $('.input_answers_block').html();

            if (input_clicks<11)
                $html+='<div class="answer_input"><span class="golosovalka_podpis input_podpis">'+input_clicks+'.</span><input type="text" class="input_answer" name="answer'+input_clicks+'"/></div>';
            $('.input_answers_block').html($html);
        });

        //test paint graphs
        var vote_result = {1: 22, 2: 5, 3: 77, 4: 32,5:34,6:12};
        var choosed=5;
        script_paint_graphs(vote_result,choosed);






    /*CUSTOM SCROLLBAR PLUGIN*/

    //user message_list
    $(".user_message_list").mCustomScrollbar({
        axis:"y",
        theme:"light",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 },
        callbacks:{
            onScrollStart:function(){
                $(".user_message_list_wrapper .top_shadow").show();
                $(".user_message_list_wrapper .bottom_shadow").show();
            },
            onTotalScroll:function(){
                $(".user_message_list_wrapper .top_shadow").show();
                $(".user_message_list_wrapper .bottom_shadow").hide();
            },
            onTotalScrollBack:function(){
                $(".user_message_list_wrapper .top_shadow").hide();
                $(".user_message_list_wrapper .bottom_shadow").show();
            }
        }
    });

    //valute operations
    $('.lenta_operacii').each(function(){
        $(this).mCustomScrollbar({
            axis:"y",
            theme:"light",
            scrollInertia: 950,
            mouseWheel:{ scrollAmount: 1000 }
        });
    });

    //create_poll_room
    $('.room_create_poll').each(function(){
        $(this).mCustomScrollbar({
            axis:"y",
            theme:"light",
            scrollInertia: 950,
            mouseWheel:{ scrollAmount: 1000 }
        });
    });

    //users in room
    $('.room_userlist_page_wrapper').mCustomScrollbar({
        axis:"y",
        theme:"light",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 }
    });

    //result room polls
    $('.room_results_poll').each(function(){
        $(this).mCustomScrollbar({
            axis:"y",
            theme:"light",
            scrollInertia: 950,
            mouseWheel:{ scrollAmount: 1000 }
        });
    });

    //result room polls
    $('.room_vote_poll').each(function(){
        $(this).mCustomScrollbar({
            axis:"y",
            theme:"light",
            scrollInertia: 950,
            mouseWheel:{ scrollAmount: 1000 }
        });
    });

    //custom select
    $('.selectBox-menuShowing-bottom').mCustomScrollbar({
        axis:"y",
        theme:"light"
    });

    //smiles_list
    $('.chat_list_wrapper').mCustomScrollbar({
        axis:"y",
        theme:"light",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 }
    });

    //chat so specom
    $('.chat_specialist_wrapper').mCustomScrollbar({
        axis:"y",
        theme:"light",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 }
    });

    //user_message_chat
    $(".user_message_chat").mCustomScrollbar({
        axis:"y",
        theme:"light",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 },
        callbacks:{
            onScrollStart:function(){
                $(".user_message_chat_wrapper .top_shadow").show();
                $(".user_message_chat_wrapper .bottom_shadow").show();
            },
            onTotalScroll:function(){
                $(".user_message_chat_wrapper .top_shadow").show();
                $(".user_message_chat_wrapper .bottom_shadow").hide();
            },
            onTotalScrollBack:function(){
                $(".user_message_chat_wrapper .top_shadow").hide();
                $(".user_message_chat_wrapper .bottom_shadow").show();
            }
        }
    });

    //registration
    $(".registr_contract").mCustomScrollbar({
        axis:"y",
        theme:"light",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 }
    });

    //achievments
    $(".user_achievements_list").mCustomScrollbar({
        axis:"y",
        theme:"light",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 },
        callbacks:{
            onScrollStart:function(){
                $(".achievements_wrapper .top_shadow").show();
                $(".achievements_wrapper .bottom_shadow").show();
            },
            onTotalScroll:function(){
                $(".achievements_wrapper .top_shadow").show();
                $(".achievements_wrapper .bottom_shadow").hide();
            },
            onTotalScrollBack:function(){
                $(".achievements_wrapper .top_shadow").hide();
                $(".achievements_wrapper .bottom_shadow").show();
            }
        }
    });

    //favorite stream list
    $(".user_streams_list").mCustomScrollbar({
        axis:"x",
        theme:"light",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 },
        callbacks:{
            onScrollStart:function(){
                $(".user_streams_wrapper .right_shadow").show();
                $(".user_streams_wrapper .left_shadow").show();
            },
            onTotalScroll:function(){
                $(".user_streams_wrapper .left_shadow").show();
                $(".user_streams_wrapper .right_shadow").hide();
            },
            onTotalScrollBack:function(){
                $(".user_streams_wrapper .left_shadow").hide();
                $(".user_streams_wrapper .right_shadow").show();
            }
        }
    });

    //favorite igronelist
    $(".user_streams_ignore_list").mCustomScrollbar({
        axis:"x",
        theme:"light",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 },
        callbacks:{
            onScrollStart:function(){
                $(".user_streams_ignore_wrapper .right_shadow").show();
                $(".user_streams_ignore_wrapper .left_shadow").show();
            },
            onTotalScroll:function(){
                $(".user_streams_ignore_wrapper .left_shadow").show();
                $(".user_streams_ignore_wrapper .right_shadow").hide();
            },
            onTotalScrollBack:function(){
                $(".user_streams_ignore_wrapper .left_shadow").hide();
                $(".user_streams_ignore_wrapper .right_shadow").show();
            }
        }
    });

    //profile history experience
    $(".profile_hist_wrapper").mCustomScrollbar({
        axis:"y",
        theme:"light",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 },
        callbacks:{
            onScrollStart:function(){
                $(".profile_hist .top_shadow").show();
                $(".profile_hist .bottom_shadow").show();
            },
            onTotalScroll:function(){
                $(".profile_hist .top_shadow").show();
                $(".profile_hist .bottom_shadow").hide();
            },
            onTotalScrollBack:function(){
                $(".profile_hist .top_shadow").hide();
                $(".profile_hist .bottom_shadow").show();
            }
        }
    });

    //all streams
    $(".all_streams_wrapper").mCustomScrollbar({
        axis:"y",
        theme:"light",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 }
    });
    $('.all_streams_wrapper .mCSB_container').bind("DOMSubtreeModified",function(){

        $(".all_streams_wrapper").mCustomScrollbar({
            axis:"y",
            theme:"light",
            scrollInertia: 950,
            mouseWheel:{ scrollAmount: 1000 }
        });
        setStreamHover();
    });

    //custom select in chat header
    $(".popup_chats_list_wrapper").mCustomScrollbar({
        axis:"y",
        theme:"light",
        scrollInertia: 650,
        mouseWheel:{ scrollAmount: 500 }
    });

    //for popups in chat
    $(".click_user_popup_wrapper").mCustomScrollbar({
        axis:"y",
        theme:"light",
        scrollInertia: 650,
        mouseWheel:{ scrollAmount: 500 }
    });
    //users in chat list
    $(".user_in_chat_wrapper").mCustomScrollbar({
        axis:"y",
        theme:"light",
        scrollInertia: 650,
        mouseWheel:{ scrollAmount: 500 }
    });

    //all rooms
    $(".all_rooms_wrapper").mCustomScrollbar({
        axis:"y",
        theme:"light",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 },
        callbacks:{
            onScrollStart:function(){
                $(".all_rooms_wrapper_with_shadow .top_shadow").show();
                $(".all_rooms_wrapper_with_shadow .bottom_shadow").show();
            },
            onTotalScroll:function(){
                $(".all_rooms_wrapper_with_shadow .top_shadow").show();
                $(".all_rooms_wrapper_with_shadow .bottom_shadow").hide();
            },
            onTotalScrollBack:function(){
                $(".all_rooms_wrapper_with_shadow .top_shadow").hide();
                $(".all_rooms_wrapper_with_shadow .bottom_shadow").show();
            }
        }
    });

    /*GROUP OF CUSTOM CHECKBOXES*/

    $('.blue_checkbox').iCheck({
        cursor: true,
        checkboxClass: 'icheckbox_futurico',
        radioClass: 'icheckbox_futurico2'
    });
    $('.white_checkbox').iCheck({
        cursor: true,
        checkboxClass: 'icheckbox_futurico_white',
        radioClass:'icheckbox_futurico_white'
    });
    $('.anonsi_checkbox').iCheck({
        cursor: true,
        checkboxClass: 'icheckbox_dark_blue2'
    });
    $('.black_checkbox').iCheck({
        cursor: true,
        radioClass: 'icheckbox_black'
    });





    /*GROUP OF HINTS*/

    //hint for top_user_menu
    $('.some_li').hover(function(){
            $(this).find('.user_main_menu_hit').show();
        },
        function() {
            $(this).find('.user_main_menu_hit').hide();
        });
    //show checkbox in raspisanie
    $('.stream_row').hover(function(){
            $(this).find('.icheckbox_dark_blue').css('height',$(this).height());
            $(this).find('.icheckbox_dark_blue').show();
        },
        function() {
            $(this).find('.icheckbox_dark_blue').hide();
        });
    $('.icheckbox_dark_blue .iCheck-helper').hover(function(){

        },
        function(){
            $(this).parent().hide();
        });
    $('.icheckbox_dark_blue .iCheck-helper').hover(function(){
            $(this).parent().next('.checkbox_hint').show();
        },
        function() {
            $(this).parent().next('.checkbox_hint').hide();
        });
    $('.icheckbox_dark_blue').on('ifChecked', function(event){
        $(this).parent().addClass('active');
    });
    $('.icheckbox_dark_blue').on('ifUnchecked', function(event){
        $(this).parent().removeClass('active');
    });




    /*GROUP OF FILLING CIRCLE PLUGIN*/

    //filling streamer lvl exp in user popup cabinet favorites
    var numb=0;

    //streamer
    $('.its_streamer .favorite_lvl').each(function(){
        $(this).find('.for_canvas').rotator({
            num : numb,
            starting: 0,
            ending: parseInt($(this).find('.how_much_fill').text()),
            lineWidth: 6,
            color:'#3189ef',
            fontSize:'0px',
            backgroundColor: '#193c65',
            radius:24
        });
        numb++;
    });

    //author
    $('.its_author .favorite_lvl').each(function(){
        $(this).find('.for_canvas').rotator({
            num : numb,
            starting: 0,
            ending: parseInt($(this).find('.how_much_fill').text()),
            lineWidth: 6,
            color:'#0fd483',
            fontSize:'0px',
            backgroundColor: '#085b44',
            radius:24
        });
        numb++;
    });

    //category
    $('.its_category .favorite_lvl').each(function(){
        $(this).find('.for_canvas').rotator({
            num : numb,
            starting: 0,
            ending: parseInt($(this).find('.how_much_fill').text()),
            lineWidth: 6,
            color:'#3189ef',
            fontSize:'0px',
            backgroundColor: '#193c65',
            radius:24
        });
        numb++;
    });

    //room
    $('.its_room .favorite_lvl').each(function(){
        $(this).find('.for_canvas').rotator({
            num : numb,
            starting: 0,
            ending: parseInt($(this).find('.how_much_fill').text()),
            lineWidth: 6,
            color:'#3189ef',
            fontSize:'0px',
            backgroundColor: '#193c65',
            radius:24
        });
        numb++;
    });

    //user profile

    //streamer
    $('.profile_lvl.streamer').each(function(){
        $(this).find('.for_canvas').rotator({
            num : numb,
            starting: 0,
            ending: parseInt($(this).find('.how_much_fill').text()),
            lineWidth: 6,
            color:'#3189ef',
            fontSize:'0px',
            backgroundColor: '#193c65',
            radius:24
        });
        numb++;
    });

    //author
    $('.profile_lvl.author').each(function(){
        $(this).find('.for_canvas').rotator({
            num : numb,
            starting: 0,
            ending: parseInt($(this).find('.how_much_fill').text()),
            lineWidth: 6,
            color:'#0fd483',
            fontSize:'0px',
            backgroundColor: '#095d42',
            radius:24
        });
        numb++;
    });

    //support
    $('.profile_lvl.support').each(function(){
        $(this).find('.for_canvas').rotator({
            num : numb,
            starting: 0,
            ending: parseInt($(this).find('.how_much_fill').text()),
            lineWidth: 6,
            color:'#f9ea42',
            fontSize:'0px',
            backgroundColor: '#696628',
            radius:24
        });
        numb++;
    });

    //robot
    $('.profile_lvl.robot').each(function(){
        $(this).find('.for_canvas').rotator({
            num : numb,
            starting: 0,
            ending: parseInt($(this).find('.how_much_fill').text()),
            lineWidth: 6,
            color:'#bf1d30',
            fontSize:'0px',
            backgroundColor: '#4f0f1e',
            radius:24
        });
        numb++;
    });

    /*GROUP OF CONNECTING LINES PLUGIN. THEY ALL ARE REINITIALIZE ON "resize"*/
    $('.selectboxit-container .selectboxit-options').each(function(){
        $(this).mCustomScrollbar({
            axis:"y",
            theme:"light",
            scrollInertia: 950,
            mouseWheel:{ scrollAmount: 180 }
        });
    });
    $('.room_chat .chat_message').first().css("padding-top","21px");
    $('.room_chat .chat_wrapper').bind("DOMSubtreeModified",function(){
        $('.room_chat .chat_message').first().css("padding-top","21px");
    });


    }, 1500);
});

//for rating value
window.set_rating_trackbar = function(max)
{
    $("#slider-range-rating").slider({
        range: "min",
        animate: false,
        min: 1,
        max: max,
        step:1,
        value: 1,
        slide: function( event, ui ) {
            $( "#slider-range-rating .ui-slider-handle" ).text(ui.value);
            $("#slider-range-rating").parent().find('input').val(ui.value);
        }
    });
    $( "#slider-range-rating .ui-slider-handle" ).text("1");
    $( ".max_value" ).text(max);
}

//for range slider
window.set_scale_lvl = function()
{
    $("#slider-range").slider({
        animate: true,
        range: "min",
        animate: false,
        min: 10,
        max: 99,
        step:1,
        value: 1,
        slide: function( event, ui ) {
            $( "#amount span" ).text(Math.floor(ui.value/10) );
            $("#amount_input").val(Math.floor(ui.value/10));
            $( ".room_enter_lvl_popup_trackbar span" ).text(Math.floor(ui.value/10)+' уровень' );
            var q = $("#slider-range").slider( "option", "max") - $("#slider-range").slider( "option", "min");
            var k = ($("#slider-range").slider( "option", "max")-ui.value)/q;
            $('.room_enter_lvl_popup_trackbar').css('right',$("#slider-range").width()*k-34);
        }
    });
    var html="";
    var margin=0;
    for (var i=1;i<$("#slider-range").slider( "option", "max" )/10;i++)
    {
        margin=i*$("#slider-range").width() * 10/$("#slider-range").slider( "option", "max");
        margin+=3*i;
        if (i!=9)
            html+="<div class='lvl_point' style='left:"+margin+"px'></div>";
    }
    $("#level_points").html(html);
}

//show errors
window.script_error_popup = function(error_text){
    $('.error_popup span').text(error_text);
    if ($(window).height()>712)
        $('.error_popup').css('top',$(window).height()/2-100);
    else
        $('.error_popup').css('top','');
    if ($(window).width()>1200)
        $('.error_popup').css('left',$(window).width()/2-200);
    else
        $('.error_popup').css('left','');
    $('.error_popup').show();
    setTimeout(function() {
        $('.error_popup').fadeOut('fast');
    }, 5000);
}

/** t0s - общий код для всех страниц **/
$(document).ready(function() {

    var script_BE = (function(){
        var allMethodsNames = {
            'smiles': 'smile/get'
        };
        //Private
        function getPhpUri() {
            return '//'+ window.location.hostname +'/index.php?r=';
        }
        function getToken() {
            return $('meta[name|=\'token\']').attr('content');
        }
        //Public
        return {
            getMethodName: function(key) {
                return allMethodsNames[key] || console.log('ERROR >>> неправильно задан ключ к событию %k', key);
            },
            sendToPHP : function(type,param) {
                var uri = getPhpUri() +type;
                param = param || {};

                param.YII_CSRF_TOKEN = getToken(); // Добавляем токен CSRF

                // Request -> Response
                $.post(uri, param, function(data, textStatus, jqXHR) {
                    /*switch (type) {
                     case 'smile/get':
                     script_PubSub.publish('POST:smiles',jqXHR.responseText);
                     break;
                     default:
                     console.log('sendToPhp unknown param %p', type);
                     }*/
                    script_PubSub.publish(type,jqXHR.responseText);
                }).fail(function(){
                    console.log('Ошибка отправки запроса к пхп');
                });

            }
        };
    })();

    var script_PubSub = (function() {

        var myObject = {};

        // Storage for topics that can be broadcast
        // or listened to
        var topics = {};

        // An topic identifier
        var subUid = -1;

        // Publish or broadcast events of interest
        // with a specific topic name and arguments
        // such as the data to pass along
        myObject.publish = function( topic, args ) {

            if ( !topics[topic] ) {
                return false;
            }

            var subscribers = topics[topic],
                len = subscribers ? subscribers.length : 0;

            while (len--) {
                subscribers[len].func( topic, args );
            }

            return this;
        };

        // Subscribe to events of interest
        // with a specific topic name and a
        // callback function, to be executed
        // when the topic/event is observed
        myObject.subscribe = function( topic, func ) {

            if (!topics[topic]) {
                topics[topic] = [];
            }

            var token = ( ++subUid ).toString();
            topics[topic].push({
                token: token,
                func: func
            });
            return token;
        };

        // Unsubscribe from a specific
        // topic, based on a tokenized reference
        // to the subscription
        myObject.unsubscribe = function( token ) {
            for ( var m in topics ) {
                if ( topics[m] ) {
                    for ( var i = 0, j = topics[m].length; i < j; i++ ) {
                        if ( topics[m][i].token === token ) {
                            topics[m].splice( i, 1 );
                            return token;
                        }
                    }
                }
            }
            return this;
        };
        return myObject;
    }());


    /**
     * Глобальная функция: выводит пользовательские уведомления.
     * @param elements {object} - три класса, в которых указаны элементы для вывода уведомлений
     * @param duration {number} - сколько времени показывается уведомление (мс)
     */
    window.script_message_popup = (function(elements, duration) {
        //можно добавить проверку наличия елементов
        var o = {},
            notices = [],
            maxCount = null,
            fadeOutTime = 200; //fast

        elements = elements || console.log('ERROR >>> не заданые аргументы');
        duration = duration || 5000;

        var $wrap = $(elements.wrap);

        /**
         * Инициализация
         * @param who {string} - от кого уведомление
         * @param text {string} - текст уведомления
         */
        o.check = function(who,text) {
            if (!maxCount) maxCount = $wrap.length; // максимальное число выводимых уведомлений
            if (who || text) {
                notices.push([{w:who,t:text}]);
            }

            if (notices[0] && $wrap.filter(':visible').length < maxCount) {
                showNotice(notices.shift()[0]);
            }
        };

        function showNotice(notice) {
            var $element = $wrap.filter(':hidden').eq(0).children(elements.who).text(notice.w)
                .end().children(elements.text).text(notice.t)
                .end().show();
            setTimeout(function () {
                $element.fadeOut(fadeOutTime);
                setTimeout(function () {
                    if(notices.length > 0) {
                        o.check();
                    }
                }, fadeOutTime+20);
            }, duration);
        }

        return o.check;

    }) ({wrap:'.system_message_popup', who:'.user_sysmessage_nick', text: '.sysmessage_text'}, 5000);

    window.script_Smiles = (function () {
        var smilesContainer_ID = '.smiles_at_this_group';
        // Private
        function loadSmiles(href, paramFor) {
            var param = {};
            if (href) {
                var page;
                //console.log('PAGE %p %n', href, href[30]);
                if (href.indexOf('page=') > 0) {
                    page = href.substring(href.indexOf('page=')+5);
                    param['page'] = page;
                } else {
                    page = 1;
                    param['page'] = page;
                }
            }
            if (paramFor) {
                param['for'] = paramFor;
            } else {
                console.log('ERROR >>> не задан параметр paramFor');
            }
            //console.log(script_BE.getMethodName('smiles'));
            script_BE.sendToPHP(script_BE.getMethodName('smiles'),param);
            var _token = script_PubSub.subscribe(script_BE.getMethodName('smiles'), function (topic, recHTML) {
                console.log('smiles subscriber doing your work');
                $(smilesContainer_ID).empty().append(recHTML);

                script_PubSub.unsubscribe(_token);
            });
        }

        function addSmile ($smile,$msgInput) {
            var that = this;
            var cursorPosition = $msgInput[0].selectionStart,
                smileCode = $smile.attr('title');

            //add smile
            if (cursorPosition == $msgInput.val().length) {
                $msgInput.val($msgInput.val() + smileCode);
            } else {
                $msgInput.val($msgInput.val().substring(0, cursorPosition) + smileCode + $msgInput.val().substring(cursorPosition));
            }
            $msgInput.focus();
        }

        //Public
        return {
            addSmileToInput: function ($smile,$msgInput) {
                addSmile ($smile,$msgInput);
            },
            /**
             * Загрузка смайлов с БЕ
             * @param href - паджинация, номер страницы со смайлами
             * @param paramFor {'comment' | 'stream' | 'room'}
             */
            loadSmilesFromBE: function(href,paramFor) {
                loadSmiles(href,paramFor);
            }
        };
    })();
});

//not final version, it's in progress
window.script_paint_graphs = function(vote_result,choosed){
    var arr = Object.keys( vote_result ).map(function ( key ) { return vote_result[key]; });
    var max_value=Math.max.apply(Math,arr);
    var $graphs="";
    var height;
    var text = "choosed";
    jQuery.each(vote_result, function( i, val ) {
        height = (parseInt(val)/max_value)*70;
        if (i==choosed)
            $graphs +='<div class="graphic_bar"><div class="graph_bar choosed"  style="height:'+height+'px"></div><span class="poll_answer_number">'+i+'</span><span class="poll_answer_votes">'+val+'</span></div>';
        else
            $graphs +='<div class="graphic_bar"><div class="graph_bar"  style="height:'+height+'px"></div><span class="poll_answer_number">'+i+'</span><span class="poll_answer_votes">'+val+'</span></div>';
    });
    $('.graphics').html($graphs);
}

//remove filter on hover pic
function setStreamHover() {
    $('.stream.normal_one').hover(function () {
            $(this).find('.filter_on_pic').hide();
        },
        function () {
            $(this).find('.filter_on_pic').show();
        });
}
