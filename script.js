// plugin for filling streamer_lvl 
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
// plugin end

$(document).ready(function(){
	/*group of scripts, which are calculatin or set some width or any other styles. Call first of all, before any plugins*/
	
	//first of all, calculating width for x-scrolled blocks (in px instead of %)
	var horizontal_block_podpiski_width=$(".user_streams_list .favorite_stream").size()*265;//265 - outerWidth
	$(".user_streams_list_wrapper").css('width',horizontal_block_podpiski_width);
	var horizontal_block_ignorelist_width=$(".user_streams_ignore_list .favorite_stream").size()*265;//265 - outerWidth
	$(".user_streams_ignore_list_wrapper").css('width',horizontal_block_ignorelist_width);
	var horizontal_block_choose_category_width=$('.category_choose .category_choose-category').size()*141;
	$('.category_choose').css('width',horizontal_block_choose_category_width);

	//$('.create_news_input').css("width",$('.content_main_block').width()-$('.content_main_block .right_column').outerWidth(true)-140-35-10+"px"); //shirina inputa pri sozdanii novosti
	$('.material_list div:last-child').css('border-bottom','0 none'); 
	
	/*dimanicheskie stili dl9 room chata*/
	$('.room_chat .romm_chat_row:last-child').css('border-bottom','0 none');
	$('.room_chat .answer .romm_chat_row:last-child').prev().css('border-bottom','1px solid #0099ff');
	$('.room_chat .answer .romm_chat_row:last-child').css('padding-top','0px');
	$('.room_chat .answer .romm_chat_row:last-child').css('width','81px');
	
	
	//$('.for_redactor').css('width',$('.header_main').width()-44+"px"); //shirina textarea pri sozdanii novosti
	
	$('.stream_wrapper_middle_border').css("width",$('.user_chats').width()-200+"px");//grabanii rast9gaushiis9 border chata
	$('.top_stream_wrapper_middle_border').css("width",$('.left_column').width()-200+"px");//grabanii rast9gaushiis9 border chata
	
	$('.input_room').css('width',$('.input_room_block').outerWidth(true)-$('.room_smiles_block').outerWidth(true)-1);
			
	$('.room_message').css('width',$('.romm_chat_row').outerWidth(false)-$('.close-open_button').width()-30);
	$('.answer .room_message').css('width',$('.romm_chat_row').width());
	
	/*GROUP OF SLIDER'S INITIALIZATION*/
	
	//top rating
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
	//room right block
	$(".room_list_wrapper").carouFredSel({
        items               : 14,
		auto:{play:false},
		circular: false,
		infinite: false, 
        direction           : "up",
		responsive	: true,
		prev        : ".next_room_page",
		next        : ".prev_room_page",
        scroll : {
            items           : 14,
            easing          : "linear",
            duration        : 1000,                         
            pauseOnHover    : true
        }                   
    });
	//raspisanie
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

	
	/*RESIZE MONITOR WIDTH*/
	

	
	/*HIDE AFTER INITIALIZATION POPUPS*/
			//hide users_in_chat_list when clicking somewhere in page
		$(document).click(function(event) {
			if ($(event.target).closest(".who_is_in_chat").length || $(event.target).closest(".people_in_this_chat span").length) return;
			else
			{
				$(".who_is_in_chat").hide();
			}
			if ($(event.target).closest(".click_user_popup.action_user").length) return;
			else
			{
				$(".click_user_popup.action_user").hide();
			}
			if ($(event.target).closest(".click_user_popup.option_popup").length || $(event.target).closest(".options.chat_pic").length) return;
			else
			{
				$('.option_popup').hide();
				$('.options.chat_pic').removeClass('active');
			}
			if ($(event.target).closest(".smaili").length || $(event.target).closest(".smiles.chat_pic").length) return;
			else
			{
				$('.smaili').hide();
				$('.smiles.chat_pic').removeClass('active');
			}
			if ($(event.target).closest(".golosovalka").length || $(event.target).closest(".poll.chat_pic").length) return;
			else
			{
				$('.golosovalka').hide();
				$('.poll.chat_pic').removeClass('active');
			}
			if ($(event.target).closest(".vote_poll").length || $(event.target).closest(".poll2.chat_pic").length) return;
			else
			{
				$('.vote_poll').hide();
				$('.poll2.chat_pic').removeClass('active');
			}
			if ($(event.target).closest(".poll_results").length || $(event.target).closest(".poll3.chat_pic").length) return;
			else
			{
				$('.poll_results').hide();
				$('.poll3.chat_pic').removeClass('active');
			}
			if ($(event.target).closest(".options_popup").length || $(event.target).closest(".li_fourth").length) return;
			else
			{
				$('.options_popup').hide();
				$('.li_fourth').removeClass('active');
			}
			if ($(event.target).closest(".search_popup").length || $(event.target).closest(".li_first").length) return;
			else
			{
				$('.search_popup').hide();
				$('.li_first').removeClass('active');
			}
			
			event.stopPropagation();
		});
	/*GROUP ONCLICK FINCTIONS*/
	
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
	//changing classes at stream_page
	$('.streamer_subscribed_star').click(function(){
		if ($(this).hasClass('subscribed'))
			$(this).removeClass('subscribed');
		else $(this).addClass('subscribed');
	});
	$('.down_rating').click(function(){
		$(this).addClass('selected');
		$(this).parent().find('.up_rating').removeClass('selected');
	});
	$('.up_rating').click(function(){
		$(this).addClass('selected');
		$(this).parent().find('.down_rating').removeClass('selected');
	});
	//show action on streamer nick click
	$('.chat_streamer_action .text').click(function(){
		$('.popup_actions_list').css('width',$('.chat_streamer_action .text').outerWidth(true));
		$('.popup_actions_list').toggle(400);
	});
	$('.popup_actions_list .action_name_row').click(function(){
		$('.popup_actions_list').fadeOut(400);
	});
	//FADE
	$('.fade').click(function(){
		$('.other_category_choose').css('visibility','hidden');
		$(this).hide();
	});
	//open choose category popup
	$('.show_category_search').click(function(){
		if ($(window).height()>712)
			$('.other_category_choose').css('top',$(window).height()/2-256);
		else
			$('.other_category_choose').css('top','');
		if ($(window).width()>1200)
			$('.other_category_choose').css('left',$(window).width()/2-424);
		else
			$('.other_category_choose').css('left','');
		$('.other_category_choose').css('visibility','visible');
		$('.fade').show();
	});
	//close category choose popup
	$('.close_category').click(function(){
		$(this).parent().css('visibility','hidden');
		$('.fade').hide();
	});
	//hide user_in_chat_list when clicking on someone's nick
	$('.user_in_chat_row').click(function(){
		$('.who_is_in_chat').hide();
	});

	$('.user_in_chat_list').bind("DOMSubtreeModified",function(){
		$('.user_in_chat_row').click(function(){
			$('.who_is_in_chat').hide();
		});
	});
	//toggle search in rooms
	$('.search_icon').click(function(){
		$('.standart_input').toggle(300);
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
	//buttons under the chat 
	$('.user_chats .chat_pic').hover(function(){
		$(this).find('.chat_hint').show();
		}, 
		function() {
		$(this).find('.chat_hint').hide();
	});
	
	$('.user_chats .chat_pic').click(function(){
		$('.user_chats .click_user_popup').hide();
		
		if ($(this).hasClass('active'))
			$(this).removeClass('active');
		else
		{
			if ($('.user_chats .mat_filter').hasClass('active'))
			{
				$('.user_chats .chat_pic').removeClass('active');
				$('.user_chats .mat_filter').addClass('active');
			}
			else
				$('.user_chats .chat_pic').removeClass('active');
			$(this).addClass('active');
		}
		if ($(this).hasClass('options'))
		{
			if ($(this).hasClass('active'))
				$('.user_chats .click_user_popup.option_popup').show();
			else
				$('.user_chats .click_user_popup.option_popup').hide();
		}
		else if ($(this).hasClass('smiles'))
		{
			if ($(this).hasClass('active'))
				$('.user_chats .click_user_popup.smaili').show();
			else
				$('.user_chats .click_user_popup.smaili').hide();
		}
		else if ($(this).hasClass('poll'))
		{
			if ($(this).hasClass('active'))
				$('.user_chats .click_user_popup.golosovalka').show();
			else
				$('.user_chats .click_user_popup.golosovalka').hide();
		}
		else if ($(this).hasClass('poll2'))
		{
			if ($(this).hasClass('active'))
				$('.user_chats .click_user_popup.vote_poll').show();
			else
				$('.user_chats .click_user_popup.vote_poll').hide();
		}
		else if ($(this).hasClass('poll3'))
		{
			if ($(this).hasClass('active'))
				$('.user_chats .click_user_popup.poll_results').show();
			else
				$('.user_chats .click_user_popup.poll_results').hide();
		}
	});
	//CREATE STREAM HIDE INPUT
	$('#newstream_customstart').on('ifChecked', function(event){
		$('.registr_input.custom_time').show();
	});
	$('#newstream_autostart').on('ifChecked', function(event){
		$('.registr_input.custom_time').hide();
	});
	//button and the room chat
	$('.room_chat .chat_pic').hover(function(){
		$(this).find('.chat_hint').show();
		}, 
		function() {
		$(this).find('.chat_hint').hide();
	});
	
	$('.room_chat .chat_pic').click(function(){
		$('.room_chat .click_user_popup').hide();
		
		if ($(this).hasClass('active'))
			$(this).removeClass('active');
		else
		{
			if ($('.room_chat .mat_filter').hasClass('active'))
			{
				$('.room_chat .chat_pic').removeClass('active');
				$('.room_chat .mat_filter').addClass('active');
			}
			else
				$('.room_chat .chat_pic').removeClass('active');
			$(this).addClass('active');
		}
		if ($(this).hasClass('options'))
		{
			if ($(this).hasClass('active'))
				$('.room_chat .click_user_popup.option_popup').show();
			else
				$('.room_chat .click_user_popup.option_popup').hide();
		}
		else if ($(this).hasClass('smiles'))
		{
			if ($(this).hasClass('active'))
				$('.room_chat .click_user_popup.smaili').show();
			else
				$('.room_chat .click_user_popup.smaili').hide();
		}
		else if ($(this).hasClass('poll'))
		{
			if ($(this).hasClass('active'))
				$('.room_chat .click_user_popup.golosovalka').show();
			else
				$('.room_chat .click_user_popup.golosovalka').hide();
		}
		else if ($(this).hasClass('poll2'))
		{
			if ($(this).hasClass('active'))
				$('.room_chat .click_user_popup.vote_poll').show();
			else
				$('.room_chat .click_user_popup.vote_poll').hide();
		}
		else if ($(this).hasClass('poll3'))
		{
			if ($(this).hasClass('active'))
				$('.room_chat .click_user_popup.poll_results').show();
			else
				$('.room_chat .click_user_popup.poll_results').hide();
		}
	});
		//menu active
	$('.top_streams_menu .first_cat_level  .cifri_wrapper').click(function(){
		$('.top_streams_menu .first_cat_level  .cifri_wrapper').each(function(){
			$(this).removeClass('active');
		});
		$(this).addClass('active');
	});
	$('.top_streams_menu .second_cat_level  .cifri_wrapper').click(function(){
		$('.top_streams_menu .second_cat_level .cifri_wrapper').each(function(){
			$(this).removeClass('active');
		});
		$(this).addClass('active');
	});
	$('.top_streams_menu .third_cat_level .cifri_wrapper').click(function(){
		$('.top_streams_menu .third_cat_level .cifri_wrapper').each(function(){
			$(this).removeClass('active');
		});
		$(this).addClass('active');
	});
	//close opened popup
	$('.close_open_popup').click(function(){
		
		if ($('.chat_buttons .mat_filter').hasClass('active'))
		{
			$(this).parent().parent().hide();
			$('.chat_images .chat_pic').removeClass('active');
			$('.chat_buttons .mat_filter').addClass('active');
		}
		else
		{
			$(this).parent().parent().hide();
			$('.chat_images .chat_pic').removeClass('active');
		}
	});
	//close popup when clicking some option
	$('.click_user_popup_row').click(function(){
	if ($('.chat_buttons .mat_filter').hasClass('active'))
		{
			$('.click_user_popup').hide();
			$('.chat_images .chat_pic').removeClass('active');
			$('.chat_buttons .mat_filter').addClass('active');
		}
		else
		{
			$('.click_user_popup').hide();
			$('.chat_images .chat_pic').removeClass('active');
		}
		
		if ($(this).hasClass('enabled'))
		{
			$(this).removeClass('enabled');
			$(this).addClass('disabled');
		}
		else if ($(this).hasClass('disabled'))
		{
			$(this).removeClass('disabled');
			$(this).addClass('enabled');
		}
	});
	$('.chat_smiles').click(function(){
		if ($('.chat_buttons .mat_filter').hasClass('active'))
		{
			$('.click_user_popup.smaili').hide();
			$('.chat_images .chat_pic').removeClass('active');
			$('.chat_buttons .mat_filter').addClass('active');
		}
		else
		{
			$('.click_user_popup.smaili').hide();
			$('.chat_images .chat_pic').removeClass('active');
		}
		
	});
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
	//room line width
	$('.room_userlist_page .slide_block').each(function(){
		$(this).find('div').css("width",$(this).width()-$(this).find('span').outerWidth()-15);
	});
	//room slideUp users block list
	$('.slide_block span').click(function(){
		if ($(this).parent().next().css("display")=="none")
			$(this).parent().next().slideDown("fast");
		else
			$(this).parent().next().slideUp("fast");
	});
	//show user_popup_profile
	$('.user_pic').click(function(){
		$(this).find('.user_pic_arrow').toggle();
		if ($('#user_popup').css('visibility')=='hidden')
		{
			if ($(window).width()>1200)
				$('#user_popup').css('left',($(window).width()-1200)/2);
			else
				$('#user_popup').css('left','');
			$('#user_popup').css('visibility','visible');
			$('.user_popup_body').css('top','88px');
		}
		else
		{
			$('#user_popup').css('visibility','hidden');
			$('.user_popup_body').css('top','-9999px');
		}
	});
	//show report popup in article comments
	$('.report_comment').click(function(){
		$(this).next('.report_popup').show();
	});
	$('.close_report').click(function(){
		$(this).parent().parent('.report_popup').hide();
	});
	$('.report_option').click(function(){
		$(this).parent().parent('.report_popup').hide();
	});
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
	//adding class to active user_popup_menu and switch user_popup_body
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
	//top_left_streamers_menu
	$('.left_menu_column_text span').click(function(){
		$('.left_menu_column_text span').each(function(){
			$(this).removeClass('active');
			$('.menu_lines div').removeClass('active');
		});
		if ($(this).hasClass('first'))
			$('.menu_lines .first_topmenu_line').addClass('active');
		else if ($(this).hasClass('second'))
			$('.menu_lines .second_topmenu_line').addClass('active');
		else if ($(this).hasClass('third'))
			$('.menu_lines .third_topmenu_line').addClass('active');
		$(this).addClass('active');
	});

	
	//content_left_streamers_menu
	$('.content_streams_menu  .left_menu_column_text span').click(function(){
		$('.content_streams_menu  .left_menu_column_text span').each(function(){
			$(this).removeClass('active');
			$('.content_left_menu_column_numbers .number').removeClass('active');
		});
		//ничего более умного, как перебором не смог связать текст и цифры в разных блоках (а по дизайну они должны быть в разных блоках)
		if ($(this).hasClass('first'))
			$('.content_left_menu_column_numbers .number.first').addClass('active');
		else if ($(this).hasClass('second'))
			$('.content_left_menu_column_numbers .number.second').addClass('active');
		else if ($(this).hasClass('third'))
			$('.content_left_menu_column_numbers .number.third').addClass('active');
		$(this).addClass('active');
		$('.content_streams_menu .content_streams_menu .right_menu').css("width",$('.content_streams_menu').width()-$('.content_streams_menu .left_menu').outerWidth( true )-5+"px"); //resize big menu
	});
	//ничего более умного, как перебором не смог связать текст и цифры в разных блоках (а по дизайну они должны быть в разных блоках)
	$('.content_left_menu_column_numbers span').click(function(){
		$('.content_left_menu_column_numbers span').each(function(){
			$(this).removeClass('active');
			$('.content_streams_menu  .left_menu_column_text span').removeClass('active');
		});
		if ($(this).hasClass('first'))
			$('.content_streams_menu  .left_menu_column_text span.first').addClass('active');
		else if ($(this).hasClass('second'))
			$('.content_streams_menu  .left_menu_column_text span.second').addClass('active');
		else if ($(this).hasClass('third'))
			$('.content_streams_menu  .left_menu_column_text span.third').addClass('active');
		$(this).addClass('active');
		$('.content_streams_menu .content_streams_menu .right_menu').css("width",$('.content_streams_menu').width()-$('.content_streams_menu .left_menu').outerWidth( true )-5+"px");//resize big menu
		
	});
	

	//repaint lines in content menu
	$('.content_streams_menu .first_cat_level a').click(function(){

		$('.content_streams_menu .first_cat_level a').each(function(){
			$(this).removeClass('active');
		});
		$(this).addClass('active');

	});
	$('.content_streams_menu .second_cat_level a').click(function(){

		$('.content_streams_menu .second_cat_level a').each(function(){
			$(this).removeClass('active');
		});
		$(this).addClass('active');

	});
	$('.content_streams_menu .third_cat_level a').click(function(){

		$('.content_streams_menu .third_cat_level a').each(function(){
			$(this).removeClass('active');
		});
		$(this).addClass('active');

	});
	//switcher create room
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
	//switchers. пробовал по-другому, без динамичесокого изменения стилей не получилось.
	$('.switch-label-on.uvedomlenia_on').click(function(){
		$('.uvedomlenia_span').css('left',1);
		$('.uvedomlenia_span').css('width',33);
		$('.uvedomlenia_span').css('background','#0099ff');
		$(this).css('color','#fff');
		$('.switch-label-off.uvedomlenia_off').css('color','#666666');
	});
	$('.switch-label-off.uvedomlenia_off').click(function(){
		$('.uvedomlenia_span').css('left',33);
		$('.uvedomlenia_span').css('width',51);
		$('.uvedomlenia_span').css('background','#666666');
		$(this).css('color','#fff');
		$('.switch-label-on.uvedomlenia_on').css('color','#666666');
	});
	$('.switch-label-on.uvedomlenia_sound_on').click(function(){
		$('.uvedomlenia_sound_span').css('left',1);
		$('.uvedomlenia_sound_span').css('width',33);
		$('.uvedomlenia_sound_span').css('background','#0099ff');
		$(this).css('color','#fff');
		$('.switch-label-off.uvedomlenia_sound_off').css('color','#666666');
	});
	$('.switch-label-off.uvedomlenia_sound_off').click(function(){
		$('.uvedomlenia_sound_span').css('left',33);
		$('.uvedomlenia_sound_span').css('width',51);
		$('.uvedomlenia_sound_span').css('background','#666666');
		$(this).css('color','#fff');
		$('.switch-label-on.uvedomlenia_sound_on').css('color','#666666');
	});
	$('.switch-label-on.newsstream18_on').click(function(){
		$('.newstream_span').css('left',1);
		$('.newstream_span').css('width',104);
		$('.newstream_span').css('background','#0099ff');
		$(this).css('color','#fff');
		$('.switch-label-off.newsstream18_off').css('color','#666666');
	});
	$('.switch-label-off.newsstream18_off').click(function(){
		$('.newstream_span').css('left',124);
		$('.newstream_span').css('width',104);
		$('.newstream_span').css('background','##0099ff');
		$(this).css('color','#fff');
		$('.switch-label-on.newsstream18_on').css('color','#666666');
	});
	//adding active class when we click on menu
	
	//popup s valutoi
	$('.li_second').click(function(){
		$('.hide_popup').hide();
		if ($(window).height()>712)
			$('.valute_popup').css('top',$(window).height()/2-356);
		else
			$('.valute_popup').css('top','');
		if ($(window).width()>1200)
			$('.valute_popup').css('left',$(window).width()/2-474);
		else
			$('.valute_popup').css('left','');
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
	//popup search, popup options
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
	//create stream popup
	$('.user_main_menu .li_third').click(function(){
		$('.hide_popup').hide();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('.create_stream_popup').hide();
			
		} else {
			$('.user_main_menu .some_li').find('div').removeClass('active');
			$(this).addClass('active');
		if ($(window).height()>712)
			$('.create_stream_popup').css('top',$(window).height()/2-356);
		else
			$('.create_stream_popup').css('top','');
		if ($(window).width()>1200)
			$('.create_stream_popup').css('left',$(window).width()/2-474);
		else
			$('.create_stream_popup').css('left','');
			$('.create_stream_popup').show();
		}
	});
	//create stream popup
	$('.create_stream_but').click(function(){
		if ($(window).height()>712)
			$('.create_stream_popup').css('top',$(window).height()/2-356);
		else
			$('.create_stream_popup').css('top','');
		if ($(window).width()>1200)
			$('.create_stream_popup').css('left',$(window).width()/2-474);
		else
			$('.create_stream_popup').css('left','');


		$('.create_stream_popup').show();
	});



	//create room popup
	$('.create_room_but').click(function(){
		if ($(window).height()>712)
			$('.create_room_popup').css('top',$(window).height()/2-356);
		else
			$('.create_room_popup').css('top','');
		if ($(window).width()>1200)
			$('.create_room_popup').css('left',$(window).width()/2-474);
		else
			$('.create_room_popup').css('left','');
		$('.fade').show();
		$('.create_room_popup').find('.create_new_room').text("Создать комнату");
		$('.create_room_popup').css('visibility','visible');
	});
	$('.redact_room').click(function(){
		if ($(window).height()>712)
			$('.create_room_popup').css('top',$(window).height()/2-356);
		else
			$('.create_room_popup').css('top','');
		if ($(window).width()>1200)
			$('.create_room_popup').css('left',$(window).width()/2-474);
		else
			$('.create_room_popup').css('left','');
		$('.create_room_popup').find('.create_new_room').text("Изменить");
		$('.create_room_popup').css('visibility','visible');
	});
	//change chat list
	$('.user_message_list_row').click(function(){
		$('.user_message_list_row').each(function(){
			$(this).removeClass('active');
		});
		$(this).addClass('active');
	});
	//popup_submenu
		$('.submenu.achievements li').click(function(){
		$('.submenu.achievements li').each(function(){
			$(this).removeClass('active');
		});
		$(this).addClass('active');
	});
	$('.submenu.streams li').click(function(){
		$('.submenu.streams li').each(function(){
			$(this).removeClass('active');
		});
		$(this).addClass('active');
	});
	
	//change register captcha pic
	$('.captcha_pic').click(function(){
		$('.captcha_pic').each(function(){
			$(this).removeClass('true');
			$(this).find('span').removeClass('true_captcha');
		});
		$(this).addClass('true');
		$(this).find('span').addClass('true_captcha');
	});
	//subsribe on stream
	$('.subsribe').click(function(){
		if ($(this).hasClass('true'))
			$(this).removeClass('true');
		else 
			$(this).addClass('true');
	});
	//show registration popup
	$('.reg').click(function(){
		$('.hide_popup').hide();
		$('.user_main_menu .some_li').find('div').removeClass('active');
		if ($(window).height()>712)
			$('.registration_popup').css('top',$(window).height()/2-356);
		else
			$('.registration_popup').css('top','');
		if ($(window).width()>1200)
			$('.registration_popup').css('left',$(window).width()/2-474);
		else
			$('.registration_popup').css('left','');
		$('.registration_popup').show();
	});
	$('.top_streams_menu_create .text span').click(function(){
		$('.hide_popup').hide();
		$('.user_main_menu .some_li').find('div').removeClass('active');
		if ($(window).height()>712)
			$('.registration_popup').css('top',$(window).height()/2-356);
		else
			$('.registration_popup').css('top','');
		if ($(window).width()>1200)
			$('.registration_popup').css('left',$(window).width()/2-474);
		else
			$('.registration_popup').css('left','');
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
		if ($(window).height()>712)
			$('.forgot_password_popup').css('top',$(window).height()/2-156);
		else
			$('.forgot_password_popup').css('top','');
		$('.forgot_password_popup').show();
	});
	$('.forgot_password_popup .close_btn').click(function(){
		$('.forgot_password_popup').hide();
	});

	// my work
        $('.hide_popup').hide();
		$('.add_cash_button').click(function(){
		$('.hide_popup').hide();
		$('.user_main_menu .some_li').find('div').removeClass('active');
		if ($(window).height()>712)
			$('.add_cash_popup').css('top',$(window).height()/2-356);
		else
			$('.add_cash_popup').css('top','');
		if ($(window).width()>1200)
			$('.add_cash_popup').css('left',$(window).width()/2-474);
		else
			$('.add_cash_popup').css('left','');
		$('.add_cash_popup').show();
	});
		//DEL FROM FAVORITE POPUP
	$('.favorite_del').click(function(){
		$('.stream_popup_del').show();
	});
	$('.stream_popup_del .blue_a_button.yes').click(function(){
		$('.stream_popup_del').hide();
	});
	$('.stream_popup_del .blue_a_button.no').click(function(){
		$('.stream_popup_del').hide();
	});
	//FAVORITE SUBMENU SWITCHER
	$('.submenu_li.podpiski').click(function(){
		$('.user_streams_wrapper').show();
		$('.user_streams_ignore_wrapper').hide();
	});
	$('.submenu_li.ignorelist').click(function(){
		$('.user_streams_wrapper').hide();
		$('.user_streams_ignore_wrapper').show();
	});
	//LIST TOP NEWS SWITCHER
	$('.material_list_switcher .list_switcher').click(function(){
		$('.list_switcher').each(function(){
			$(this).removeClass('active');
		});
		$(this).addClass('active');
	});

	/*GROUP OF CLICKS 2*/
	

		$('.search_image_holder').click(function(){
			$('.content_search_input').toggle(300);
		});
		//close sysmessage
		$('.close_sysmess_popup').click(function(){
			$(this).parent().fadeOut(500); //maybe we can del this code instead of hidding?
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
		$('.users_in_chat_list_how_sort span').click(function(){
			$('.users_in_chat_list_how_sort span').removeClass('active');
			$(this).addClass('active');
		});
		//show popup how much donate
		$('.support_add').click(function(){
			if ($(window).height()>712)
				$('.how_much_donate_popup').css('top',$(window).height()/2-100);
			else
				$('.how_much_donate_popup').css('top','');
			if ($(window).width()>1200)
				$('.how_much_donate_popup').css('left',$(window).width()/2-200);
			else
				$('.how_much_donate_popup').css('left','');
			$('.how_much_donate_popup').show();
		});
		$('.how_much_donate_popup .close_btn').click(function(){
			$('.how_much_donate_popup').hide();
		});

	
	
	/*GROUP CALLBACKS ONLOAD*/
	
	//changing big stream pic from 2 to 3
	Resize_news();
	Resize_rooms();
	window.script_Chat_list_users = function(){
		$('.who_is_in_chat').show();
	}

	script_Chat_list_users();
	$('.who_is_in_chat').hide();//hide popup after initializing slider, cause if we won't make it display:block, it won't work
	/*GROUP FOR EACH FUNCTION*/
	

	//hide containers without new messages
	$('.menu_number').each(function(){
		if($(this).text().length <=0)
			$(this).hide();
	});
	//height in case of rating FOR STREAMER PAGE
	$('.streamerpage_rating').each(function(){
		$(this).css('margin-top',parseInt($(this).find('.padding_rating').text()));
	});
	/*GROUP CUSTOM SCROLLBAR PLUGIN*/
	
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
	$('.room_chat_list').mCustomScrollbar({
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
			mouseWheel:{ scrollAmount: 1000 },
	});
	$(".popup_chats_list_wrapper").mCustomScrollbar({
		axis:"y",
		theme:"light",
		scrollInertia: 650,
		mouseWheel:{ scrollAmount: 500 },
	});
	$(".click_user_popup_wrapper").mCustomScrollbar({
		axis:"y",
		theme:"light",
		scrollInertia: 650,
		mouseWheel:{ scrollAmount: 500 },
	});
	$(".user_in_chat_wrapper").mCustomScrollbar({
		axis:"y",
		theme:"light",
		scrollInertia: 650,
		mouseWheel:{ scrollAmount: 500 },
	});
	
	//chat
	$(".chat_wrapper").mCustomScrollbar({
		axis:"y",
		theme:"light",
		scrollInertia: 950,
		mouseWheel:{ scrollAmount: 1000 },
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
	
	$(".category_choose_wrapper").mCustomScrollbar({
		 axis:"x",
		 theme:"light",
		 scrollInertia: 950,
			mouseWheel:{ scrollAmount: 1000 }
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
	
    //SOME HOVER
	//show number of people in choose category popup
	$('.category_choose-category').hover(function(){
		$(this).find('.category_choose_people').show();
		$(this).find('.black_filtr').css("background","rgba(0,0,0,0)");
		}, 
		function() {
		$(this).find('.category_choose_people').hide();
		$(this).find('.black_filtr').css("background","rgba(0,0,0,0.5)");
	});
	
	$('.stream.normal_one').hover(function(){
		$(this).find('.streamer_viewers').show();
		$(this).find('.streamer_rating').show();
		$(this).find('.filter_on_pic').hide();
		$(this).find('.main_stream_info').css("height","85px");
		}, 
		function() {
		$(this).find('.streamer_viewers').hide();
		$(this).find('.streamer_rating').hide();
		$(this).find('.filter_on_pic').show();
		$(this).find('.main_stream_info').css("height","46px");
	});
	
	/*GROUP OF CUSTOM SELECTBOXES*/
	
	//use this for all site selectses
	$("select").selectBoxIt();
	
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
	
	//filling streamer lvl exp
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
	// USER PROFILE
	
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
			mouseWheel:{ scrollAmount: 1000 }
		});
	});
	//test paint graphs
	var vote_result = {1: 22, 2: 5, 3: 77, 4: 32,5:34,6:12};
	var choosed=5;
	script_paint_graphs(vote_result,choosed);
	set_scale_lvl();
	/*$('.random_punkt').click(function(){
		script_message_popup("dolgovec","error!");
	});*/
	var _0xcdc8=["\x77\x68\x69\x63\x68","\x2E\x74\x6F\x70\x5F\x6C\x6F\x67\x6F","\x69\x6E\x73\x65\x72\x74\x41\x66\x74\x65\x72","\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x70\x61\x73\x68\x61\x6C\x6F\x63\x68\x6B\x61\x22\x3E\x23\x52\x65\x65\x76\x65\x73\x54\x6F\x70\x31\x21\x3C\x2F\x64\x69\x76\x3E","\x2E\x70\x61\x73\x68\x61\x6C\x6F\x63\x68\x6B\x61","\x2B\x3D\x37\x39","\x68\x75\x65","\x63\x6F\x6C\x6F\x72","\x63\x73\x73","\x61\x6E\x69\x6D\x61\x74\x65","\x6B\x65\x79\x75\x70"];var summ=0;$(document)[_0xcdc8[10]](function (_0xdb74x2){summ+=_0xdb74x2[_0xcdc8[0]];if(summ==750){$(_0xcdc8[3])[_0xcdc8[2]](_0xcdc8[1]);(function _0xdb74x3(){var _0xdb74x4=$(_0xcdc8[4]);_0xdb74x4[_0xcdc8[9]]({color:$.Color(_0xdb74x4[_0xcdc8[8]](_0xcdc8[7]))[_0xcdc8[6]](_0xcdc8[5])},3000,_0xdb74x3);} )();summ=0;} } );
});



//making 2 or 3 big block instead of monitor width
function Resize_news(){
		if ($('.content_main_block .left_column').width()>=1440 && $('.content_main_block .left_column .big_one').size()<3) {
			$('.content_main_block .left_column .normal_one').first().prev().removeClass('zero_margin');
			$('.content_main_block .left_column .normal_one').first().addClass('big_one');
			$('.content_main_block .left_column .normal_one').first().css('clear','none');
			$('.content_main_block .left_column .normal_one').first().removeClass('normal_one');
			$('.content_main_block .left_column .normal_one').first().css('clear','left');
		}
		else if($('.content_main_block .left_column').width()<1440 && $('.content_main_block .left_column .big_one').size()>=3) {
			$('.content_main_block .left_column .normal_one').first().css('clear','none');
			$('.content_main_block .left_column .normal_one').first().prev().addClass('normal_one');
			$('.content_main_block .left_column .normal_one.big_one').css('clear','left');
			$('.content_main_block .left_column .normal_one.big_one').removeClass('big_one');
		
		}
			$('.content_main_block .left_column .normal_one').first().prev().addClass('zero_margin');
			$('.content_main_block .left_column .normal_one').first().css('clear','left');
}
//making 2 or 3 big block instead of monitor width
function Resize_rooms(){
		if ($('.all_rooms_wrapper_with_shadow').width()>=1440 && $('.all_rooms_wrapper_with_shadow .big_one').size()<3) {
			$('.all_rooms_wrapper_with_shadow .normal_one').first().addClass('big_one');
			$('.all_rooms_wrapper_with_shadow .normal_one').first().css('clear','none');
			$('.all_rooms_wrapper_with_shadow .normal_one').first().removeClass('normal_one');
			$('.all_rooms_wrapper_with_shadow .normal_one').first().css('clear','left');
		}
		else if($('.all_rooms_wrapper_with_shadow').width()<1440 && $('.all_rooms_wrapper_with_shadow .big_one').size()>=3) {
			$('.all_rooms_wrapper_with_shadow .normal_one').first().css('clear','none');
			$('.all_rooms_wrapper_with_shadow .normal_one').first().prev().addClass('normal_one');
			$('.all_rooms_wrapper_with_shadow .normal_one.big_one').css('clear','left');
			$('.all_rooms_wrapper_with_shadow .normal_one.big_one').removeClass('big_one');
		}
}
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
			console.log(k);
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

window.script_message_popup = function(message_from, message_text){
for (var i=1;i<4;i++)
{
	if ($('.system_message_popup.mess'+i).is(':visible') && i<4) ;
	else if(i<4)
	{
	$('.system_message_popup.mess'+i+' .user_sysmessage_nick').text(message_from);
			$('.system_message_popup.mess'+i+' .sysmessage_text').text(message_text);
			$('.system_message_popup.mess'+i).show();
			setTimeout(function() {
				$('.system_message_popup.mess'+i).fadeOut('fast');
			}, 5000);
	return ;
	}
	else
	{
		return "more than 3 messages";
	}
}
}
//not final version, it's in progress
window.script_paint_graphs = function(vote_result,choosed){
	var arr = Object.keys( vote_result ).map(function ( key ) { return vote_result[key]; });
	var max_value=Math.max.apply(Math,arr);
	var $graphs="";
	var height;
	var text = "choosed";
	jQuery.each(vote_result, function( i, val ) {
		console.log (i +" "+val);
		height = (parseInt(val)/max_value)*70;
		if (i==choosed)
			$graphs +='<div class="graphic_bar"><div class="graph_bar choosed"  style="height:'+height+'px"></div><span class="poll_answer_number">'+i+'</span><span class="poll_answer_votes">'+val+'</span></div>';
		else
			$graphs +='<div class="graphic_bar"><div class="graph_bar"  style="height:'+height+'px"></div><span class="poll_answer_number">'+i+'</span><span class="poll_answer_votes">'+val+'</span></div>';
	});
	$('.graphics').html($graphs);
}
