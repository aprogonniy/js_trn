/**
 * Insertion sort implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Algorithm:
 * for i ? 1 to length(A) - 1
 *     j ? i
 *     while j > 0 and A[j-1] > A[j]
 *         swap A[j] and A[j-1]
 *         j ? j - 1
 *     end while
 * end for
 */

var sortInsertion = function (arr) {
    function _swapArrEl(arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    var x = null,
        j = null;


    for (var i = 0; i < arr.length; i++) {
        //x = A[i];
        j = i;
        while (j > 0 && arr[j - 1] > arr[j]) {
            _swapArrEl(arr, j, j - 1);

            j--;
        }
    }
};

console.groupCollapsed("Simple sorts");

console.info("Insertion sort");

var arr = [3, 5, 1, 9, 0, -5, 17];
console.log("init array:", arr);

sortInsertion(arr);
console.log("result array:", arr);