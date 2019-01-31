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

  handleEdit = evt => this.setState({ editing: !this.state.editing });

  handleChange = evt => this.setState({ label: evt.target.value });

  handleSubmit = (evt) => {
    const value = evt.target.value.trim();
    const { onLabelChange, section, id } = this.props;
    onLabelChange(value, section, id);
    value && this.setState({ editing: false });
  }

  handleKeyDown = (evt) => evt.which === this.ENTER_KEY && this.handleSubmit(evt);

  render() {
    const { editing, label } = this.state;
    const { labelStyle, inputStyle } = this.props;

    const styleLabel = labelStyle ? labelStyle : ' text';
    const styleInput = inputStyle ? inputStyle : 'editable';

    return (
      <Fragment>
        <div className={editing ? 'hidden text' : styleLabel} onDoubleClick={this.handleEdit}>
          {label}
        </div>
        <input
          className={editing ? styleInput : 'hidden'}
          value={label}
          onChange={this.handleChange}
          onBlur={this.handleSubmit}
          onKeyDown={this.handleKeyDown}
        />
      </Fragment>
    )
  }
}

export default EditableLabel;
