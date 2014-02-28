Handlebars.registerHelper('dateutc', function(date) {
	if (date) {
		return moment.utc(date).format('YYYY-MM-DD, HH:mm:ss');
	} else {
		return '';
	}
});

Handlebars.registerHelper('date', function(date) {
	if (date) {
		return moment(date).format('YYYY-MM-DD, HH:mm:ss');
	} else {
		return '';
	}
});