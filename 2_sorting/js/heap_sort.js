/**
 * Heap sort implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Algorithm:
 * # heapify
 * for i = n/2:1, sink(arr,i,n)
 *     ? invariant: arr[1,n] in heap order
 *
 * # sortdown
 * for i = 1:n,
 *     swap arr[1,n-i+1]
 *     sink(arr,1,n-i)
 *     ? invariant: arr[n-i+1,n] in final position
 * end
 *
 * # sink from i in arr[1..n]
 * function sink(arr,i,n):
 *     # {lc,rc,mc} = {left,right,max} child i
 *     lc = 2*i
 *     if lc > n, return # no children
 *     rc = lc + 1
 *     mc = (rc > n) ? lc : (arr[lc] > arr[rc]) ? lc : rc
 *     if arr[i] >= arr[mc], return # heap ordered
 *     swap arr[i,mc]
 *     sink(arr,mc,n)
 */

var sortHeap = function (arr) {
    function _swapArrEl(arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    function _heapify(arr, id, size) {
        var left = 2 * id + 1,
            right = 2 * id + 2,
            max = id;
        if (left < size && arr[left] > arr[id]) {
            max = left;
        }

        if (right < size && arr[right] > arr[max]) {
            max = right;
        }

        if (max !== id) {
            _swapArrEl(arr, id, max);
            _heapify(arr, max, size);
        }
    }

    function _buildMaxHeap(arr) {
        for (var i = Math.floor(arr.length / 2); i >= 0; i -= 1) {
            _heapify(arr, i, arr.length);
        }
        return arr;
    }

    var size = arr.length;
    _buildMaxHeap(arr);
    for (var i = arr.length - 1; i > 0; i -= 1) {
        _swapArrEl(arr, 0, i);
        size -= 1;
        _heapify(arr, 0, size);
    }
};

console.info("Heap sort");

var arr = [3, 5, 1, 9, 0, -5, 17];
console.log("init arr:", arr);

sortHeap(arr);
console.log("result arr:", arr);