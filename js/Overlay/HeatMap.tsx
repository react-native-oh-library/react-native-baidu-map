/**
 * Copyright (c) 2016-present, lovebing.org.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import BaiduMapOverlayHeatMap, { NativeProps } from "./HeatMapNativeComponent";

import React, { Component } from 'react';

import { View } from 'react-native';

import PropTypes from 'prop-types';

export default class HeatMap extends Component<NativeProps> {
  
  static propTypes = {
    ...View.propTypes,
    points: PropTypes.array,
    gradient: PropTypes.object
  };

  static defaultProps = {
    points: [{
      latitude: 0,
      longitude: 0
    }],
    gradient: {
      colors: ['66FF00', 'FF0000'],
      startPoints: [0.2, 1.0]
    }
  };
  
  constructor() {
    super();
  }

  render() {
    return <BaiduMapOverlayHeatMap {...this.props} />;
  }
}
