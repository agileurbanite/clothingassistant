steal('css/style.css')
.then('./models/models.js',		// steals all your models
	'./fixtures/fixtures.js',	// sets up fixtures for your models
	'assistant/product/create',
	'assistant/product/list')
.then(function(){
    // configure your application		
    $('#products').assistant_product_list();
    $('#create').assistant_product_create();
});