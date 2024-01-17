function bubbleSort(arr) {
    for(let i = 0; i< arr.length; i++) {
        let j = i+1;
        for(let j = i+1; j< arr.length; j++) {
            if(arr[i] > arr[j]) {
                let tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
    return arr;
}
console.log(bubbleSort([2,1,4,7,3,5,6,0,10,-2]));