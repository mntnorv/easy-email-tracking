$(document).bind('ready page:change', function() {
	tooltips = $('[data-toggle="tooltip"]');
	tooltips.tooltip('show');
});

function Modal(){};
Modal.show = function (template, context) {
	$('#modal-content').html(HandlebarsTemplates[template](context));
	$('#modal').modal('show');
	return false;
};
