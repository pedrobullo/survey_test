import React, { Component } from 'react';

export default function (InnerComponent) {
  class GoogleApi extends Component {
    constructor(props) {
      super(props);

      this.state = {
        autocomplete: null,
        map: null,
        google: null,
      };

      this.handleSetAutocomplete = this.handleSetAutocomplete.bind(this);
      this.handleBindMap = this.handleBindMap.bind(this);
    }

    componentDidUpdate() {
      const { autocomplete, map } = this.state;

      if (autocomplete && map) {
        // Bind Map to Autocomplete
        autocomplete.bindTo('bounds', this.state.map);

        // Google Template Code
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (!place.geometry) {
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }
        });
      }
    }

    handleSetAutocomplete(element) {
      const autocomplete = new window.google.maps.places.Autocomplete(element);

      this.setState({ autocomplete });
    }

    handleBindMap(element) {
      this.setState({ map: element });
    }

    render() {
      const props = {
        ...this.props,
        googleApi: {
          googleAutocomplete: this.handleSetAutocomplete,
          googleBindMap: this.handleBindMap,
          google: window.google,
        },
      };

      return (
        <InnerComponent {...props} />
      );
    }
  }

  return GoogleApi;
}
