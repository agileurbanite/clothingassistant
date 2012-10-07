$(document).ready(function(){
    // applying masonry to products grid
    var $container = $('#products');
    $container.imagesLoaded(function(){
        $container.masonry({
                itemSelector: 'li',
                columnWidth: 100
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
    
    // set styles
    
    
});