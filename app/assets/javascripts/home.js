$(document).bind('page:change', function() {
	signInButton = $('#home-sign-in');
	
	if (signInButton.length > 0) {
		signInNavbarButton = $('#sign-in-toggle-button');
		
		signInButton.off();
		signInButton.click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			signInNavbarButton.click();
		});
	}
});