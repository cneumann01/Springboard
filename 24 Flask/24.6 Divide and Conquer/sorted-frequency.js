function sortedFrequency(arr, target) {
	let low = 0;
	let high = arr.length - 1;
	let first = -1;
	while (low <= high) {
		let mid = Math.floor((low + high) / 2);
		if (arr[mid] == target) {
			first = mid;
			high = mid - 1;
		} else if (arr[mid] < target) {
			low = mid + 1;
		} else {
			high = mid - 1;
		}
	}

	// Last occurrence of target using binary search
	low = 0;
	high = arr.length - 1;
	let last = -1;
	while (low <= high) {
		let mid = Math.floor((low + high) / 2);
		if (arr[mid] == target) {
			last = mid;
			low = mid + 1;
		} else if (arr[mid] < target) {
			low = mid + 1;
		} else {
			high = mid - 1;
		}
	}

	// Return frequency
	if (first == -1) {
		return -1;
	} else {
		return last - first + 1;
	}
}

module.exports = sortedFrequency;
