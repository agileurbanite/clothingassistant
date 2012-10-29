$(document).ready(function(){
    var productPage = 0;

    // update products
    /*
    function update_products(){
        $.ajax({
            url: 'api/products',
            type: 'post',
            data: { 'page': productPage },
            success: function(res){
                var $container = $('#products');
                $container.html(res.result.html).show().css({visibility:'hidden'});
                 $container.imagesLoaded(function(){
                    $('.indicator').hide();
                    $container.masonry('reload').css({visibility:'visible'});
                    $('#styles-btn').show();
                    $('#back-btn').removeClass('hide');
                    $('#type_filter').show();
                 });
            }
        });
    }

    function append_products(){
        $.ajax({
            url: 'api/products',
            type: 'post',
            data: { 'page': productPage },
            success: function(res){
                var $container = $('#products');
                //$container.append(res.result.html).show().css({visibility:'hidden'});
                $html = $(res.result.html);
                $container.append($html);
                 $container.imagesLoaded(function(){
                    $('.indicator').hide();
                    $container.masonry('appended', $html);
                    $('#styles-btn').show();
                    $('#back-btn').removeClass('hide');
                    $('#type_filter').show();
                 });
            }
        });
    }

    function endless_scroll() {
        $(document).endlessScroll({
          inflowPixels: 100,
          fireDelay: true,
          ceaseFireOnEmpty: false,
          callback: function(i, x, direction) {
            if (direction == 'prev') {
                $(document)
                return false;
            } else {
                productPage++
                append_products();
            }
          }
        });
    }*/

    // applying masonry to products grid
    var $container = $('#products');
    $container.imagesLoaded(function(){
        $container.masonry({
            itemSelector: 'li',
            columnWidth: 90,
            gutterWidth: 5,
            isAnimatedFromBottom: true,
            isFitWidth: true
        });
        app.init();
    });
    
    // click handler for gender toggle in nav
    $('#gender-toggle a').click( function(e){
        e.preventDefault();
        $this = $(this);
        gender = $this.attr('data-gender');
        if(gender){
            $this.parent().find('.active').removeClass('active');
            $this.addClass('active');
            app.set_gender(gender);
            $.post('/api/set-gender', {gender: gender}, function(e){
                app.update_products();
                
            });
        }
    });
    
    // click handler for female gender screen
    $('#lightbox-gender .female').click(function(){
        $.ajax({
            url: '/api/set-gender',
            type: 'post',
            dataType: 'json',
            data: {'gender':'f'}
        });
       $('#lightbox-gender, #dimmer').hide();
       $('#products').hide();
       $('#womens-styles-cont').show();
       $('#search-bar').hide();
       $('#splash').hide();
       $('#styles-btn').addClass('female-style').hide();
       $('#back-btn').addClass('female-style').addClass('hide');
    });
    
    // click handler for male gender screen
    $('#lightbox-gender .male').click(function(){
        $.ajax({
            url: '/api/set-gender',
            type: 'post',
            dataType: 'json',
            data: {'gender':'m'}
        });
        $('#lightbox-gender, #dimmer').hide(); 
        $('#products').hide();
        $('#mens-styles-cont').show();
        $('#search-bar').hide();
        $('#splash').hide();
        $('#styles-btn').addClass('male-style').hide();
        $('#back-btn').addClass('male-style').addClass('hide');
    });

    // click handler to set womens styles
    $('#mens-styles').delegate('li', 'click', function(){
        var style = $(this).attr('class');
        app.hide_wizard();
        $.ajax({
            url: '/api/set-user-style',
            type: 'post',
            dataType: 'json',
            data: {"style" : style}
        }).done(function(response){
            if(response){
                $('#mens-styles-cont').hide();
                app.update_products();
                // instantiate endless scroll
                //app.endless_scroll();
            }
        });
    });
    
    // click handler to set womens styles
    $('#womens-styles').delegate('li', 'click', function(){
        var style = $(this).attr('class');
        app.hide_wizard();
        $.ajax({
            url: '/api/set-user-style',
            type: 'post',
            dataType: 'json',
            data: {"style" : style}
        }).done(function(response){
            if(response){
                // hide womens styles chooser
                $('#womens-styles-cont').hide();
                app.update_products();
                // instantiate endless scroll
                //app.endless_scroll();
            }
        });
    });

    //click handler to set user type
    $('#type_filter').delegate('a', 'click', function(e){
        productPage = 0;
        e.preventDefault(); 
        $this = $(this);
        $('#type_filter a').removeClass('hit');
        $this.addClass('hit');
        $.post('/api/set-user-style', {style: $this.text()}, function(res){
            app.update_products();
       });
    });
    
    // click handler to remove brands
    $('#active-filters').delegate('li', 'click', function(){
        var self = $(this);
        var brand = $(this).html().substr(27);
        $.ajax({
            url: '/api/remove-user-brand',
            type: 'post',
            dataType: 'json',
            data: {'brand':brand}
        }).done(function(response){
           if(response){
               // remove brand
               self.remove();
               
               // get new products
               $.get('/api/products', function(res){
                   $('#products').html(res.result.html).show().masonry('reload');
               });
           }
        });
    });
    
    $.get('/api/get-brands', function(res){
        $( "#query" ).autocomplete({
            source: res,
            minLength: 2,
            select: function( event, ui ) {
                var brand = ui.item.value
                $.post('/api/add-user-brand', {brand: brand}, function(res){
                    //add brand
                    add_brand(brand);
                    
                    //update product
                    app.update_products();
                    
                    //clear val
                    $( "#query" ).val('');
                });
            }
        });
    },'json');
    
    // styles button click handler
    $('#styles-btn,#back-btn').click(function() {
        $('#products').hide();
        $('#womens-styles-cont').show();
        $('#search-bar').hide();
        if($(this).hasClass('female-style')){
            $('#male-styles-cont').hide();
            $('#womens-styles-cont').show();
        } else if($(this).hasClass('male-style')) {
            $('#womens-styles-cont').hide();
            $('#mens-styles-cont').show();
        }
        $(this).hide();
    });
    
    $('#products').on('click', '.like-button', function(e){
       e.preventDefault();
       var $this = $(this);
       $this.addClass('hit');
       var $rating = $this.parent().find('.current-rating');
       prod_id = $this.attr('data-prod_id');
       
       $.post('/api/add-like', {prod_id: prod_id}, function(res){
           if(res.code == 200){
               $rating.text(res.count);
           }else{
               $rating.text( parseInt($rating.text()) + 1);
           }
       });
    });

    $('#lp-close').on('click', function(e){
        $('#lightbox-product,#dimmer').hide();
    });

/* disabled till we polish the popup
    $('#products').on('click', '.item', function(e){
        link = $(this).attr('href');
        img = $(this).find('img').attr('src');
        price = $(this).find('.price').text();
        title = $('img',this).attr('alt');
        $('#lightbox-product a').attr('href', link);
        $('.lp-name').text(title)
        $('.lp-price').text(price);
        $('.lp-img-full img').attr('src', img);
        $('#lightbox-product, #dimmer').show();
        changeCommentsUrl(link);
        e.preventDefault();
    });
*/
    $('#ls-close').on('click', function(e){
        $('#lightbox-subscribe,#dimmer').hide();
    });
    
    // add brands click handler
    /*
    $('#search-btn').click(function(ev) {
        ev.preventDefault();
        var brand = $(this).siblings('#query').val();
        
        if(!$('#active-filters li').hasClass(brand)){
            $.ajax({
                url: 'api/add-user-brand',
                type: 'post',
                dataType: 'json',
                data: {'brand':brand}
            }).done(function(response) {
                if(response){
                   $('#query').val('');
                   // append brand as it does not exist yet
                   $('#active-filters').append('<li class="' + brand + '"><span class="close"></span>' + brand + '</li>');
                    // get new products
                   $.get('api/products', function(res){
                       $('#products').html(res.result.html).show().masonry('reload');
                   });
                }
            });
        } else {
            $('#query').val('');
        }
    });*/
});

function changeCommentsUrl(newUrl){
    // should refresh fb comments plugin for the "newUrl" variable
    document.getElementById('lp-comments').innerHTML='';
    parser=document.getElementById('lp-comments');
    parser.innerHTML='<div class="fb-comments" data-href="'+newUrl+'" data-num-posts="2" data-width="392"></div>';
    FB.XFBML.parse(parser);
}
