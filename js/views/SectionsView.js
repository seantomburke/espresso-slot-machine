"use strict";
var app = app || {};

app.SectionsView = Backbone.View.extend({
	tagName: "div",
	className: "sections",
	initialize:function(){
		//console.log("SectionsView", this);
	},
	render: function(){
		this.$el.html(' ');
		//console.log("SectionsView collection", this.collection);
		this.collection.each(this.addSection, this);
		this.addSection(this.collection.models[0]);
		return this;
	},
	addSection: function(section){
		var sectionView = new app.SectionView({model: section});
		this.$el.append(sectionView.render().el);
	}
})