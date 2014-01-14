isInstalled.js
==============

This script runs a series of tests to determine if the page running it is being
run in "standalone" or "installed app" mode and then exposes a single global 
variable, `window.isInstalled` with a boolean value indicating the page’s status.

This makes it inconsequential to do things like this:

	if ( window.isInstalled )
	{
		// observes clicks on links (using jQuery) and 
		// ensures they don’t revert to open in the 
		// default browser
		$body.on( 'click', 'a', function(e){
			e.preventDefault();
			window.location = this.getAttribute( 'href' );
	        return false;
		});
	}

Framework Dependencies
----------------------

None.