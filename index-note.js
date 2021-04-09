import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class App extends React.Component {
	constructor() {
		super();
        this.state = {
            note: [],
            value: '',
            valueEdit: ''
        };
    }

    handleTextareaChange(event) {
        this.setState({value: event.target.value});
    }

    handleIputChange(event) {
        this.setState({valueInput: event.target.value});
    }

    addNote() {
        let newDate = new Date();
        let dates = (newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds());

        this.state.note.push({time: dates, header: this.state.valueInput, text: this.state.value, edit: false});
        this.setState({note: this.state.note})
    }

    deleteItem(index) {
        this.state.note.splice(index, 1);
        this.setState({note: this.state.note});
    }

    editItem(index) {
        this.state.note[index].edit = !this.state.note[index].edit;
        this.setState({note: this.state.note});
    }

    handleEditChange(index, event) {
        // this.setState({valueEdit: event.target.value})
        this.state.note[index].text = event.target.value;
        this.setState({note: this.state.note});
    }

    render() {
        const notes = this.state.note.map((item, index) => {
            let edits = <textarea value={item.text} onChange={this.handleEditChange.bind(this, index)} />
            return (
                <div key={index} className='notes'>
                    <h1 className='header'>{item.header}</h1>
                    <span>{item.time}</span>
                    {item.edit ? edits : <p>{item.text}</p>}
                    <div className="btn-note">
                        <button onClick={this.deleteItem.bind(this, index)}>Удалить</button>
                        <button onClick={this.editItem.bind(this, index)}>{item.edit ? 'Изменить' : 'Редактировать'}</button>
                    </div>
                </div>
            )
        });

        return (
            <div className='note'>
                <div className='textarea'>
                    <input className='inputHeader' placeholder='Введите заголовок' value={this.state.valueInput} onChange={this.handleIputChange.bind(this)} />
                    <textarea placeholder='Введите текст заметки' value={this.state.value} onChange={this.handleTextareaChange.bind(this)} />
                    <button className='btn-main' onClick={this.addNote.bind(this)}>Добавить</button>
                </div>
                <div className='text'>
                    {notes}
                </div>
            </div>
        )
    }
}
  
ReactDOM.render(
    <App />,
    document.getElementById('root')
)