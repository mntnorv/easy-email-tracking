$(document).bind('page:change', function() {
	if ($('#dashboard').length == 0) {
		return;
	}
	
	Finch.route('/', function() {
		Modal.close();
	});
	
	Finch.route('/new', function() {
		Modal.open('message', {title: 'New message'});
	});
	
	Finch.listen();
});