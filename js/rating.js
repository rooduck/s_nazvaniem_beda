/*Инструкция к пользованию:
У меня инициализация самого трекбара происходит при клике на + или -
При каждом клике перетирается старый и создается новый (на случай изменения параметров трекбара)
id может быть какой угодно, обязательно должен быть класс slider-comment-rating, иначе ничего не будет работать

setTimeout на проде не нужен
 */
$(document).ready(function(){
    setTimeout(function() {
        $('.down_rating').click(function () {
            //trackbar at rating
            set_rating_trackbar($(this).parent().find('.trackbar_block div'),1,88);
            $(this).addClass('selected');
            $(this).parent().find('.up_rating').removeClass('selected');
            $(this).parent().find('.popup_rating').show();
        });
        $('.up_rating').click(function () {
            //trackbar at rating
            set_rating_trackbar($(this).parent().find('.trackbar_block div'),1,88);
            $(this).addClass('selected');
            $(this).parent().find('.down_rating').removeClass('selected');
            $(this).parent().find('.popup_rating').show();
        });
    },1500);
});

/**
 * Глобальная функция, инициализирует трекбар у формы рейтинга
 *@param $selector - генерируется автоматически, фактически, это $(this)
 *@param min - минимальное значение трекбара
 *@param max - максимальное значение трекбара
 */
window.set_rating_trackbar = function($selector, min, max) {
    //reset old one, if something had changed.
    $selector.html('<div class="slider-comment-rating"></div>');
    //close all other popups
    $('.popup_rating').hide();
    //initialize trackbar
    $selector.slider({
        range: "min",
        animate: false,
        min: min,
        max: max,
        step: 1,
        value: min,
        slide: function (event, ui) {
            $selector.find('.ui-slider-handle').text(ui.value);
            $selector.parent().find('input').val(ui.value);
        }
    });
    $selector.find('.ui-slider-handle').text(min);
    $selector.parent().find(".max_value").text(max);
}
