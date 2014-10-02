var app = app || {}

app.Machine = Backbone.Model.extend({
	defaults: {
		rolling: false
	},
	initialize: function(){

		this.on("roller:stopped", this.setStopped);

		//this.collection = new app.Rollers;
		this.rolling = false;
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
		//console.log("makerSections", makerSections);

		var filterSections = new app.Sections([
				coffeeFilter, teaFilter, espressoFilter
			]);
		var beansSections = new app.Sections([
				coffeeBeans, teaBeans, espressoBeans
		 	]);

		var makerRoller = new app.Roller({
			id: "roller1",
			sections: makerSections
		});
		//console.log("makerRoller", makerRoller);
		var filterRoller = new app.Roller({
			id: "roller2",
			sections: filterSections
		});
		var beansRoller = new app.Roller({
			id: "roller3",
			sections: beansSections
		});

		this.rollers = new app.Rollers([
			makerRoller, filterRoller, beansRoller
			]);

		this.rollersView = new app.RollersView({collection: this.rollers});
		$("#spinner-view").html(this.rollersView.render().el);

		makerRoller.set("position",1);
		filterRoller.set("position",2);
		beansRoller.set("position",3);

		machineView = new app.MachineView({ el: $("#machine")});

		

		// $("#spinner-view").html(' ');
		// this.rollers["maker"] = new app.SectionsView({id:"roller1", collection: makerSections});
		// $("#spinner-view").append(this.rollers["maker"].render().el);

		// this.rollers["filter"] = new app.SectionsView({id:"roller2", collection: filterSections});
		// $("#spinner-view").append(this.rollers["filter"].render().el);

		// this.rollers["beans"] = new app.SectionsView({id:"roller3", collection: beansSections});
		// $("#spinner-view").append(this.rollers["beans"].render().el);
	}
});