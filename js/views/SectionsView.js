"use strict";
var app = app || {};

app.SectionsView = Backbone.View.extend({
	tagName: "div",
	className: "sections",
	render: function(){
		this.$el.html(' ');
		this.collection.each(this.addSection, this);
		this.addSection(this.collection.models[0]);
		return this;
	},
	addSection: function(section){
		var sectionView = new app.SectionView({model: section});
		this.$el.append(sectionView.render().el);
	}
})