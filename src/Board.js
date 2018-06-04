import React, { Component } from 'react'
import Note from './Note'
import FaPlus from 'react-icons/lib/fa/plus'

const randomBetween = (x, y) => x + Math.ceil(Math.random() * (y - x))

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: []
    }
    this.add = this.add.bind(this)
    this.eachNote = this.eachNote.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
    this.nextId = this.nextId.bind(this)
  }

  componentWillMount() {
    if (this.props.count) {
      fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
        .then(response => response.json())
        .then(json => json[0]
          .split('. ')
          .forEach(sentence => this.add({
            text: sentence.substring(0, 25),
            x: randomBetween(0, window.innerWidth - 150),
            y: randomBetween(0, window.innerHeight - 150),
            rotation: randomBetween(-25, 25),
          })))
    }
  }

  add({
    text,
    x,
    y,
    rotation,
  }) {
    this.setState(prevState => ({
      notes: [
        ...prevState.notes,
        {
          id: this.nextId(),
          text,
          x,
          y,
          rotation,
        }
      ]
    }))
  }

  nextId() {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }

  update(text, i) {
    this.setState(prevState => ({
      notes: prevState.notes.map(
        note => (note.id !== i) ? note : { ...note, text }
      )

    }))
  }

  remove(id) {
    this.setState(prevState => ({
      notes: prevState.notes.filter(note => note.id !== id)
    }))
  }

  eachNote(note, i) {
    return (
      <Note 
        key={note.id}
        update={this.update}
        remove={this.remove}
        {...note}
      />
    )
  }

  render () {
    return (
      <div className="board">
        {this.state.notes.map(this.eachNote)}
        <button onClick={this.add.bind(null, "New Note")}
          id="add">
          <FaPlus />
        </button>
      </div>
    )
  }
}

export default Board