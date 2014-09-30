var app = app || {};

app.RollersView = Backbone.View.extend({
	tagName: "div",
	className: "roller",
	render: function(){
		this.$el.html(' ');
		this.collection.each(this.addRoller, this);
		return this;
	},
	addRoller: function(roller){
		var rollerView = new app.RollerView({model: roller});
		this.$el.append(rollerView.render().el);
	}
})