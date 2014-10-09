"use strict";
var app = app || {};

app.Roller = Backbone.Model.extend({
	defaults: {
		rollValue: -1,
		position: 0,
		rolling: false,
	},
	initialize:function(input){
		this.sections = input.sections;
		this.sectionsView = new app.SectionsView({
			collection: this.sections
		});
	}
})