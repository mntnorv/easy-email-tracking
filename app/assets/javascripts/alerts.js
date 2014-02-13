$(document).bind('page:change', function() {
	alerts = $('.alert');
	
	if (alerts.length > 0) {
		window.setTimeout(function() {
			alerts.slideUp(500, function(){
				$(this).remove(); 
			});
		}, 2000);
	}
});