$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(function(data){
        data.forEach(function(todo){
            addTodo(todo);
        })
    })
    .catch(function(err){
        console.log(err);
    });
    $("#todoInput").keypress(function(event){
        if(event.which == 13) {
            //send request to create new todo
            var userInput = $("#todoInput").val();
            $.post('/api/todos', {name: userInput})
            .then(function(newTodo){
                addTodo(newTodo);
                $("#todoInput").val("");
            })
            .catch(function(err){
                console.log(err);
            })
        }
    });
    // $(".task").click(function(task){
    //     $.put('/api/todos', {name: })
    //     task.addClass("done");
    // })
})

function addTodo(todo) {
    let newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>')
            if(todo.completed){
                newTodo.addClass("done");
            }
            $(".list").append(newTodo);
}