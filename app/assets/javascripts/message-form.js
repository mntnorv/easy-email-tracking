Modal.registerOpenHandler('message', function (content) {
	form = content.find('form');
	
	recipientsField = form.find('#message_recipient_list');
	recipientsField.tokenfield();
	
	form.submit(function (e) {
		e.preventDefault();
		
		var postData = $(this).serialize();
		var postUrl  = $(this).attr('action');
		
		$.post(postUrl, postData, function (data) {
			console.log(data);
		}, 'json');
	});
});
