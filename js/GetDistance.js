// Created by Riant 2019/10/22

import  NativeTurboModule from './NativeTurboModule';

const _module = NativeTurboModule;

export default {
  getLocationDistance({latitude, longitude}, {latitude: latitude2, longitude: longitude2}) {
    return _module.getLocationDistance(latitude, longitude, latitude2, longitude2)
  },
}
