class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SLL {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  size() {
    return this.length;
  }

  push(data) {
    const node = new Node(data);
    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  }

  pop() {
    if (this.head === null) {
      return undefined;
    }
    let current = this.head;
    let prev = null;
    while (current.next !== null) {
      prev = current;
      current = current.next;
    }
    if (prev === null) {
      this.head = null;
    } else {
      prev.next = null;
    }
    this.length--;
    return current.data;
  }

  shift() {
    if (this.head === null) {
      return undefined;
    }
    let shiftedElement = this.head.data;
    this.head = this.head.next;
    this.length--;
    return shiftedElement;
  }

  unshift(data) {
    const node = new Node(data);
    node.next = this.head;
    this.head = node;
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
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    const newNode = new Node(data);
    newNode.next = current.next;
    current.next = newNode;
    this.length++;
  }

  removeFirst() {
    if (this.head === null) {
      return;
    }
    this.head = this.head.next;
    this.length--;
  }

  removeLast() {
    if (this.head === null) {
      return;
    }
    if (this.head.next === null) {
      this.head = null;
      this.length--;
      return;
    }
    let prev = null;
    let current = this.head;
    while (current.next !== null) {
      prev = current;
      current = current.next;
    }
    prev.next = null;
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
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    current.next = current.next.next;
    this.length--;
  }

  reverse() {
    let prev = null;
    let current = this.head;
    let next = null;
    while (current !== null) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
  }
  
  getMiddleNode() {
    let slow = this.head;
    let fast = this.head.next;
    while(fast !== null && fast.next !== null) {
      fast = fast.next.next;
      slow = slow.next;
    }
    return slow;
  }

  merge(h1, h2) {
    let dummyHead = new Node();
    let current = dummyHead;
  
    while (h1 !== null && h2 !== null) {
      if (h1.data < h2.data) {
        current.next = h1;
        h1 = h1.next;
      } else {
        current.next = h2;
        h2 = h2.next;
      }
      current = current.next;
    }
    if (h1 !== null) {
      current.next = h1;
    }
    if (h2 !== null) {
      current.next = h2;
    }
    return dummyHead.next;
  }

  insertionSort() {
    let node = new ListNode();
    while(this.head){
        let tmp = this.head.next;
        let curr = node;
        while(curr.next && curr.next.data <= this.head.data) {
            curr = curr.next;
        }
        this.head.next = curr.next;
        curr.next = this.head;
        this.head = tmp;
    }
    return node.next;
  }

  hasCycle() {
    if (this.head === null || this.head.next === null) {
      return false;
    }
    let slow = this.head;
    let fast = this.head.next;
    while(fast !== null && fast.next !== null) {
      if(fast === slow) {
        return true;
      }
      slow = slow.next;
      fast = fast.next.next;
    }
    return false;
  }
}
