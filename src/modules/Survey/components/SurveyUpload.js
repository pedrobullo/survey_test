import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  handleChange: PropTypes.func,
};

const SurveyUpload = (props) =>
  <div className="SurveyInput__upload">
    <label
      className="SurveyInput__submit SurveyInput__submit--inverse"
      htmlFor={props.id}>
      Upload Avatar
    </label>
    <input
      id={props.id}
      type="file"
      onChange={(ev) => props.handleChange(ev.target.files)} />
  </div>;

SurveyUpload.propTypes = propTypes;

export default SurveyUpload;
