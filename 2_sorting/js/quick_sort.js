/**
 * Quick sort implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Algorithm:
 * # choose pivot
 * __swapArrEl a[1,rand(1,n)]
 *
 * # 2-way partition
 * k = 1
 * for i = 2:n, if a[i] < a[1], __swapArrEl a[++k,i]
 *     __swapArrEl a[1,k]
 *     ? invariant: a[1..k-1] < a[k] <= a[k+1..n]
 *
 * # recursive sorts
 * sort a[1..k-1]
 * sort a[k+1,n]
 */

var sortQuick = function (arr, left, right) {
    function _swapArrEl(arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    function _partition(arr, pivot, left, right) {
        var storeIndex = left,
            pivotValue = arr[pivot];

        _swapArrEl(arr, pivot, right);
        for(var v = left; v < right; v++) {
            if(arr[v] < pivotValue) {
                _swapArrEl(arr, v, storeIndex);
                storeIndex++;
            }
        }
        _swapArrEl(arr, right, storeIndex);

        return storeIndex;
    }

    var pivot = null,
        newPivot = null;

    if(typeof left !== 'number') {
        left = 0;
    }
    if(typeof right !== 'number') {
        right = arr.length - 1;
    }

    if (left < right) {
        pivot = left + Math.ceil((right - left) * 0.5);
        newPivot = _partition(arr, pivot, left, right);

        sortQuick(arr, left, newPivot - 1);
        sortQuick(arr, newPivot + 1, right);
    }
};

console.info("Quick sort");

var arr = [3, 5, 1, 9, 0, -5, 17];
console.log("init arr:", arr);

sortQuick(arr);
console.log("result arr:", arr);

console.groupEnd();