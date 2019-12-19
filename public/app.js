//Run only when webpage (document) has loaded
$(document).ready(function(){
    //Retrieves API data and displays each todo in HTML
    $.getJSON("/api/todos")
    .then(function(data){
        data.forEach(function(todo){
            addTodo(todo);
        })
    })
    .catch(function(err){
        console.log(err);
    });
    //Listens for "Enter/Return" key to be pressed
    $("#todoInput").keypress(function(event){
        if(event.which == 13) {
            //send request to create new todo with current input value as "name" value
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
    //update todo when individual todo is clicked
    $(".list").on('click', 'li', function(){
        updateTodo($(this));
    })
    //add click listener to already existing ul class of ".list" because all li are generated after page loads
    $(".list").on('click', 'span', function(event){
        //prevents any parent event listeners from recieving click event
        event.stopPropagation();
        deleteTodo($(this).parent());
    })
})

//Adds a todo to the ul of li's
function addTodo(todo) {
    let newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>')
    //add metadata to each todo so the id and status of the todo can be accessed when updating or deleting
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if(todo.completed){
        newTodo.addClass("done");
    }
    $(".list").append(newTodo);
}

//Updates a todo's "completed" value with a PUT request and toggles HTML classes
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

//Sends a DELETE request to the API using the todo's "id" metadata
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