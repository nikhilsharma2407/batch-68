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

// employee.greet();
// employee.greetNormalFn();
// employee.greetArrowFn();

const arrowFnOutside = () => {
  console.log("🚀 ~ arrowFnOutside ~ this:", this);
};

function fnDeclaration() {
  console.log("🚀 ~ fnDeclaration ~ this:", this);

  const arrowFnInside = () => {
    console.log("🚀 ~ arrowFnInside ~ this:", this);
    const arrowFnOutside = () => {
      console.log("🚀 ~ arrowFnOutside ~ this:", this);
    };
    // arrowFnOutside();
  };
  return arrowFnInside;
}

const obj = {
  name: "test",
  id: 101,
  fnDeclaration,
};

const emp2 = {
  name: "emp2",
  id: "E102",
  iife: (function() {
    console.log(this);
    console.log("IIFE INVOKED normal fn declaration");
  })(),
};

// arrowFnOutside();

// fnDeclaration();

// bind
// call, apply

// obj.fnDeclaration();
// const fn = obj.fnDeclaration; // this->obj
// fn();
// fnDeclaration()
// fnDeclaration.call(emp2); // same as emp2.fnDeclaration();
// arrowFnOutside.call(emp2);

// IIFE

function sum(num1, num2) {
  console.log("🚀 ~ sum ~ this:", this);
  return num1 + num2;
}

// sum.call(obj, 1, 2);
// sum.apply(obj, [1, 2]);
// const newSumFn = sum.bind(obj);
// newSumFn();

// const add10 = sum.bind(obj,10);
// console.log("🚀 ~ add10(15):", add10(15));
const sumArrowFn = (n1, n2) => n1 + n2;

const add10 = (n) => {
  return sumArrowFn(10, n);
};

// add10(5);
// console.log("🚀 ~ add10(5):", add10(5));

// IIFE -> Immediate Invoked Fn Expression
// (() => {
//   console.log("IIFE INVOKED");
// })();

// (function abcd() {
//   console.log(this);
//   console.log("IIFE INVOKED normal fn declaration");
// })();
