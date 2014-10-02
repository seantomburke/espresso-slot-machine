var app = app || {};

app.MachineView = Backbone.View.extend({
	tagName:"div",
	className:"machine",
	initialize:function(){
		$("#lever").on("animationend", this.removeRollClass);
		$("#lever").on("webkitAnimationEnd",this.removeRollClass);
	},
	render: function(){

	},
	events: {
    	"click #lever": "pullLever"
  	},
	pullLever: function(){
		//console.log("starting");
		console.log("trigger:roll:start");
		this.addRollClass();
		this.trigger("roll:start");
		if(!this.rolling)
		{
			//console.log(this.rollers);
			this.rolling = true;
			// this.rollers.each(function(roller){
			// 	roller.startRoll();
			// }, this);

			//console.log(new Date());
			// setTimeout(function(){
			// 	$("#ball").removeClass("ball-drop");
			// 	$("#shaft").removeClass("shaft-shrink");
			// }, 1000);
			// this.stopAll(1000 + 1000*Math.random(), 1000)
			// this.on("animationstop", function(){
			// 	console.log("animation end");
			// })
		}
	},
	stopAll: function(delay, interval){
		//console.log("stopping");
		this.rollers.each(function(roller, i){
			roller.stopRoll(delay + interval * roller.collection.position);
			//console.log(roller.collection.rollValue);
		});
		this.rolling = false;
	},
	addRollClass: function(){
		$("#ball").addClass("ball-drop");
		$("#shaft").addClass("shaft-shrink");
	},
	removeRollClass: function(){
		$("#ball").removeClass("ball-drop");
		$("#shaft").removeClass("shaft-shrink");
	}
})