class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class DLL {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  size() {
    return this.length;
  }

  push(data) {
    const node = new Node(data);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
  }

  pop() {
    if (this.head === null) {
      return undefined;
    }
    let poppedElement = this.tail.data;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.length--;
    return poppedElement;
  }

  shift() {
    if (this.head === null) {
      return undefined;
    }
    let shiftedElement = this.head.data;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    this.length--;
    return shiftedElement;
  }

  unshift(data) {
    if (data === undefined || data === null) {
      return;
    }
    const node = new Node(data);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.length++;
  }

  insertFirst(data) {
    this.unshift(data);
  }

  insertLast(data) {
    this.push(data);
  }

  insertAt(data, index) {
    if (index < 0 || index > this.size()) {
      return "Index is not valid";
    }
    if (index === 0) {
      this.unshift(data);
      return;
    }
    if (index === this.size()) {
      this.push(data);
      return;
    }
    let currentNode = this.head;
    for (let i = 0; i < index - 1; i++) {
      currentNode = currentNode.next;
    }
    let newNode = new Node(data);
    newNode.next = currentNode.next;
    newNode.prev = currentNode;
    currentNode.next.prev = newNode;
    currentNode.next = newNode;
    this.length++;
  }

  removeFirst() {
    if (this.head === null) {
      return;
    }
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length--;
      return;
    }
    this.head = this.head.next;
    this.head.prev = null;
    this.length--;
  }

  removeLast() {
    if (this.head === null) {
      return;
    }
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length--;
      return;
    }
    this.tail = this.tail.prev;
    this.tail.next = null;
    this.length--;
  }

  removeAt(index) {
    if (index < 0 || index >= this.size()) {
      return "Index is not valid";
    }
    if (index === 0) {
      this.removeFirst();
      return;
    }
    if (index === this.size() - 1) {
      this.removeLast();
      return;
    }
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }
    currentNode.prev.next = currentNode.next;
    currentNode.next.prev = currentNode.prev;
    this.length--;
  }

  reverse() {
    let temp = null;
    let current = this.head;
    while (current !== null) {
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;
      current = current.prev;
    }
    if (temp !== null) {
      this.head = temp.prev;
    }
  }
}
