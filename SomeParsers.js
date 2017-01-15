/**
 *
 *  SomeParsers.js - Parsing methods for DOM, strings, and objects
 *
 */

SomeParsers = {

  // Applies callback (accpeting "node") to every child node:
  DOM: function (node, func, onDone) {

    // Halt parsing if callback returns "false":
		if (func(node) === false) {
		  
      return false;
      
    }
    
    node = node.firstChild;
    
		while (node) {
			SomeParsers.DOM(node, func);
			node = node.nextSibling;
		}
		
    // Runs function when done:
    if (onDone) {
      
      return onDone();
      
    }
    
	},

  // Applies a callback (accepting "str, ""index" and "char") to string
  string:function (str, callback, onDone) {

    for (var i = 0; i < str.length; i++) {
      
      callback(str, i, str.charAt(i));
      
    }
    
    // Runs function using obj when done:
    if (onDone) {
      
      return onDone(obj);
      
    }
    
  },

  // Applies a callback (accepting "obj" , "property", and "value") to object
  object:function (obj, callback, onDone) {

    // Parse as object:
    if (obj instanceof Object) {
      
      // Enumerate object:
      for (var property in obj) {
        
        // Halt parsing if callback returns "false":
        if (callback(obj, property, obj[property]) === false) {
          
          return false;
          
        }
      
        // Repeat if value is an "object":
        if(typeof obj[property] === "object") {
          
           SomeParsers.object(obj[property], callback)
           
         }
         
      }
      
    }
    
    // Parse as array:
    if (obj instanceof Array) {
      
      // Iterate array:
      for (var i = 0; i < obj.length; i++) {
        
        // Halt parsing if callback returns "false":
        if (callback(obj, i, obj[i]) === false) {
          
          return false;
          
        }
        
        // Repeat if value is an "object":
        if (typeof obj[i] === "object") {
          
            SomeParsers.object(obj[i], callback)
            
        }
      }
      
    }
    
    // Runs function using obj when done:
    if (onDone) {
      
      return onDone(obj);
      
    }
    
  }
  
};