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
		this.on("change", function(){
			//console.log("changing");
		})
	},
	startRoll:function(){
		//console.log("rolling started");
		this.set("rolling", true);
		//console.log(this.get("rolling"));
	},
	stopRoll:function(){
		this.set("rolling", false);
	}
})