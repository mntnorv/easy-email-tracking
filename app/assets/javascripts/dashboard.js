$(document).bind('page:change', function() {
	if ($('#dashboard').length == 0) {
		return;
	}
	
	var messageTable = $('#message-table');
	
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
	
	var loadMessage = function(id, callback) {
		$.ajax({
			type: "GET",
			url: Routes.get_message_path(id),
			dataType: 'json'
		}).success(function (data) {
			callback(data.message);
		});
	};
	
	var editMessage = function(message) {
		Modal.open('message', {
			title:   'Edit message',
			message: message
		}, handleEditClose);
	};
	
	Finch.route('/', function() {
		Modal.close();
	});
	
	Finch.route('/new', function() {
		Modal.open('message', {title: 'New message'}, function() {
			table.refresh();
		});
	});
	
	Finch.route('/edit/:id', {
		load: function(params) {
			var message = table.getRowData(params.id);
			
			if (message) {
				editMessage(message);
			} else {
				loadMessage(params.id, function (message) {
					editMessage(message);
				});
			}
		}
	});
	
	Finch.listen();
});