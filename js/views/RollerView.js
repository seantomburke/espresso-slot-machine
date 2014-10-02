var app = app || {};

app.RollerView = Backbone.View.extend({
	tagName: "div",
	className: "roller",
	intitialize:function(){
		this.$el.on("click", startRoll);
		console.log(this.el);
		//this.listenTo(app.MachineView, "roll:start", this.startRoll);
	},
	events:{
		"click .roller": "startRoll"
	},
	render: function(){
		//console.log("RollerView", this.model.sectionsView.render().el);
		this.$el.html(this.model.sectionsView.render().el);
		return this;
	},
	startRoll: function(){
			console.log("startRoll");
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
			//console.log(top);
			_$el.css("top", top);
			_$el.removeClass("roll");
			_$el.animate({
				top: new_top
			}, 250);
		}
		setTimeout(stop, timeout);
		this.trigger("roller:stopped");
		this.rolling = false;
		return false;
	},
})