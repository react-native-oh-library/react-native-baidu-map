/**
 * Copyright (c) 2016-present, lovebing.org.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import BaiduMapOverlayMarkerIcon,{ NativeProps } from "./MarkerIconNativeComponent";

import React, { Component } from 'react';

export default class MarkerIcon extends Component<NativeProps> {


  constructor() {
    super();
  }

  render() {
    return <BaiduMapOverlayMarkerIcon {...this.props} />;
  }
}
