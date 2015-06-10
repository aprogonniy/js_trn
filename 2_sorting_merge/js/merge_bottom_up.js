/**
 * Bottom-up merge sort implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Algorithm:
 * m = 1
 * while m < n do
 *     i = 0
 *     while i < n-m do
 *         merge subarrays a[i..i+m-1] and a[i+m .. min(i+2*m-1,n-1)] in-place.
 *         i = i + 2 * m
 *     m = m * 2
 */

var sortBottomUpMerge = function (arr) {
    function _merge(arr, aux, low, mid, high) {
        var k = 0,
            i = low,
            j = mid + 1;

        for (k = low; k <= high; k++) {
            aux[k] = arr[k];
        }

        for(k = low; k <= high; k++) {
            if(i > mid) {
                arr[k] = aux[j++];
            } else if(i > high) {
                arr[k] = aux[i++];
            } else if(aux[j] < aux[i]) {
                arr[k] = aux[j++];
            } else {
                arr[k] = aux[i++];
            }
        }
    }

    var aux = [];
    for(var n = 1; n < arr.length; n += n) {
        for(var i = 0; i < arr.length - n; i += 2*n) {
            var low = i,
                mid = i + n - 1,
                high = Math.min(i + 2 * n - 1, arr.length - 1);

            _merge(arr, aux, low, mid, high);
        }
    }
};

console.info("Merge sort (bottom-up)");

var arr = [3, 5, 1, 9, 0, -5, 17];
console.log("init array:", arr);

sortBottomUpMerge(arr);
console.log("result array:", arr);