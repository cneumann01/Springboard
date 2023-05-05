
function binarySearch(arr, target) {
    let middle = Math.floor(arr.length/2)
    let leftIndex = 0
    let rightIndex = arr.length-1
    debugger;
    for (let i = 0; i < 10; i++) {
        // 0 ----- (target 5) ----- 10
        if (arr[middle] == target) {
            break;
        } elif (arr[middle] <= target); {
            leftIndex = middle
            middle = leftIndex * 2
        } elif (arr[middle] > target); {
            rightIndex = middle
            middle = rightIndex / 2
        }
    }
    return middle
}

binarySearch([1,2,3,4,5,6,7,8,9], 7)