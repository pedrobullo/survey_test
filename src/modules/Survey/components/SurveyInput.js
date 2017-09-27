import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import StringMask from 'string-mask';

const propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  max: PropTypes.string,
  maxLength: PropTypes.number,
  className: PropTypes.string.isRequired,
  value: PropTypes.any, // Not required
  hasError: PropTypes.bool,
  handleChange: PropTypes.func.isRequired, // Change Callback
  googleApi: PropTypes.object,
};

export class SurveyInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || '',
    };

    this.setMask = this.setMask.bind(this);
  }

  componentDidMount() {
    if (this.props.name === 'txtAddress') {
      if (this.refs[this.props.id]) {
        this.props.googleApi.googleAutocomplete(this.refs[this.props.id]);
        // no-refs would be: document.querySelector(`#${this.props.id}`)
      }
    }
  }

  setMask(input, value) {
    if (input.mask) {
      const cleanValue = value.replace(/\W+/g, '');
      const maskedValue = StringMask.apply(cleanValue, input.mask);
      return this.setState({ value: maskedValue },
        this.props.handleChange(input.name, maskedValue));
    }

    return this.setState({ value }, this.props.handleChange(input.name, value));
  }

  renderInput() {
    if (this.props.type === 'text' || this.props.type === 'date' || this.props.type === 'number') {
      const inputClass = classNames({
        SurveyInput__text__input: true,
        'SurveyInput__text__input--error': this.props.hasError,
      });
      return (
        <input
          placeholder=""
          className={inputClass}
          ref={this.props.id}
          id={this.props.id}
          type={this.props.type}
          name={this.props.name}
          maxLength={this.props.maxLength}
          max={this.props.max}
          onChange={(ev) => this.setMask(this.props, ev.target.value)}
          value={this.state.value}
          required
          pattern="[a-zA-Z\d\-_\s.(),\u00C0-\u00FF]+" />
      );
    }
    return null;
  }

  render() {
    const cleanTxtName = (name) => (name || '').replace('txt', '');
    return (
      <div className={`${this.props.className}`}>
        {this.renderInput()}
        <label
          className="SurveyInput__text__label"
          htmlFor={this.props.name}>
          {cleanTxtName(this.props.name)}
        </label>
        <div>
          <hr /><hr />
        </div>
      </div>
    );
  }
}

SurveyInput.propTypes = propTypes;

export default SurveyInput;
