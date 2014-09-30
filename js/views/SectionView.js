var app = app || {};

app.SectionView = Backbone.View.extend({
	tagName: "div",
	className: "roller-section",
	template: _.template($("#roller-section-template").html()),
	render: function(){
		var sectionTemplate = this.template(this.model.toJSON());
		this.$el.html(sectionTemplate);
		return this;
	}
});