angular.module('myModule', ['ui.bootstrap']);


function SimpleController($scope) {
	$scope.data = rawdata;  
	$scope.continents = makeGroups(rawdata)   
	console.log($scope.continents)
}

function sort(member) {
	var sorted = {},
	key, keys = [];
	for (key in member) {
	  keys.push(key);
	}
	keys.sort();
	for (var i = 0; i < keys.length; i++) {
		sorted[keys[i]] = member[keys[i]];
	}
	return sorted;	
}

function makeGroups(data) {
	groups = {};
	conferences = {};
	conferences['Conference'] = {}; //dummy continent
	rawdata = data;
	for (var i in data) {
		var continent = data[i].continent;
		if(!continent) continue;
		var country = data[i].country;
		var state = data[i].state;
		var item = {'town': data[i].town, 'link': data[i].link}; 
		if(!state) state = 'no-state';

		if(continent != 'Conference') {
			if(!groups[continent]) 
				groups[continent] = {};
			if(!groups[continent][country]) 
				groups[continent][country] = [];
			if(!groups[continent][country][state]) 
				groups[continent][country][state] = [];
			groups[continent][country][state].push(item);
			groups = sort(groups)
			groups[continent] = sort(groups[continent]);
			groups[continent][country] = sort(groups[continent][country]);
		} else {
			if(!conferences[continent][country]) 
				conferences[continent][country] = [];
			if(!conferences[continent][country][state]) 
				conferences[continent][country][state] = [];
			conferences[continent][country][state].push(item);
		}
	}
	return groups
}
