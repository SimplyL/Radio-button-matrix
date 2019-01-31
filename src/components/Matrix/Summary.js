import React from 'react';
import {
  LABEL_ROW_AMOUNT,
  LABEL_COLUMN_AMOUNT,
  LABEL_IMAGE_AMOUNT,
  LABEL_LONGEST_ROW,
  LABEL_LONGEST_COLUMN,
  TEXT_SUMMARY,
} from './constants';

const renderField = (label, value) => (
  <div>
    <span>{label}: </span>
    <span>{value}</span>
  </div>
);

const Summary = ({ rows, columns, images, longestRowLabel, longestColumnLabel }) => (
  <div>
    <h3>{TEXT_SUMMARY}</h3>
    {renderField(LABEL_ROW_AMOUNT, rows)}
    {renderField(LABEL_COLUMN_AMOUNT, columns)}
    {renderField(LABEL_IMAGE_AMOUNT, images)}
    {renderField(LABEL_LONGEST_ROW, longestRowLabel)}
    {renderField(LABEL_LONGEST_COLUMN, longestColumnLabel)}
  </div>
);

export default Summary;
