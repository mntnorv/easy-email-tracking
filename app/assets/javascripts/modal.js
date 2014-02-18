(function (Modal, $, undefined) {
	
	var openHandlers = {};
	
	var csrfName = '';
	var csrfValue = '';
	var modal;
	
	$(document).bind('ready page:change', function() {
		csrfName  = $("meta[name='csrf-param']").attr('content');
		csrfValue = $("meta[name='csrf-token']").attr('content');
		modal     = $('#modal');
	});
	
	var addCsrfTokens = function (form) {
		form.prepend(
			'<div style="margin:0;padding:0;display:inline">'
				+ '<input name="utf8" type="hidden" value="&#x2713;" />'
				+ '<input name="' + csrfName + '" type="hidden" value="' + csrfValue + '" />'
			+'</div>'
		);
	};
	
	Modal.registerOpenHandler = function (template, handler) {
		if (typeof template !== 'string' && typeof handler !== 'function') {
			console.error('Invalid parameters in Modal.registerSubmitHandler()');
			return;
		}
		
		openHandlers[template] = handler;
	};
	
	Modal.show = function (template, context) {
		modalContent = $('#modal-content');
		modalContent.html(HandlebarsTemplates[template](context));
		
		if (openHandlers[template]) {
			openHandlers[template](modalContent, modal);
		}
		
		modalContent.find('form').each(function () {
			addCsrfTokens($(this));
		});
		
		modal.modal('show');
		
		return false;
	};
	
	Modal.close = function() {
		modal.modal('hide');
	};

}(window.Modal = window.Modal || {}, jQuery));
