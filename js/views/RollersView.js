var app = app || {};

app.RollersView = Backbone.View.extend({
	tagName: "div",
	className: "spinner-view",
	render: function(){
		this.$el.html(' ');
		this.collection.each(this.addRoller, this);
		return this;
	},
	addRoller: function(roller){
		////console.log("RollersView roller input", roller);
		var rollerView = new app.RollerView({id: roller.id, model: roller});
		this.$el.append(rollerView.render().el);
	}
})