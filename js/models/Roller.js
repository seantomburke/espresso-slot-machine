var app = app || {};

app.Roller = Backbone.Model.extend({
	defaults: {
		rollValue: 0,
		position: 0,
		rolling: false,
	},
	initialize:function(input){
		//console.log("Roller input", input);

		this.sections = input.sections;
		//console.log("Sections", this.sections);

		this.sectionsView = new app.SectionsView({
			collection: this.sections
		});
	},
	events:{
		"change:rolling": "rollingHandler"
	},
	rollingHandler: function(){
		if(this.get("rolling")){
			startRoll();
		}else{
			stopRoll();
		}
	},
	startRoll:function(){
		console.log("triggered rolling started");
		//console.log(this.get("rolling"));
	},
	stopRoll:function(){
		this.set("rolling", false);
	}
})