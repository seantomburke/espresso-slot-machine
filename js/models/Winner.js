var app = app ||{};

app.Winner = Backbone.Model.extend({
	defaults:{
		value: "default",
		reveal: "false",
		image: app.img.default
	}
})