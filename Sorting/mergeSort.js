function mergeSort(arr, l = 0, r = arr.length - 1) {
    if (l < r) {
        let mid = Math.floor(l + (r - l) / 2);
        mergeSort(arr, l, mid);
        mergeSort(arr, mid + 1, r);
        merge(arr, l, mid, r);
    }
}

function merge(arr, l, m, r) {
    let newArr = [];
    let leftIndex = l;
    let leftEnd = m;
    let rightIndex = m + 1;
    let rightEnd = r;
    let index = l;
    while (leftIndex <= leftEnd && rightIndex <= rightEnd) {
        if (arr[leftIndex] < arr[rightIndex]) {
            newArr[index++] = arr[leftIndex++];
        } else {
            newArr[index++] = arr[rightIndex++];
        }
    }
    while (leftIndex <= leftEnd) {
        newArr[index++] = arr[leftIndex++];
    }

    while (rightIndex <= rightEnd) {
        newArr[index++] = arr[rightIndex++];
    }
    for (let i = l; i <= r; i++) {
        arr[i] = newArr[i];
    }
}

let arr = [12, 1, 13, 5, 6, 7, 3 ,0];
mergeSort(arr);
console.log("Sorted array:", arr);
