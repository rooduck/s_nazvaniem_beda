//INCLUDING PARTS IN ONE, U DON'T NEED THIS IN DEV I THINK
$(function(){
    $("#header").load("include/header.html");
    $(".site_filter").load("include/menu.html");
    $(".all_streams_wrapper, .all_rooms_wrapper").load("include/streams_list.html");
    $('.filter0_cap').load('include/filter_cap.html');
    $(".top_category_rating").load("include/category_rating.html");
    //$(".block_before_streams").load("include/back_block.html");
    $(".chat_buttons").load("include/chat_buttons.html");
    $(".chat_wrapper").load("include/chat.html");
    $('.chat_header').load("include/chat_header.html");
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
    $(".sysmess_wrapper").load("include/popup_sysmess.html");
    $(".change_pwd_popup").load("include/popup_change_password.html");
    $(".check_pwd_popup").load("include/popup_check_passw.html");
    $(".other_category_choose").load("include/popup_choose_category.html");
    $(".create_room_popup").load("include/popup_create_room.html");
    $(".autorization_popup").load("include/popup_authorization.html");
    //second lvl include
    setTimeout(function(){$('.switcher').load("include/switcher.html");},500);
});

// PLUGIN FOR FILLING A CIRCLE
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
            fontStyle: 'Tahoma',
            fontSize: '20pt',
            fontColor: 'darkblue',
            backgroundColor: 'lightgray',
            num: 0,
            callback: function () {
            }
        }, options);

        this.empty().append("<canvas height ="+45 + " width="+45+" id='my-canvas"+settings.num+"'/ ></canvas>");
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

        //custom my
        $('.switcher label').click(function(){
            $(this).parent().find('label').removeClass('active');
            $(this).addClass('active');
            if ($(this).prev().prev().text().length>0)
                $(this).prev().prev().addClass('active');
        });

        //use this for all site select
        $("select").selectBoxIt();

        //trackbar at room create popup
        set_scale_lvl();

        /*HEADER*/

        //show user_popup_profile
        $('.li_first, .li_second, .li_third, .some_li .messages').click(function(){
            $('#user_popup').css('visibility','visible');
            $('.user_popup_body').css('visibility','hidden');
            //check which option is clicked
            if ($(this).hasClass('li_first') || $(this).hasClass('messages'))  {
                //check active class for hide/show #user_popup
                if ($(this).parent().hasClass('active'))  {
                    $(this).parent().toggleClass('active');
                    $('#user_popup').css('visibility','hidden');
                }
                else  {
                    $('.user_popup_body.user_messages').css('visibility','visible');
                    $('.li_first, .li_second, .li_third').parent().removeClass('active');
                    $(this).parent().addClass('active');
                }

            }
            else if ($(this).hasClass('li_second'))  {
                if ($(this).parent().hasClass('active'))  {
                    $(this).parent().toggleClass('active');
                    $('#user_popup').css('visibility','hidden');
                }
                else  {
                    $('.user_popup_body.user_streams').css('visibility','visible');
                    $('.li_first, .li_second, .li_third').parent().removeClass('active');
                    $(this).parent().addClass('active');
                }
            }
            else if ($(this).hasClass('li_third'))  {
                if ($(this).parent().hasClass('active'))  {
                    $(this).parent().toggleClass('active');
                    $('#user_popup').css('visibility','hidden');
                }
                else  {
                    $('.user_popup_body.user_options').css('visibility','visible');
                    $('.li_first, .li_second, .li_third').parent().removeClass('active');
                    $(this).parent().addClass('active');
                }
            }
        });
        //add to ignore
        $('.user_control_icon2, .dark_grey_button').click(function () {
            $('.user_main_menu_hit.ignore').toggle();
        });
        //open popup with smiles
        $('#user_popup .smiles_img').click(function(){
            $('#user_popup .click_user_popup').toggle();
            $(this).toggleClass('active');
        });
        //change class of subscribe category
        $('.user_category_list_row').click(function() {
            $('.user_category_list_row').removeClass('active');
            $(this).addClass('active');
        });
        //change text and class when delete/restore from subscribes
        $('.delete_from_favor').click(function(){
            $(this).toggleClass('restore');
        });
        //tabs in options in user popup
        $('.content_ignore_cell').click(function(){
            $('.user_right_block_chats_ignore').hide();
            $('.user_right_block_main_settings').hide();
            $('.user_right_block_content_ignore').show();
        });
        $('.user_ignore_cell').click(function(){
            $('.user_right_block_content_ignore').hide();
            $('.user_right_block_main_settings').hide();
            $('.user_right_block_chats_ignore').show();
        });
        $('.option_cell').click(function(){
            $('.user_right_block_chats_ignore').hide();
            $('.user_right_block_content_ignore').hide();
            $('.user_right_block_main_settings').show();
        });


        //change chat list in messages
        $('.user_message_list_row').click(function(){
            $('.user_message_list_row').each(function(){
                $(this).removeClass('active');
            });
            $(this).addClass('active');
        });


        //del from favorite, ignorelist
        $('.favorite_del').click(function(){
            $('.stream_popup_del').show();
        });

        $('.stream_popup_del .blue_a_button.yes, .stream_popup_del .blue_a_button.no').click(function(){
            $('.stream_popup_del').hide();
        });



        /*MENU*/
        //add class on click
        $('.filter_icon, .filter_block .stream_number').click(function(){
            $(this).parent().parent().find('.filter_icon').removeClass('active');
            $(this).parent().find('.filter_icon').addClass('active');
        });

        //menu switch active
        $('.menu .cat_level .cifri_wrapper').click(function(){
            $(this).each(function(){
                $(this).removeClass('active');
            });
            $(this).addClass('active');
        });

        //show popup on favorite
        $('.favorites_icon.filter_icon, .filter_block .stream_number').click(function(){
           $(this).parent().find('.popup_block_wrapper').slideToggle(500);
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
        //Todo:delete
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
        var slides=4;
        if ($(".slider").hasClass('future_streams') || (!$(".slider").hasClass('next_stream_exist')))
            slides=5;
        $(".slider .slider_wrapper").carouFredSel({
            items               : {visible: slides,minimum:slides+1},
            auto:{play:false},
            circular: false,
            infinite: false,
            duration:"left",
            responsive	: false,
            prev        : {button: ".prev_raspisanie",direction:"left",easing:"linear"},
            next        : {button: ".next_raspisanie",direction:"right",easing:"linear"},
            scroll : {
                items           : slides,
                easing          : "linear",
                duration        : 1000,
                pauseOnHover    : true
            }
        });



        /*ARTICLES*/


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

        //show smiles popup in article comments
        $('.subcomment_block .editor_tools li:first-child').click(function(){
            if ($('.click_user_popup2').css('display')=='none')
                $('.click_user_popup2').show();
            else $('.click_user_popup2').hide();
        });
        $('.close_open_popup2').click(function(){
            $('.click_user_popup2').hide();
        });

        //comment options
        $('.article_comment_options span').click(function () {
            if ($(this).hasClass('active'))  {
                $('.article_comment_row').removeClass('active');
                $('.article_comment_options span').removeClass('active');
            }
            else {
                $('.article_comment_row').removeClass('active');
                $(this).parent().parent().parent().addClass('active');
                $('.article_comment_options span').removeClass('active');
                $(this).addClass('active');
            }
        });

        //spoiler
        $('.spoiler .cut').click(function(){
            $(this).next().toggle();
            if ($(this).find('i').text()=='+') {
                $(this).find('i').text('-');
            }
            else
                $(this).find('i').text('+');
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

        //forget_passw_popup
        $('a.text_popup').click(function(){
            $('.restore_pwd_popup').css("visibility","visible");
            $('.autorization_popup').css("visibility","hidden");
            $('fade').show();
        });

        //create stream popup button
        $('.create_stream_but').click(function(){
            $('.create_stream_popup').css('visibility','visible');
            $('.fade').show();
        });

        //create room popup
        $('.create_room_but').click(function(){
            $('.fade').show();
            $('.create_room_popup')
                .find('.create_new_room').text("Создать комнату")
            .css('visibility','visible');
        });

        //redact room popup
        $('.redact_room').click(function(){
            $('.create_room_popup')
                .find('.create_new_room').text("Изменить")
                .css('visibility','visible');
            $('.fade').show();
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
            if ($(event.target).closest(".click_user_popup2 .chat_list_wrapper2").length || $(event.target).closest(".subcomment_block .editor_tools li:first-child").length) return;
            else
                $('.click_user_popup2').hide();
            //USER POPUP SMILES
            if ($(event.target).closest("#user_popup .click_user_popup .smiles_at_this_group").length || $(event.target).closest("#user_popup .smiles_img").length) return;
            else
            {
                $('#user_popup .click_user_popup').hide();
                $('#user_popup .smiles_img').removeClass('active');
            }
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
            //ADD LINK
            if ($(event.target).closest(".add_link_popup").length || $(event.target).closest(".add_link.chat_pic").length) return;
            else {
                $('.add_link_popup').hide();
                $('.add_link.chat_pic').removeClass('active');
            }
            //ignore popup in iser message list
            if ($(event.target).closest(".user_control_icon2").length || $(event.target).closest(".user_main_menu_hit.ignore").length) return;
            else
                $('.user_main_menu_hit.ignore').hide();
            //#USER_POPUP
            if ($(event.target).closest("#user_popup").length || $(event.target).closest(".user_main_menu .some_li").length) return;
            else {
                $('#user_popup').css('visibility','hidden');
                $('.user_popup_body').css('visibility','hidden');
                $('.some_li').removeClass('active');
            }
            //favorite list popup
            if ($(event.target).closest(".filter_block .favorites_icon, .filter_block .stream_number").length || $(event.target).closest(".popup_block_wrapper").length) return;
            else
            {
                $('.popup_block_wrapper').slideUp(500);
                $('.filter_block .favorites_icon').removeClass('active');
            }

            event.stopPropagation();
        });




        /*STREAMER PAGE*/

        //change players
        $('.players_switcher span').click(function(){
            $('.players_switcher span').removeClass('active');
            $(this).addClass('active');
        });


        //subsribe on stream
        $('.subsribe').click(function(){
            $(this).toggleClass('true');
        });

        //gallery preview likes ,wall likes
        $('.gallery_content_likes, .wall_post_likes').click(function () {
            $(this).toggleClass('active');
        });

        //gallery preview toggle
        $('.main_room_block .minimize, .chat_gallery_thumbnails div').click(function () {
            //if we click on minimize button
            if (!$(this).parent().hasClass('chat_gallery_thumbnails')) {

                if ($('.main_room_block .minimize').hasClass('active'))
                    $('.chat_gallery_preview').css('visibility', 'hidden');
                else
                    $('.chat_gallery_preview').css('visibility', 'visible');
                $('.player_block').toggleClass('active');
                $('.main_room_block .minimize').toggleClass('active');
            }
            //else on thumbnails
            else {
                $('.chat_gallery_preview').css('visibility', 'visible');
                $('.player_block').removeClass('active');
                $('.main_room_block .minimize').addClass('active');
            }
        });
        //scrollTo in gallery example
        $('.chat_gallery_thumbnails div').click(function () {
           $('.chat_gallery_preview_wrapper').mCustomScrollbar('scrollTo','40%');
        });

        /*CHAT*/
        window.script_Chat_list_users = function(){
            $('.who_is_in_chat').show();
        };

        //show action on streamer nick click
        $('.chat_streamer_action .text').click(function(){
            $('.popup_actions_list')
                .css('width',$('.chat_streamer_action .text').outerWidth(true))
                .toggle(400);
        });

        //hide user_in_chat_list when clicking on someone's nick
        $('.user_in_chat_wrapper .user_in_chat_row span').click(function(){
            $('.who_is_in_chat').hide();
        });
        //scroll up\down when click on header in user_in_chat_list
        $('.user_in_chat_wrapper .user_in_chat_list .header').click(function() {
            if ($(this).next().is(":hidden"))
                $(this).next().slideDown(400);
            else
                $(this).next().slideUp(400);
        });
        //update click
        $('.user_in_chat_wrapper .user_in_chat_list').bind("DOMSubtreeModified",function(){

            $('.user_in_chat_row span').click(function(){
                $('.who_is_in_chat').hide();
            });
            
        });
        //request in room popup
        $('.requests_popup .slideUp').click (function () {
            $('.requests_popup').slideUp(400);
        });
        $('.new_requests span').click (function () {
            if ($('.requests_popup').is(":hidden"))
                $('.requests_popup').slideDown(400);
            else
                $('.requests_popup').slideUp(400);
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
            else if ($(this).hasClass('add_link')) {
                if ($(this).hasClass('active'))
                    $('.click_user_popup.add_link_popup').show();
                else
                    $('.click_user_popup.add_link_popup').hide();
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

            if (input_clicks < 11)
                $html += '<div class="answer_input"><span class="golosovalka_podpis input_podpis">' + input_clicks + '.</span><input type="text" class="input_answer" name="answer' + input_clicks + '"/></div>';
            $('.input_answers_block').html($html);
        });

        //test paint graphs
        var vote_result = {1: 22, 2: 5, 3: 77, 4: 32,5:34,6:12};
        var choosed=5;
        script_paint_graphs(vote_result,choosed);


        /*CUSTOM SCROLLBAR PLUGIN*/

        $('.chat_wrapper').mCustomScrollbar({
            axis: "y",
            theme: "light",
            scrollInertia: 850,
            mouseWheel: {scrollAmount: 350}
        });
        //gallery preview
        $('.chat_gallery_preview_wrapper').mCustomScrollbar({
            axis: "x",
            theme: "light",
            scrollInertia: 850,
            advanced:{autoExpandHorizontalScroll:true},
            mouseWheel: {scrollAmount: 350}
        });
        //user message_list
        $(".user_message_list").mCustomScrollbar({
            axis:"y",
            theme:"light",
            scrollInertia: 850,
            mouseWheel:{ scrollAmount: 350 },
            callbacks:{
                onScrollStart:function(){
                    $(".user_left_block .top_shadow").show();
                    $(".user_left_block .bottom_shadow").show();
                },
                onTotalScroll:function(){
                    $(".user_left_block .top_shadow").show();
                    $(".user_left_block .bottom_shadow").hide();
                },
                onTotalScrollBack:function(){
                    $(".user_left_block .top_shadow").hide();
                    $(".user_left_block .bottom_shadow").show();
                }
            }
        });
        //user message_list
        $(".user_category_wrapper").mCustomScrollbar({
            axis:"y",
            theme:"light",
            scrollInertia: 850,
            mouseWheel:{ scrollAmount: 350 },
            callbacks:{
                onScrollStart:function(){
                    $(".user_right_block .top_shadow").show();
                    $(".user_right_block .bottom_shadow").show();
                },
                onTotalScroll:function(){
                    $(".user_right_block .top_shadow").show();
                    $(".user_right_block .bottom_shadow").hide();
                },
                onTotalScrollBack:function(){
                    $(".user_right_block .top_shadow").hide();
                    $(".user_right_block .bottom_shadow").show();
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
            mouseWheel:{ scrollAmount: 500 },
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
            mouseWheel:{ scrollAmount: 200 }
        });

        //users in new requests
        $(".requests_popup .user_in_chat_list").mCustomScrollbar({
            axis:"y",
            theme:"light",
            scrollInertia: 650,
            mouseWheel:{ scrollAmount: 200 }
        });
        //all rooms
        $(".all_rooms_wrapper").mCustomScrollbar({
            axis:"y",
            theme:"light",
            scrollInertia: 950,
            mouseWheel:{ scrollAmount: 1000 }
        });

        //favorite popup list
        $('.list_wrapper').mCustomScrollbar({
            axis:"y",
            theme:"light",
            scrollInertia: 650,
            mouseWheel:{ scrollAmount: 200 }
        });
        /*GROUP OF CUSTOM CHECKBOXES*/

        $('.blue_checkbox').iCheck({
            cursor: true,
            checkboxClass: 'icheckbox_futurico',
            radioClass: 'icheckbox_futurico2'
        });
        $('.blue_check').iCheck({
            cursor: true,
            checkboxClass: 'blue'
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
        $('.wall_radio').iCheck({
            cursor: true,
            checkboxClass: 'wall_checkbox',
            radioClass: 'wall_radio'
        });


        /*GROUP OF HINTS*/

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

        //filling streamer lvl exp
        var numb=0;


        //user profile

        //streamer
        $('.profile_lvl.streamer').each(function(){
            $(this).find('.for_canvas').rotator({
                num : numb,
                starting: 0,
                ending: parseInt($(this).find('.how_much_fill').text()),
                lineWidth: 2,
                color:'#3399ff',
                fontSize:'0px',
                backgroundColor: '#11355c',
                radius:19
            });
            numb++;
        });

        //author
        $('.profile_lvl.author').each(function(){
            $(this).find('.for_canvas').rotator({
                num : numb,
                starting: 0,
                ending: parseInt($(this).find('.how_much_fill').text()),
                lineWidth: 2,
                color:'#54daa3',
                fontSize:'0px',
                backgroundColor: '#125338',
                radius:19
            });
            numb++;
        });

        //support
        $('.profile_lvl.support').each(function(){
            $(this).find('.for_canvas').rotator({
                num : numb,
                starting: 0,
                ending: parseInt($(this).find('.how_much_fill').text()),
                lineWidth: 2,
                color:'#f8ca67',
                fontSize:'0px',
                backgroundColor: '#6a521d',
                radius:19
            });
            numb++;
        });

        //robot
        $('.profile_lvl.robot').each(function(){
            $(this).find('.for_canvas').rotator({
                num : numb,
                starting: 0,
                ending: parseInt($(this).find('.how_much_fill').text()),
                lineWidth: 2,
                color:'#d63447',
                fontSize:'0px',
                backgroundColor: '#66141e',
                radius:19
            });
            numb++;
        });

        //room_post
        $('.room_post').each(function(){
            $(this).find('.for_canvas').rotator({
                num : numb,
                starting: 0,
                ending: parseInt($(this).find('.how_much_fill').text()),
                lineWidth: 2,
                color:'#3399ff',
                fontSize:'0px',
                backgroundColor: '#fff',
                radius:19
            });
            numb++;
        });

        /*custom styles*/
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



/**
 * Глобальная функция, инициализирует трекбар в попапе создания комнаты\стрима
 * Т.к. у нас уровни ограничены с 1 по 9, то параметры не передаются
 */
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
};


/* Глобальная функция: выводит уведомления об ошибке.
    * @param error_text {string} - текст ошибки
    */
window.script_error_popup = function(error_text){
    $('.error_popup span').text(error_text);
    $('.error_popup').css('visibility','visible');
    setTimeout(function() {
        $('.error_popup').fadeOut('fast');
    }, 5000);
};

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
};



