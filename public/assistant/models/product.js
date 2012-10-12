/**
 * @class Assistant.Models.Product
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend product services.  
 */
$.Model('Assistant.Models.Product',
/* @Static */
{},
/* @Prototype */
{
  findAll: function(params, success) {
      $.ajax({
         url: 'api/products',
         type: 'post',
         dataType: 'json',
         data: params,
         success: function(response) {
            // success();
            console.log(response.result.products);
            // success(response.result.products);
         }
      });
  }
});