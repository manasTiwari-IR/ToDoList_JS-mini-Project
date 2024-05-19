const tc = document.querySelector(".taskcontainer");
const dis = document.querySelector("#input");
let i = 0;
let count = 0; //count for number of tasks
dis.focus();

function addTask() {
  let input = document.getElementById("input").value;
  if (input.trim() === "") {
    alert("Please enter a task");
    dis.focus();
  } else if (count >= 55) {
    alert("You have reached the maximum number of tasks");
    dis.focus();
  } else {
    let T = document.createElement("div");
    T.className = "TASK";
    T.setAttribute("data-task", `t${i++}`);
    let attri = T.getAttribute("data-task");
    T.innerHTML = `<p>${input}</p>
    <div class="btngrp">
        <button class="btn deletebtn" onclick="removetask('${attri}')" ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                fill="white" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg></button>
        <button class="btn editbtn" onclick="edittask('${attri}')"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"
                fill="white" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
            </svg></button>
    </div>`;
    dis.value = "";
    tc.append(T);
    T.style.transition = "0.2s";
    T.style.opacity = "100%";
    T.style.animation = "addAnimation 0.2s forwards 1";
    //animation = " name duration direction interation-count;

    count++;
    dis.focus();
  }
}

document.querySelector("#input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
    document.getElementById("input").value = "";
  }
});

function removetask(e) {
  let key = document.querySelector(`[data-task="${e}"]`);
  // console.log(key);
  key.style.transition = "0.2s";
  key.style.opacity = "0%";
  key.style.backgroundColor = "transparent";
  key.style.animation = "removeAnimation 0.2s forwards 1";
  // animation = " name duration direction interation-count; " (here)

  setInterval(() => {
    key.remove();
  }, 150);
  count--;
  dis.focus();
}

function edittask(e) {
  let key = document.querySelector(`[data-task="${e}"]`);
  let p = key.querySelector("p");
  let text = p.textContent;
  let input = document.createElement("input");
  let tickbtn = document.createElement("button");
  
  tickbtn.className = "btn tickbtn";
  tickbtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-check-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
  </svg>`;
  
  input.value = text;
  input.className = "editInput";
  input.setAttribute("maxlength", "60");
  input.setAttribute("minlength", "1");
  
  key.querySelector(".btngrp").prepend(tickbtn);
  key.prepend(input);
  p.remove();
  input.focus();
  key.querySelector(".editbtn").style.pointerEvents = "none";
  document.querySelector("#input").style.pointerEvents = "none";
  document.querySelector(".addbtn").style.pointerEvents = "none";
  
  tickbtn.addEventListener("click", function () {
      if (input.value.trim() !== "") {
          p.textContent = input.value;
          input.remove();
          tickbtn.remove();
      key.prepend(p);
      key.querySelector(".editbtn").style.pointerEvents = "auto";
      document.querySelector("#input").style.pointerEvents = "auto";
      document.querySelector(".addbtn").style.pointerEvents = "auto";
    } else {
      alert("Please enter a task");
      input.focus();
    }
  });
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && input.value.trim() !== "") {
      e.preventDefault();
      p.textContent = input.value;
      input.remove();
      tickbtn.remove();
      key.prepend(p);
      key.querySelector(".editbtn").style.pointerEvents = "auto";
      document.querySelector("#input").style.pointerEvents = "auto";
      document.querySelector(".addbtn").style.pointerEvents = "auto";
    }
    if (e.key === "Enter" && input.value.trim() === "") {
      alert("Please enter a task");
      input.focus();
    }
  });
}

function clearAll() {
  let all = document.querySelectorAll(".TASK");
  all.forEach((element) => {
    element.style.transition = "0.2s";
    element.style.opacity = "0%";
    element.style.backgroundColor = "transparent";
    element.style.animation = "removeAnimation 0.2s forwards 1";
    // animation = " name duration direction interation-count; " (here)
    setInterval(() => {
      element.remove();
    }, 150);
  });
  count = 0;
  dis.focus();
}