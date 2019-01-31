import React, { Component, Fragment } from 'react';

import Summary from './Summary';
import Legend from './Legend';
import RadioButtonGroup from '../RadioButtonGroup';
import UploadImage from '../UploadImage';
import EditableLabel from '../EditableLabel';
import {
  DEFAULT_ROW_AMOUNT,
  DEFAULT_COLUMN_AMOUNT,
  DEFAULT_INCREMENT,
  DEFAULT_IMAGE_AMOUNT,
  DEFAULT_QUESTION_TITLE,
  NAME_COLUMNS,
  NAME_ROWS,
  NAME_COLUMN_LABELS,
  NAME_ROW_LABELS,
  TEXT_ROW,
  TEXT_COL,
  TEXT_LEGEND,
  TEXT_NOTES,
  TEXT_LEGEND_ADD,
  TEXT_LEGEND_REMOVE,
  TEXT_LEGEND_IMAGE,
  TEXT_NOTE_ITALIC,
  TEXT_NOTE_EDITABLE,
  MIN_AMOUNT,
  MAX_AMOUNT,
} from './constants';
import styles from './styles.css';

class Matrix extends Component {
  constructor(props) {
    super(props);

    this.state = {
      [NAME_ROWS]: DEFAULT_ROW_AMOUNT,
      [NAME_COLUMNS]: DEFAULT_COLUMN_AMOUNT,
      [NAME_COLUMN_LABELS]: this.setInitialLabels(DEFAULT_COLUMN_AMOUNT, TEXT_COL),
      [NAME_ROW_LABELS]: this.setInitialLabels(DEFAULT_ROW_AMOUNT, TEXT_ROW),
      images: DEFAULT_IMAGE_AMOUNT,
      questionTitle: DEFAULT_QUESTION_TITLE,
    }
  }

  setInitialLabels = (amount, name) => {
    let labels = [];
    for (let i = 0; i < amount; i++) {
      labels = [...labels, `${name}${i + 1}`];
    }
    return labels;
  }

  increaseCount = value => {
    const increasedValue = this.state[value] + DEFAULT_INCREMENT;
    if (increasedValue > MAX_AMOUNT) return;

    value === NAME_COLUMNS && this.addLabel(NAME_COLUMN_LABELS, `${TEXT_COL}${increasedValue}`);
    value === NAME_ROWS && this.addLabel(NAME_ROW_LABELS, `${TEXT_ROW}${increasedValue}`);
    this.setState({ [value]: increasedValue });
  }

  decreseCount = value => {
    const reducedValue = this.state[value] - DEFAULT_INCREMENT;
    if(reducedValue < MIN_AMOUNT) return;

    value === NAME_COLUMNS && this.removeLabel(NAME_COLUMN_LABELS);
    value === NAME_ROWS && this.removeLabel(NAME_ROW_LABELS);
    this.setState({ [value]: reducedValue });
  }

  addLabel = (section, value) => this.setState({ [section]: [...this.state[section], value] });

  removeLabel = (section) => {
    const { [section]: labelList } = this.state;
    labelList.pop();
    this.setState({ [section]: labelList });
  }

  changeLabel = (value, section, id) => {
    const { [section]: labelList } = this.state;
    const labels = labelList.map((label, index) => index === id ? value : label);
    this.setState({ [section]: labels });
  }

  changeTitle = (value) => this.setState({ questionTitle: value });

  getLongestLabelLength = (section) => {
    const { [section]: labelList } = this.state;
    return labelList.reduce((a, b) => String(a).length > String(b).length ? a : b, '').length;
  }

  renderMatrix = () => {
    const { rows, columns } = this.state;
    const matrix = this.createEmptyMatrix(rows, columns);

    return matrix.map(this.renderRow);
  };

  createEmptyMatrix = (rows, columns) => (
    Array(rows).fill().map(() => Array(columns).fill())
  );

  renderRow = (row, index) => {
    const { rowLabels } = this.state;

    return (
      <Fragment key={index}>
        {index === 0 && this.renderColumnLabels(row)}
        <div className="row matrix-container" key={index}>
          <div className="row-label-container">
            <UploadImage
              className="image"
              id={`upload-row-${index}`}
              increaseCount={this.increaseCount}
              decreaseCount={this.decreseCount}
            />
            <div className="label-container">
              <EditableLabel
                className="row-label"
                section={NAME_ROW_LABELS}
                id={index}
                onLabelChange={this.changeLabel}
                text={rowLabels[index]}
              />
            </div>
          </div>
          <span className="column-container">
            <RadioButtonGroup className="column" group={row} />
          </span>
        </div>
      </Fragment>
    );
  }

  renderColumnLabels = (row) => {
    const { columnLabels } = this.state;

    return (
      <div className="column-container">
        {row.map((column, index) => {
          return (
            <div key={index}>
              <UploadImage
                className="image"
                id={`upload-col-${index}`}
                increaseCount={this.increaseCount}
                decreaseCount={this.decreseCount}
              />
              <div className="label-container">
                <EditableLabel
                  section={NAME_COLUMN_LABELS}
                  id={index}
                  onLabelChange={this.changeLabel}
                  text={columnLabels[index]}
                />
              </div>
            </div>
          )
        })}
        <span className="button btn-remove" onClick={() => this.decreseCount(NAME_COLUMNS)}>-</span>
        <span className="button btn-add" onClick={() => this.increaseCount(NAME_COLUMNS)}>+</span>
      </div>
    );
  }

  render() {
    const { rows, columns, images, questionTitle } = this.state;

    return (
      <Fragment>
        <h4 className="header-container">
          <EditableLabel
            labelStyle="italic"
            inputStyle="title-input"
            onLabelChange={this.changeTitle}
            text={questionTitle}
          />
        </h4>
        <div className="grid-container">
          <div className="matrix-container">
            {this.renderMatrix()}
            <div className="row button btn-remove" onClick={() => this.decreseCount(NAME_ROWS)}>-</div>
            <div className="row button btn-add" onClick={() => this.increaseCount(NAME_ROWS)}>+</div>
          </div>
          <Summary
            rows={rows}
            columns={columns}
            images={images}
            longestRowLabel={this.getLongestLabelLength([NAME_ROW_LABELS])}
            longestColumnLabel={this.getLongestLabelLength([NAME_COLUMN_LABELS])}
          />
          <Legend title={TEXT_LEGEND}>
            <div className="legend-item-container">
              <div className="image">+</div>
              <div>{TEXT_LEGEND_IMAGE}</div>
            </div>
            <div className="legend-item-container">
              <div className="button btn-add">+</div>
              <div>{TEXT_LEGEND_ADD}</div>
            </div>
            <div className="legend-item-container">
              <div className="button btn-remove">-</div>
              <div>{TEXT_LEGEND_REMOVE}</div>
            </div>
          </Legend>
          <Legend title={TEXT_NOTES}>
            <span className="italic">{TEXT_NOTE_ITALIC} </span>
            <span>{TEXT_NOTE_EDITABLE}</span>
          </Legend>
        </div>
      </Fragment>
    )
  }
};

export default Matrix;
