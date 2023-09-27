/*
// for (let i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 1);
// }
// for (var i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 1);
// }

// Output //
// 2.3 Output Question
// let shape = {
//   radius: 10,
//   diameter() {
//     return this.radius * 2;
//   },
//   perimeter: () => {
//     console.log(this, this.radius);
//     return 2 * 10 * this.radius;
//   },
// };

// // Output //
// console.log(shape.diameter(20));
// console.log(shape.perimeter(NaN));
 */

// @/ Find a pair from an array whose sum is equals to the target?
/*
// Solution with two pointer technique.
let arr = [1, 2, 3, 4, 5];

function findDoubles(arr, target) {
  let i = 0;
  let j = arr.length - 1;

  while (i < j) {
    let sum = arr[i] + arr[j];
    if (sum === target) {
      return { status: true, result: [arr[i], arr[j]] };
    } else if (sum > target) {
      j--;
    } else {
      i++;
    }
  }
  return { status: false };
}

let sortedArr = arr.sort();
console.log(findDoubles(sortedArr, 16));
// console.log(findDoubles(sortedArr, 9));
 */

// @/ solution for finding tirplet sum equals to the target using recursion
/*
let arr = [1, 2, 3, 4, 5, 6, 22, 41, 66, 9, 52];

function findTriplet(arr, n, target, triplet) {
  if (target == 0 && triplet.length == 3) {
    console.log(triplet);
    return true;
  }

  if (n == 0 || target < 0 || triplet.length == 3) {
    return false;
  }

  return (
    findTriplet(arr, n - 1, target - arr[n - 1], [...triplet, arr[n - 1]]) ||
    findTriplet(arr, n - 1, target, triplet)
  );
}

console.log(findTriplet(arr, arr.length, 29, []));
*/

// @/ Solution to find triplet sum equals to the target from an given array using two pointer technique with big O n^2 complexity
/*
let arr = [1, 2, 3, 4, 5, 8, 7, 19, 12, 16];

function findTripletSum(arr, target) {
  let n = arr.length;
  let i = 0;

  for (i; i < n; i++) {
    let j = i + 1;
    let k = n - 1;

    while (j < k) {
      let sum = arr[i] + arr[j] + arr[k];
      if (sum === target) {
        return { status: true, result: [arr[i], arr[j], arr[k]] };
      } else if (sum > target) {
        k--;
      } else {
        j++;
      }
    }
  }
  return { status: false };
}

let sortedArr = arr.sort();
console.log(findTripletSum(sortedArr, 16));
 */

// @/ find triple sum in sequence equals to the target
/*
// solution with sliding window technique
let arr = [1, 2, 3, 4, 5, 8, 7, 19, 12, 16];

function findTriplet(arr, target) {
  let i = 0;
  let n = arr.length;
  let triplet = [];

  for (i; i < n; i++) {
    if (triplet.length === 3) {
      let sum = triplet[0] + triplet[1] + triplet[2];
      if (sum === target) return triplet;
      triplet.shift();
    }
    triplet.push(arr[i]);
  }
  return [];
}

let result = findTriplet(arr, 9);
console.log(result);
 */

// @/ find a longest sub-string without repeating character
/*
let str = "sdfsafadfsddsffsfdsfaaadfdsfsdfqwefdgaassdfgfgqeg";

function findLongestSubstring(str) {
  let longestSubstring = [],
    substring = [];

  Array.from(str).forEach((ch) => {
    if (substring.includes(ch)) {
      longestSubstring = substring;
      substring = [];
    }
    substring.push(ch);
    // console.log(ch);
  });

  console.log(longestSubstring)
}

findLongestSubstring(str);
 */

// @/ Kadanes's algorithm -- similar to sliding window technique
/*
let arr = [3, 4, -2, 4, -3, 1, 6, 8, -21, 3, 21];

function getLargestSubarraySum(arr) {
  let i = 0,
    n = arr.length,
    maxSum = 0,
    currSum = 0;
  let L = 0,
    R = 0;

  for (i; i < n; i++) {
    if (currSum <= 0) L = i;
    currSum = Math.max(currSum, 0);
    currSum += arr[i];
    if (maxSum < currSum) R = i;
    maxSum = Math.max(currSum, maxSum);
  }
  return { max: maxSum, window: [L, R] };
}

console.log(getLargestSubarraySum(arr));
 */

// @/ find a lognest contiguous sub-string with unique characters from a given string
/*
// @-- solution with my approach
let str = "sdaasdfssabcdefgh";
// let str = "sdfsafadfsdds";
// let str = "sdfsafadfsddsffsfdsfaaadfdsfsdfqwefdgaassdfgfgqeg";

function findLongestSubstring(str) {
  let n = str.length;
  let maxLength = 0;
  let currentLength = 0;
  let substring = "";
  let ml = 0,
    mr = 0;
  let L = 0,
    R = 0;

  let map = {};
  for (R; R < n; R++) {
    let char = str[R];
    if (Object.keys(map).includes(char)) {
      L = map[char] >= L ? map[char] + 1 : L;
    }
    map[char] = R;
    currentLength = R - L + 1;
    if (currentLength > maxLength) {
      ml = L;
      mr = R;
    }
    maxLength = Math.max(currentLength, maxLength);
    substring = Array.from(str)
      .slice(ml, mr + 1)
      .join("");
  }
  return {
    max: maxLength,
    keys: [ml, mr],
    string: substring,
  };
}

console.log(findLongestSubstring(str));

// @-- solution with google(someone's) approach

// var lengthOfLongestSubstring = function (s) {
//   const map = {};
//   var left = 0;

//   return s.split("").reduce((max, v, i) => {
//     left = map[v] >= left ? map[v] + 1 : left;
//     map[v] = i;
//     const isNewMax = i - left + 1;
//     return Math.max(max, isNewMax);
//   }, 0);
// };

// console.log(lengthOfLongestSubstring("bbbbb"));
// console.log(lengthOfLongestSubstring("pw"));
// console.log(lengthOfLongestSubstring("abcabceasbc"));
 */

// @/ given an array remove all duplicates element from it using recursion
/*
let arr = [3, 4, 53, 2, 4, 2, 2, 3, 5, 345, 6, 63, 6];

function removeDuplicates(arr, n) {
  let target = n - 1;
  let el = arr[target];
  if (target == 0) return [el];
  let newArr = removeDuplicates(arr, n - 1);
  if (newArr.includes(el)) return newArr;
  else return [...newArr, el];
}

let n = arr.length;
console.log(removeDuplicates(arr, n));
 */
// -------------------------------------------------------------------
