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
        }).done(function(response) {
           $('#lightbox-gender, #dimmer').hide();
           $('#products').hide();
           $('#womens-styles').show();
        });
    });
    
    // click handler for male gender screen
    $('#lightbox-gender .male').click(function(){
        $.ajax({
            url: 'api/set-gender',
            type: 'post',
            dataType: 'json',
            data: {'gender':'m'}
        }).done(function(response) {
           $('#lightbox-gender, #dimmer').hide(); 
           $('#products').hide();
           $('#mens-styles').show();
        });
    });
    
    // click handler to set mens styles
    $('#mens-styles').delegate('li', 'click', function(){
        var style = $(this).attr('class');
        $.ajax({
            url: 'api/set-user-style',
            type: 'post',
            dataType: 'json',
            data: { "style" : style }
        }).done(function(response) {
            if(response) {
                // hide mens styles chooser
                $('#mens-styles').hide();
                // get products based on selected styles
                $.get('api/products', function(res){
                   $('#products').html(res.result.html).show().masonry('reload'); 
                });
                
            }
        });
    });
    
    // click handler to set womens styles
    $('#womens-styles').delegate('li', 'click', function(){
        var style = $(this).attr('class');
        $.ajax({
            url: 'api/set-user-style',
            type: 'post',
            dataType: 'json',
            data: {"style" : style}
        }).done(function(response){
            if(response){
                // hide womens styles chooser
                $('#womens-styles').hide();
                // get products based on selected styles
                $.get('api/products', function(res){
                    $('#products').html(res.result.html).show().masonry('reload');
                });
            }
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
});