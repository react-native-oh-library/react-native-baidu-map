/**
 * Copyright (c) 2016-present, lovebing.org.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import BaiduMapOverlayMarker,{ NativeProps, onMarkerClickEvent} from "./MarkerNativeComponent";
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import React, { Component } from 'react';

import type * as ReactNative from 'react-native';

import { View } from 'react-native';

import PropTypes from 'prop-types';

export default class Marker extends Component<NativeProps> {
  static propTypes = {
    ...View.propTypes,
    title: PropTypes.string,
    titleOffsetY: PropTypes.number,
    location: PropTypes.object,
    alpha: PropTypes.number,
    rotate: PropTypes.number,
    flat: PropTypes.bool,
    icon: PropTypes.any,
    animateType: PropTypes.string,
    pinColor: PropTypes.string,
    onClick: PropTypes.func
  };

  static defaultProps = {
    titleOffsetY: -80,
    animateType: '',
    location: {
      latitude: 0,
      longitude: 0
    },
    rotate: 0
  };
  
  constructor() {
    super();
  }

  private handleClick = (
    e: ReactNative.NativeSyntheticEvent<onMarkerClickEvent>
  ) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  render() {
    const icon = resolveAssetSource(this.props.icon);
    return <BaiduMapOverlayMarker {...this.props} icon={icon} onClick={this.handleClick.bind(this)} />;
  }
}
