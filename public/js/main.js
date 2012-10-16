$(document).ready(function() {
	$('#footer-contact-send').click( function(e){
		var error = false;
		var data = {};
		$("#footer-contact input, #footer-contact textarea").each( function(k,v){
			if( $(v).val() == "" ){
				error = true;
			}
		});
		
		if(!error){
			$.post('/contact/add', $("#footer-contact input, #footer-contact textarea").serialize() , function(res){
				if(res.status.code == 200){
					alert('Your message has been sent.');
					$('#footer-contact textarea').val('');
				}else{
					alert('There was an error, please try again later');
				}
			});
		}else{
			alert('Error: make sure all fields have been filled in');
		}
		
	});
	
	// TOP BAR


	$('#arrow-down').click(function() {
		$("#arrow-down").animate({ marginTop:'-88px' }, 250, function() { });
		$("#top-bar").animate({ marginTop:'0' }, 200, function() { }).animate({ marginTop:'-8px' }, 200, function() { }).animate({ marginTop:'0' }, 200, function() { });
		$("body").css("background-image","url(/images/page-bg.png)").animate({ marginTop:'0' }, 200, function() { });
		$("#outer-wrapper").animate({ marginTop:'41px' }, 200, function() { });
	});
	
	$('#arrow-up').click(function() {
		$("body").css("background-image","url(/images/page-bg2.png)").animate({ marginTop:'-41px' }, 200, function() { });
		$("#arrow-down").css('margin-top','-42px').show().animate({ marginTop:'0px' }, 300, function() { }).animate({ marginTop:'-5px' }, 200, function() { }).animate({ marginTop:'0px' }, 200, function() { });
		$("#top-bar").animate({ marginTop:'-41px' }, 200, function() { });
		$("#outer-wrapper").animate({ marginTop:'0' }, 200, function() { });
	});

});
