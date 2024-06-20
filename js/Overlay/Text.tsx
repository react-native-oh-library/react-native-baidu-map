/**
 * Copyright (c) 2016-present, lovebing.org.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  View,
  Platform
} from 'react-native';

import BaiduMapOverlayText,{ NativeProps } from "./PolygonNativeComponent";

import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class OverlayText extends Component<NativeProps> {
  static propTypes = {
    ...View.propTypes,
    text: PropTypes.string,
    fontSize: PropTypes.number,
    fontColor: PropTypes.string,
    bgColor: PropTypes.string,
    rotate: PropTypes.number,
    location: PropTypes.object
  };

  static defaultProps = {
    location: {
      latitude: 0,
      longitude: 0
    }
  };

  constructor() {
    super();
  }

  render() {
    if (Platform.OS === 'ios') {
      return <View {...this.props} />;
    }
    return <BaiduMapOverlayText {...this.props} />;
  }
}