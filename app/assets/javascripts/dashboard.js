$(document).bind('page:change', function() {
	if ($('#dashboard').length == 0) {
		return;
	}
	
	var messageTable = $('#message-table');
	
	var editedMessage;
	var table = new Table(messageTable, {
		columns: [
			'subject',
			'message_state_name',
			'updated_at',
			'sent_at'
		],
		routeFunction: Routes.list_messages_path,
		rowLayout: HandlebarsTemplates.message_row,
		dataAttr: 'messages',
		afterUpdate: function(tbody) {
			var links = tbody.find('.link');
			links.unbind("click");
			links.click(function(e) {
				window.document.location = $(this).attr('data-href');
			});
		}
	});
	
	var handleEditClose = function(message) {
		if (message) {
			table.updateRow(message);
		}
	};
	
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
			}, handleEditClose);
		}
	});
	
	Finch.listen();
});