$(document).bind('page:change', function() {
	dropdowns = $('.dropdown');
	dropdowns.off('show.bs.dropdown');
	dropdowns.off('hide.bs.dropdown');
	
	// Slide down animation on dropdown
	dropdowns.on('show.bs.dropdown', function(e) {
		$(this).find('.dropdown-menu').first().stop(true, true).slideDown();
		
		// Focus input if there is one in the dropdown
		input = $(this).find('input[type!="hidden"]:first');
		if (input.length > 0) {
			setTimeout(function() {
				input.focus();
			}, 100);
		}
	});

	// Slide up animation on dropdown
	dropdowns.on('hide.bs.dropdown', function(e) {
		$(this).find('.dropdown-menu').first().stop(true, true).slideUp();
	});
});