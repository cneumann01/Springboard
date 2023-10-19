// Stack using Array
class Stack {
	constructor() {
		this.data = [];
	}

	push(val) {
		this.data.push(val);
	}

	pop() {
		const valueToDelete = this.data.slice(-1)[0];
		this.data.pop();
		return valueToDelete;
	}

	peek() {
		console.log(this.data.slice(-1)[0]);
	}

	isEmpty() {
		if (this.data.length == 0) {
			console.log("Stack is empty!");
		} else {
			console.log("Stack is not empty!");
		}
	}
}

// Queue using doubly linked list
class Queue {
	constructor() {
		this.head = null;
		this.tail = null;
	}

	addToBack(val) {
		let temp = new Node(val);

		if (this.isEmpty()) {
			this.head = temp;
			this.tail = temp;
		} else {
			this.tail.nextNode = temp;
			temp.prevNode = this.tail;
			this.tail = temp;
		}

		return this;
	}

	removeFromFront() {
		if (this.isEmpty()) {
			console.log("Add an item to the line first!");
			return;
		} else {
			const nodeToDelete = this.head;

			if (this.head.nextNode == null) {
				this.head = null;
				this.tail = null;
			} else {
				this.head = this.head.nextNode;
				this.head.prevNode = null;
			}

            return nodeToDelete;
		}
	}

	peek() {
		if (this.isEmpty()) {
			console.log("Add an item to the line first!");
			return;
		} else {
			return this.head;
		}
	}

	isEmpty() {
		if (this.head == null) {
			return true;
		} else {
			return false;
		}
	}
}

class Node {
	constructor(val) {
		this.val = val;
		this.prevNode = null;
		this.nextNode = null;
	}
}

// Initalize
const stack = new Stack();
const line = new Queue();
