//js assistant/scripts/doc.js

load('steal/rhino/rhino.js');
steal("documentjs").then(function(){
	DocumentJS('assistant/assistant.html', {
		markdown : ['assistant']
	});
});