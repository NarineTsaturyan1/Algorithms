class Node {
  constructor() {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
    } else {
      let currentNode = this.root;
      while (currentNode) {
        if (data < currentNode.data) {
          if (!currentNode.left) {
            currentNode.left = newNode;
            return;
          }
          currentNode = currentNode.left;
        } else {
          if (!currentNode.right) {
            currentNode.right = newNode;
            return;
          }
          currentNode = currentNode.right;
        }
      }
    }
  }

  findMin() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  findMax() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }

  find(data) {
    let current = this.root;
    while (current.data !== data) {
      if (current === null) return null;
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
  }

  isPresent(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) return true;
      if (data < current.data) current = current.left;
      else current = current.right;
      return false;
    }
  }

  remove(data) {
    const removeNode = function (node, data) {
      if (node == null) return null;
      if (data == node.data) {
        // no child
        if (node.left == null && node.right == null) return null;
        // no left child
        if (node.left == null) return node.right;
        // no right child
        if (node.right == null) return node.left;
        // both children is there
        let tmp = node.right;
        while (tmp.left !== null) tmp = tmp.left;
        node.data = tmp.data;
        node.right = removeNode(node.right, tmp.right);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    }
    this.root = removeNode(this.root, data);
  }

  preOrder() {
    if (this.root == null) {
      return null;
    } else {
      var result = new Array();
      function traversePreOrder(node) {
        result.push(node.data);
        node.left && traversePreOrder(node.left);

        node.right && traversePreOrder(node.right);
      }
      traversePreOrder(this.root);
      return result;
    };
  }

  inOrder() {
    if (this.root == null) {
      return null;
    } else {
      var result = new Array();
      function traverseInOrder(node) {
        node.left && traverseInOrder(node.left);
        result.push(node.data);
        node.right && traverseInOrder(node.right);
      }
      traverseInOrder(this.root);
      return result;
    };
  }

  postOrder() {
    if (this.root == null) {
      return null;
    } else {
      var result = new Array();
      function traversePostOrder(node) {
        node.left && traversePostOrder(node.left);
        node.right && traversePostOrder(node.right);
        result.push(node.data);
      }
      traversePostOrder(this.root);
      return result;
    };
  }

  findMinHeight(node = this.root) {
    if (node == null) {
      return -1;
    };
    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);
    if (left < right) {
      return left + 1;
    } else {
      return right + 1;
    };
  }

  findMaxHeight(node = this.root) {
    if (node == null) {
      return -1;
    };
    let left = this.findMaxHeight(node.left);
    let right = this.findMaxHeight(node.right);
    return (Math.max(left, right) + 1);
  }

  isBalanced() {
    return (this.findMinHeight() >= this.findMaxHeight() - 1);
  }

  findPredecessor(root, key) {
    let pred = null;
    while (root !== null) {
      if (key > root.data) {
        pred = root;
        root = root.right;
      } else {
        root = root.left;
      }
    }
    if (pred == null) return null;
    return pred.data;
  }

  findSuccessor(root, key) {
    let suc = null
    while (root !== null) {
      if (key < root.data) {
        suc = root;
        root = root.left;
      } else {
        root = root.right;
      }
    }
    if (suc == null) return null;
    return suc.data;
  }
}
