(function (Modal, $, undefined) {
	
	var submitHandlers = {};
	
	var registerSubmitHandlers = function (forms) {
		forms.each(function() {
			var formId = $(this).attr('id');
			if (formId && submitHandlers[formId]) {
				$(this).submit(submitHandlers[formId]);
			}
		});
	};
	
	Modal.registerSubmitHandler = function (formId, handler) {
		if (typeof formId !== 'string' && typeof handler !== 'function') {
			console.error('Invalid parameters in Modal.registerSubmitHandler()');
			return;
		}
		
		submitHandlers[formId] = handler;
	};
	
	Modal.show = function (template, context) {
		modalContent = $('#modal-content');
		modalContent.html(HandlebarsTemplates[template](context));
		
		forms = modalContent.find('form');
		registerSubmitHandlers(forms);
		
		$('#modal').modal('show');
		return false;
	};

}(window.Modal = window.Modal || {}, jQuery));
