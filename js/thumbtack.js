var app = app || {};

var machine = new app.Machine();

_.extend(machine, Backbone.Events);

$("#lever").on("click", function(){
	machine.pullLever();
})