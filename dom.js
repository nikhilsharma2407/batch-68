// const btn = document.getElementById("submit");
// console.log("🚀 ~ btn:", btn);

// document.getElementsByClassName('table-rows')

const btn = document.querySelector("#submit");
// document.querySelectorAll('.table-rows')
const nameEl = document.querySelector("#username");

// btn.addEventListener("click", (e) => {
//   e.preventDefault();
//   alert("btn clicked");
// });

nameEl.addEventListener("keydown", (e) => {
  console.log(e);
  if (!/[A-Za-z]/.test(e.key)) {
    e.preventDefault();
  }
  console.log(e.target.value);
});

// document.addEventListener('click', (e)=>{

//     console.log("🚀 ~ e:", e)
//     console.log('clicked on', e.target)
// })

// pwd -> input
// toggle-btn
const toggleBtn = document.querySelector("#toggle-btn");
const pwd = document.querySelector("#pwd");

toggleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //   const currentType = pwd.getAttribute("type");
  const currentType = pwd.type;
  pwd.setAttribute("type", currentType === "password" ? "text" : "password");

  const inputEl = document.createElement("input");
  inputEl.placeholder = "dynamic field";
  inputEl.type = "text";
  const form = document.querySelector("#form");

  form.appendChild(inputEl);
});

// event bubbling-> start from inside the bubble out

const div = document.querySelector("#div1");
const span1 = document.querySelector("#span1");

div.addEventListener(
  "click",
  (e) => {
    console.log("div clicked");
    console.log("current target", e.currentTarget);
    console.log("target", e.target);
  },
);

span1.addEventListener(
  "click",
  (e) => {
    e.stopPropagation();  //  prevent the event from bubbling out
    console.log("span clicked");
    console.log("current target", e.currentTarget);
    console.log("target", e.target);
  },
);


// event capturing start from outside (parents) then travel inwards to children
// div.addEventListener(
//   "click",
//   (e) => {
//     console.log("div clicked");
//     console.log("current target", e.currentTarget);
//     console.log("target", e.target);
//   },
//   { capture: true },
// );

// span1.addEventListener(
//   "click",
//   (e) => {
//     // e.stopPropagation();
//     console.log("span clicked");
//     console.log("current target", e.currentTarget);
//     console.log("target", e.target);
//   },
//   { capture: true },
// );
