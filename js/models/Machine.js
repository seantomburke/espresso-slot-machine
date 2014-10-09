"use strict";
var app = app || {};

app.Machine = Backbone.Model.extend({
	defaults: {
		rolling: false,
		leverPulled: false
	},
	initialize: function(){
		this.rolling = false;
		this.rollers = {};
	}
});