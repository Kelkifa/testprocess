class Student {
    _name
    constructor(name, age) {
        this._name = name;
        this.age = age;
    }

    // get information about student
    getInfo() {
        return this.#getInfoPrivate();
    }

    // Get name and age of the student
    #getInfoPrivate() {
        return `${this._name} is ${this.age} years old`;
    }
}


const std1 = new Student('John', 20);

std1.name = "12";
console.log(std1);