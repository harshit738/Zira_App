let tc = document.querySelector(".ticket-container");
let allFilters = document.querySelectorAll(".filter");
let selectedPriority = "pink";
let selectedTicketsColor = undefined;

function loadTickets(priority){
    let allTaskData = localStorage.getItem("allTasks");

    if(allTaskData != null) {
        let data = JSON.parse(allTaskData);
        if(priority){
            data = data.filter(function(e) {
                return e.selectedPriority == priority;
            });
        }
        tc.innerHTML = "";
        for(let i = 0; i < data.length; i++) {
            let ticket = document.createElement("div");
            ticket.classList.add("ticket");
            ticket.innerHTML =  `<div class="ticket-color ticket-color-${data[i].selectedPriority}"></div>
                        <div class="ticket-id">${data[i].taskId}</div>
                        <div class="task">
                            ${data[i].task}
                        </div>`;
            ticket.addEventListener("click", function(e) {
                if(e.currentTarget.classList.contains("active")) {
                    e.currentTarget.classList.remove("active");
                } else {
                    e.currentTarget.classList.add("active");
                }
            });
            tc.appendChild(ticket);
        }
    }
}
loadTickets();

for(let i=0 ; i<allFilters.length ; i++){
    allFilters[i].addEventListener("click", filterHandler);
}

function filterHandler(e){
    // let classFilter = e.currentTarget.children[0].classList[0];
    // tc.style.backgroundColor = classFilter.split("-")[0];
       if(e.currentTarget.classList.contains("active")){
            e.currentTarget.classList.remove("active");
            loadTickets();
       }
       else{
            let selectedFilter = document.querySelector(".filter.active");
            if(selectedFilter){
                selectedFilter.classList.remove("active");
            }
            e.currentTarget.classList.add("active");
            loadTickets(e.currentTarget.children[0].classList[0].split("-")[0]);
       }
       modalVisible = false;
}

let modalVisible = false;

let addButtton = document.querySelector(".add");

addButtton.addEventListener("click", showModal);

function showModal(e){
    if(!modalVisible){
        let modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `<div class="task-to-be-added" spellcheck = "false" data-type="false" contenteditable="true">
                        <div class = "placeholder">Enter your text here</div>
                    </div>
                    <div class = "priority-list">
                        <div class = "pink-modal-filter modal-filter active"></div>
                        <div class = "blue-modal-filter modal-filter"></div>
                        <div class = "red-modal-filter modal-filter"></div>
                        <div class = "green-modal-filter modal-filter"></div>
                    </div>` ; 
        tc.appendChild(modal);
        let taskTyper = document.querySelector(".task-to-be-added");
        selectedPriority = "pink";
        taskTyper.addEventListener("click", function(e){
            if(e.currentTarget.getAttribute("data-type") == "false"){
                e.currentTarget.innerHTML = "";
                e.currentTarget.setAttribute("data-type", "true");
            }
        })

        taskTyper.addEventListener("keypress", addTicket.bind(this,taskTyper));

        modalVisible = true;
        
        let modalFilters = document.querySelectorAll(".modal-filter");
       
        for(let i=0; i<modalFilters.length ; i++){
            modalFilters[i].addEventListener("click", selectPriority);
        }
    }
}

function selectPriority(e){
    let activeFilter  = document.querySelector(".modal-filter.active");
    activeFilter.classList.remove("active");
    selectedPriority = e.currentTarget.classList[0].split("-")[0];
    e.currentTarget.classList.add("active");
    
}

function addTicket(taskTyper, e){
    if(e.key=="Enter" && e.shiftKey == false && taskTyper.innerText.trim()!=""){
        
        let ticket = document.createElement("div");
        let id = uid();
        let task = taskTyper.innerText;
        ticket.classList.add("ticket");
        ticket.innerHTML = `<div class = "ticket-color ticket-color-${selectedPriority}"></div>
                        <div class = "ticket-id">${id}</div>
                        <div class = "task">
                            ${task}
                        </div>`;

        document.querySelector(".modal").remove();
        modalVisible = false;
        ticket.addEventListener("click", function(e){
            if(e.currentTarget.classList.contains("active")){
                e.currentTarget.classList.remove("active");
            }
            else{
                e.currentTarget.classList.add("active");
            }
        });
        
        tc.appendChild(ticket);

        let allTaskData = localStorage.getItem("allTasks");
        if(allTaskData == null) {
            let data = [{"taskId" : id, "task" : task, "selectedPriority" : selectedPriority}];
            localStorage.setItem("allTasks", JSON.stringify(data));
        } else {
            let data = JSON.parse(allTaskData);
            data.push({"taskId" : id, "task" : task, "selectedPriority" : selectedPriority});
            localStorage.setItem("allTasks", JSON.stringify(data));
        }

        let selectedFilter = document.querySelector(".filter.active");
        
        if(selectedFilter){
            let priority = selectedFilter.children[0].classList[0].split("-")[0];
            loadTickets(priority);
        }
        else{
            loadTickets();
        }
    }
    else if(e.key=="Enter" && e.shiftKey == false){
        e.preventDefault();
        alert("You have not typed anything");
    }

}

let deleteButton = document.querySelector(".delete");

deleteButton.addEventListener("click", function(e){
    // My method
    // let selectedtickets = document.querySelectorAll(".ticket");
    // let ans = [];
    // console.log(selectedtickets);
    // for(let i=0;i<selectedtickets.length;i++){

    //     if(selectedtickets[i].classList.contains("active")){
    //         selectedtickets[i].remove();
    //     }
    //     else{
    //         ans.push(selectedtickets[i]);
    //     }

    // }
    // // console.log(ans);
    // localStorage.removeItem("allTasks");
    // for(let i=0;i<ans.length;i++){
    //     let allTaskData = localStorage.getItem("allTasks");
    //     let id = ans[i].children[1].innerText;
    //     let task = ans[i].children[2].innerText;
    //     let priority = ans[i].children[0].classList[1].split("-")[2];
    //     if(allTaskData == null) {
    //         let data = [{"taskId" : id, "task" : task, "selectedPriority" : priority}];
    //         localStorage.setItem("allTasks", JSON.stringify(data));
    //     } else {
    //         let data = JSON.parse(allTaskData);
    //         data.push({"taskId" : id, "task" : task, "selectedPriority" : priority});
    //         localStorage.setItem("allTasks", JSON.stringify(data));
    //     }
    // }
    let selectedTickets = document.querySelectorAll(".ticket.active");
    let allTasks = JSON.parse(localStorage.getItem("allTasks"));

    for(let i=0;i<selectedTickets.length;i++){
        selectedTickets[i].remove();
        allTasks = allTasks.filter(function(e){
            return e.taskId != selectedTickets[i].querySelector(".ticket-id").innerText;
        })

    }
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    
});