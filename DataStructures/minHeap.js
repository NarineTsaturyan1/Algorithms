class MinHeap {
  constructor() {
    this.capacity = 10;
    this.size = 0;
    this.items = new Array(this.capacity);
  }
  getLeftChild(parentIndex) { return 2 * parentIndex + 1; }
  getRightChild(parentIndex) { return 2 * parentIndex + 2; }
  getParent(childIndex) { return Math.floor((childIndex - 1) / 2); }
  hasLeftChild(index) { return this.getLeftChild(index) < this.size; }
  hasRightChild(index) { return this.getRightChild(index) < this.size; }
  hasParent(index) { return this.getParent(index) >= 0; }
  getLeftChildVal(index) { return this.items[this.getLeftChild(index)]; }
  getRightChildVal(index) { return this.items[this.getRightChild(index)]; }
  getParentVal(index) { return this.items[this.getParent(index)]; }
  swap(index1, index2) {
    let tmp = this.items[index1];
    this.items[index1] = this.items[index2];
    this.items[index2] = tmp;
  }
  resizeArr() {
    if (this.size === this.capacity) {
      this.capacity *= 2;
      const newArray = new Array(this.capacity);
      for (let i = 0; i < this.size; i++) {
        newArray[i] = this.items[i];
      }
      this.items = newArray;
    }
  }
  peek() {
    if (this.size === 0) throw Error("Array is empty");
    return this.items[0];
  }
  removeFirst() {
    if (this.size === 0) throw Error("Array is empty");
    var first = this.items[0];
    this.items[0] = this.items[this.size - 1];
    this.size--;
    this.heapifyDown();
    return first;
  }
  addItem(item) {
    this.resizeArr();
    this.items[this.size] = item;
    this.size++;
    this.heapifyUp();
  }
  heapifyUp() {
    let index = this.size - 1;
    while (this.hasParent(index) && this.getParentVal(index) > this.items[index]) {
      this.swap(this.getParent(index), index);
      index = this.getParent(index);
    }
  }
  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChild(index);
      if (this.hasRightChild(index) && this.getRightChildVal(index) < this.getLeftChildVal(index)) {
        smallerChildIndex = this.getRightChild(index);
      }
      if (this.items[index] < this.items[smallerChildIndex]) break;
      else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }
}