import React, { Component } from 'react';

class RadioButtonGroup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOption: null,
    }
  }

  handleChange = (evt) => this.setState({
    selectedOption: evt.target.value,
  })

  renderRadioButton = (item, index) => {
    const { id, ...rest } = this.props;
    const { selectedOption } = this.state;
    const option = `${id}-${index}`;

    return (
      <input
        key={index}
        type="radio"
        value={option}
        checked={selectedOption === option}
        onChange={this.handleChange}
        {...rest}
      />
    );
  }

  render() {
    const { group } = this.props;
    return group.map(this.renderRadioButton)
  }
};

export default RadioButtonGroup;
