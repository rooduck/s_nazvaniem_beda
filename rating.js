/**
 * Created by boshurik on 13.11.14.
 * Ara)))
 */
$(document).ready(function(){
    $('.down_rating').click(function(){
        $(this).addClass('selected');
        $(this).parent().find('.up_rating').removeClass('selected');
        $(this).parent().find('.how_much_left_popup').removeClass('plus');
        $(this).parent().find('.how_much_left_popup').addClass('minus');
        $(this).parent().find('.today_rating').hide();
        $(this).parent().find('.streamer_rating').show();
		$(this).parent().find('.article_rating').show();
		$(this).parent().find('.article_comment_rating').show();
        $(this).parent().find('.plus').hide();
		$(this).parent().find('.total_comment_rating').hide();
        $(this).parent().find('.minus').show();
    });
    $('.up_rating').click(function(){
        $(this).addClass('selected');
        $(this).parent().find('.down_rating').removeClass('selected');
        $(this).parent().find('.how_much_left_popup').removeClass('minus');
        $(this).parent().find('.how_much_left_popup').addClass('plus');
        $(this).parent().find('.today_rating').hide();
        $(this).parent().find('.streamer_rating').show();
		$(this).parent().find('.article_rating').show();
		$(this).parent().find('.article_comment_rating').show();
        $(this).parent().find('.minus').hide();
		$(this).parent().find('.total_comment_rating').hide();
        $(this).parent().find('.plus').show();

    });
});
