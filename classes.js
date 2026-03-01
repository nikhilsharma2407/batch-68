class Employee {
  // private salary varibale in js starts with #
  #salary = "$1000";
  constructor(name, id) {
    // instance properties
    this.name = name;
    this.id = id;
  }

  greet() {
    console.log(`Hi I'm ${this.name} and my employee id is- ${this.id}`);
  }
  
  getSalary() {
    console.log(this.#salary);
    return this.#salary;
  }
  
  setSalary(salary) {
    this.#salary = salary;
  }
}

const emp1 = new Employee("abc", "E101");
emp1.setSalary("$1000");
const emp2 = new Employee("xyz", "E102");

emp1.greet();
emp2.greet();

// emp1.#salary
emp1.getSalary();

class Manager extends Employee {
  constructor(name, id, dept) {
    super(name, id);
    this.dept = dept;
  }
  
  getSalary() {
    console.log(super.getSalary() + "0");
  }
}

const manager = new Manager("mgr", "M101", "Engineering");
manager.greet();
manager.getSalary();
