$(document).bind('page:change', function() {
	// =========================================================================
	// Dropdowns
	// =========================================================================
	
	dropdowns = $('.dropdown');
	dropdowns.off('show.bs.dropdown');
	dropdowns.off('hide.bs.dropdown');
	
	// Slide down animation on dropdown
	dropdowns.on('show.bs.dropdown', function(e) {
		$(this).find('.dropdown-menu').first().stop(true, true).slideDown();
	});

	// Slide up animation on dropdown
	dropdowns.on('hide.bs.dropdown', function(e) {
		$(this).find('.dropdown-menu').first().stop(true, true).slideUp();
	});
	
	// =========================================================================
	// Alerts (flash messages)
	// =========================================================================
	
	alerts = $('.alert');
	
	if (alerts.length > 0) {
		window.setTimeout(function() {
			alerts.slideUp(500, function(){
				$(this).remove(); 
			});
		}, 2000);
	}
});