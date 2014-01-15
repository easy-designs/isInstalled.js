/*! isInstalled (c) Aaron Gustafson (@AaronGustafson). MIT License. http://github.com/easy-designs/isInstalled.js */

/* isInstalled
 * 
 * This script runs a series of tests to determine if the page running it is being
 * run in "standalone" or "installed app" mode and then exposes a single global 
 * variable, `window.isInstalled` with a boolean value indicating the page’s status. 
 * 
 **/
(function( window, document ){
	
	var navigator = window.navigator;
	
	function isInstalled()
	{
		if ( 'standalone' in navigator )
		{
			return navigator.standalone;
		}
		else
		{
			if ( ! 'getComputedStyle' in window )
			{
				return false;
			}

			var standalone = false,
				el = document.createElement('div'),
				styles = document.createElement('style'),
				rule_tpl = '#isInstalledTest:{prefix}full-screen { {property}: {value}; }',
				property = 'color',
				value = 'red',
				prefixes = [
					'-moz-', '-ms-', '-webkit'
				],
				p_len = prefixes.length,
				css = '',
				head = document.head,
				body = document.body,
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
			while ( p_len-- )
			{
				if ( computed( el, ':' + + 'full-screen' ).getPropertyValue( property ) == value )
				{
					standalone = true;
				}
			}
			if ( ! standalone )
			{
				standalone = ( computed( el, ':fullscreen' ).getPropertyValue( property ) == value );
			}
			
			body.removeChild( el );
			
			el = null;
			styles = null;
			head = null;
			body = null;
			
			return standalone;
		}
	}
	
	window.isInstalled = isInstalled();
	
	
}( this, document ));