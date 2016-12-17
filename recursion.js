

//	Add together all elements of given array:
function sumArr(arr, total) {
	
	return arr.length == 0 ? total :  sumArr(arr, total ? total+=arr.pop() : arr.pop());
	
}

//	Matches an element for a given array:
function hasElem(arr, elem, i) {
	
	return i >= arr.length - 1 ? false : arr[i] == elem ? true : hasElem(arr, elem, isNaN(i) ? 0 : ++i);

}

//	Returns index of element for a given array; otherwise retuns null:
function matchElem(arr, elem, i) {
	
	return i >= arr.length - 1 ? null : arr[i] == elem ? i : hasElem(arr, elem, isNaN(i) ? 0 : ++i);
	
}

//	Checks if in object has a given property:
function hasProperty(obj, property, i) {
	
	return i >= Object.keys(obj).length - 1 ? false : Object.keys(obj)[i] == elem ? true : hasProperty(obj, property, isNaN(i) ? 0 : ++i);
	
}

//	Converts an object's property names (keys) into an array:
function toArray(obj, result, i) {

	return i >= Object.keys(obj).length - 1 ? result : result ? toArray(obj, result.push(Object.keys(obj)[i]), ++i) : toArray(obj, new Array(), 0);

}

//	Returns array of properties that match criteria function for an object:
function getProperty(obj, criteria, result, i) {

	return i >= Object.keys(obj).length - 1 ? result : result ? getProperty(obj, criteria, result.push(criteria(Object.keys(obj)[i])), ++i) : getProperty(obj, critera, new Array(), 0);

}


function parseArr(arr, result) {

		for (var index in arr) {
			
			var elem = arr[index];
			
			switch (elem.constructor) {
				case Array:
					 parseArr(elem, result);
				break;
				case Object:
					 parseObj(elem, result);
				break;
				default:
					result.push(elem);
			}
			
		}
		
	return result;

}

function parseObj(obj, result) {
		
	for (var property in obj) {
		
		var value = obj[property];

		switch (value.constructor) {
			case Array:
				parseArr(value, result);
			break;
			case Object:
				 parseObj(value, result);
			break;
			default:
					
				result.push(value);
		}
		
	}
		
	return result;

}