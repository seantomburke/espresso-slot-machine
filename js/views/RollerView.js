"use strict";
var app = app || {};

app.RollerView = Backbone.View.extend({
	tagName: "div",
	className: "roller",
	render: function(){
		this.$el.html(this.model.sectionsView.render().el);
		return this;
	}
})