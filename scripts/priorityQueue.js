class PriorityQueue {
    constructor() {
        this.list = [];
    }

    printCollection() {
        console.log(this.list);
    }

    enqueue(newMem) {
        if (this.isEmpty()) {
            this.list.push(newMem);
        } else {
            var added = false;
            for (var i = 0; i < this.list.length; i++) {
                if (newMem[1] < this.list[i][1]) {
                    this.list.splice(i, 0, newMem);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.list.push(newMem);
            }
        }
    }

    dequeue() {
        var value = this.list.shift();
        return value[0];
    }

    front() {
        return this.list[0];
    }

    size() {
        return this.list.length;
    }

    isEmpty() {
        return this.list.length === 0;
    }
}

export default PriorityQueue;
