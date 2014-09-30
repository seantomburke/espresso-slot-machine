var app = app || {};

app.Roller = Backbone.Model.extend({
	defaults: {
		rollValue: 0,
		position: 0,
		sections: function(){
			return new app.Sections();
		}
	},
	initialize: function(){
		console.log("initializing Roller.js");
		var _this = this;
		this.on('change', function(){
			console.log(_this.rollValue);
		})
	}
})