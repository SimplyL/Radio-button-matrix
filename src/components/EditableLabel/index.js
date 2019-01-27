import React, { Component, Fragment } from 'react';
import styles from './styles.css';

class EditableLabel extends Component {
  constructor(props) {
    super(props);

    this.ENTER_KEY = 13;
    this.state = {
      editing: false,
      label: props.text,
    }
  }

  handleEdit = evt => {
    this.setState({
      editing: !this.state.editing,
    });
  }

  handleChange = evt => {
    this.setState({ label: evt.target.value });
  }

  handleSubmit = () => {
    const value = this.state.label.trim();
    if (value) {
      this.setState({
        label: value,
        editing: false,
      });
    }
  }

  handleKeyDown = (evt) => {
    evt.which === this.ENTER_KEY && this.handleSubmit();
  }


  render() {
    return (
      <div className="label-container">
        <div className={this.state.editing ? 'hidden text' : ' text'} onDoubleClick={this.handleEdit}>
          {this.state.label}
        </div>
          <input
            className={this.state.editing ? 'editable' : 'hidden'}
            value={this.state.label}
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
            onKeyDown={this.handleKeyDown}
          />
      </div>
    )
  }
}

export default EditableLabel;
