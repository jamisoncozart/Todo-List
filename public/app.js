$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(function(data){
        data.forEach(function(todo){
            let newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>')
            if(todo.completed){
                newTodo.addClass("done");
            }
            $(".list").append(newTodo);
        })
    })
    .catch(function(err){
        console.log(err);
    });
})