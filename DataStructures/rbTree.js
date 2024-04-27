class Node {
  constructor(data, color, left = null, right = null) {
    this.data = data;
    this.color = color;
    this.left = left;
    this.right = right;
    this.parent = null;
  }
}

class RedBlackTree {
  constructor() {
    this.NIL = new Node(null, 'black');
    this.root = this.NIL;
  }

  rotateLeft(node) {
    let tmp = node.right;
    node.right = tmp.left;
    if (tmp.left !== this.NIL) {
      tmp.left.parent = node;
    }
    tmp.parent = node.parent;
    if (node.parent === null) {
      this.root = tmp;
    } else if (node === node.parent.left) {
      node.parent.left = tmp;
    } else {
      node.parent.right = tmp;
    }
    tmp.left = node;
    node.parent = tmp;
  }

  rotateRight(node) {
    let tmp = node.left;
    node.left = tmp.right;
    if (tmp.right !== this.NIL) {
      tmp.right.parent = node;
    }
    tmp.parent = node.parent;
    if (node.parent === null) {
      this.root = tmp;
    } else if (node === node.parent.right) {
      node.parent.right = tmp;
    } else {
      node.parent.left = tmp;
    }
    tmp.right = node;
    node.parent = tmp;
  }

  insert(value) {
    let node = new Node(value, 'red', this.NIL, this.NIL);
    let temp = null;
    let iter = this.root;

    while (iter !== this.NIL) {
      temp = iter;
      if (node.data < iter.data) {
        iter = iter.left;
      } else {
        iter = iter.right;
      }
    }

    node.parent = temp;
    if (temp === null) {
      this.root = node;
    } else if (node.data < temp.data) {
      temp.left = node;
    } else {
      temp.right = node;
    }

    if (node.parent === null) {
      node.color = 'black';
      return;
    }

    if (node.parent.parent === null) {
      return;
    }

    this.fixInsert(node);
  }

  fixInsert(node) {
    let uncle;
    while (node.parent.color === 'red') {
      if (node.parent === node.parent.parent.right) {
        uncle = node.parent.parent.left;
        if (uncle.color === 'red') {
          uncle.color = 'black';
          node.parent.color = 'black';
          node.parent.parent.color = 'red';
          node = node.parent.parent;
        } else {
          if (node === node.parent.left) {
            node = node.parent;
            this.rotateRight(node);
          }
          node.parent.color = 'black';
          node.parent.parent.color = 'red';
          this.rotateLeft(node.parent.parent);
        }
      } else {
        uncle = node.parent.parent.right;

        if (uncle.color === 'red') {
          uncle.color = 'black';
          node.parent.color = 'black';
          node.parent.parent.color = 'red';
          node = node.parent.parent;
        } else {
          if (node === node.parent.right) {
            node = node.parent;
            this.rotateLeft(node);
          }
          node.parent.color = 'black';
          node.parent.parent.color = 'red';
          this.rotateRight(node.parent.parent);
        }
      }
      if (node === this.root) {
        break;
      }
    }
    this.root.color = 'black';
  }

  search(node, value) {
    if (node === this.NIL || value === node.data) {
      return node;
    }
    if (value < node.data) {
      return this.search(node.left, value);
    }
    return this.search(node.right, value);
  }

  transplant(u, v) {
    if (u.parent === null) {
      this.root = v;
    } else if (u === u.parent.left) {
      u.parent.left = v;
    } else {
      u.parent.right = v;
    }
    v.parent = u.parent;
  }

  delete(value) {
    let z = this.search(this.root, value);
    if (z === null) {
      return;
    }
    let y = z;
    let yOriginalColor = y.color;
    let x;

    if (z.left === this.NIL) {
      x = z.right;
      this.transplant(z, z.right);
    } else if (z.right === this.NIL) {
      x = z.left;
      this.transplant(z, z.left);
    } else {
      y = this.minimum(z.right);
      yOriginalColor = y.color;
      x = y.right;
      if (y.parent === z) {
        x.parent = y;
      } else {
        this.transplant(y, y.right);
        y.right = z.right;
        y.right.parent = y;
      }
      this.transplant(z, y);
      y.left = z.left;
      y.left.parent = y;
      y.color = z.color;
    }
    if (yOriginalColor === 'black') {
      this.deleteFixup(x);
    }
  }

  deleteFixup(x) {
    let w;
    while (x !== this.root && x.color === 'black') {
      if (x === x.parent.left) {
        w = x.parent.right;
        if (w.color === 'red') {
          w.color = 'black';
          x.parent.color = 'red';
          this.rotateLeft(x.parent);
          w = x.parent.right;
        }
        if (w.left.color === 'black' && w.right.color === 'black') {
          w.color = 'red';
          x = x.parent;
        } else {
          if (w.right.color === 'black') {
            w.left.color = 'black';
            w.color = 'red';
            this.rotateRight(w);
            w = x.parent.right;
          }
          w.color = x.parent.color;
          x.parent.color = 'black';
          w.right.color = 'black';
          this.rotateLeft(x.parent);
          x = this.root;
        }
      } else {
        w = x.parent.left;
        if (w.color === 'red') {
          w.color = 'black';
          x.parent.color = 'red';
          this.rotateRight(x.parent);
          w = x.parent.left;
        }
        if (w.right.color === 'black' && w.left.color === 'black') {
          w.color = 'red';
          x = x.parent;
        } else {
          if (w.left.color === 'black') {
            w.right.color = 'black';
            w.color = 'red';
            this.rotateLeft(w);
            w = x.parent.left;
          }
          w.color = x.parent.color;
          x.parent.color = 'black';
          w.left.color = 'black';
          this.rotateRight(x.parent);
          x = this.root;
        }
      }
    }
    x.color = 'black';
  }
  minimum(node) {
    while (node.left !== this.NIL) {
      node = node.left;
    }
    return node;
  }
}