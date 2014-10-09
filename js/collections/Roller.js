"use strict";
var app = app || {};

app.Roller = Backbone.Collection.extend({
	model: app.Section,
	defaults: {
		rollValue: 0,
		position: 0,
		rolling: false,
	}
})