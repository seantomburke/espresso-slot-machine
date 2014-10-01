var app = app || {};

app.Roller = Backbone.Collection.extend({
	model: app.Section,
	defaults: {
		rollValue: 0,
		position: 0,
		rolling: false,
	},
	initialize: function(){
		var _this = this;
		this.on('change', function(){
			console.log(_this.rollValue);
		})
	}
})