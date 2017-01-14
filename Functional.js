/**
 *
 *  Functional.js - Collection of functional programming methods
 *
 */

Functional = {
  
  // :: Transforms a polyadic function into an unary function:
  curry : function (fn) {
    
    var _arity = fn.length,             // number of arguments to reduce
        _slice = Array.prototype.slice; // transforms array-like object into an array
    
    // Evaluates function once number of arguments is equal or greater to arity:
    function reduceArity() {
      
      // Flatten arguments to bind:
      var args = _slice.call(arguments).reduce(function(result, arg) {
        result = result.concat(arg);
        return result;
      }, []);
      
      //  Evaulate function, otherwise continue to bind arguments:
      return args.length >= _arity
        ? fn.apply(null, args)
        : reduceArity.bind(null, args);
      
    }
    
    return reduceArity;
    
  },
  
  // :: Reduces a list of unary functions into a single unary function
  compose: function () {
    
    // Applies the arguments of one function to call for the arguments of another:
    var _composeThis = function (x,y) {
      return function () {
        return y.call(this, x.apply(this, arguments));
      }
    }
    
    // Reduces list of functions:
    return Array.prototype.slice.call(arguments).reduce(function (result, fn) {
      return _composeThis(result,fn);
    });
  }
 
}
