const Treeify = require("treeify");

class TreeNode {
  constructor(key) {
    this.key = key;
    this.height = 0;
    this.left = null;
    this.right = null;
  }
}

class AvlTree {
  constructor() {
    this.root = null;
  }

  // Helper function to calculate the height of a node
  getHeight(node) {
    if (!node) return 0;
    return node.height;
  }

  // Get the balance factor of a node
  getBalanceFactor(node) {
    if (!node) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  updateHeight(node) {
    if (!node) return;
    let height = Math.max(
      this.getHeight(node.left),
      this.getHeight(node.right)
    );
    node.height = height + 1;
  }

  leftRotation(node) {
    let x = node.left;
    let N = x.right;
    node.left = N;
    x.right = node;
    return x;
  }

  rightRotation(node) {
    console.log(node,'>>>>>>>>>>>>>>>>>>>>>>>>');
    let x = node.right;
    let N = x.left;
    node.right = N;
    x.left = node;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>');
    return x;
  }

  insert(root, key) {
    if (!root) {
      return new TreeNode(key);
    }

    if (root.key > key) {
      root.left = this.insert(root.left, key);
    } else if (root.key < key) {
      root.right = this.insert(root.right, key);
    } else {
      // for avoiding duplicate insertion
      return root;
    }

    // console.log(root, key);

    this.updateHeight(root);
    let balance = this.getBalanceFactor(root);
    console.log(balance, "-------------------");

    if (balance < -1 && root.right.key < key) {
      return this.rightRotation(root);
      // rr rotation
    }
    if (balance < -1 && root.right.key > key) {
      root.right = this.leftRotation(root.right);
      return this.rightRotation(root);
      // lr rotation
    }
    if (balance > 1 && root.left.key < key) {
      console.log(balance,root,'=======================balance----');
      root.left = this.rightRotation(root.left);
      return this.leftRotation(root);
      // rl rotation
    }
    if (balance > 1 && root.left.key > key) {
      // ll rotation
      return this.leftRotation(root);
    }

    return root;
  }

  insertKey(key) {
    this.root = this.insert(this.root, key);
  }

  print() {
    // console.log(JSON.parse(JSON.stringify(this.root)));
    console.log(JSON.stringify(this.root, null, 2));
  }

  // Function to convert the binary tree to a nested object
  convertToNestedObject(root) {
    if (!root) {
      return null;
    }

    return {
      [root.key]: {
        left: this.convertToNestedObject(root.left),
        right: this.convertToNestedObject(root.right),
      },
    };
  }

  printWithTreeify() {
    const treeObject = this.convertToNestedObject(this.root);
    // Print the binary tree using treeify
    console.log(Treeify.asTree(treeObject, false));
  }
}

let tree = new AvlTree();

tree.insertKey(5);
tree.insertKey(2);
tree.insertKey(9);
tree.insertKey(19);
tree.insertKey(91);
tree.insertKey(91);
tree.insertKey(11);
tree.insertKey(32);
// tree.print();
tree.printWithTreeify();
