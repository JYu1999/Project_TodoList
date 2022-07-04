let add = document.querySelector("form button");
let section = document.querySelector("section");

add.addEventListener("click", (e) => {
  //prevent form from submitting
  e.preventDefault();
  console.log(e.target.parentElement);
  let form = e.target.parentElement;
  //console.log(form.children[0]);
  let todoText = form.children[0].value;
  //console.log(todoText);
  let todoMonth = form.children[1].value;
  //console.log(todoMonth);
  let todoDay = form.children[2].value;
  //console.log(todoDay);

  //create a todo
  let todo = document.createElement("div");
  todo.classList.add("todo");
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  time.innerText = todoMonth + " / " + todoDay;

  todo.appendChild(text);
  todo.appendChild(time);

  //create green check and red trash can
  let completeButton = document.createElement("button");
  completeButton.classList.add("complete");
  completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';

  let trashButton = document.createElement("button");
  trashButton.classList.add("trash");
  trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  todo.appendChild(completeButton);
  todo.appendChild(trashButton);

  section.appendChild(todo);
});
