// exercise 1
const gretter = (myArray) => {
    const greetText = 'Hello';

    for (const name of myArray) {
        console.log(`${greetText} ${name}`);
    }
};

gretter(['Randy Savage', 'Ric Flair', 'Hulk Hogan']);

// exercise 2
const capitalize = (str) => {
    // destructure first character and the rest as an array
    const [first, ...rest] = str;
    // capitalize first, join the rest back into a str
    return `${first.toUpperCase()}${rest.join('').toLowerCase()}`;
};

console.log(capitalize('fooBar'));
console.log(capitalize('nodeJs'));

// exercise 3
const colors = ['red', 'green', 'blue'];
// map to transform each color
const capitalizedColors = colors.map(color => capitalize(color));
console.log(capitalizedColors);

// exercise 4
const values = [1, 60, 34, 30, 20, 5];
const filterLessThan20 = values.filter(value => value < 20);
console.log(filterLessThan20);

// exercise 5
const array = [1, 2, 3, 4];
const calculateSum = array.reduce((accumulator, currentVal) => accumulator + currentVal, 0);
const calculateProduct = array.reduce((accumulator, currentVal) => accumulator * currentVal, 1);
console.log(calculateSum);
console.log(calculateProduct);

// exercise 6
class Car {
    constructor(model, year) {
        this.model = model;
        this.year = year;
    }

    details() {
        return `Model: ${this.model}, Engine: ${this.year}`;
    }
}

class Sedan extends Car {
    constructor(model, year, balance) {
        super(model, year);
        this.balance = balance;
    }

    info() {
        return `${this.model} has a balance of $${this.balance.toFixed(2)}`;
    }
}

const car2 = new Car('Pontiac Firebird', 1976);
console.log(car2.details());

const sedan = new Sedan('Volvo SD', 2018, 30000);
console.log(sedan.info());