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
    $(".list").on('click', 'li', function(){
        updateTodo($(this));
    })
    //add click listener to already existing ul class of ".list" because all li are generated after page loads
    $(".list").on('click', 'span', function(event){
        event.stopPropagation();
        deleteTodo($(this).parent());
    })
})

function addTodo(todo) {
    let newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>')
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if(todo.completed){
        newTodo.addClass("done");
    }
    $(".list").append(newTodo);
}

function updateTodo(todo) {
    let updatedUrl = '/api/todos/' + todo.data('id')
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone};
    $.ajax({
        method: 'PUT',
        url: updatedUrl,
        data: updateData
    })
    .then(function(updatedTodo){
        todo.toggleClass("done");
        todo.data('completed', isDone);
    })
}

function deleteTodo(todo) {
    let clickedId = todo.data('id')
    let deleteUrl = '/api/todos/' + clickedId
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(function(data){
        todo.remove();
    })
    .catch(function(err){
        console.log(err);
    })
}