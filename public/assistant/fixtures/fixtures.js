// map fixtures for this application

steal("jquery/dom/fixture", function(){
	
	$.fixture.make("product", 5, function(i, product){
		var image_url = ["http://anf.scene7.com/is/image/anf/anf_57620_03_prod1?$anfProduct$", "http://anf.scene7.com/is/image/anf/anf_59464_19_prod1?$anfProduct$", "http://anf.scene7.com/is/image/anf/anf_56841_03_prod1?$anfProduct$"]
		return {
			name: "product "+i,
			image_url: $.fixture.rand( image_url , 1)[0]
		}
	})
})