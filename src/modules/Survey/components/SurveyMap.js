import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  googleApi: PropTypes.object,
};

export class SurveyMap extends Component {
  componentDidMount() {
    if (this.refs[this.props.id]) {
      const map = new this.props.googleApi.google.maps.Map(this.refs[this.props.id], {
        center: { lat: -23.5477685, lng: -46.6235773 }, // São paulo
        zoom: 13,
      });

      this.props.googleApi.googleBindMap(map);
    }
  }

  render() {
    return (
      <div
        id={this.props.id}
        ref={this.props.id}
        className={`${this.props.className}`} />
    );
  }
}

SurveyMap.propTypes = propTypes;

export default SurveyMap;
