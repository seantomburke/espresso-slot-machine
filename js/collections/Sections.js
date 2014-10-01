var app = app || {};

app.Sections = Backbone.Collection.extend({
	model: app.Section,
	initialize: function(){
		var _this = this;
		this.on('change', function(){
			//console.log(_this.rollValue);
		})
	}
})