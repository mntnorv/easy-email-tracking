Handlebars.registerHelper('route', function(route) {
	console.log(route);
	return Routes[route].apply(this, [].slice.call(arguments, 1));
}); 