steal(
	'./views/init.ejs',
	'./views/product.ejs')
.then(function($){
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
		count: 0,

		init : function(){
            var self = this;
            Product.findAll({"page":this.count}, function(data) {
            	console.log(data.result.products);
            });
            /*$('body').bind('findAllProducts', function(ev, data) {
            	console.log(data);
            });*/
            // this.element.html(this.view('init',Assistant.Models.Product.findAll()));
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