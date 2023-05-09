function findRotationCount(arr) {
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

module.exports = findRotationCount;
