// BinarySearch (iterative)
function iterativeBinarySearch(arr, item) {
    let low = 0;
    let high = arr.length-1;
    while(low <= high) {
        let mid = Math.floor((low + high)/2);
        if(arr[mid] == item) {
            return mid;
        } else if (arr[mid] <item) {
            low = mid+1;
        }else {
            high = mid-1;
        }
    }
    return -1;
}
console.log(iterativeBinarySearch([1,2,3,4,5,8,9], 7))

// BinarySearch (recursive)
function recursiveBinarySearch(arr, low, high, item) {
    let mid = Math.floor((low+high)/2);
    while(low <= high){
        if(arr[mid] == item) {
            return mid;
        } else if(arr[mid] < item) {
            return binarySearch(arr, mid+1, high, item);
        }else {
            return binarySearch(arr, low, mid-1, item);
        }
    }
   return -1;
}
let arr = [1,2,3,4,5,8,9];
console.log(recursiveBinarySearch(arr,0, arr.length, 9))