/**
 * Copyright (c) 2016-present, lovebing.org.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import BaiduMapOverlayPolyline,{ NativeProps } from "./PolylineNativeComponent";

import React, { Component } from 'react';

import { View } from 'react-native';

import PropTypes from 'prop-types';

export default class Polyline extends Component<NativeProps> {
  static propTypes = {
    ...View.propTypes,
    points: PropTypes.array,
    stroke: PropTypes.object
  };

  static defaultProps = {
    points: [{
      latitude: 0,
      longitude: 0
    }],
    stroke: {
      width: 1,
      color: 'AAFF0000'
    }
  };

  constructor() {
    super();
  }

  render() {
    return <BaiduMapOverlayPolyline {...this.props} />;
  }
}