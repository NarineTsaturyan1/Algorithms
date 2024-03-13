class Stack {
  constructor() {
    this.maxSize = 100;
    this.top = -1;
    this.stack = [];
  }
  isEmpty() {
    if (this.top < 0) {
      return true;
    }
    return false;
  }

  isFull() {
    if (this.top === this.maxSize - 1) {
      return true;
    }
    return false;
  }

  push(data) {
    if (this.isFull()) {
      return false;
    }
    this.top++;
    this.stack[thias.top] = data;
    return true;
  }

  pop() {
    if (this.isEmpty) {
      return null;
    }
    this.top--;
    return this.stack.pop();
  }
  peek() {
    if (this.isEmpty) return null;
    return this.stack[this.top];
  }
}