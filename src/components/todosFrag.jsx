import React from 'react';
import Todo from './todoFrag';

function Todos({todoList,addFlagEvent, updateTodoEvent, deleteTodoEvent, error}) {

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-3">
                    <h1 className="display-6">Todos</h1>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary btn-sm mt-3" onClick={addFlagEvent}>Add</button>
                </div>
            </div>
            {error !== undefined? <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {error}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>: ''}
            <ol className="list-group list-group-numbered">
                {todoList.map(todo => <Todo  key={todo.todo_id} todo={todo} updateTodoEvent={updateTodoEvent} deleteTodoEvent={deleteTodoEvent}/>)}
            </ol>
        </React.Fragment>
    );
};

export default Todos;

