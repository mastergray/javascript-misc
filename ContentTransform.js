/**
 *
 *  ContentTransform.js - Transforms a DOM element into an image data-url
 *
 */

ContentTransform = {
	
	
	CSSDefaults:{}, //	Stores default values for css properties:
	
	HTMLtoDOM: function (html) {
		
		var parser = new DOMParser();
		return parser.parseFromString(html, "text/html");
		
	},
	
	DOMtoHTML: function (DOM) {
		
		var parser = new XMLSerializer();
		return parser.serializeToString(DOM);
		
	},
	
	//	Appends canvas to elem for rendering images from:
	createCanvas: function (width, height, elem) {
		
		var elem = elem || document.getElementsByTagName('body')[0],
			  canvas = document.createElement('canvas');
			
		canvas.style.display = 'none';
		canvas.width = width;
		canvas.height = height;
		
		elem.appendChild(canvas);
		
		return canvas;
		
	},
	
	//	Returns object of CSS properties for a given element:
	getCSSFromElem: function (elem) {
		
		var win = document.defaultView || window, style, styleNode = {};
		
			if (win.getComputedStyle) { /* Modern browsers */
				
				style = win.getComputedStyle(elem, '');
				
				for (var i=0; i<style.length; i++) {
					
					// Check against defaults before storing:
					if (this.CSSDefaults[style[i]] != style.getPropertyValue(style[i])) {
						
						styleNode[style[i]]  = style.getPropertyValue(style[i]) ;
						
					}
				
				}
				
			} else if (elem.currentStyle) { /* IE */
				
				style = elem.currentStyle;
				
				for (var name in style) {
					styleNode[name] = style[name];
				}
				
			} else { /* Ancient browser..*/
				
				style = elem.style;
				
				for (var i=0; i<style.length; i++) {
					styleNode[style[i]] = style[style[i]];
				}
			}
		
    	return styleNode;
		
	},
	
	// Returns PNG image data URL for an HTML string:
	HTMLToDataURL: function (config, callback) {
		
		var elem = config.elem, 								            //	Where to attach temp canvas (BODY by default)
			width = config.width || 100,						          //  Image width (100px by default)
			height = config.height || 100,						        //  Image height (100px by default)
			canvas = this.createCanvas(width, height, elem),  //  Reference to canvas element
			ctx = canvas.getContext('2d'),						        //  Reference to canvas context
			img = new Image(),									              //  Image that SVG is written to
			reader = new FileReader();							          //  Reads data stored in blob
			
			//	HTML data to draw:
			data = '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '" >'
				   + '<foreignObject width="100%" height="100%"><content xmlns="http://www.w3.org/1999/xhtml">'
				   + config.data + '</content></foreignObject></svg>',
				   
			//	Stores SVG image data:
			svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
		
		//	Sets source of image to be loaded after SVG data has been converted into a data URL:
		reader.addEventListener("loadend", function() {
		   
		   img.src = reader.result;
		   
		});
		
		//	Converts SVG blob data into a data URL:
		reader.readAsDataURL(svg);
				
		// Writes SVG image to canvas and returns DataURL for PNG image:
		img.onload = function () {
		
			// Sets image size:
			img.height = height;
			img.width = width;
			
			// Draws Image to canvas:
			ctx.drawImage(img, 0, 0);
			 
			//	Runs callback using data URL:
			callback(canvas.toDataURL('image/png', 1.0));
			 
		}
		
	},
	
	//	Transform the source of an image to a data-url, then run a callback on that data-url:
	imgtoDataURL: function (src, type, callback) {
		
		var self = this,
			  type = type || "image/png",
			  img = new Image();
			  
		img.src = src;
		
			img.onload = function () {
			
				//	Creates canvas sames size as image:
				var canvas = self.createCanvas(img.width, img.height);
				
				// Draws Image to canvas:
				canvas.getContext('2d').drawImage(img, 0, 0);
				
				try {
				
					//	Runs callback using data URL:
					callback(canvas.toDataURL("image/png", 1.0));
					
				} catch (e) {
				
					console.log(src + ' could not be be transformed');
				
				}
			
			}
		
	},
	
	
	
	//	Recurisvely converts all src attributes for an array of image nodes to data URLs, then runs a callback
	imagesToDataURLs: function (images, callback) {
		
		var self = this;
		
			if (images.length > 0) {
			
				var image = images.shift();
				
				self.imgtoDataURL(image.getAttribute('src'), function (dataURL) {
						
					// Overwrites attributes with dataURL:
					image.setAttribute('src', dataURL);
						
					self.imagesToDataURLs(images, callback);
				
				});
			
			} else {
			
				callback();
			
			}
		
	}

}
