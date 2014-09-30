var app = app || {};

app.SectionsView = Backbone.View.extend({
	tagName: "div",
	className: "roller",
	render: function(){
		this.$el.html(' ');
		this.collection.each(this.addSection, this);
		this.addSection(this.collection.models[0]);
		return this;
	},
	addSection: function(section){
		var sectionView = new app.SectionView({model: section});
		this.$el.append(rollerView.render().el);
	}
})