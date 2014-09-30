var app = app || {};

app.RollerView = Backbone.View.extend({
	tagName: "div",
	className: "roller",
	render: function(){
		this.$el.html(' ');
		this.collection.each(this.addSection, this);
		this.addSection(this.collection.models[0]);
		return this;
	},
	addSection: function(section){
		var sectionView = new app.SectionView({model: section});
		this.$el.append(sectionView.render().el);
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
	},
})