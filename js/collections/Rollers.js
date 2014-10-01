var app = app || {};

app.Rollers = Backbone.Collection.extend({
	model: app.Roller,
	initialize: function(){
		var _this = this;
		this.on('change', function(){
			////console.log(_this.rollValue);
		})
	}
})