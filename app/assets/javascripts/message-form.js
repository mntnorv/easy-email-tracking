Modal.registerOpenHandler('message', function (content, modal) {
	var form            = content.find('form');
	var recipientsField = form.find('#recipients');
	var sendButton      = form.find('#send-button');
	var saveButton      = form.find('#save-button');
	
	var sendButtonLadda = Ladda.create(sendButton[0]);
	var saveButtonLadda = Ladda.create(saveButton[0]);
	
	var actionElement   = $('<input type="hidden" name="submit" />');
	var tooltipElements = $();
	
	sendButton.click(function(e) {
		e.preventDefault();
		
		actionElement.attr('value', 'send');
		form.append(actionElement);
		
		sendButtonLadda.start();
		saveButton.attr('disabled', 'true');
		
		form.submit();
	});
	
	saveButton.click(function(e) {
		e.preventDefault();
		
		saveButtonLadda.start();
		sendButton.attr('disabled', 'true');
		
		form.submit();
	});
	
	var resetButtons = function() {
		sendButton.removeAttr('disabled');
		saveButton.removeAttr('disabled');
		sendButtonLadda.stop();
		saveButtonLadda.stop();
	};
	
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
		tooltipElements.each(function () {
			$(this).tooltip('destroy');
		});
		tooltipElements = $();
	};
	
	modal.on('hide.bs.modal', removeTooltips);
	
	var handleSuccess = function(response) {
		removeTooltips();
		Modal.close(response.message);
	};
	
	var handleError = function(e) {
		removeTooltips();
		var response = e.responseJSON;
		if (response['model_errors']) {
			var modelErrors = response['model_errors'];
			for (var fieldId in modelErrors) {
				if (modelErrors.hasOwnProperty(fieldId)) {
					var field = form.find('#' + fieldId);
					var message = ValidationErrors.get(modelErrors[fieldId][0]);

					field.tooltip({
						placement: 'left',
						title:     message,
						trigger:   'manual',
						container: '#modal'
					});
					field.tooltip('show');
					
					tooltipElements = tooltipElements.add(field);
				}
			}
		}
	};
	
	var submitMessageForm = function (e) {
		e.preventDefault();
		
		var data = $(this).serialize();
		var url  = $(this).attr('action');
		var type = $(this).attr('method');
		
		$.ajax({
			type:     type,
			url:      url,
			data:     data,
			dataType: 'json'
		}).done(handleSuccess).fail(handleError).always(function() {
			resetButtons();
		});
		
		actionElement.remove();
	};

	var recipientsFieldId = recipientsField.attr('id');
	recipientsField.removeAttr('id');
	recipientsField.tokenfield().on('afterCreateToken', validateEmailToken);
	
	form.find('.tokenfield').attr('id', recipientsFieldId);
	
	form.submit(submitMessageForm);
});
