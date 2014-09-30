var app = app || {};

app.RollerView = Backbone.View.extend({
	tagName: "div",
	className: "roller",
	template: _.template($("#roller-template").html()),
	render: function(){
		this.$el.html();
		console.log(this.sections);
		return this;
	},
	startRoll: function(){
		this.$el.addClass("roll");
	},
	stopRoll: function(timeout){
		var _this = this;
		var _$el = this.$el;
		var stop = function(){
			var top = _$el.position().top;
			var index = Math.round(top/210);
			var new_top = index*210;
			_this.collection.rollValue = Math.abs(index);
			console.log(top);
			_$el.css("top", top);
			_$el.removeClass("roll");
			_$el.animate({
				top: new_top
			}, 250);
		}
		setTimeout(stop, timeout);
	}
})