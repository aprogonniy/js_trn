/**
 * Priority queue data structure implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Node data structure.
 */
var Node = function (data, priority) {
    this.data = data;
    this.priority = priority;
};

/*
 * Priority queue class.
 */
var PriorityQueue = function () {
    this._elements = [];

    this.push = function (node) {
        if (!node instanceof Node) {
            return -1;
        }

        return this._elements[this._elements.length] = node;
    };

    this.pop = function () {
        if (this._elements.length === 0) {
            return -1;
        }

        var deleteIndex = this._getIndexOfHighestPriorityElement(),
            deletedNode = null,
            arr = [];
        for (var i = 0; i < this._elements.length; i++) {
            if (i !== deleteIndex) {
                arr.push(this._elements[i]);
            } else {
                deletedNode = this._elements[i];
            }
        }
        this._elements = arr;

        return deletedNode;
    };

    this.print = function() {
        var str = "";

        for(var i = 0; i < this._elements.length; i++) {
            str += "{" + this._elements[i].data + ", " + this._elements[i].priority + "} ";
        }

        return str;
    };

    this._getIndexOfHighestPriorityElement = function() {
        var highestPriority = this._elements[0].priority,
            index = 0;

        for(var i = 1; i < this._elements.length; i++) {
            if(this._elements[i].priority < highestPriority) {
                highestPriority = this._elements[i].priority;
                index = i;
            }
        }

        return index;
    };
};



/*
 * Using.
 */
console.info("Priority queue example");

var pq = new PriorityQueue();
pq.push(new Node("test8", 8));
pq.push(new Node("test6", 6));
pq.push(new Node("test0", 0));
pq.push(new Node("test3", 3));
pq.push(new Node("test1", 1));
console.log("Initial queue:", pq.print());

console.log("Delete highest priority element:", pq.pop());

console.log("Resulted queue:", pq.print());