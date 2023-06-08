/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val)
    if (!this.head) {
      this.head = newNode
    } else {
      this.tail.next = newNode
    }
    this.tail = newNode
    this.length++
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    if (!this.head) {
      this.push(val)
      return undefined
    }
    const newNode = new Node(val)
    newNode.next = this.head
    this.head = newNode
    this.length++
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1)
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0)
  }

  /** getAt(index): get node at index. */

  getAt(index) {
    if (!this.head) {
      return undefined
  }
  let current = this.head
  let currentIndex = 0
  
  while (current) {
      if (currentIndex === index) {
        return current
      }
      current = current.next
      currentIndex++
  }
  
  return undefined
}

  /** getValAt(index): get value of item at index. */
  getValAt(index) {
    const node = this.getAt(index)
    return node ? node.val : undefined
  }

  /** setAt(index, val): set val at index to val */

  setAt(index, val) {
    const node = this.getAt(index)
    if (node) {
      node.val = val
    }
  }

  /** insertAt(index, val): add node w/val before index. */

  insertAt(index, val) {
    if (index === 0) {
      this.unshift(val)
      return undefined
    }
    if (index === this.length) {
      this.push(val)
      return undefined
    }
    const prevNode = this.getAt(index - 1)
    if (!prevNode) {
      return undefined
    }
    const newNode = new Node(val)
    newNode.next = prevNode.next
    prevNode.next = newNode
    this.length++
  }

  /** removeAt(index): return & remove item at index, */

  removeAt(index) {
    const deletedNode = this.getAt(index)
    if (!deletedNode) {
      return undefined
    }
    const prevNode = this.getAt(index - 1)
    const nextNode = this.getAt(index + 1)
    if (prevNode) {
      prevNode.next = nextNode
    }
    if (deletedNode === this.head) {
      this.head = nextNode
    }
    if (deletedNode === this.tail) {
      this.tail = prevNode
    }
    this.length--
    return deletedNode
  }

  /** average(): return an average of all values in the list */

  average() {
    let total = 0
    for (let i = 0; i < this.length; i++) {
      total += this.getValAt(i)
    }
    return total / this.length
  }
}

test = new LinkedList([1, 2, 3, 4, 5])
// module.exports = LinkedList;