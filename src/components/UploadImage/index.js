import React, { Component, Fragment } from 'react';
import styles from './styles.css';

class UploadImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
    }
  }

  componentWillUnmount() {
    const { decreaseCount } = this.props;
    const { file } = this.state;
    file && decreaseCount('images');
  }

  onChange = (evt) => {
    const { increaseCount } = this.props;
    const { file } = this.state;
    !file && increaseCount('images');

    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    })
  }

  handleClick = () => this.refs.uploadInput.click();

  render() {
    const { id, className } = this.props;
    const { file } = this.state;

    return (
      <div className="image-container">
        {
          file ?
            <img src={file} className={className} onClick={this.handleClick} /> :
            <div className={className} onClick={this.handleClick}>+</div>
        }
        <input
          id={id}
          ref="uploadInput"
          type="file"
          hidden
          accept=".jpg,.jpeg,.png"
          onChange={this.onChange}
        />
      </div>
    )
  }
};

export default UploadImage;
