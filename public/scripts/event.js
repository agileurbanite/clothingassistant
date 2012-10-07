$(document).ready(function(){
    // applying masonry to products grid
    var $container = $('#products');
    $container.imagesLoaded(function(){
        $container.masonry({
                itemSelector: 'li',
                columnWidth: 90,
                gutterWidth: 5
        });
    });
    
    // click handler for female gender screen
    $('#lightbox-gender .female').click(function(){
        $.ajax({
            url: 'api/set-gender',
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
    });
    
    // click handler for male gender screen
    $('#lightbox-gender .male').click(function(){
        $.ajax({
            url: 'api/set-gender',
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
    });
    
    // click handler to set mens styles
    $('#mens-styles').delegate('li', 'click', function(){
        var style = $(this).attr('class');
        $('#search-bar').show();
        $('.indicator').show();
        $.ajax({
            url: 'api/set-user-style',
            type: 'post',
            dataType: 'json',
            data: { "style" : style }
        }).done(function(response) {
            if(response) {
                // hide mens styles chooser
                $('#mens-styles-cont').hide();
                // get products based on selected styles
                $.get('api/products', function(res){
                   var $container = $('#products');
                   $container.html(res.result.html).show().css({visibility:'hidden'});
                   $container.imagesLoaded(function(){
                       $('.indicator').hide();
                       $container.masonry('reload').css({visibility:'visible'});
                       $('#styles-btn').show();
                   });
                });
                
                $.get('api/get-user', function(res){
                    console.log(res);
                    $('#active-filters').html();
                }, 'json');
            }
        });
    });
    
    // click handler to set womens styles
    $('#womens-styles').delegate('li', 'click', function(){
        var style = $(this).attr('class');
        $('#search-bar').show();
        $('.indicator').show();
        $('#styles-btn').hide();
        $.ajax({
            url: 'api/set-user-style',
            type: 'post',
            dataType: 'json',
            data: {"style" : style}
        }).done(function(response){
            if(response){
                // hide womens styles chooser
                $('#womens-styles-cont').hide();
                // get products based on selected styles
                $.get('api/products', function(res){
                    var $container = $('#products');
                    $container.html(res.result.html).show().css({visibility:'hidden'});
                    $container.imagesLoaded(function(){
                       $('.indicator').hide();
                       $container.masonry('reload').css({visibility:'visible'});
                       $('#styles-btn').show();
                    });
                });
                
                $.get('api/get-user', function(res){
                    $active_filters = $('#active-filters');
                    $active_filters.html('');
                    
                    $(res.result.brands).each( function(k,v){
                        html = "<li class='" + v + "'><span class='close'></span>" + v + "</li>";
                        $('#active-filters').append(html);
                    });
                    
                    $type_filters = $('#type_filter');
                    $type_filters.html('');
                    $(res.result.availableTypes).each( function(k,v){
                        html = '<a href="#">' + v + '</a> | ';
                        $type_filters.append(html);
                    });
                }, 'json');
            }
        });
        
        //click handler to set user type
        $('#type_filter').delegate('a', 'click', function(e){
            e.preventDefault();
           $this = $(this);
           $.post('/api/set-user-type', {type: $this.text()}, function(res){
               $.get('api/products', function(res){
                    var $container = $('#products');
                    $container.html(res.result.html).show().css({visibility:'hidden'});
                    $container.imagesLoaded(function(){
                       $('.indicator').hide();
                       $container.masonry('reload').css({visibility:'visible'});
                       $('#styles-btn').show();
                    });
                });
           });
        });
    });
    
    // click handler to remove brands
    $('#active-filters').delegate('li', 'click', function(){
        var self = $(this);
        var brand = $(this).html().substr(27);
        $.ajax({
            url: 'api/remove-user-brand',
            type: 'post',
            dataType: 'json',
            data: {'brand':brand}
        }).done(function(response){
           if(response){
               // remove brand
               self.remove();
               
               // get new products
               $.get('api/products', function(res){
                   $('#products').html(res.result.html).show().masonry('reload');
               });
           }
        });
    });
    
    // add autocomplete to search
    function log( message ) {
            $( "<div/>" ).text( message ).prependTo( "#log" );
            $( "#log" ).scrollTop( 0 );
    }

    $.get('/api/get-brands', function(res){
        $( "#query" ).autocomplete({
            source: res,
            minLength: 2,
            select: function( event, ui ) {
                    log( ui.item ?
                            "Selected: " + ui.item.value + " aka " + ui.item.id :
                            "Nothing selected, input was " + this.value );
            }
        });
    },'json');
    
    // styles button click handler
    $('#styles-btn').click(function() {
        $('#products').hide();
        $('#womens-styles-cont').show();
        if($(this).hasClass('female-style')){
            $('#male-styles-cont').hide();
            $('#womens-styles-cont').show();
        } else if($(this).hasClass('male-style')) {
            $('#womens-styles-cont').hide();
            $('#mens-styles-cont').show();
        }
        $(this).hide();
    });
    
    // add brands click handler
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
    });
});