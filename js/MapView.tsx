/**
 * Copyright (c) 2016-present, lovebing.org.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import BaiduMapView, { NativeProps, Location } from "./MapViewNativeComponent";
import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import MapTypes from 'react-native-baidu-map/js/MapTypes';
import type * as ReactNative from "react-native";

export default class MapView extends Component<NativeProps> {
  static propTypes = {
    ...View.propTypes,
    zoomControlsVisible: PropTypes.bool,
    trafficEnabled: PropTypes.bool,
    baiduHeatMapEnabled: PropTypes.bool,
    clusterEnabled: PropTypes.bool,
    mapType: PropTypes.number,
    zoom: PropTypes.number,
    showsUserLocation: PropTypes.bool,
    scrollGesturesEnabled: PropTypes.bool, //是否允许拖动
    zoomGesturesEnabled: PropTypes.bool,//是否充许手势缩放
    center: PropTypes.object,
    locationData: PropTypes.object,
    onMapStatusChangeStart: PropTypes.func,
    onMapStatusChange: PropTypes.func,
    onMapStatusChangeFinish: PropTypes.func,
    onMapLoaded: PropTypes.func,
    onMapClick: PropTypes.func,
    onMapDoubleClick: PropTypes.func,
    onMarkerClick: PropTypes.func,
    onMapPoiClick: PropTypes.func
  };

  static defaultProps = {
    zoomControlsVisible: true,
    trafficEnabled: false,
    baiduHeatMapEnabled: false,
    mapType: MapTypes.NORMAL,
    center: null,
    zoom: 10,
    scrollGesturesEnabled: true,
    zoomGesturesEnabled: true,
    showsUserLocation: false
  };

  constructor() {
    super();
  }
  
  _onMapClick = (e: ReactNative.NativeSyntheticEvent<Location>) => {
	if (this.props.onMapClick) {
		this.props.onMapClick(e.nativeEvent);
	}
  }

  _onChange(event) {
    if (typeof this.props[event.nativeEvent.type] === 'function') {
      this.props[event.nativeEvent.type](event.nativeEvent.params);
    }
  }

  render() {
    const nativeProps = {
      ...this.props,
      ...{
        onMapClick: this._onMapClick
      },
    };
    return <BaiduMapView {...nativeProps} onChange={this._onChange.bind(this)} />;
  }
  
}