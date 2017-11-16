/**
 *
 *  Functional.js - Collection of functional programming methods
 *
 */

function () {

  // Transforms a polyadic function into an unary function:
  function curry(fn) {
    
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
          };
        
      }
    
      return reduceArity;
  }
  
  // Transforms a list of unary functions into a single unary function:
  function compose (array) {
    return array.reduce(function (x,y) {
      // Applies the arguments of one function to call for the arguments of another:
      return function () {
        return y.call(this, x.apply(this, arguments));
      };
    // Acclumator starts with an identity function:
    }, function (x) {
      return x;
    })
  }

  //  Returns a single array of elements from an array that may contain other arrays:
  function flatten (array) {
    return array.reduce(function (a, b){
      return Array.isArray(b)
        ? a.concat(flatten(b))
        : a.concat(b);
   }, []);
  }
  
  // Returns a namespace containing all functions from above:
  return {
    curry:curry,
    compose:compose,
    flatten:flatten
  };

};
