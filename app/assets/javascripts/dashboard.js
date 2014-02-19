$(document).bind('page:change', function() {
	if ($('#dashboard').length == 0) {
		return;
	}
	
	var editedMessage;
	
	Finch.route('/', function() {
		Modal.close();
	});
	
	Finch.route('/new', function() {
		Modal.open('message', {title: 'New message'});
	});
	
	Finch.route('/edit/:id', {
		setup: function(params, childCallback) {
			$.ajax({
				type: "GET",
				url: Routes.get_message_path(params.id),
				dataType: 'json'
			}).done(function (data) {
				editedMessage = data.message;
				childCallback();
			});
		},
		load: function(params) {
			Modal.open('message', {
				title:   'Edit message',
				message: editedMessage
			});
		}
	});
	
	Finch.listen();
});