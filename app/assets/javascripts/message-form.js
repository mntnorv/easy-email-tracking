Modal.registerOpenHandler('message', function (content) {
	form = content.find('form');
	
	recipientsField = form.find('#message_recipient_list');
	recipientsField.tokenfield();
	
	form.submit(function (e) {
		e.preventDefault();
		console.log('It works!');
	});
});
