/**
 * Counting sort implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Algorithm:
 * for x in input:
 *     count[key(x)] += 1
 *
 *     total = 0
 *     for i in range(k):   # i = 0, 1, ... k-1
 *         oldCount = count[i]
 *         count[i] = total
 *         total += oldCount
 *
 *     for x in input:
 *         output[count[key(x)]] = x
 *         count[key(x)] += 1
 *
 * return output
 */

function sortCount(arr) {
    function _getMinValueOfArray(arr) {
        var min = arr[0];

        for(var i = 1; i < arr.length; i++) {
            if(arr[i] < min) {
                min = arr[i];
            }
        }

        return min;
    }

    function _getMaxValueOfArray(arr) {
        var max = arr[0];

        for(var i = 1; i < arr.length; i++) {
            if(arr[i] > max) {
                max = arr[i];
            }
        }

        return max;
    }

    var i = 0,
        z = 0,
        count = [],
        min = _getMinValueOfArray(arr),
        max = _getMaxValueOfArray(arr);

    for (i = min; i <= max; i++) {
        count[i] = 0;
    }

    for (i = 0; i < arr.length; i++) {
        count[arr[i]]++;
    }

    for (i = min; i <= max; i++) {
        while (count[i]-- > 0) {
            arr[z++] = i;
        }
    }
}

console.groupCollapsed("Distribution sorts");

console.info("Counting sort");

var arr = [3, 5, 1, 9, 0, -5, 17];
console.log("init arr:", arr);

sortCount(arr);
console.log("result arr:", arr);