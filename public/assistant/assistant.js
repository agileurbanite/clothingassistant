steal(
	'css/style.css'
	, 'css/ui-lightness/jquery-ui-1.8.24.custom.css'
)
.then('jquery')
.then('jquery/jquery-ui-1.8.24.custom.min.js'
	, 'jquery/jquery.infinitescroll.js'
	, 'jquery/jquery.masonry.js')
.then('scripts/event.js');
/*.then('jquery/class'
	, 'jquery/controller'
	, 'jquery/controller/route'
	, 'jquery/controller/subscribe'
	, 'jquery/controller/view'
	, 'jquery/view'
	, 'jquery/view/ejs'
	, 'jquery/model'
	, 'jquery/model/list'
	// , 'jquery/dom/fixture'
)
.then('assistant/models/product.js')
.then('assistant/product/list') 
.then(function(){					// configure your application	
	$('#products').assistant_product_list();
});*/