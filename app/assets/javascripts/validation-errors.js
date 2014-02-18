(function (ValidationErrors, undefined) {
	
	var errorMap = {
		'is invalid':      'Invalid',
		'can\'t be blank': 'Can\'t be blank'
	};
	
	ValidationErrors.get = function (error) {
		return errorMap[error];
	};

}(window.ValidationErrors = window.ValidationErrors || {}));