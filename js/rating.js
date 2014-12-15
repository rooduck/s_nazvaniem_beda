/**
 * Created by boshurik on 13.11.14.
 * Ara)))
 */
//OLD VERSION
$(document).ready(function(){
    setTimeout(function() {
        $('.down_rating').click(function () {
            //trackbar at rating
            set_rating_trackbar(88);
            $(this).addClass('selected');
            $(this).parent().find('.up_rating').removeClass('selected');
            $(this).parent().find('.popup_rating').show();
        });
        $('.up_rating').click(function () {
            //trackbar at rating
            set_rating_trackbar(88);
            $(this).addClass('selected');
            $(this).parent().find('.down_rating').removeClass('selected');
            $(this).parent().find('.popup_rating').show();
        });
    },1500);
});
