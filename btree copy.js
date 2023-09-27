// class TreeNode {
//   constructor(keys = [], children = []) {
//     this.keys = keys;
//     this.children = children;
//   }

//   search(target) {
//     // Find the index of the smallest key greater than or equal to the target
//     let i = 0;
//     while (i < this.keys.length && target > this.keys[i]) {
//       i++;
//     }

//     // If we found the target in the current node, return true
//     if (i < this.keys.length && target === this.keys[i]) {
//       return true;
//     }

//     // If this is a leaf node, the target is not in the tree
//     if (this.isLeaf()) {
//       return false;
//     }

//     // Recursively search in the appropriate child node
//     return this.children[i].search(target);
//   }

//   isLeaf() {
//     return this.children.length === 0;
//   }
// }

// /**
//  * Check if a given key exists in a B-tree.
//  * @param {TreeNode} root - The root of the B-tree.
//  * @param {number} target - The target key to search for.
//  * @returns {boolean} - True if the key exists in the B-tree, false otherwise.
//  */
// function searchInBTree(root, target) {
//   if (!root) {
//     return false; // B-tree is empty
//   }

//   return root.search(target);
// }

// // Example usage:
// const tree = new TreeNode([10], [new TreeNode([5, 7]), new TreeNode([15, 20])]);

// console.log(searchInBTree(tree, 7)); // Should return true
// console.log(searchInBTree(tree, 8)); // Should return false

// class TreeNode {
//   constructor(value) {
//     this.value = value;
//     this.left = null;
//     this.right = null;
//   }
// }

// const root = new TreeNode(10);
// root.left = new TreeNode(5);
// root.right = new TreeNode(15);
// root.left.left = new TreeNode(3);
// root.left.right = new TreeNode(7);
// root.right.left = new TreeNode(12);
// root.right.right = new TreeNode(17);
// console.log(root);
const Treeify = require("treeify");

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  // Insert a value as the right child of the next available left node.
  insertNextRight(value) {
    const newNode = new TreeNode(value);

    if (!this.root) {
      // If the tree is empty, the new node becomes the root.
      this.root = newNode;
      return;
    }

    const queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      //   // If the current node has a left child but no right child, insert the new node as the right child.
      //   if (currentNode.left && !currentNode.right) {
      //     currentNode.right = newNode;
      //     return;
      //   }
      // If the current node has a left child but no right child, insert the new node as the right child.
      if (!currentNode.right) {
        currentNode.right = newNode;
        return;
      }

      // Add child nodes to the queue for further exploration.
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
  }

  // Insert a value as the left child of the next available left node.
  insertNextLeft(value) {
    const newNode = new TreeNode(value);

    if (!this.root) {
      // If the tree is empty, the new node becomes the root.
      this.root = newNode;
      return;
    }

    const queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      //   // If the current node has a left child but no right child, insert the new node as the right child.
      //   if (currentNode.left && !currentNode.right) {
      //     currentNode.right = newNode;
      //     return;
      //   }
      // If the current node has a left child but no right child, insert the new node as the right child.
      if (!currentNode.left) {
        currentNode.left = newNode;
        return;
      }

      // Add child nodes to the queue for further exploration.
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
  }

  getHeight(node = this.root) {
    if (node === null) {
      return -1; // Height of an empty tree is -1
    }
    const leftHeight = this.getHeight(node.left);
    const rightHeight = this.getHeight(node.right);

    // The height of the tree is the maximum height of its left and right subtrees, plus 1 for the current node.
    return Math.max(leftHeight, rightHeight) + 1;
  }

  printTree() {
    const root = this.root;
    let level = 0;
    let queue = [[2, [root.value]]];

    while (root.left || root.right) {
      let leftNode = root.left.value;
      let rightNode = root.right.value;

      level += 2;
    }
  }

  // Post-order traversal (left-right-root)
  postOrderTraversal(node = this.root) {
    if (node !== null) {
      this.postOrderTraversal(node.left);
      this.postOrderTraversal(node.right);
      console.log(node.value);
    }
  }

  printTreeStructureWithEdges(root = this.root) {
    if (!root) {
      return;
    }

    const queue = [{ node: root, edge: "", level: 0 }];
    let arrayQueue = {};
    // let arrayQueue = { root: { node: root, edge: "", level: 0 } };

    while (queue.length > 0) {
      //   arrayQueue = [...arrayQueue, ...queue];
      const { node, edge, level } = queue.shift();
      if (node) {
        console.log(`${edge}${node.value}[${level}]`);
        queue.push({ node: node.left, level: level + 1, edge: `${edge}L:` });
        queue.push({ node: node.right, level: level + 1, edge: `${edge}R:` });

        if (!arrayQueue[level]) arrayQueue[level] = [];

        arrayQueue[level].push({
          node: node.left,
          level: level + 1,
          edge: `${edge}L:`,
        });
        arrayQueue[level]?.push({
          node: node.right,
          level: level + 1,
          edge: `${edge}R:`,
        });
        // arrayQueue[level] = arrayQueue[level] ? arrayQueue : [];
        // console.log(arrayQueue, level, "=========================");
        // console.log(arrayQueue[level], "=========================");
        // arrayQueue[level]?.push({
        //   node: node.left,
        //   level: level + 1,
        //   edge: `${edge}L:`,
        // });
        // arrayQueue[level]?.push({
        //   node: node.right,
        //   level: level + 1,
        //   edge: `${edge}R:`,
        // });
      }
    }
    // console.log(arrayQueue, "-----------------------------");
  }

  printTreeStructure(root = this.root) {
    if (!root) {
      return;
    }

    const queue = [root];
    while (queue.length > 0) {
      const levelSize = queue.length;
      const levelNodes = [];

      for (let i = 0; i < levelSize; i++) {
        const currentNode = queue.shift();
        if (currentNode) {
          levelNodes.push(currentNode.value);
          queue.push(currentNode.left);
          queue.push(currentNode.right);
        } else {
          levelNodes.push(null);
        }
      }

      const isLevelEmpty = levelNodes.every((node) => node === null);
      if (!isLevelEmpty) {
        console.log(levelNodes.join(" "));
      }
    }
  }

  mirror(root = this.root) {
    if (root == null) return;

    let q = [];
    q.push(root);

    // Do BFS. While doing BFS, keep swapping
    // left and right children
    while (q.length > 0) {
      // pop top node from queue
      let curr = q[0];
      q.shift();

      // swap left child with right child
      let temp = curr.left;
      curr.left = curr.right;
      curr.right = temp;

      // push left and right children
      if (curr.left != null) q.push(curr.left);
      if (curr.right != null) q.push(curr.right);
    }
  }

  printBinaryTree(
    root = this.root,
    level = 0,
    prefix = "Root: ",
    isLeft = null
  ) {
    if (!root) {
      return;
    }

    if (level === 0) {
      console.log(prefix + root.value);
    } else {
      const side = isLeft ? "└── " : "├── ";
      const indent = "    ".repeat(level - 1);
      console.log(indent + side + root.value);
    }

    if (root.left || root.right) {
      this.printBinaryTree(root.left, level + 1, "L: ", true);
      if (root.right) {
        this.printBinaryTree(root.right, level + 1, "R: ", false);
      }
    }
  }

  // Function to convert the binary tree to a nested object
  convertToNestedObject(root) {
    if (!root) {
      return null;
    }

    return {
      [root.value]: {
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

  // function to find a node in btree
  isNodeExist(node, root = this.root) {
    let status = { exist: false, node };
    if (root.value === node) {
      status.exist = true;
      return status;
    }
    if (root.left) status = this.isNodeExist(node, root.left);
    if (status?.exist === true) return status;
    if (root.right) status = this.isNodeExist(node, root.right);
    if (status?.exist === true) return status;
    return status;
  }

  // function for level order traversal
  levelOrderTraversal(root = this.root) {
    let queue = [root, null];
    let level = 1;
    let obj = {};
    console.log("------------level:-- ", level);
    while (true) {
      const current = queue.shift();
      if (current === null) {
        if (queue.length === 0) break;
        ++level;
        console.log("------------level:-- ", level);
        queue.push(null);
        continue;
      }
      if (!obj[level]) obj[level] = [];
      obj[level].push(current.value);
      console.log(current.value);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    console.log(obj);
  }
}

// Example usage:
const tree = new BinaryTree();
// @@create binary tree using loop
// let rightNode = [10, 11, 56, 32];
// let leftNode = [1, 7, 12, 29, 74, 36];
// let rightNode = [10, 11, 56, 32, 78, 32, 41];
// let leftNode = [1, 7, 12, 29, 74, 36, 48, 17, 23, 99, 34];
let rightNode = [10, 11, 56, 32, 78, 32, 41];
let leftNode = [
  1, 7, 12, 29, 74, 36, 48, 17, 23, 99, 34, 23, 23, 44, 33, 1, 7, 12, 29, 74,
  36, 48, 17, 23, 99, 34, 23, 23, 44, 33,
];
rightNode.forEach((el, i) => {
  //   console.log(el, i);
  tree.insertNextRight(el);
});
leftNode.forEach((el, i) => {
  // console.log(el, i);
  tree.insertNextLeft(el);
});

// tree.printBinaryTree();
// tree.printTreeStructureWithEdges();
// tree.printTreeStructureWithEdges();
// tree.printTreeStructure();
// tree.postOrderTraversal();
// console.log("Height of the Binary Tree is :--- ", tree.getHeight());
// tree.insertNextRight(10);
// tree.insertNextLeft(5);
// tree.insertNextRight(15);
// tree.insertNextRight(3);
// tree.insertNextRight(7);
// tree.insertNextRight(12);
// tree.insertNextRight(17);
// console.log(tree.root?.right?.right?.right?.value); // Should print 17
// console.log(JSON.stringify(tree, null, 2)); // Should print 17

// @@ Create a binary tree manualy
// const tree = new BinaryTree();
// tree.root = new TreeNode(1);
// tree.root.left = new TreeNode(2);
// tree.root.right = new TreeNode(3);
// tree.root.left.left = new TreeNode(4);
// tree.root.left.right = new TreeNode(5);
// tree.root.right.left = new TreeNode(6);
// tree.root.right.right = new TreeNode(7);
// tree.printWithTreeify();

// tree2.printWithTreeify();
// tree.printWithTreeify();

// @@Algo function for traversing the tree
function inOrderTraversal(root) {
  if (root.left) inOrderTraversal(root.left);
  console.log("------->>", root.value);
  if (root.right) inOrderTraversal(root.right);
}
function preOrderTraversal(root) {
  console.log("------->>", root.value);
  if (root.left) preOrderTraversal(root.left);
  if (root.right) preOrderTraversal(root.right);
}
function postOrderTraversal(root, el = []) {
  if (root.left) postOrderTraversal(root.left, el);
  if (root.right) postOrderTraversal(root.right, el);
  el.unshift(root.value);
  // el.push(root.value);
  // console.log("------->>", root.value);
  return el;
}

// inOrderTraversal(tree.root);
// const data = postOrderTraversal(tree.root);
// preOrderTraversal(tree.root);
// console.log(data);

// [1, 2, 3, 4, 55, 66, 77, 33].forEach((node) => {
//   const status = tree.isNodeExist(node);
//   console.log(status);
// });

// tree.levelOrderTraversal();

// ** Level order traversal using iteration and queue, It's also know as tree BFS traversal

// ** Calculate the diameter of the of the tree and diameter is basically longest collection of the node in a tree.
// ** find if the given tree is a subtree of a another tree?
``;
function isIdentical(subtree, tree) {
  if (
    (subtree === null && tree !== null) ||
    (subtree !== null && tree === null)
  )
    return false;
  if (subtree === null && tree === null) return true;
  if (subtree.value !== tree.value) return false;

  let status =
    isIdentical(subtree.left, tree.left) &&
    isIdentical(subtree.right, tree.right);
  return status;
}

function isSubtree(subtree, tree = this.root) {
  if (subtree === null || tree === null) return false;
  if (subtree.value === tree.value) {
    const identical = isIdentical(subtree, tree);
    return identical;
  }
  let status = false;
  status = isSubtree(subtree, tree.left);
  if (status !== true) {
    status = isSubtree(subtree, tree.right);
  }
  return status;
}

const tree1 = new BinaryTree();
tree1.root = new TreeNode(32);
tree1.root.left = new TreeNode(36);
tree1.root.right = new TreeNode(41);
tree1.root.left.left = new TreeNode(21);
tree1.root.left.right = new TreeNode(23);
tree1.root.right.left = new TreeNode(27);
tree1.root.right.right = new TreeNode(22);
// tree1.root.right.right.left = new TreeNode(22);

const tree2 = new BinaryTree();
tree2.root = new TreeNode(41);
tree2.root.left = new TreeNode(27);
tree2.root.right = new TreeNode(22);
tree2.root.right.left = new TreeNode(22);

tree1.printWithTreeify();
tree2.printWithTreeify();

const isSubtreeStatus = isSubtree(tree2.root, tree1.root);
console.log(isSubtreeStatus, "-------------------==================");
