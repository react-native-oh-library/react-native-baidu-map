/**
 * Copyright (c) 2016-present, lovebing.org.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import BaiduMapOverlayPolygon,{ NativeProps } from "./PolygonNativeComponent";
import React, { Component } from 'react';

import { View } from 'react-native';

import PropTypes from 'prop-types';

export default class Polygon extends Component<NativeProps> {
  static propTypes = {
    ...View.propTypes,
    points: PropTypes.array,
    fillColor: PropTypes.string,
    stroke: PropTypes.object
  };

  static defaultProps = {
    points: [{
      latitude: 0,
      longitude: 0
    }],
    stroke: {
      width: 5,
      color: 'AA00FF00'
    }
  };
  
  constructor() {
    super();
  }

  render() {
    return <BaiduMapOverlayPolygon {...this.props} />;
  }
}
