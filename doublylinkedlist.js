class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Add an element to the end of the doubly linked list
  append(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  // Insert an element at a specific position in the doubly linked list
  insert(data, position) {
    if (position < 0 || position > this.size) {
      return "Invalid position";
    }

    const newNode = new Node(data);

    if (position === 0) {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    } else if (position === this.size) {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      let current = this.head;
      let index = 0;

      while (index < position) {
        current = current.next;
        index++;
      }

      newNode.next = current;
      newNode.prev = current.prev;
      current.prev.next = newNode;
      current.prev = newNode;
    }

    this.size++;
  }

  // Remove an element at a specific position
  removeAt(position) {
    if (position < 0 || position >= this.size) {
      return "Invalid position";
    }

    let current = this.head;

    if (position === 0) {
      this.head = current.next;
      if (this.head) {
        this.head.prev = null;
      }
    } else if (position === this.size - 1) {
      current = this.tail;
      this.tail = current.prev;
      this.tail.next = null;
    } else {
      let index = 0;

      while (index < position) {
        current = current.next;
        index++;
      }

      current.prev.next = current.next;
      current.next.prev = current.prev;
    }

    this.size--;
  }

  // Remove an element by its value
  remove(data) {
    let current = this.head;

    while (current) {
      if (current.data === data) {
        if (current === this.head) {
          this.head = current.next;
          if (this.head) {
            this.head.prev = null;
          }
        } else if (current === this.tail) {
          this.tail = current.prev;
          this.tail.next = null;
        } else {
          current.prev.next = current.next;
          current.next.prev = current.prev;
        }

        this.size--;
        return;
      }

      current = current.next;
    }
  }

  // Get the size of the doubly linked list
  getSize() {
    return this.size;
  }

  // Check if the doubly linked list is empty
  isEmpty() {
    return this.size === 0;
  }

  // Print the doubly linked list elements
  print() {
    let current = this.head;
    const elements = [];

    while (current) {
      elements.push(current.data);
      current = current.next;
    }

    console.log(elements.join(" <-> "));
  }

  // Print the doubly linked list elements
  display() {
    let current = this.head;
    // console.log(current.data);
    const elements = [];

    while (current) {
      // elements.push(current.data);
      console.log(current.data);
      current = current.next;
    }

  }
}

// Example usage:
const myList = new DoublyLinkedList();
myList.append(10);
myList.append(20);
myList.append(30);

myList.display(); // Output: 10 <-> 20 <-> 30
// myList.print(); // Output: 10 <-> 20 <-> 30

// myList.insert(15, 1);
// myList.print(); // Output: 10 <-> 15 <-> 20 <-> 30

// myList.remove(20);
// myList.print(); // Output: 10 <-> 15 <-> 30

// console.log("Size:", myList.getSize()); // Output: Size: 3
// console.log("Is empty?", myList.isEmpty()); // Output: Is empty? false
