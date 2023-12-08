/** product: calculate the product of an array of numbers. */

function product(nums) {
	if (nums.length === 0) {
		return 1; // Base case
	} else {
		return nums[0] * product(nums.slice(1)); // Recursive case: Multiply the first element by the product of the rest of the array.
	}
}

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  if (words.length === 0) {
    return 0; // Base case: When the array is empty, the longest word length is 0
  } else {
    const currentWordLength = words[0].length;
    const restMaxLength = longest(words.slice(1));
    return Math.max(currentWordLength, restMaxLength); // Recursive case: Return the maximum length between the current word and the longest word in the rest of the array.
  }
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  if (str.length <= 1) {
    return str; // Base case: When the string has 0 or 1 characters, return the original string.
  } else {
    return str[0] + everyOther(str.slice(2)); // Recursive case: Include the first character and skip the next one, then apply the function to the rest of the string.
  }
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  str = str.toLowerCase().replace(/\s/g, ''); // Remove spaces and convert to lowercase for case-insensitive comparison.
  if (str.length <= 1) {
    return true; // Base case: A string with 0 or 1 character is always a palindrome.
  } else if (str[0] === str[str.length - 1]) {
    return isPalindrome(str.slice(1, -1)); // Recursive case: Check if the first and last characters are the same and continue with the rest of the string.
  } else {
    return false; // If the first and last characters are different, it's not a palindrome.
  }
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val) {
  function findIndexRecursive(arr, val, index) {
    if (index >= arr.length) {
      return -1; // Base case: Value not found in the array.
    } else if (arr[index] === val) {
      return index; // Base case: Value found, return the index.
    } else {
      return findIndexRecursive(arr, val, index + 1); // Recursive case: search rest of array
    }
  }

  return findIndexRecursive(arr, val, 0);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  if (str === "") {
    return ""; // Base case: When the string is empty, the reversed string is also empty.
  } else {
    return revString(str.substr(1)) + str[0]; // Recursive case: Reverse the rest of the string and append the first character.
  }
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let result = [];
  for (let key in obj) {
    if (typeof obj[key] === "string") {
      result.push(obj[key]);
    } else if (typeof obj[key] === "object") {
      result = result.concat(gatherStrings(obj[key])); // Recursively gather strings from nested objects.
    }
  }
  return result;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, left = 0, right = arr.length - 1) {
  if (left > right) {
    return -1; // Base case: Value not found in the array.
  }

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === val) {
    return mid; // Base case: Value found, return the index.
  } else if (arr[mid] < val) {
    return binarySearch(arr, val, mid + 1, right); // Recursive case: Search in the right half of the array.
  } else {
    return binarySearch(arr, val, left, mid - 1); // Recursive case: Search in the left half of the array.
  }
}

module.exports = {
	product,
	longest,
	everyOther,
	isPalindrome,
	findIndex,
	revString,
	gatherStrings,
	binarySearch,
};
