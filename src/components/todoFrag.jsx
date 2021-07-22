import React from 'react';

function Todo({todo, updateTodoEvent, deleteTodoEvent}) {
    return(    
        <React.Fragment>
                <li className="list-group-item d-flex justify-content-between align-items-start m-1">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{todo.short_desc}</div>
                            {todo.description}
                            <div className="row">
                                <div className="col-md-4">
                                    <span className="badge bg-secondary">Start Date: {todo.plan_start_date}</span>
                                </div>
                                <div className="col-md-4">
                                    <span className="badge bg-secondary">End Date: {todo.plan_end_date}</span>
                                </div>
                                <div className="col-md-4">
                                {todo.status === "COMPLETED"? <span className="badge bg-primary rounded-pill" onClick={() => updateTodoEvent(todo, "INCOMPLETE")}>{todo.status}</span> :
                                <span className="badge bg-danger rounded-pill" onClick={() => updateTodoEvent(todo, "COMPLETED")}>{todo.status}</span>}
                                </div>
                            </div>
                    </div>
                     <button type="button" className="btn btn-outline-danger btn-sm m-2" onClick={() => deleteTodoEvent(todo)}>Delete</button> 
                </li>
        </React.Fragment>
    );
}

export default Todo;