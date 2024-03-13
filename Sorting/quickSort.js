function quickSort(arr, l = 0, r = arr.length - 1) {
  if (l < r) {
    pivot = Partition(arr, l, r);
    quickSort(arr, l, pivot - 1);
    quickSort(arr, pivot + 1, r);
  }
  return arr;
}

function Partition(arr, l = 0, r = arr.length - 1) {
  let i = l - 1;
  pivot = arr[r];
  for (let j = l; j <= r; j++) {
    if (arr[j] < pivot) {
      i++;
      let tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
  }
  i++;
  let tmp = arr[i];
  arr[i] = arr[r];
  arr[r] = tmp;
  return i;
}
let arr = [12, 1, 13, 5, 6, 7, 3, 0];
quickSort(arr);
console.log("Sorted array:", arr);