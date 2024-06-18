/**
 * Copyright (c) 2016-present, lovebing.org.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import BaiduMapOverlayCluster, { NativeProps } from "./ClusterNativeComponent";

import React, { Component } from 'react';

import { View } from 'react-native';

export default class Cluster extends Component<NativeProps> {
  
  static propTypes = {
    ...View.propTypes
  };

  static defaultProps = {
    location: {
      latitude: 0,
      longitude: 0
    },
    rotate: 0
  };

  constructor() {
    super();
  }
  

  render() {
    return <BaiduMapOverlayCluster {...this.props} />;
  }
}
