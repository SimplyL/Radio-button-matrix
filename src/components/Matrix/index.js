import React, { Component, Fragment } from 'react';
import RadioButtonGroup from '../RadioButtonGroup';
import UploadImage from '../UploadImage';
import EditableLabel from '../EditableLabel';
import styles from './styles.css';
import { timingSafeEqual } from 'crypto';

class Matrix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 4,
      columns: 3,
    }
  }

  increaseCount = value => this.setState({ [value]: this.state[value] + 1 });

  decreseCount = value => this.setState({ [value]: this.state[value] - 1 });

  renderMatrix = () => {
    const { rows, columns } = this.state;
    const matrix = this.createEmptyMatrix(rows, columns);

    return matrix.map(this.renderRow);
  };

  createEmptyMatrix = (rows, columns) => (
    Array(rows).fill().map(() => Array(columns).fill())
  );

  renderRow = (row, index) => {
    return (
      <Fragment key={index}>
        {index === 0 && this.renderColumnLabels(row)}
        <div className="row grid-container" key={index}>
          <div className="row-label-container">
            <UploadImage id={`upload-row-${index}`} />
            <EditableLabel className="row-label" text={`row${index + 1}`} />
          </div>
          <span className="column-container">
            <RadioButtonGroup className="column" group={row} />
          </span>
        </div>
      </Fragment>
    );
  }

  renderColumnLabels = (row) => {
    return (
      <div className="column-container">
        {row.map((column, index) => {
          return (
            <div key={index}>
              <UploadImage id={`upload-col-${index}`} />
              <EditableLabel text={`col${index + 1}`} />
            </div>
          )
        })}
        <span className="button btn-remove" onClick={() => this.decreseCount('columns')}>-</span>
        <span className="button btn-add" onClick={() => this.increaseCount('columns')}>+</span>
      </div>
    );
  }

  render() {
    return (
      <div className="grid-container">
        {this.renderMatrix()}
        <div className="row button btn-remove" onClick={() => this.decreseCount('rows')}>-</div>
        <div className="row button btn-add" onClick={() => this.increaseCount('rows')}>+</div>
      </div>
    )
  }
};

export default Matrix;
