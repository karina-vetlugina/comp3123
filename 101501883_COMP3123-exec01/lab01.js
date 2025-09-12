// Exercise 1
let str = "the quick brown fox";
let capitalized = str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
console.log(capitalized);

// Exercise 2
function max (a, b, c) {
    return Math.max(a, b, c);
}

console.log(max (1,0,1));
console.log(max (0,-10,-20));
console.log(max (1000,510,440));

// Exercise 3
function right(str) {
    if (str.length < 3) {
        return str; // unchanged
    }
    let lastThree = str.slice(-3);
    let rest = str.slice(0, str.length - 3);
    return lastThree + rest;
}

console.log(right("Python"));
console.log(right("JavaScript"));
console.log(right("Hi"));

// Exercise 4
function angle_Type(angle) {
    if (angle > 0 && angle < 90) return "Acute angle";
    if (angle == 90) return "Right angle";
    if (angle > 90 && angle < 180) return "Obtuse angle";
    if (angle == 180) return "Straight angle";
    return "Invalid angle";
}

console.log(angle_Type(47))
console.log(angle_Type(90))
console.log(angle_Type(145))
console.log(angle_Type(180))

// Exercise 5
function array_max_sum(array, num) {
    if (num <= 0 || num > array.length) return 0;

    let maxSum = 0;
    for (let i=0; i <= array.length - num; i++) {
        let tempSum = 0;
        for (let j=0; j < num; j++) {
            tempSum += array[i+j];
        }
        if (tempSum > maxSum) {
            maxSum = tempSum;
        }
    }
    return maxSum;
}

console.log(array_max_sum([1, 2, 3, 14, 5], 2))
console.log(array_max_sum([2, 3, 5, 1, 6], 3))
console.log(array_max_sum([9, 3, 5, 1, 7], 2))
