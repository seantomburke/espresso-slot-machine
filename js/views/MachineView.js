"use strict";
var app = app || {};

app.MachineView = Backbone.View.extend({
	tagName:"div",
	className:"machine",
	initialize:function(){
		this.rollers = [];
		this.stoppers = [];
		this.render();
		this.model.on('change:leverPulled', this.leverHandler, this);
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
		this.rollers.push(new app.RollerView({
			model: makerRoller
		}));
		this.rollers[0].on("change:rolling", function(){
			//console.log("maker rolling");
		})

		this.rollers.push(new app.RollerView({
			model: filterRoller
		}));

		this.rollers.push(new app.RollerView({
			model: beansRoller
		}));

		var rollerCollection = new app.Rollers([
			makerRoller, filterRoller, beansRoller
		]);

		this.rollersView = new app.RollersView({collection: rollerCollection});
		$("#spinner-view").html(this.rollersView.render().el);

		this.winner = new app.Winner();
		this.winnerView = new app.WinnerView({
			model: this.winner
		});

		$("#winner").html(this.winnerView.render().el);

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
    	"webkitAnimationEnd": "unpullLever"
  	},
	pullLever: function(e, cheatIndex){
		this.winnerView.model.set("value", undefined);
		this.model.set('cheatIndex', cheatIndex);
		for(var i in this.rollers){
			this.rollers[i].model.set("rollValue", -1);
			this.rollers[i].model.set("rollBeverage", undefined);
		}
		this.model.set('leverPulled', true);
	},
	cheatPull: function(cheatIndex){
		this.pullLever(null, cheatIndex);
	},
	unpullLever: function(){
		this.model.set('leverPulled', false);
	},
	stopAll: function(delay, interval){
		//console.log("stopping");
		this.rollers.collection.each(function(roller){
			roller.stopRoll(delay + interval * roller.collection.position);
		});
		this.model.set("rolling",false);
	},
	leverHandler: function(){
		if(this.model.get("leverPulled")){
			this.addLeverClass();
			this.rollingHandler();
		}
		else {
			this.removeLeverClass();
		}
	},
	addLeverClass: function(){
		$("#ball").addClass("ball-drop");
		$("#shaft").addClass("shaft-shrink");
	},
	removeLeverClass: function(){
		$("#ball").removeClass("ball-drop");
		$("#shaft").removeClass("shaft-shrink");
	},
	rollingHandler: function(){
		//console.log(this.model.get("rolling"));
		if(!this.model.get("rolling"))
		{
			this.model.set("rolling",true);
			for(var i=0; i<this.stoppers.length;i++)
			{
				clearTimeout(this.stoppers[i]);
			}
			this.addRollingClass();
			this.stopRollers(_.random(1000, 2000), _.random(500,1000), this);
			this.model.set("rolling", false);
		}
	},
	addRollingClass: function(){
		$(".roller").addClass("roll");
	},
	stopRollers: function(delay, interval, _this){
		$(".roller").each(function(i,el){
			var stop = function(){
				var top = $(el).position().top;
				var cheatIndex = _this.model.get("cheatIndex");
				var index = (typeof cheatIndex === 'undefined') ? Math.round(top/210): -cheatIndex;
				var new_top = index*210;
				_this.rollers[i].model.set("rollValue", Math.abs(index) % 3);
				_this.rollers[i].model.set("rollBeverage", app.Beverages[Math.abs(index) % 3]);
				_this.getWinner();
				$(el).css("top", top);
				$(el).removeClass("roll");
				$(el).animate({
					top: new_top
				}, 250);
			};
			_this.stoppers[i] = setTimeout(stop, delay + interval * i);
		});
	},
	getWinner: function(){
		var rollValues = _.map(this.rollers, function(roller){ return roller.model.get("rollBeverage")});
		//console.log(rollValues);

		var winner = _.reduce(rollValues, function(val1, val2){ return (val1==val2) ? val1:false; });
		if(winner)
		{
			//console.log(winner);
			this.winnerView.model.set("value", winner);
		}
	}
})