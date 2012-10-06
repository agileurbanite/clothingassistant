steal(
	'./assistant.css', 			// application CSS file
	'./models/models.js',		// steals all your models
	'./fixtures/fixtures.js',	// sets up fixtures for your models
	'assistant/product/create',
	'assistant/product/list')
.then(function(){					// configure your application
		
		$('#products').assistant_product_list();
		$('#create').assistant_product_create();
})
.then('jquery/jquery.masonry.js')
.then(function(){
	var $container = $('#products');
	$container.imagesLoaded(function(){
		$container.masonry({
			itemSelector: 'li',
			columnWidth: 90
		});
	});
});