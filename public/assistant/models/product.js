/**
 * @class Assistant.Models.Product
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend product services.  
 */
$.Model('Assistant.Models.Product',
/* @Static */
{
  findAll: function(params, success, error) {
      return $.ajax({
         url: 'api/products',
         type: 'post',
         dataType: 'json',
         data: params,
         success: success,
         error: error
      });
  }
},
/* @Prototype */
{});
var Product = Assistant.Models.Product;