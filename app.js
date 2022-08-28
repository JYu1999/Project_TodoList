let add = document.querySelector("form button");
let section = document.querySelector("section");

add.addEventListener("click", (e) => {
  //prevent form from submitting
  e.preventDefault();
  //console.log(e.target.parentElement);
  let form = e.target.parentElement;
  //console.log(form.children[0]);
  let todoText = form.children[0].value;
  //console.log(todoText);
  let todoMonth = form.children[1].value;
  //console.log(todoMonth);
  let todoDate = form.children[2].value;
  //console.log(todoDay);
  if (todoText === "") {
    alert("please enter some Text.");
    return;
  }

  if (
    todoMonth == 1 ||
    todoMonth == 3 ||
    todoMonth == 5 ||
    todoMonth == 7 ||
    todoMonth == 8 ||
    todoMonth == 10 ||
    todoMonth == 12
  ) {
    if (todoDate > 31 || todoDate < 1) {
      alert("please enter correct date.");
      return;
    }
  } else if (
    todoMonth == 4 ||
    todoMonth == 6 ||
    todoMonth == 9 ||
    todoMonth == 11
  ) {
    if (todoDate > 30 || todoDate < 1) {
      alert("please enter correct date.");
      return;
    }
  } else if (todoMonth == 2) {
    if (todoDate > 28 || todoDate < 1) {
      alert("please enter correct date.");
      return;
    }
  } else {
    alert("please enter correct month.");
    return;
  }
  //create a todo
  let todo = document.createElement("div");
  todo.classList.add("todo");
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  time.innerText = todoMonth + " / " + todoDate;

  todo.appendChild(text);
  todo.appendChild(time);

  //create green check and red trash can
  let completeButton = document.createElement("button");
  completeButton.classList.add("complete");
  completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';

  completeButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    //console.log(e.target.parentElement);
    todoItem.classList.toggle("done");
  });

  let trashButton = document.createElement("button");
  trashButton.classList.add("trash");
  trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  trashButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    //console.log(e.target.parentElement);
    todoItem.addEventListener("animationend", () => {
      let text = todoItem.children[0].innerText;
      let myListArray = JSON.parse(localStorage.getItem("list"));
      myListArray.forEach((item, index) => {
        if (item.todoText == text) {
          myListArray.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(myListArray));
        }
      });
      todoItem.remove();
    });
    todoItem.style.animation = "scaleDown 0.3s forwards";
    //todoItem.remove();
  });

  todo.appendChild(completeButton);
  todo.appendChild(trashButton);

  todo.style.animation = "scaleUp 0.5s ease";

  //create an obj
  let myTodo = {
    todoText: todoText,
    todoMonth: todoMonth,
    todoDate: todoDate,
  };
  //store data into array of objects
  let myList = localStorage.getItem("list");
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    let myListArray = JSON.parse(myList);
    myListArray.push(myTodo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }

  form.children[0].value = "";
  form.children[1].value = "";
  form.children[2].value = "";
  section.appendChild(todo);
});
loadData();

function loadData() {
  let myList = localStorage.getItem("list");
  if (myList !== null) {
    let myListArray = JSON.parse(myList);
    myListArray.forEach((item) => {
      let todo = document.createElement("div");
      todo.classList.add("todo");
      let text = document.createElement("p");
      text.classList.add("todo-text");
      text.innerText = item.todoText;
      let time = document.createElement("p");
      time.classList.add("todo-time");
      time.innerText = item.todoMonth + " / " + item.todoDate;
      todo.appendChild(text);
      todo.appendChild(time);

      let completeButton = document.createElement("button");
      completeButton.classList.add("complete");
      completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';

      completeButton.addEventListener("click", (e) => {
        let todoItem = e.target.parentElement;
        //console.log(e.target.parentElement);
        todoItem.classList.toggle("done");
      });

      let trashButton = document.createElement("button");
      trashButton.classList.add("trash");
      trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

      trashButton.addEventListener("click", (e) => {
        let todoItem = e.target.parentElement;
        //console.log(e.target.parentElement);
        todoItem.addEventListener("animationend", () => {
          //remove from local storage
          let text = todoItem.children[0].innerText;
          let myListArray = JSON.parse(localStorage.getItem("list"));
          myListArray.forEach((item, index) => {
            if (item.todoText == text) {
              myListArray.splice(index, 1);
              localStorage.setItem("list", JSON.stringify(myListArray));
            }
          });
          todoItem.remove();
        });
        todoItem.style.animation = "scaleDown 0.3s forwards";
        //todoItem.remove();
      });
      todo.appendChild(completeButton);
      todo.appendChild(trashButton);

      section.appendChild(todo);
    });
  }
}

function mergeTime(arr1, arr2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
      result.push(arr2[j]);
      j++;
    } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
      result.push(arr1[i]);
      i++;
    } else if (Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)) {
      if (Number(arr1[i].todoDate) > Number(arr2[j].todoDate)) {
        result.push(arr2[j]);
        j++;
      } else {
        result.push(arr1[i]);
        i++;
      }
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let right = arr.slice(0, middle);
    let left = arr.slice(middle, arr.length);
    return mergeTime(mergeSort(right), mergeSort(left));
  }
}

//console.log(mergeSort(JSON.parse(localStorage.getItem("list"))));

let sortButton = document.querySelector("div.sort button");
sortButton.addEventListener("click", () => {
  let sortedArray = mergeSort(JSON.parse(localStorage.getItem("list")));
  localStorage.setItem("list", JSON.stringify(sortedArray));

  //remove data
  let len = section.children.length;
  for (let i = 0; i < len; i++) {
    section.children[0].remove();
  }
  loadData();
});
