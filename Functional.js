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

      var _args = _slice.call(arguments);
      
      //  Evaulate function, otherwise continue to concat new arguments:
      return _args.length >= _arity
        ? fn.apply(null, _args)
        : function () {
            return reduceArity.apply(null, _args.concat(_slice.call(arguments)));
        }
      
    }
    
    return reduceArity;
    
  },
  
  // :: Transforms a list of unary functions into a single unary function
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