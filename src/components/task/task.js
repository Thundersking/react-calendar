import React, { useState } from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';


function Task({getValue, datClick, addNewTask, notes, editId, changeProp, deleteTask, taskDone, setEditId}) {

    const textTask = notes.map((note) => {
        if(note.date == datClick.date) {
            return <div key={note.id} className="block-task__item">
                        <span className={note.done ? "item-note task-done" : "item-note"} onClick={() => setEditId(note.id)}>{note.tasksActive}</span>
                        <div className="block-task__btn">
                            <Button outline color="primary" size="sm" onClick={() => taskDone(note.id)} >Сделано</Button>
                            <Button outline color="primary" size="sm" onClick={() => deleteTask(note.id)}>Удалить</Button>
                        </div>
                    </div>
        }
    });

    return (
        <div className="task">
            <h3 className="header-color">Задачи:</h3>
            <InputGroup className="task-form">
                <Input value={getValue('tasksActive')} onChange={event => changeProp('tasksActive', event)} />
                <InputGroupAddon addonType="prepend"><Button onClick={() => addNewTask()} color="primary">{editId ? 'Сохранить' : 'Добавить'}</Button></InputGroupAddon>
            </InputGroup>
            <div className="block-task">
                {textTask}
            </div>
        </div>
    )
}

export default Task;