class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  height(node) {
    if (node === null)
      return 0;
    return node.height;
  }

  rotationLL(node) {
    let temp = node.left;
    node.left = temp.right;
    temp.right = node;
    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
    temp.height = Math.max(this.height(temp.left), node.height) + 1;
    return temp;
  }

  rotationRR(node) {
    let temp = node.right;
    node.right = temp.left;
    temp.left = node;
    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
    temp.height = Math.max(this.height(temp.right), node.height) + 1;
    return temp;
  }

  rotationLR(node) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }

  rotationRL(node) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }

  balance(node) {
    const diff = this.diff(node);
    if (diff > 1) {
      if (this.diff(node.left) > 0)
        node = this.rotationLL(node);
      else
        node = this.rotationLR(node);
    } else if (diff < -1) {
      if (this.diff(node.right) > 0)
        node = this.rotationRL(node);
      else
        node = this.rotationRR(node);
    }
    return node;
  }

  diff(node) {
    return this.height(node.left) - this.height(node.right);
  }

  insert(data) {
    let add = (node) => {
      if (node === null)
        return new Node(data);
      else if (data < node.data)
        node.left = add(node.left);
      else if (data >= node.data)
        node.right = add(node.right);
      node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
      return this.balance(node);
    }
    this.root = add(this.root);
  }
  deleteNode(data) {
    let removeNode = (node) => {
      if (node === null)
        return node;
      else if (data < node.data)
        node.left = removeNode(node.left, data);
      else if (data > node.data)
        node.right = removeNode(node.right, data);
      else {
        if (node.left === null && node.right === null)
          node = null;
        else if (node.left === null)
          node = node.right;
        else if (node.right === null)
          node = node.left;
        else {
          var min = this.findMinNode(node.right);
          node.data = min.data;
          node.right = removeNode(node.right, min.data);
        }
      }
      if (node === null)
        return node;

      node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
      return this.balance(node);
    }

    this.root = removeNode(this.root, data);
  }

  findMinNode(node) {
    if (node.left === null)
      return node;
    else
      return this.findMinNode(node.left);
  }
}
