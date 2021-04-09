import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { nanoid } from 'nanoid';
import { Container, Row, Col } from 'reactstrap';

import Calendar from "../calendar/calendar";
import Task from "../task/task";

const initCalendar = {
    month: new Date().getMonth(),
    year: new Date().getFullYear()
}

const initNotes = [
    {id: nanoid(), date: '1-4-2021', tasksActive: "Заметка 1 апреля", done: false},
    {id: nanoid(), date: '2-4-2021', tasksActive: "Заметка 2 апреля", done: false},
    {id: nanoid(), date: '3-4-2021', tasksActive: "Заметка 3 апреля", done: false}
];

function App() {
    const [calDate, setCalDate] = useState(initCalendar);
    const [notes, setNotes] = useState(initNotes);
    const [obj, setObj] = useState(getInitObj());
    const [datClick, setDatClick] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem('my-task');
        if(data) {
            setNotes(JSON.parse(data))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('my-task', JSON.stringify(notes))
    })

    const daysWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
    const monthArray = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const yearArray = [];

    for(let i = 2000; i <= 2100; i++) {
        yearArray.push(i)
    }

    function prevClickHandler() {
        let activeTd = document.querySelector('.calendar td.active');
		if(activeTd) {
			activeTd.classList.remove('active');
		}
        if(calDate.month > 0) {
            let month = calDate.month;
            month--;
            setCalDate({...calDate, month: month});
        } else {
            let year = calDate.year;
            year--;
            setCalDate({...calDate, month: 11, year: year});
        }
    }

    function nextClickHandler() {
        let activeTd = document.querySelector('.calendar td.active');
		if(activeTd) {
			activeTd.classList.remove('active');
		}
        if(calDate.month >= 0 && calDate.month < 11) {
            let month = calDate.month;
            month++;
            setCalDate({...calDate, month: month});
        } else {
            let year = calDate.year;
            year++;
            setCalDate({...calDate, month: 0, year: year});
        }
    }

    function tableClickHandler(event) {
        let activeTd = document.querySelector('.calendar td.active');
        let target = event.target;
        if (target.innerHTML === '') {
            if(activeTd) {
                activeTd.classList.remove('active');
            }
        } else {
            if(activeTd) {
                activeTd.classList.remove('active');
            }
            target.classList.add('active');
            let infoDate = target.innerHTML + '-' + (calDate.month + 1) + '-' + calDate.year
            setObj({...obj, date: infoDate});
            setDatClick({date: infoDate});
        }
    };

    function getInitObj() {
        return {
            id: nanoid(),
            date: '',
            tasksActive: [],
            done: false
        }
    }

    function addNewTask() {
        if(editId) {
            setEditId(null);
        } else {
            if(obj.tasksActive.length > 0) {
                setNotes([...notes, obj]);
                setObj({...obj, id: nanoid(), tasksActive: ''});
            } else {
                alert('Заполните!');
            }
        }
    }

    function deleteTask(id) {
        setNotes(notes.filter(note => note.id !== id));
    }

    function changeProp(prop, event) {
        if(editId) {
            setNotes(notes.map(note => 
                note.id == editId ? {...note, [prop]: event.target.value} : note
            ))
        } else {
            setObj({...obj, [prop]: event.target.value});
        }
    }

    function getValue(prop) {
		if (editId) {
			return notes.reduce((res, note) => note.id === editId ? note[prop] : res, '');
		} else {
			return obj[prop];
		}
	}

    function taskDone(id) {
        setNotes(notes.map(note => {
            if(note.id === id) {
                note.done = !note.done;
            }
            return note;  
        }))        
    }


    return (
        <Container className="main-block">
            <Row>
                <Col>
                    <Calendar addNewTask={addNewTask} tableClickHandler={tableClickHandler} prevClickHandler={prevClickHandler} nextClickHandler={nextClickHandler} calDate={calDate} monthArray={monthArray} daysWeek={daysWeek} yearArray={yearArray} />
                </Col>
                <Col>
                    <Task editId={editId} getValue={getValue} setEditId={setEditId} taskDone={taskDone} deleteTask={deleteTask} datClick={datClick} addNewTask={addNewTask} notes={notes} obj={obj} changeProp={changeProp} />
                </Col>
            </Row>
        </Container>
    )
}



export default App;