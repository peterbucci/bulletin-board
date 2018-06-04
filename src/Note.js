import React, { Component } from 'react'
import FaPencil from 'react-icons/lib/fa/pencil'
import FaTrash from 'react-icons/lib/fa/trash'
import FaFloppy0 from 'react-icons/lib/fa/floppy-o'

const randomBetween = (x, y, s) => x + Math.ceil(Math.random() * (y - x)) + s

export const Note = ({
  id,
  text,
  x,
  y,
  rotation,
  editing,
  style,
  children,
  // callbacks
  edit,
  save,
  update,
  remove,
  toggleEdit,
}) => (
  <div className="note" style={{
    right: `${x}px`,
    top: `${y}px`,
    transform: `rotate(${rotation}deg)`,
  }}>
    {editing ?
      <div>
        <textarea defaultValue={text} onChange={e => update(e.target.value)} />
        <button id="save" onClick={save}><FaFloppy0 /></button>
      </div>
      :
      [
        <p key={1}>{text}</p>,
        <span key={2}>
          <button onClick={toggleEdit} id="edit"><FaPencil /></button>
          <button onClick={() => remove(id)} id="remove"><FaTrash /></button>
        </span>
      ]
    }
  </div>
)

class NoteLifecycle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      text: props.text
    }

    this.renderDisplay = this.renderDisplay.bind(this)
  }

  // componentDidMount() {
  //   var textArea
  //   if (this.state.editing) {
  //     textArea = this.state.text
  //     textArea.focus()
  //     textArea.select()
  //   }
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     this.props.children !== nextProps.children || this.state !== nextState
  //   )
  // }

  edit = () => {
    this.setState({
      editing: true
    })
  }

  save = () => {
    this.props.update(this.state.text, this.props.id)
    this.toggleEdit()
  }

  update = (text) => {
    this.setState({text})
  }

  toggleEdit = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  renderDisplay() {
    return (
      <div className="note" style={this.style}>

      </div>
    )
  }

  render() {
    console.log(this.props)
    return <Note
      {...this.props}
      editing={this.state.editing}
      toggleEdit={this.toggleEdit}
      style={this.style}
      save={this.save}
      update={this.update}
    />
  }
}

export default NoteLifecycle