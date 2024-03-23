class MaxHeap {
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
    let temp = this.items[index1];
    this.items[index1] = this.items[index2];
    this.items[index2] = temp;
  }
  resizeArr() {
    if (this.size == this.capacity) {
      this.capacity *= 2;
      let newArray = new Array(this.capacity);
      for (let i = 0; i < this.size; i++) {
        newArray[i] = this.items[i];
      }
      this.items = newArray;
    }
  }
  peek() {
    if (this.size == 0) throw new Error('Heap is empty!');
    return this.items[0];
  }
  removeFirst() {
    if (this.size == 0) throw new Error('Heap is empty!');
    let item = this.items[0];
    this.items[0] = this.items[this.size - 1];
    this.size--;
    this.heapifyDown();
    return item;
  }
  addItem(item) {
    this.items[this.size] = item;
    this.size++;
    this.heapifyUp();
    if (this.size == this.capacity) {
      this.resizeArr();
    }
  }
  heapifyUp() {
    let index = this.size - 1;
    while (this.hasParent(index) && this.getParentVal(index) < this.items[index]) {
      this.swap(this.getParent(index), index);
      index = this.getParent(index);
    }
  }
  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let largerChildIndex = this.getLeftChild(index);
      if (this.hasRightChild(index) && this.getRightChildVal(index) > this.getLeftChildVal(index)) {
        largerChildIndex = this.getRightChild(index);
      }
      if (this.items[index] > this.items[largerChildIndex]) break;
      else {
        this.swap(index, largerChildIndex);
      }
      index = largerChildIndex;
    }
  }
}