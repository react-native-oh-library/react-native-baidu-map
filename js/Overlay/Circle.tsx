/**
 * Copyright (c) 2016-present, lovebing.org.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { View } from 'react-native';
import BaiduMapOverlayCircle, { NativeProps } from "./CircleNativeComponent";
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Circle extends Component<NativeProps> {
  
  constructor() {
    super();
  }
  static propTypes = {
    ...View.propTypes,
    radius: PropTypes.number,
    fillColor: PropTypes.string,
    stroke: PropTypes.object,
    center: PropTypes.object
  };

  static defaultProps = {
    center: {
      latitude: 0,
      longitude: 0
    },
    stroke: {
      width: 5,
      color: 'AA000000'
    }
  };

  render() {
    return <BaiduMapOverlayCircle {...this.props} />;
  }
}
