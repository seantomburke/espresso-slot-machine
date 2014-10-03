var app = app || {};

app.MachineView = Backbone.View.extend({
	tagName:"div",
	className:"machine",
	initialize:function(){
		this.render();
		this.model.on('change:leverPulled', this.leverHandler, this);
		this.model.on('change:rolling', this.addRollingClass, this);
		//$("#lever").on("animationend", this.removeRollClass);
		//$("#lever").on("webkitAnimationEnd",this.removeRollClass);
		// this.$el.on("animationend", this.removeRollClass);
		// this.$el.on("webkitAnimationEnd",this.removeRollClass);
	},
	render: function(){

		//makers
		var coffeeMaker = new app.Section({
			value:"coffee",
			image: app.img.coffee.maker,
			position: 1
		});

		var teaMaker = new app.Section({
			value:"tea",
			image: app.img.tea.maker,
			position: 2
		});

		var espressoMaker = new app.Section({
			value:"espresso",
			image: app.img.espresso.maker,
			position: 3
		})

		//filters
		var coffeeFilter = new app.Section({
			value:"coffee",
			image: app.img.coffee.filter,
			position: 1
		});

		var teaFilter = new app.Section({
			value:"tea",
			image: app.img.tea.filter,
			position: 2
		});

		var espressoFilter = new app.Section({
			value:"espresso",
			image: app.img.espresso.filter,
			position: 3
		})

		//beans
		var coffeeBeans = new app.Section({
			value:"coffee",
			image: app.img.coffee.beans,
			position: 1
		});

		var teaBeans= new app.Section({
			value:"tea",
			image: app.img.tea.beans,
			position: 2
		});

		var espressoBeans = new app.Section({
			value:"espresso",
			image: app.img.espresso.beans,
			position: 3
		});

		var makerSections = new app.Sections([
				coffeeMaker, teaMaker, espressoMaker
			]);
		//console.log("makerSections", makerSections);

		var filterSections = new app.Sections([
				coffeeFilter, teaFilter, espressoFilter
			]);
		var beansSections = new app.Sections([
				coffeeBeans, teaBeans, espressoBeans
		 	]);

		var makerRoller = new app.Roller({
			id: "roller1",
			position: 1,
			sections: makerSections
		});
		//console.log("makerRoller", makerRoller);
		var filterRoller = new app.Roller({
			id: "roller2",
			position: 2,
			sections: filterSections
		});
		var beansRoller = new app.Roller({
			id: "roller3",
			position: 3,
			sections: beansSections
		});

		this.rollers = [];
		this.rollers["maker"] = new app.RollerView({
			model: makerRoller
		});

		this.rollers["filter"] = new app.RollerView({
			model: filterRoller
		});

		this.rollers["beans"] = new app.RollerView({
			model: beansRoller
		});

		var rollerCollection = new app.Rollers([
			makerRoller, filterRoller, beansRoller
			]);

		this.rollers = new app.RollersView({collection: rollerCollection});
		$("#spinner-view").html(this.rollers.render().el);

		// $("#spinner-view").html(' ');
		// this.rollers["maker"] = new app.SectionsView({id:"roller1", collection: makerSections});
		// $("#spinner-view").append(this.rollers["maker"].render().el);

		// this.rollers["filter"] = new app.SectionsView({id:"roller2", collection: filterSections});
		// $("#spinner-view").append(this.rollers["filter"].render().el);

		// this.rollers["beans"] = new app.SectionsView({id:"roller3", collection: beansSections});
		// $("#spinner-view").append(this.rollers["beans"].render().el);
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
		this.rollers.collection.each(function(roller){
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