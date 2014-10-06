"use strict";
var app = app || {};

app.Machine = Backbone.Model.extend({
	defaults: {
		rolling: false,
		leverPulled: false
	},
	initialize: function(){

		this.on("roller:stopped", this.setStopped);

		//this.collection = new app.Rollers;
		this.rolling = false;
		this.rollers = {};
	}
});