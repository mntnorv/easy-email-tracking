Modal.registerOpenHandler('message', function (content, modal) {
	form = content.find('form');
	recipientsField = form.find('#recipients');
	
	var validateEmailToken = function (e) {
		var re = /\S+@\S+\.\S+/;
		var segments = e.token.value.split(/\s*[<>]/);
		
		var email = '';
		if (segments.length > 1) {
			email = segments[1];
		} else {
			email = segments[0];
		}
		
		var valid = re.test(email);
		
		if (segments.length > 3) {
			valid = false;
		} else if (segments.length == 3) {
			valid = valid && /^\s*$/.test(segments[2]);
		}
		
		if (!valid) {
			$(e.relatedTarget).addClass('invalid');
		}
	};
	
	var removeTooltips = function() {
		modal.find('.tooltip').remove();
	};
	
	var handleSuccess = function(e) {
		removeTooltips();
		Modal.close();
	};
	
	var handleError = function(e) {
		removeTooltips();
		var response = e.responseJSON;
		if (response['model_errors']) {
			var modelErrors = response['model_errors'];
			for (var fieldId in modelErrors) {
				if (modelErrors.hasOwnProperty(fieldId)) {
					var field = form.find('#' + fieldId);
					field.tooltip({
						placement: 'left',
						title:     ValidationErrors.get(modelErrors[fieldId][0]),
						trigger:   'manual',
						container: '#modal'
					});
					field.tooltip('show');
				}
			}
		}
	};
	
	var submitMessageForm = function (e) {
		e.preventDefault();
		
		var postData = $(this).serialize();
		var postUrl  = $(this).attr('action');
		
		$.ajax({
			type: "POST",
			url: postUrl,
			data: postData,
			dataType: 'json'
		}).done(handleSuccess).fail(handleError);
	};

	var recipientsFieldId = recipientsField.attr('id');
	recipientsField.removeAttr('id');
	recipientsField.tokenfield().on('afterCreateToken', validateEmailToken);
	
	form.find('.tokenfield').attr('id', recipientsFieldId);
	
	form.submit(submitMessageForm);
});
