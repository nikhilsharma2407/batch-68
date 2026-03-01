const employee = {
  empId: "E101",
  address: {
    street: "123 Main St",
    city: "Metropolis",
    zip: "12345",
  },
  name: "emp1",
  dept: {
    deptName: "Engineering",
    deptId: "D101",
  },
  greetNormalFn: function () {
    console.log(`Hi I'm ${this.name} and my employee id is- ${this.empId}`);
  },
  greet() {
    console.log(`Hi I'm ${this.name} and my employee id is- ${this.empId}`);
  },
  greetArrowFn: () => {
    console.log(`Hi I'm ${this.name} and my employee id is- ${this.empId}`);
  },
};

employee.greet();
employee.greetNormalFn();
employee.greetArrowFn();
