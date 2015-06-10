/**
 * Comb sort implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Algorithm:
 * gap := arr.size
 * shrink := 1.3
 *
 * loop until gap = 1 and swapped = false
 *     gap := int(gap / shrink)
 *     if gap < 1
 *         gap := 1
 *     end if
 *
 *     i := 0
 *     swapped := false
 *
 *     loop until i + gap > arr.size
 *         if arr[i] > arr[i+gap]
 *             swap(arr[i], arr[i+gap])
 *             swapped := true // Flag a swap has occurred, so the
 *         end if
 *         i := i + 1
 *     end loop
 * end loop
 */

function sortComb(arr) {
    function _swapArrEl(arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    var gap = arr.length,
        swapped = true;

    while (gap > 1 || swapped) {
        if (gap > 1) {
            gap = parseInt(gap / 1.3);
        }
        swapped = false;
        for (var i = 0; i + gap < arr.length; i++) {
            if (arr[i] > arr[i + gap]) {
                _swapArrEl(arr, i, i + gap);
                swapped = true;
            }
        }
    }
}

console.info("Comb sort");

var arr = [3, 5, 1, 9, 0, -5, 17];
console.log("init arr:", arr);

sortComb(arr);
console.log("result arr:", arr);

console.groupEnd();