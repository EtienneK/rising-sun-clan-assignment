var Clan = function (name, allowed) {
	this.name = name;
	this.allowed = ko.observable(allowed);

	this.canClick = function (clan) {
		if (clan.allowed()) {
			return true;
		}

		var clansClicked = ViewModel.numAllowedClans();

		canClick = clansClicked >= ViewModel.players().length;
		if (!canClick) {
			clan.allowed(true);
		}
		return canClick;
	}
}

var Player = function (name) {
	this.name = ko.observable(name);
}

var Random = function (player, clan) {
	this.player = player;
	this.clan = clan;
}

var ViewModel = {
	clans: ko.observableArray([
		new Clan('Koi', true),
		new Clan('Sun', true),
		new Clan('Lotus', true),
		new Clan('Turtle', true),
		new Clan('Dragonfly', true),
		new Clan('Fox', true),
		new Clan('Bonsai', true),
		new Clan('Moon', true)
	]),

	players: ko.observableArray([
		new Player('Player 1'),
		new Player('Player 2'),
		new Player('Player 3'),
		new Player('Player 4')
	]),

	random: ko.observableArray([]),

	randomize: function () {
		var allowedClans = ViewModel.allowedClans();
		ViewModel.players().forEach(function (player, i) {
			var randomClanIndex = Math.floor(Math.random() * Math.floor(allowedClans.length));
			console.log("random: " + randomClanIndex);
			console.log("length: " + allowedClans.length);
			ViewModel.random.push(new Random(player, allowedClans[randomClanIndex]));
			allowedClans.splice(randomClanIndex, 1);
		});
	},

	clear: function () {
		ViewModel.random([]);
	},

	allowedClans: function () {
		var allowedClans = [];
		ViewModel.clans().forEach(function (v, i) {
			if (v.allowed()) {
				allowedClans.push(v);
			}
		});
		return allowedClans;
	},

	numAllowedClans: function () {
		return ViewModel.allowedClans().length;
	},

	addPlayer: function () {
		if (ViewModel.players().length < 6) {
			ViewModel.players.push(new Player('Player ' + (ViewModel.players().length + 1)));
			if (ViewModel.numAllowedClans() < ViewModel.players().length) {
				var alreadyAdded = false;
				ViewModel.clans().forEach(function (clan) {
					if (!clan.allowed() && !alreadyAdded) {
						clan.allowed(true);
						alreadyAdded = true;
					}
				});
			}
		}
	},

	removePlayer: function () {
		if (ViewModel.players().length > 3) {
			ViewModel.players.pop();
		}
	}
};

ko.applyBindings(ViewModel);
