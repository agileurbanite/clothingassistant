steal('jquery/model', 'jquery/model/list', 'jquery/json2', function(){

/**
 * @class Assistant.Models.Product
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend product services.  
 */
$.Model('Assistant.Models.Product',
/* @Static */
{
	findAll: function(params, success) {
            $.ajax({
               url: 'api/product',
               type: 'post',
               dataType: 'json',
               data: JSON.stringify(params),
               success: function(response) {
                   console.log(response.result.products);
                   // success(response.result.products);
               }
            });
        }
},
/* @Prototype */
{});

var Product = Assistant.Models.Product;

})