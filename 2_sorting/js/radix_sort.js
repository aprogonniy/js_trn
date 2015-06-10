/**
 * Radix sort (LSD) implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Algorithm (LSD):
 * for i in (s.length - 1)  -> 0 do
 *     stableSort(s[i])
 */

function sortRadix(arr) {
    var temp = [],
        count = [];

    for (var i = 0; i >= 0; i--) {
        count = [];
        temp = [];
        for (var j = 0; j < arr.length; j++) {
            var charCode = arr[j].charCodeAt(i);
            var old = count[charCode + 1] || 0;
            count[charCode + 1] = old + 1;
        }
        for (var c = 0; c < count.length - 1; c++) {
            count[c] = count[c] || 0;
            count[c + 1] = count[c + 1] || 0;
            count[c + 1] += count[c];
        }
        for (j = 0; j < arr.length; j++) {
            var char = arr[j].charCodeAt(i);
            temp[count[char]] = arr[j];
            count[char]++;
        }
        for (j = 0; j < arr.length; j++) {
            arr[j] = temp[j];
        }
    }
}

console.info("Radix sort");

var arr = ['a', 'm', 'o', 'q', 'z', 'b'];
console.log("init arr:", arr);

sortRadix(arr);
console.log("result arr:", arr);

console.groupEnd();