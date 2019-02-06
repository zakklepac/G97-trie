class Node {
  constructor(key) {
    (this.key = key), (this.children = {}), (this.end = false);
  }
}

class Trie {
  constructor() {
    this.root = new Node(null);
  }

  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!node.children[word[i]]) {
        node.children[word[i]] = new Node(word[i]);
      }
      node = node.children[word[i]];
      if (i == word.length - 1) node.end = true;
    }
  }

  contains(word) {
    if (!this.root) return false;
    return this._contains(this.root, word);
  }
  _contains(node, word) {
    let letter = word[0];
    let child = node.children[letter];
    if (child) {
      let remainder = word.substring(1);
      if (!remainder && child.end) return true;
      else return this._contains(child, remainder);
    } else return false;
  }

  remove(word) {
    if (!this.root) return;
    if (this.contains(word)) {
      this._removeNode(this.root, word);
    }
  }

  _removeNode(node, word) {
    if (!node || !word) {
      return;
    }
    let letter = word[0];
    let child = node.children[letter];
    if (child) {
      let remainder = word.substring(1);
      if (remainder) {
        this._removeNode(child, remainder);
      } else {
        if (Object.keys(child.children).length === 0) {
          delete node.children[letter];
        } else {
          child.end = false;
        }
      }
    }
  }

  depthFirstSearch(prefix){
    let stack = [this];
    let current;

    while (stack.length !== 0) {
      stack.map(function(node){
        return node.key;
      });

    current = stack.pop();

    if (current.key == prefix){
      return current;
    } else {
      stack.concat(current.children)
      }
    }

    return null;
  }

  breadthFirstSearch(prefix){
    var queue = [this];
    var current;

      while (queue.length !== 0){
        queue.map(function(node){
        return node.key;
      });

    current = queue.shift(); 
      if (current.key == prefix){
        return current;
      } else {
        if (current.children){
          queue = queue.concat(current.children);
        }
      }
    }
    return null;
   }
  
}

module.exports = { Node, Trie };