function findRotatedIndex(arr, target) {
	let pivot = findPivot(arr);
	if (pivot === 0 || target < arr[0]) {
		// Search in the right subarray
		return binarySearch(arr, target, pivot, arr.length - 1);
	} else {
		// Search in the left subarray
		return binarySearch(arr, target, 0, pivot - 1);
	}
}

function findPivot(arr) {
	let left = 0;
	let right = arr.length - 1;
	while (left < right) {
		let mid = Math.floor((left + right) / 2);
		if (arr[mid] > arr[right]) {
			// Pivot is on the right side of mid
			left = mid + 1;
		} else {
			// Pivot is on the left side of mid or at mid
			right = mid;
		}
	}
	return left;
}

function binarySearch(arr, target, left, right) {
	while (left <= right) {
		let mid = Math.floor((left + right) / 2);
		if (arr[mid] === target) {
			return mid;
		} else if (arr[mid] < target) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}
	return -1;
}

module.exports = findRotatedIndex;
