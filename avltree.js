const Treeify = require("treeify");

class TreeNode {
  constructor(key) {
    this.key = key;
    this.height = 1;
    this.left = null;
    this.right = null;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  // Helper function to calculate the height of a node
  getHeight(node) {
    if (!node) return 0;
    return node.height;
  }

  // Helper function to update the height of a node
  updateHeight(node) {
    if (!node) return 0;
    node.height =
      Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }

  // Helper function to perform a right rotation
  rotateLeft(y) {
    const x = y.left;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  // Helper function to perform a left rotation
  rotateRight(x) {
    const y = x.right;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  // Get the balance factor of a node
  getBalanceFactor(node) {
    if (!node) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  // Insert a key into the AVL tree
  insert(root, key) {
    if (!root) {
      return new TreeNode(key);
    }

    if (key < root.key) {
      root.left = this.insert(root.left, key);
    } else if (key > root.key) {
      root.right = this.insert(root.right, key);
    } else {
      // Duplicate keys are not allowed in this example
      return root;
    }

    // Update height of the current node
    this.updateHeight(root);

    // Get the balance factor of this node
    const balance = this.getBalanceFactor(root);

    // Perform rotations if needed to balance the tree
    if (balance > 1 && key < root.left.key) {
      return this.rotateLeft(root);
    }
    if (balance > 1 && key > root.left.key) {
      root.left = this.rotateRight(root.left);
      return this.rotateLeft(root);
    }
    if (balance < -1 && key > root.right.key) {
      return this.rotateRight(root);
    }
    if (balance < -1 && key < root.right.key) {
      root.right = this.rotateLeft(root.right);
      return this.rotateRight(root);
    }

    return root;
  }

  // Insert a key into the AVL tree (public method)
  insertKey(key) {
    this.root = this.insert(this.root, key);
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

// Usage
const avlTree = new AVLTree();

// avlTree.insertKey(10);
// avlTree.insertKey(20);
// avlTree.insertKey(68);
// avlTree.insertKey(118);
// avlTree.insertKey(98);
// avlTree.insertKey(18);
// avlTree.insertKey(30);

avlTree.insertKey(5);
avlTree.insertKey(2);
avlTree.insertKey(9);
avlTree.insertKey(19);
avlTree.insertKey(91);
avlTree.insertKey(91);
avlTree.insertKey(11);
avlTree.insertKey(32);
avlTree.printWithTreeify();

console.log(avlTree.root.key); // Output: 20 (root of the balanced AVL tree)
