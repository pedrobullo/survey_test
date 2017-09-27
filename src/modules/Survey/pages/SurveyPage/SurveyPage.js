import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import classNames from 'classnames';

// Import Components
import googleApi from '../../components/GoogleApi';
import SurveyInput from '../../components/SurveyInput';
import SurveyMap from '../../components/SurveyMap';
import SurveyUpload from '../../components/SurveyUpload';
import SurveyImage from '../../components/SurveyImage';

// Import Actions
import { fetchSurvey, submitSurvey, uploadAvatar } from '../../SurveyActions';

import './sweetalert2.scss';
import './SurveyPage.scss';

const propTypes = {
  fields: PropTypes.array,
  responses: PropTypes.object,
  errors: PropTypes.any,
  fetchSurvey: PropTypes.func,
  submitSurvey: PropTypes.func,
  uploadAvatar: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
  loadingUpdate: PropTypes.bool,
  googleApi: PropTypes.object,
  avatar: PropTypes.string,
  loadingAvatar: PropTypes.bool,
};

const defaultProps = {
  fields: [],
  responses: {},
  errors: [],
};

class SurveyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responses: this.props.responses || {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchSurvey();
  }

  componentWillReceiveProps(nextProps) {
    // Async response backup state update - first load
    if (nextProps.responses && !Object.keys(this.state.responses).length) {
      this.setState({
        responses: nextProps.responses,
      });
    }
  }

  onChange(key, value) {
    const responses = {
      ...this.state.responses,
      [key]: value,
    };

    this.setState({ responses });
  }

  onSubmit(event) {
    event.preventDefault();

    const payload = {
      survey: {
        createdAt: new Date(),
        responses: this.state.responses,
      },
    };

    this.props.submitSurvey(payload);
  }

  renderForm() {
    const { fields, responses, errors } = this.props;
    if (!fields.length) {
      return null;
    }

    const submitClass = classNames({
      SurveyInput__submit: true,
      'SurveyInput__submit--green': true,
      loading: this.props.loadingUpdate,
    });

    return fields
      .map(input => {
        const value = responses[input.name] ? responses[input.name] : '';
        const hasError = !!((errors || [])
          .filter(error => error.property === input.name) || []).length;
        switch (input.template) {
          case 'input':
            return (
              <SurveyInput
                {...input}
                googleApi={this.props.googleApi}
                className="SurveyInput__text"
                key={input.name}
                value={value}
                hasError={hasError}
                handleChange={this.onChange} />
            );

          case 'submit':
            return (
              <button
                className={submitClass}
                type="submit"
                key={input.name}>
                {this.props.responses ? 'Edit' : 'Save'}
              </button>
            );

          case 'map':
            return (
              <SurveyMap
                {...input}
                key={input.name}
                className="SurveyInput__map"
                googleApi={this.props.googleApi} />
            );

          case 'upload':
            return (
              <SurveyUpload
                {...input}
                key={input.name}
                handleChange={this.props.uploadAvatar} />
            );

          case 'image':
            return (
              <SurveyImage
                {...input}
                key={input.name}
                loading={this.props.loadingAvatar}
                avatar={this.props.avatar} />
            );

          default:
            return null;
        }
      });
  }

  render() {
    const containerClass = classNames({
      container: true,
      loading: this.props.loading,
    });

    return (
      <div className={containerClass}>
        <Helmet title={'Survey Page'} />
        <form
          onSubmit={this.onSubmit}>
          {this.renderForm()}
        </form>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    fields: state.survey.fields,
    responses: state.survey.responses,
    errors: state.survey.errorUpdate,
    loadingUpdate: state.survey.loadingUpdate,
    loading: state.survey.loading,
    loadingAvatar: state.survey.loadingAvatar,
    avatar: state.survey.avatar,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSurvey, submitSurvey, uploadAvatar }, dispatch);
}

SurveyPage.defaultProps = defaultProps;
SurveyPage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(googleApi(SurveyPage));
