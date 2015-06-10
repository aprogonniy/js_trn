/**
 * Selection sort implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Algorithm:
 * for i = 1:n,
 *     k = i
 *     for j = i+1:n, if a[j] < a[k], k = j
 *     ? invariant: a[k] smallest of a[i..n]
 *     swap a[i,k]
 *     ? invariant: a[1..i] in final position
 * end
 */

var sortSelection = function (arr) {
    function _swapArrEl(arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    var j = null,
        min = null;


    for (var i = 0; i < arr.length; i++) {
        min = i;

        for (j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }

        if (arr[min] < arr[i]) {
            _swapArrEl(arr, i, min);
        }
    }
};

console.info("Selection sort");

var arr = [3, 5, 1, 9, 0, -5, 17];
console.log("init array:", arr);

sortSelection(arr);
console.log("result array:", arr);
console.groupEnd();