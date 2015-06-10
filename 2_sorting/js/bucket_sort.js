/**
 * Bucket sort implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Algorithm:
 * function bucketSort(arr, n) is
 *     buckets ? new arr of n empty lists
 *     for i = 0 to (length(arr)-1) do
 *         insert arr[i] into buckets[msbits(arr[i], k)]
 *     for i = 0 to n - 1 do
 *         nextSort(buckets[i]);
 *     return the concatenation of buckets[0], ...., buckets[n-1]
 */

function sortBucket(arr) {
    function _getMinValueOfArray(arr) {
        var min = arr[0];

        for (var i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
        }

        return min;
    }

    function _insertionSort(arr) {
        var current = null,
            j = 0;

        for (var i = 1; i < arr.length; i++) {
            current = arr[i];
            j = i - 1;

            while (j >= 0 && current < arr[j]) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = current;
        }

        return arr;
    }

    function _createBuckets(arr) {
        var buckets = [],
            currentBucket = null,
            current = null;

        for (var i = 0; i < arr.length; i++) {
            current = arr[i];
            currentBucket = Math.floor(current);
            buckets[currentBucket] = buckets[currentBucket] || [];
            buckets[currentBucket].push(current);
        }

        return buckets;
    }

    function _sortBuckets(buckets) {
        for (var i = _getMinValueOfArray(arr); i < buckets.length; i++) {
            if (buckets[i] !== undefined) {
                _insertionSort(buckets[i]);
            }
        }

        return buckets;
    }

    function _unionBuckets(buckets) {
        var result = [],
            currentBucket = null;

        for (var i = _getMinValueOfArray(arr); i < buckets.length; i++) {
            currentBucket = buckets[i];
            if (currentBucket !== undefined) {
                result = result.concat(currentBucket);
            }
        }

        return result;
    }

    var buckets = _createBuckets(arr);
    _sortBuckets(buckets);
    return _unionBuckets(buckets);
}

console.info("Bucket sort");

var arr = [3, 5, 1, 9, 0, -5, 17];
console.log("init arr:", arr);

arr = sortBucket(arr);
console.log("result arr:", arr);