/**
 * Created with PhpStorm.
 * User: boshurik
 * Date: 29.09.14
 * Time: 23:35
 */

$(document).ready(function(){
    $('.site_filter').each(function(){
        var globalRequest, categoryRequest;

        var $filter = $(this);
        var $contextFilter = $(this).find('.context_filter');
        var $contentFilter = $(this).find('.content_filter');

        var target = $filter.data('target');

        var $type = $contentFilter.find('.type');
        var $category = $contentFilter.find('.category');
        var $subCategory = $contentFilter.find('.sub_category');

        var $subCategories = $contentFilter.find('.other_category_choose');

        var updateSubCategories = function(type, category){
            if (categoryRequest) {
                categoryRequest.abort();
            }

            //console.log('subCategory', type, category);
            categoryRequest = $.ajax({
                url: '/category/filterSubCategories',
                data: {
                    type: type,
                    category: category
                },
                method: 'GET',
                dataType: 'JSON',
                success: function(data){
                    var i = 3;
                    var $subCategoriesPlaceholder = $subCategories.find('.sub_categories');

                    $subCategory.find('div:first').addClass('active');
                    $subCategory.find('div').not(':first').remove();

                    $subCategoriesPlaceholder.html('');
                    for (var slug in data) {
                        if (i > 0) {
                            $subCategory.append('<div class="cifri_wrapper"><a href="'+ slug +'" class="click_filter">'+ data[slug] +'</a></div>');
                        } else {
                            if (i == 0) {
                                $subCategory.append('<div class="cifri_wrapper"><a href="" class="click_filter show_category_search">Другое</a></div>');
                            }
                            $subCategoriesPlaceholder.append('<div class="cifri_wrapper"><a href="'+ slug +'" class="click_filter">'+ data[slug] +'</a></div>');
                        }
                        i--;
                    }
                }
            });
        };

        var doRequest = function(type, category, subCategory){
            var $target = $(target); // Стримы загружаются не сразу
            $target.html('<p>Ждите</p>');

            if (globalRequest) {
                globalRequest.abort();
            }

            //console.log('request', type, category, subCategory);
            globalRequest = $.ajax({
                url: '/category/filter',
                data: {
                    type: type,
                    category: category,
                    subCategory: subCategory
                },
                method: 'GET',
                dataType: 'JSON',
                success: function(data){
                    $target.html('');
                    for (var key in data) {
                        $target.append(data[key]);
                    }
                }
            });
        };

        $(this).on('click', 'a', function(event){
            event.preventDefault();

            var $this = $(this);

            if ($this.hasClass('show_category_search')) { // Открыли список с непоместившимися категориями
                return;
            }

            if ($this.hasClass('active')) {
                return;
            }

            var $parent = $this.parents('div:eq(1)');

            $parent.find('.active').removeClass('active');
            $this.parents('div:first').addClass('active');

            var type = $type.find('.active a').attr('href');
            var category = $category.find('.active a').attr('href');
            var subCategory = $subCategory.find('.active a').attr('href');
            if (!subCategory) {
                subCategory = $subCategories.find('.active a').attr('href');
            }

            if (!$parent.hasClass('sub_category') && !$parent.hasClass('sub_categories')) {
                if (category != '' && type != '') {
                    updateSubCategories(type, category);
                } else {
                    $subCategories.find('.sub_categories').html('');
                    $subCategory.find('div:first').addClass('active');
                    $subCategory.find('div').not(':first').remove();
                }
            }

            doRequest(type, category, subCategory);
        });

        $(this).on('click', '.show_category_search', function(){
            if ($(window).height()>712) {
                $subCategories.css('top',$(window).height()/2-256);
            } else {
                $subCategories.css('top','');
            }
            if ($(window).width()>1200) {
                $subCategories.css('left',$(window).width()/2-424);
            } else {
                $subCategories.css('left','');
            }

            $subCategories.css('visibility', 'visible');
            $('.fade').show();
        });

        $subCategories.on('click', '.close_category', function(){
            $subCategories.css('visibility','hidden');
            $('.fade').hide();
        });

        $subCategories.on('click', 'a', function(){
            $subCategory.find('.show_category_search')
                .html($(this).html())
                .attr('href', $(this).attr('href'))
                .addClass('active')
            ;
            $subCategories.find('.close_category').click();
        });

        $contextFilter.on('click', 'span', function(event){
            event.preventDefault();

            if ($(this).hasClass('active')) {
                return;
            }

            $contextFilter.find('span').removeClass('active');

            var index = $(this).index();
            var $lines = $contextFilter.find('.menu_lines');

            $(this).addClass('active');
            $lines.find('div:eq('+ index + 1 +')').addClass('active');
        });
    });

    //FADE
    $('.fade').click(function(){
        $('.other_category_choose').css('visibility','hidden');
        $(this).hide();
    });
});

