var app = app || {}

app.Machine = Backbone.Model.extend({
	defaults: {
		rollers: {}
	},
	initialize: function(){
		//this.collection = new app.Rollers;
		this.rollers = {};
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
		var filterSections = new app.Sections([
				coffeeFilter, teaFilter, espressoFilter
			]);
		var beansSections = new app.Sections([
				coffeeBeans, teaBeans, espressoBeans
		 	]);
		makerSections.position = 1;
		filterSections.position = 2;
		beansSections.position = 3;

		var makerRoller = new app.Roller({
			id: "roller1",
			value: -1,
			sections: makerSections
		});
		var filterRoller = new app.Roller({
			id: "roller2",
			value: -1,
			sections: filterSections
		});
		var beansRoller = new app.Roller({
			id: "roller3",
			value: -1,
			sections: beansSections
		});

		var rollers = new app.Rollers([
			makerRoller, filterRoller, beansRoller
		]);

		this.rollers = new app.RollersView({collection: rollers});
		

		$("#spinner-view").html(this.rollers.render().el);
		// this.rollers["maker"] = new app.RollerView({id:"roller1", sections: makerSections});
		// $("#spinner-view").append(this.rollers["maker"].render().el);

		// this.rollers["filter"] = new app.RollerView({id:"roller2", sections: filterSections});
		// $("#spinner-view").append(this.rollers["filter"].render().el);

		// this.rollers["beans"] = new app.RollerView({id:"roller3", sections: beansSections});
		// $("#spinner-view").append(this.rollers["beans"].render().el);
	},
	pullLever: function(){
		_.each(this.rollers, function(roller){
			roller.startRoll();
		})
	},
	stopAll: function(timeout){
		_.each(this.rollers, function(roller, i){
			console.log(i, roller);
			roller.stopRoll(timeout * roller.collection.position);
			console.log(roller.collection.rollValue);
		})
	}
});