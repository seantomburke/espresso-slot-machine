var app = app || {};

app.MachineView = Backbone.View.extend({
	tagName:"div",
	className:"machine",
	initialize:function(){
		this.model.on('change:leverPulled', this.leverHandler, this);
		this.model.on('change:rolling', this.addRollingClass, this);
		//$("#lever").on("animationend", this.removeRollClass);
		//$("#lever").on("webkitAnimationEnd",this.removeRollClass);
		// this.$el.on("animationend", this.removeRollClass);
		// this.$el.on("webkitAnimationEnd",this.removeRollClass);
	},
	render: function(){
		return this
	},
	events: {
    	"click #lever": "pullLever",
    	"animationend": "unpullLever",
    	"webkitAnimationEnd": "unpullLever",
    	"roll:start": "triggered",
  	},
	pullLever: function(){
		this.model.set('leverPulled', true);
		console.log(this.model.get('leverPulled'));
		if(!this.model.get("rolling"))
		{
			this.model.set("rolling",true);
		}
	},
	unpullLever: function(){
		this.model.set('leverPulled', false);
	},
	stopAll: function(delay, interval){
		//console.log("stopping");
		this.model.rollers.each(function(roller){
			roller.stopRoll(delay + interval * roller.collection.position);
			//console.log(roller.collection.rollValue);
		});
		this.model.set("rolling",false);
	},
	leverHandler: function(){
		(this.model.get("leverPulled")) ? this.addLeverClass() : this.removeLeverClass();
	},
	addLeverClass: function(){
		$("#ball").addClass("ball-drop");
		$("#shaft").addClass("shaft-shrink");
	},
	removeLeverClass: function(){
		$("#ball").removeClass("ball-drop");
		$("#shaft").removeClass("shaft-shrink");
	},
	addRollingClass: function(){
		this.model.rollers.collection.each(function(roller){
			roller.set("rolling", true);
			roller.trigger("startRoll");
			console.log(roller);
		}, this);
		// this.stopAll(1000 + 1000*Math.random(), 1000)
		// this.on("animationstop", function(){
		// 	console.log("animation end");
		// })
	},
})