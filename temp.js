//let tc = document.querySelector(".ticket-container");
// let allFilters = document.querySelectorAll(".filter");
// let selectedPriority = "pink";
// let selectedTicketsColor = undefined;
let tc = $(".ticket-container");
let allFilters = $(".filter");
let selectedPriority = "pink";
let selectedTicketsColor = undefined;
let modalVisible = false;

// function loadTickets(priority){
//     let allTaskData = localStorage.getItem("allTasks");

//     if(allTaskData != null) {
//         let data = JSON.parse(allTaskData);
//         if(priority){
//             data = data.filter(function(e) {
//                 return e.selectedPriority == priority;
//             });
//         }
//         tc.html("");
//         for(let i = 0; i < data.length; i++) {
//             let ticket = $("<div></div>");
//             ticket.addClass("ticket");
//             ticket.html(`<div class="ticket-color ticket-color-${data[i].selectedPriority}"></div>
//                         <div class="ticket-id">${data[i].taskId}</div>
//                         <div class="task">
//                             ${data[i].task}
//                         </div>`);
//             ticket.click(function(e){
//                 if($(this).hasClass("active")) {
//                     $(this).removeClass("active");
//                 } else {
//                     $(this).addClass("active");
//                 }
//             });
            
//             tc.append(ticket);
//         }
//     }
// }
// loadTickets();

// for(let i=0 ; i<allFilters.length ; i++){
//     allFilters[i].click(function(e){
//         filterHandler();
//     });
// }

// function filterHandler(e){
//     // let classFilter = e.currentTarget.children[0].classList[0];
//     // tc.style.backgroundColor = classFilter.split("-")[0];
//        if($(this).hasClass("active")){
//             $(this).removeClass("active");
//             loadTickets();
//        }
//        else{
//             let selectedFilter = $(".filter.active");
//             if(selectedFilter){
//                 selectedFilter.removeClass("active");
//             }
//             $(this).addClass("active");
//             loadTickets($(this).children[0].classList[0].split("-")[0]);
//        }
//        modalVisible = false;
// }


let addButtton = $(".add");

addButtton.click(function(e){
    showModal();
});

function showModal(e){
    if(!modalVisible){
        let modal = $("<div></div>");
        modal.addClass("modal");
        modal.html(`<div class="task-to-be-added" spellcheck = "false" data-type="false" contenteditable="true">
                        <div class = "placeholder">Enter your text here</div>
                    </div>
                    <div class = "priority-list">
                        <div class = "pink-modal-filter modal-filter active"></div>
                        <div class = "blue-modal-filter modal-filter"></div>
                        <div class = "red-modal-filter modal-filter"></div>
                        <div class = "green-modal-filter modal-filter"></div>
                    </div>`) ; 
        $(".ticket-container").append(modal);
        let taskTyper = $(".task-to-be-added");
        selectedPriority = "pink";
        $(".task-to-be-added").click(function(e){
            if($(this).attr("data-type") == "false"){
                $(this).html("");
                $(this).attr("data-type", "true");
            }
        });

        taskTyper.keypress(function(e){
            // addTicket.bind(this,taskTyper);
            addTicket(e);
        });

        modalVisible = true;
        
        let modalFilters = $(".modal-filter");
       
        console.log(modalFilters.length);
        for(let i=0; i<modalFilters.length ; i++){
            $(modalFilters[i]).click(function(e){
                console.log(modalFilters[i]);
                console.log(e);
                selectPriority(e);
                $(modalFilters[i]).addClass("active");
            }) ;
        }
    }
}

function selectPriority(e){
    let activeFilter  = $(".modal-filter.active");
    $(".modal-filter.active").removeClass("active");
    selectedPriority = $(e.currentTarget).attr('class').split("-")[0];
    // console.log(e);
    // console.log(selectedPriority);
    
    // console.log(e);
 }

function addTicket(e){
    console.log(this);
    // if($(this).key=="Enter" && $(this).shiftKey == false && taskTyper.text().trim()!=""){
        
    //     let ticket = $("<div></div>");
    //     let id = uid();
    //     let task = taskTyper.text();
    //     ticket.addClass("ticket");
    //     ticket.html(`<div class = "ticket-color ticket-color-${selectedPriority}"></div>
    //                     <div class = "ticket-id">${id}</div>
    //                     <div class = "task">
    //                         ${task}
    //                     </div>`);

    //     $(".modal").remove();
    //     modalVisible = false;
    //     ticket.click(function(e){
    //         if(e.currentTarget.classList.contains("active")){
    //             e.currentTarget.classList.remove("active");
    //         }
    //         else{
    //             e.currentTarget.classList.add("active");
    //         }
    //     });
        
    //     tc.append(ticket);

    //     let allTaskData = localStorage.getItem("allTasks");
    //     if(allTaskData == null) {
    //         let data = [{"taskId" : id, "task" : task, "selectedPriority" : selectedPriority}];
    //         localStorage.setItem("allTasks", JSON.stringify(data));
    //     } else {
    //         let data = JSON.parse(allTaskData);
    //         data.push({"taskId" : id, "task" : task, "selectedPriority" : selectedPriority});
    //         localStorage.setItem("allTasks", JSON.stringify(data));
    //     }

    //     let selectedFilter = $(".filter.active");
    //     let priority = selectedFilter.children[0].classList[0].split("-")[0];
    //     if(selectedFilter){
    //         loadTickets(priority);
    //     }
    //     else{
    //         loadTickets();
    //     }
    // }
    // else if(e.key=="Enter" && e.shiftKey == false){
    //     e.preventDefault();
    //     alert("You have not typed anything");
    // }

}

// let deleteButton = $(".delete");

// deleteButton.click(function(e){
//     // My method
//     // let selectedtickets = document.querySelectorAll(".ticket");
//     // let ans = [];
//     // console.log(selectedtickets);
//     // for(let i=0;i<selectedtickets.length;i++){

//     //     if(selectedtickets[i].classList.contains("active")){
//     //         selectedtickets[i].remove();
//     //     }
//     //     else{
//     //         ans.push(selectedtickets[i]);
//     //     }

//     // }
//     // // console.log(ans);
//     // localStorage.removeItem("allTasks");
//     // for(let i=0;i<ans.length;i++){
//     //     let allTaskData = localStorage.getItem("allTasks");
//     //     let id = ans[i].children[1].innerText;
//     //     let task = ans[i].children[2].innerText;
//     //     let priority = ans[i].children[0].classList[1].split("-")[2];
//     //     if(allTaskData == null) {
//     //         let data = [{"taskId" : id, "task" : task, "selectedPriority" : priority}];
//     //         localStorage.setItem("allTasks", JSON.stringify(data));
//     //     } else {
//     //         let data = JSON.parse(allTaskData);
//     //         data.push({"taskId" : id, "task" : task, "selectedPriority" : priority});
//     //         localStorage.setItem("allTasks", JSON.stringify(data));
//     //     }
//     // }
//     let selectedTickets = $(".ticket.active");
//     let allTasks = JSON.parse(localStorage.getItem("allTasks"));

//     for(let i=0;i<selectedTickets.length;i++){
//         selectedTickets[i].remove();
//         allTasks = allTasks.filter(function(e){
//             return e.taskId != selectedTickets[i].$(".ticket-id").text();
//         })

//     }
//     localStorage.setItem("allTasks", JSON.stringify(allTasks));
    
// });