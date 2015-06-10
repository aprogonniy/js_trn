/**
 * Shell sort implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Algorithm:
 * h = 1
 * while h < n, h = 3*h + 1
 * while h > 0,
 *     h = h / 3
 *     for k = 1:h, insertion sort a[k:h:n]
 *     ? invariant: each h-sub-array is sorted
 * end
 */

function sortShell(arr) {
    for (var h = arr.length; h = parseInt(h / 2);) {
        for (var i = h; i < arr.length; i++) {
            var k = arr[i];
            for (var j = i; j >= h && k < arr[j - h]; j -= h)
                arr[j] = arr[j - h];
            arr[j] = k;
        }
    }
}

console.info("Shell sort");

var arr = [3, 5, 1, 9, 0, -5, 17];
console.log("init arr:", arr);

sortShell(arr);
console.log("result arr:", arr);