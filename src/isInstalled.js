/*! isInstalled (c) Aaron Gustafson (@AaronGustafson). MIT License. http://github.com/easy-designs/isInstalled.js */

/* isInstalled
 * 
 * This script runs a series of tests to determine if the page running it is being
 * run in "standalone" or "installed app" mode and then exposes a single global 
 * variable, `window.isInstalled` with a boolean value indicating the page’s status. 
 * 
 **/
(function( window, document ){
	
	var navigator = window.navigator,
		head = document.head,
		body = document.body;
	
	function isInstalled()
	{
		if ( ! 'getComputedStyle' in window )
		{
			return false;
		}
		
		if ( 'standalone' in navigator )
		{
			return navigator.standalone;
		}
		else
		{
			var el = document.createElement('div'),
				styles = document.createElement('style'),
				rule_tpl = '#isInstalledTest:{prefix}full-screen { {property}: {value}; }',
				property = 'color',
				value = 'red',
				prefixes = [
					'-moz-', '-ms-', '-webkit'
				],
				p_len = prefixes.length,
				css = '',
				computed = window.getComputedStyle;
			
			// prep the element
			el.setAttribute( 'id', 'isInstalledTest' );
			el.style.display = 'none';
			
			// prep the test styles for vendor prefixes
			while ( p_len-- )
			{
				css += rule_tpl
							.replace( '{prefix}', prefixes[p_len] )
							.replace( '{property}', property )
							.replace( '{value}', value );
			}
			// Add the standard Rule
			css += rule_tpl
						.replace( '{prefix}', '' )
						.replace( '{property}', property )
						.replace( '{value}', value )
						.replace( 'full-screen', 'fullscreen' );
			styles.innerHTML = css;
			head.appendChild( styles );
			
			body.appendChild( el );
			
			p_len = prefixes.length;
			while ( i-- )
			{
				if ( computed( el, ':' + + 'full-screen' ).getPropertyValue( property ) == value )
				{
					return true;
				}
			}
			return ( computed( el, ':fullscreen' ).getPropertyValue( property ) == value );
		}
	}
	
	window.isInstalled = isInstalled();
	
}( this, document ));