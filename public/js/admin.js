$(document).ready( function(){
	$('#main_menu.nav, .dropdown').dropdown();
	$('a.trig_delete').click(function(e){
		var t = this;
		e.preventDefault();
		rel = $(this).attr('rel');
		exp = rel.split('|');
		model = exp[0].split('=');
		model = model[1];
		id = exp[1].split('=');
		id = id[1];
		$.post('/admin/data/cmd/delete', {'model':model, 'id':id}, function(res){
			if(res.status.code == 200){
				$(t).parent().parent().remove();
			}
		});
	});
	
	$('form.trig_save input.btn.primary').click(function(e){
		var t = this;
		e.preventDefault();
		$.post('/admin/data/cmd/save', $('form.trig_save').serialize(), function(res){
			if(res.status.code == 200){
				history.go(-1);
			}
		});
	});
	
	$('.btn.back').click(function(e){
		e.preventDefault();
		history.go(-1);
	})
	
	$('.small.datepicker').datetimepicker( 
		{
			dateFormat: 'yy-mm-dd', 
			ampm: true, 
			timeFormat: 'hh:mm:ss tt',
			onClose: function(dateText, inst){
				console.log($(this).attr('value', dateText));
			}
		}
	);
	
});