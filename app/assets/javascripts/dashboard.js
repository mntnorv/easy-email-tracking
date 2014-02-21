$(document).bind('page:change', function() {
	if ($('#dashboard').length == 0) {
		return;
	}
	
	var editedMessage;
	var table = new Table($('#message-table'), [
		'subject',
		'state',
		'modified-at',
		'sent-at'
	]);
	
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
				editedMessage.id = params.id;
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
	
	table.updateRow(23, {
		subject: 'Naujas subject',
		state:   'Sent'
	});
});