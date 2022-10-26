function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


const form = document.querySelector('#new_task_form');
const input = document.querySelector('#new_task_input');
const list_element = document.querySelector('#tasks');

window.addEventListener('load',() => {

    form.addEventListener('submit',(e) => {
        e.preventDefault(); //preventing from loading

        const task = input.value;
        if(!task){
            alert('Please fill out the task');
            return;
        }
        const task_element = document.createElement("div");
        task_element.classList.add("task");

        const task_content_element = document.createElement("div");
        task_content_element.classList.add("content");
        task_element.appendChild(task_content_element);

        const task_input_element = document.createElement("input");
        task_input_element.classList.add("text");
        task_input_element.type = "text";
        task_input_element.value = task;
        task_input_element.setAttribute('disabled', '');
        task_input_element.classList.add("prevent-select");

        task_content_element.appendChild(task_input_element);
        

        const task_action_element = document.createElement("div");
        task_action_element.classList.add("actions");
        
        
        const task_btn_element1 = document.createElement("button");
        task_btn_element1.classList.add("edit");
        task_btn_element1.textContent = "Edit";

        const task_btn_element2 = document.createElement("button");
        task_btn_element2.classList.add("delete");
        task_btn_element2.textContent = "Delete";
        


        task_action_element.appendChild(task_btn_element1);
        task_action_element.appendChild(task_btn_element2);
        

        task_element.appendChild(task_action_element);

        list_element.appendChild(task_element);

        storeTaskInLocalStorage(input.value);

        input.value = "";

        task_btn_element1.addEventListener('click', () =>{
            const previous_task = task;
            if(task_btn_element1.textContent.toLowerCase()=="edit"){
                task_input_element.removeAttribute("disabled");
                task_input_element.focus();
                task_btn_element1.textContent = "Save";
                
            }else if(task_btn_element1.textContent.toLowerCase()=="save"){
                task_input_element.setAttribute('disabled', '');
                task_btn_element1.textContent = "Edit";
                const new_task = task_input_element.value;
                replace_new_edit_in_localStorage(previous_task, new_task);
            } 
        });

        task_btn_element2.addEventListener('click', ()=>{
            list_element.removeChild(task_element);
            delete_from_local_storage(task);
        });

    });
});


document.addEventListener('DOMContentLoaded',() =>{
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    //["task 1","task 2","good morning","brushing teeth"]
    tasks.forEach(t =>{
        const task_element = document.createElement("div");
        task_element.classList.add("task");

        const task_content_element = document.createElement("div");
        task_content_element.classList.add("content");
        task_element.appendChild(task_content_element);

        const task_input_element = document.createElement("input");
        task_input_element.classList.add("text");
        task_input_element.type = "text";
        task_input_element.value = t;
        task_input_element.setAttribute('disabled', '');
        task_input_element.classList.add("prevent-select");

        task_content_element.appendChild(task_input_element);
        

        const task_action_element = document.createElement("div");
        task_action_element.classList.add("actions");
        
        
        const task_btn_element1 = document.createElement("button");
        task_btn_element1.classList.add("edit");
        task_btn_element1.textContent = "Edit";

        const task_btn_element2 = document.createElement("button");
        task_btn_element2.classList.add("delete");
        task_btn_element2.textContent = "Delete";
        


        task_action_element.appendChild(task_btn_element1);
        task_action_element.appendChild(task_btn_element2);
        

        task_element.appendChild(task_action_element);

        list_element.appendChild(task_element); 

        task_btn_element1.addEventListener('click', () =>{
            previous_task = t;
            if(task_btn_element1.textContent.toLowerCase()=="edit"){
                task_input_element.removeAttribute("disabled");
                task_input_element.focus();
                task_btn_element1.textContent = "Save";
            }else{
                task_input_element.setAttribute('disabled', '');
                task_btn_element1.textContent = "Edit";
                const new_task = task_input_element.value;
                replace_new_edit_in_localStorage(previous_task, new_task);
            } 
        });

        task_btn_element2.addEventListener('click', ()=>{
            list_element.removeChild(task_element);
            delete_from_local_storage(t);
        });
    });
});


function delete_from_local_storage(task){
    let tasks;
    tasks = JSON.parse(localStorage.getItem('tasks'));
    const index = tasks.indexOf(task);
    if (index > -1) {
        tasks.splice(index, 1);
      }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



function replace_new_edit_in_localStorage(previous_task, new_task){
    let tasks;
    tasks = JSON.parse(localStorage.getItem('tasks'));
    for (var i = 0; i < tasks.length; i++) {
        if(tasks[i]==previous_task){
            tasks[i] = new_task;
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}