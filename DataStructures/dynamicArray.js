class DynamicArray {
    constructor() {
      this.capacity = 5;
      this.length = 0;
      this.array = new Array(this.capacity);
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index out of bounds');
        }
        return this.array[index];
    }

    set(index, value) {
        if(index < 0 || index >= this.length) {
            throw new Error('Index out of bounds');
        }
        this.array[index] = value;
    }

    push(element) {
      if (this.length === this.capacity) {
        this.resize();
      }
      this.array[this.length] = element;
      this.length++;
    }
  
    pop() {
      if (this.length === 0) {
        throw new Error('Array is empty');
      }
      const poppedElement = this.array[this.length - 1];
      this.length--;
      return poppedElement;
    }

    shift() {
        if (this.length === 0) {
            throw new Error('Array is empty');
        }
        const shiftedElement = this.array[0];
        for (let i = 0; i < this.length - 1; i++) {
            this.array[i] = this.array[i + 1];
        }
        this.length--;
        return shiftedElement;
    }

    resize() {
        if (this.length === this.capacity) {
            this.capacity *= 2;
        } else if (this.length < this.capacity / 2 && this.capacity > 5) {
            this.capacity /= 2;
        }
        const newArray = new Array(this.capacity);
        for (let i = 0; i < this.length; i++) {
            newArray[i] = this.array[i];
        }
        this.array = newArray;
    }

    insert(index, element) {
        if(index < 0 || index >= this.length) {
            throw new Error('Index out of bounds');
        }
        if(this.capacity == this.length) {
            this.resize();
        }
        for (let i = this.length - 1; i >= index; i--) {
            this.array[i + 1] = this.array[i];
        }
        this.array[index] = element;
        this.length++;
    }

    remove(index) {
        if(index < 0 || index >= this.length) {
            throw new Error('Index out of bounds');
        }
        for(let i = index; i< this.length -1 ; i++) {
            this.array[i] = this.array[i+1];
        }
        this.length--;
    }

    slice(startIndex, endIndex) {
        if (startIndex < 0 || endIndex < 0 || startIndex >= this.length || endIndex > this.length || startIndex >= endIndex) {
            throw new Error('Invalid indices for slicing');
        }
    
        const slicedArray = [];
        for (let i = startIndex; i < endIndex; i++) {
            slicedArray.push(this.array[i]);
        }
    
        return slicedArray;
    }

    forEach(callback) {
        for (let i = 0; i < this.length; i++) {
            callback(this.array[i], i, this.array);
        }
    }

    count(element) {
        let count = 0;
        for(let i = 0; i < this.length; i++){
            if(element == this.array[i]){
                count++;
            }
        }
        return count;
    }

    reverse() {
        for (let i = 0; i < this.length / 2; i++) {
            let j = this.length - 1 - i;
            let tmp = this.array[i];
            this.array[i] = this.array[j];
            this.array[j] = tmp;
        }
    }

    isEmpty() {
        if(this.length == 0) {
            return true;
        }
        return false;
    }

    indexOf(element) {
        for(let i = 0; i< this.length; i++){
            if(this.array[i] == element) {
                return i;
            }
        }
        return -1;
    }
}
