steal('css/style.css')
.then('./models/models.js',		// steals all your models
	'./fixtures/fixtures.js',	// sets up fixtures for your models
	'assistant/product/create',
<<<<<<< HEAD
	'assistant/product/list')
=======
	'assistant/product/list') 
.then(function(){					// configure your application	
	$('#products').assistant_product_list();
	$('#create').assistant_product_create();
})
.then('jquery/jquery.masonry.js')
>>>>>>> b4478e2c82b8a5c73f056432c00588dc8b2cab36
.then(function(){
    // configure your application		
    $('#products').assistant_product_list();
    $('#create').assistant_product_create();
});