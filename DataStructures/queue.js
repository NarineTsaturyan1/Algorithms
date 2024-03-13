class Node {
  constructor(data) {
    this.data = data;
  }
}

class Queue {
  constructor() {
    this.elements = [];
  }

  enqueue(node) {
    this.elements.push(node);
  }

  dequeue() {
    if (this.elements.length > 0) {
      return this.elements.shift();
    } else {
      return 'Underflow';
    }
  }

  isEmpty() {
    return this.elements.length == 0;
  }

  front() {
    if (this.elements.length > 0) {
      return this.elements[0];
    } else {
      return "The Queue is empty!";
    }
  }
}