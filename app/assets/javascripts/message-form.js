Modal.registerOpenHandler('message', function (content) {
	form = content.find('form');
	
	recipientsField = form.find('#message_recipient_list');

	recipientsField.tokenfield().on('afterCreateToken', function(e) {
		var re = /\S+@\S+\.\S+/;
		var segments = e.token.value.split(/\s*[<>]/);
		
		var email = '';
		if (segments.length > 1) {
			email = segments[1];
		} else {
			email = segments[0];
		}
		
		var valid = re.test(email);
		
		console.log('f', valid);
		
		if (segments.length > 3) {
			valid = false;
			console.log('if 1', valid);
		} else if (segments.length == 3) {
			valid = valid && /^\s*$/.test(segments[2]);
			console.log('if 2', valid);
		}
		
		console.log('fin', valid);
		
		if (!valid) {
			$(e.relatedTarget).addClass('invalid');
		}
	});
	
	form.submit(function (e) {
		e.preventDefault();
		
		var postData = $(this).serialize();
		var postUrl  = $(this).attr('action');
		
		$.post(postUrl, postData, function (data) {
			console.log(data);
		}, 'json');
	});
});
