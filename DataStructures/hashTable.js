class HashTable {
  constructor(size) {
    this.table = new Array(size);
    this.size = size;
  }
  hash(key) {
    let total = 0;
    let primeNum = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * primeNum + value) % this.table.length;
    }
    return total;
  }

  set(key, value) {
    const index = this.hash(key);
    let bucket = this.table[index];
    if (!bucket) {
      this.table[index] = [[key, value]];
    } else {
      let found = false;
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket[i][1] = value;
          found = true;
          break;
        }
      }
      if (!found) {
        bucket.push([key, value]);
      }
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.table[index];
    if (bucket) {
      const sameKey = bucket.find(item => item[0] === key)
      if (sameKey) {
        return sameKey[1];
      }
    }
    return undefined;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.table[index];
    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1);
          break;
        }
      }
    }
  }
}

// Create a new hash table
const hashTable = new HashTable(10);

// Test the set() method
hashTable.set("key1", "value1");
hashTable.set("key2", "value2");
hashTable.set("key3", "value3");

// Test the get() method
console.log(hashTable.get("key1"));
console.log(hashTable.get("key2"));
console.log(hashTable.get("key4"));

// Test the remove() method
hashTable.remove("key2");
console.log(hashTable.get("key2"));

// Test the set() method to update value for existing key
hashTable.set("key1", "updatedValue");
console.log(hashTable.get("key1"));
