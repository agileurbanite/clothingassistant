steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view',
	   'assistant/models' )
	.then('./views/init.ejs', function($){

/**
 * @class Assistant.Product.Create
 * @parent index
 * @inherits jQuery.Controller
 * Creates products
 */
$.Controller('Assistant.Product.Create',
/** @Prototype */
{
	init : function(){
		this.element.html(this.view());
	},
	submit : function(el, ev){
		ev.preventDefault();
		this.element.find('[type=submit]').val('Creating...')
		new Assistant.Models.Product(el.formParams()).save(this.callback('saved'));
	},
	saved : function(){
		this.element.find('[type=submit]').val('Create');
		this.element[0].reset()
	}
})

});