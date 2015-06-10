/**
 * Bubble sort implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Algorithm:
 * for i = 1:n,
 *    swapped = false
 *    for j = n:i+1,
 *        if a[j] < a[j-1],
 *            swap a[j,j-1]
 *            swapped = true
 *        ? invariant: a[1..i] in final position
 *        break if not swapped
 * end
 */

function sortBubble(arr) {
    function _swapArrEl(arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    var len = arr.length,
        i, j;

    for (i = len - 1; i >= 0; i--) {
        for (j = len - i; j >= 0; j--) {
            if (arr[j] < arr[j - 1]) {
                _swapArrEl(arr, j, j - 1);
            }
        }
    }
}

console.groupCollapsed("Bubble sort and variants");

console.info("Bubble sort");

var arr = [3, 5, 1, 9, 0, -5, 17];
console.log("init arr:", arr);

sortBubble(arr);
console.log("result arr:", arr);