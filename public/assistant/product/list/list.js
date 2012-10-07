steal( 
   'jquery', 
   'jquery/controller',
   'jquery/view/ejs',
   'jquery/controller/view',
   'assistant/models')
.then('jquery/jquery.masonry.js')
.then( './views/init.ejs', 
       './views/product.ejs', 
       function($){

/**
 * @class Assistant.Product.List
 * @parent index
 * @inherits jQuery.Controller
 * Lists products and lets you destroy them.
 */
$.Controller('Assistant.Product.List',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
            var self = this;
            this.element.html(this.view('init',Assistant.Models.Product.findAll()));
	},
        
	'.destroy click': function( el ){
		if(confirm("Are you sure you want to destroy?")){
			el.closest('.product').model().destroy();
		}
	},
	"{Assistant.Models.Product} destroyed" : function(Product, ev, product) {
		product.elements(this.element).remove();
	},
	"{Assistant.Models.Product} created" : function(Product, ev, product){
		this.element.append(this.view('init', [product]))
	},
	"{Assistant.Models.Product} updated" : function(Product, ev, product){
		product.elements(this.element)
		      .html(this.view('product', product) );
	}
});

});