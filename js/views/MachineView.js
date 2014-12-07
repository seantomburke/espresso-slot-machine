"use strict";
var app = app || {},
    underscore = _,
    $ = $;

app.MachineView = Backbone.View.extend({
	tagName: "div",
	className: "machine",
	initialize: function () {
		this.rollers = [];
		this.stoppers = [];
		this.render();
		this.model.on('change:leverPulled', this.leverHandler, this);
	},
	render: function () {
		var coffeeMaker = new app.Section({
			value: "coffee",
			image: app.img.coffee.maker,
			position: 1
        }),
            teaMaker = new app.Section({
                value: "tea",
                image: app.img.tea.maker,
                position: 2
            }),
            espressoMaker = new app.Section({
                value: "espresso",
                image: app.img.espresso.maker,
                position: 3
            }),
            coffeeFilter = new app.Section({
                value: "coffee",
                image: app.img.coffee.filter,
                position: 1
            }),
            teaFilter = new app.Section({
                value: "tea",
                image: app.img.tea.filter,
                position: 2
            }),
            espressoFilter = new app.Section({
                value: "espresso",
                image: app.img.espresso.filter,
                position: 3
            }),
            coffeeBeans = new app.Section({
                value: "coffee",
                image: app.img.coffee.beans,
                position: 1
            }),
            teaBeans = new app.Section({
                value: "tea",
                image: app.img.tea.beans,
                position: 2
            }),
            espressoBeans = new app.Section({
                value: "espresso",
                image: app.img.espresso.beans,
                position: 3
            }),
            makerSections = new app.Sections([
                coffeeMaker, teaMaker, espressoMaker
            ]),
            filterSections = new app.Sections([
                coffeeFilter, teaFilter, espressoFilter
            ]),
            beansSections = new app.Sections([
                coffeeBeans, teaBeans, espressoBeans
            ]),
            makerRoller = new app.Roller({
                id: "roller1",
                position: 1,
                sections: makerSections
            }),
            filterRoller = new app.Roller({
                id: "roller2",
                position: 2,
                sections: filterSections
            }),
            beansRoller = new app.Roller({
                id: "roller3",
                position: 3,
                sections: beansSections
            }),
            rollerCollection = new app.Rollers([
                makerRoller, filterRoller, beansRoller
            ]);


		this.rollers = [];
		this.rollers.push(new app.RollerView({
			model: makerRoller
		}));

		this.rollers.push(new app.RollerView({
			model: filterRoller
		}));

		this.rollers.push(new app.RollerView({
			model: beansRoller
		}));
		this.rollersView = new app.RollersView({collection: rollerCollection});
		$("#spinner-view").html(this.rollersView.render().el);

		this.winner = new app.Winner();
		this.winnerView = new app.WinnerView({
			model: this.winner
		});

		$("#winner").html(this.winnerView.render().el);

		return this;
	},
	events: {
        "click #lever": "pullLever",
        "animationend": "unpullLever",
        "webkitAnimationEnd": "unpullLever"
    },
	pullLever: function (e, cheatIndex) {
        var i;
		this.winnerView.model.set("value", undefined);
		this.model.set('cheatIndex', cheatIndex);
		for (i in this.rollers) {
            if (this.rollers.hasOwnProperty(i)) {
                this.rollers[i].model.set("rollValue", -1);
                this.rollers[i].model.set("rollBeverage", undefined);
            }
		}
		this.model.set('leverPulled', true);
	},
	cheatPull: function (cheatIndex) {
		this.pullLever(null, cheatIndex);
	},
	unpullLever: function () {
		this.model.set('leverPulled', false);
	},
	stopAll: function (delay, interval) {
		this.rollers.collection.each(function (roller) {
			roller.stopRoll(delay + interval * roller.collection.position);
		});
		this.model.set("rolling", false);
	},
	leverHandler: function () {
		if (this.model.get("leverPulled")) {
			this.addLeverClass();
			this.rollingHandler();
		} else {
			this.removeLeverClass();
		}
	},
	addLeverClass: function () {
		$("#ball").addClass("ball-drop");
		$("#shaft").addClass("shaft-shrink");
	},
	removeLeverClass: function () {
		$("#ball").removeClass("ball-drop");
		$("#shaft").removeClass("shaft-shrink");
	},
	rollingHandler: function () {
        var i;
		if (!this.model.get("rolling")) {
			this.model.set("rolling", true);
			for (i = 0; i < this.stoppers.length; i++) {
				clearTimeout(this.stoppers[i]);
			}
			this.addRollingClass();
			this.stopRollers(underscore.random(1000, 2000), underscore.random(500, 1000), this);
			this.model.set("rolling", false);
		}
	},
	addRollingClass: function () {
		$(".roller").addClass("roll");
	},
	stopRollers: function (delay, interval, myself) {
		$(".roller").each(function (i, el) {
			var stop = function () {
				var top = $(el).position().top, cheatIndex = myself.model.get("cheatIndex"), index = (typeof cheatIndex === 'undefined') ? Math.round(top / 210) : -cheatIndex, new_top = index * 210;
				myself.rollers[i].model.set("rollValue", Math.abs(index) % 3);
				myself.rollers[i].model.set("rollBeverage", app.Beverages[Math.abs(index) % 3]);
				myself.getWinner();
				$(el).css("top", top);
				$(el).removeClass("roll");
				$(el).animate({
					top: new_top
				}, 250);
			};
			myself.stoppers[i] = setTimeout(stop, delay + interval * i);
		});
	},
	getWinner: function () {
		var rollValues = underscore.map(this.rollers, function (roller) {
                return roller.model.get("rollBeverage");
            }),
            winner = underscore.reduce(rollValues, function (val1, val2) {
                return (val1 === val2) ? val1 : false;
            });
		if (winner) {
            this.winnerView.model.set("value", winner);
        }
	}
});