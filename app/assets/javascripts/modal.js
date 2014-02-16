(function (Modal, $, undefined) {
	
	var openHandlers = {};
	
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
		
		$('#modal').modal('show');
		
		if (openHandlers[template]) {
			openHandlers[template](modalContent);
		}
		
		return false;
	};

}(window.Modal = window.Modal || {}, jQuery));
