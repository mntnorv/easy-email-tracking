Modal.registerOpenHandler('message', function (content) {
	form = content.find('form');
	
	form.submit(function (e) {
		e.preventDefault();
		console.log('It works!');
	});
});
