steal("funcunit", function(){
	module("assistant test", { 
		setup: function(){
			S.open("//assistant/assistant.html");
		}
	});
	
	test("Copy Test", function(){
		equals(S("h1").text(), "Welcome to JavaScriptMVC 3.2!","welcome text");
	});
})