import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  avatar: PropTypes.string,
  loading: PropTypes.bool,
};

const SurveyImage = (props) =>
  <div className={`SurveyInput__avatar ${props.loading && 'loading'}`}>
    {props.avatar ? <div style={{ backgroundImage: `url(${props.avatar})` }} /> : <div />}
  </div>;

SurveyImage.propTypes = propTypes;

export default SurveyImage;
