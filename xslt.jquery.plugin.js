/**
 *
 * xslt.jquery.plugin.js  - jQuery plugin for loading and applying XSL to client-side XML document objects
 *
 */

(function( $ ) {
 
 	$.fn.loadFiles = function (files, callback) {

		var _self = this,
			_promises = [],
			_response = {},
			
			//	Returns response type for a given URL:
			_getResponseType = function (URL, xhr) {
				
				var ext = URL.split('.').pop();
				
				switch(ext.toLowerCase()) {
					case 'xml':
					case 'xsl':
						return xhr.responseXML;
					default:
						return xhr.responseText;
						
				}
				
			},
			
			// Uses Ajax request to load a file cross-browser:
			_loadFile = function (URL, success, error) {
				
				try {
					
					// IE Support:
					var xhr = new ActiveXObject("Msxml2.XMLHTTP");
						xhr.open("GET", URL , true);
						xhr.onreadystatechange = function () {
						
							if (xhr.readyState === 4) {
								
								xhr.status === 200
									? success(_getResponseType(URL, xhr))
									: error(xhr.status);
							
							}
						
						}
						
				} catch (e) {
					
					//	Chrome, Safari, and Mozilla Support:
					var xhr = new XMLHttpRequest();
						xhr.open("GET", URL , true);
						xhr.onload = function () {
						
							xhr.readyState === 4 && xhr.status === 200
								? success(_getResponseType(URL, xhr))
								: error(xhr.status);
						}
						
				}
				
				xhr.send(null);
			
			},
			
			// Binds a promise to a _loadFile method:
			_createPromise = function (identifier, URL) {
			
				var promise = (function () {
					
					var isLoaded = $.Deferred();
						
						_loadFile(URL, function (res) {
							
							_response[identifier] = res;
							isLoaded.resolve();
						
						}, function (errorCode) {
							
							console.log(errorCode);
							
							isLoaded.reject();
						
						});
						
					return isLoaded.promise();
					
				})();
				
				_promises.push(promise);
							
			};
		
		// Creates a promise for each file:
		for (var fileName in files) {
		  
			_createPromise(fileName, files[fileName]);
		
		}
		
		//	Asynchronously load files:
		$.when.apply($, _promises).done(function () {
		
			callback.call(_self, _response);
		
		});
	
	}
	
	//	Applies XSL document object to an XML document object, then runs callback on result:
    $.fn.xslt = function(xml, xsl, callback) {
		
		var self = this,
			d = document;
		
		try {
			
			callback.call(self, xml.transformNode(xsl), xml, xsl);
			
		} catch (e) {
			
			if (d.implementation && d.implementation.createDocument) {
		 
				var xsltProcessor = new XSLTProcessor();
					xsltProcessor.importStylesheet(xsl);
				
				callback.call(self, xsltProcessor.transformToFragment(xml, d), xml, xsl);
			
			}
			
		}
			
 
    };
	
 
}( jQuery ));