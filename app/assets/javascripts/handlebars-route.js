Handlebars.registerHelper('route', function(route) {
	return Routes[route].apply(this, [].slice.call(arguments, 1));
}); 