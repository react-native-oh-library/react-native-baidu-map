import { Initializer, LatLng } from '@bdmap/base';
/**
 * MIT License
 *
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import type { TurboModuleContext } from '@rnoh/react-native-openharmony/ts';
import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import Logger from './Logger';
import { MapEnvConstant } from './MapEnvConstant';
import type { CurrentPosition, GeoCodeData, Location, OpenLocation } from './PublicClass';
import { BusRoute, DrivingRoute, IPasspoints, Passpoint, WalkingRoute } from '@bdmap/search';
import ImageEntity from '@bdmap/map/src/main/ets/a/d/e/k/o';
import Marker from '@bdmap/map/src/main/ets/a/d/e/i/s';
import Polyline from '@bdmap/map/src/main/ets/a/d/e/i/n';
import * as SysEnum from '@bdmap/map/src/main/ets/a/d/u/v/w';
import { Permissions } from '@kit.AbilityKit';
import { PermissionUtils } from './PermissionsUtils';

const TAG: string = '[RNOH]BaiduMapTurboModule'

type CoorType = "bd09ll" | "gcj02";

interface param {
  title: string
}

interface routeres {
  routes: Array<routes>
}

interface routes {
  steps: Array<steps>
}

type steps = Array<step>

interface step {
  path: Array<LatLng>
}

interface walkRoutes {
  routes: Array<step>
}

export class BaiduMapTurboModule extends TurboModule {
  constructor(protected ctx: TurboModuleContext) {
    super(ctx);
    Logger.debug(TAG, '[RNOH]:BaiduMapTurboModule constructor');
  }

  /**
   * 调起百度地图驾车规划
   * @param sl 起点坐标
   * @param el 终点坐标
   * @example openDrivingRoute({latitude: 0.0, longitude: 0.0, name: ''}, {latitude: 0.0, longitude: 0.0, name: ''})
   */
  openDrivingRoute(sl: OpenLocation, el: OpenLocation): void {
    Logger.debug(TAG, '[RNOH]:BaiduMapTurboModule openDrivingRoute');
    let map = MapEnvConstant.getInstance().getMap();
    if (map) {
      Logger.debug(TAG, 'baiduMapTurboModule has map');
      const br: DrivingRoute = new DrivingRoute();
      const fromArr: LatLng = new LatLng(sl.latitude, sl.longitude);
      const toArr: LatLng = new LatLng(el.latitude, el.longitude);
      Logger.debug('DrivingRoute 绘制起点')

      // 绘制起点
      let image: ImageEntity = new ImageEntity('rawfile://start.png', 50, 81);
      let marker: Marker = new Marker({
        position: fromArr,
        icon: image,
        yOffset: 0,
        isFlat: false,
        isDraggable: true,
        rotate: 0,
        alpha: 0.9,
        scaleX: 2,
        scaleY: 2,
        isTop: true
      });
      map.addOverlay(marker);
      // 绘制终点
      let image2: ImageEntity = new ImageEntity('rawfile://end.png', 50, 81);
      let marker2: Marker = new Marker({
        position: toArr,
        icon: image2,
        yOffset: 0,
        isFlat: false,
        isDraggable: true,
        rotate: 0,
        alpha: 0.9,
        scaleX: 2,
        scaleY: 2,
        isTop: true
      });
      map.addOverlay(marker2);
      Logger.debug('DrivingRoute 获取驾车路线规划')

      // 获取驾车路线规划
      br.getRouteLines(fromArr, toArr, (res: routeres) => {
        Logger.debug('DrivingRoute 选取第一个路线规划方案')

        let routes = res.routes[0]; // 选取第一个路线规划方案
        // 解析路线
        let steps: steps = routes.steps[0];
        let line: Array<LatLng> = [];

        for (let i = 0; i < steps.length; i++) {
          let ll: LatLng = new LatLng(steps[i].path[0].lat, steps[i].path[0].lng);
          line.push(ll);
        }
        let polyline: Polyline = new Polyline({
          points: line,
          fillcolor: '#6af',
          width: 10,
          join: SysEnum.LineJoinType.ROUND,
          cap: SysEnum.LineCapType.ROUND,
          isThined: true,
          isGeodesic: true
        });
        map?.addOverlay(polyline);
      }, {})
    }
  };

  /**
   * 调起百度地图公交路线
   * @param sl 起点坐标
   * @param el 终点坐标
   * @example openTransitRoute({latitude: 0.0, longitude: 0.0, name: ''}, {latitude: 0.0, longitude: 0.0, name: ''})
   */
  openTransitRoute(sl: OpenLocation, el: OpenLocation): void {
    Logger.debug(TAG, '[RNOH]:BaiduMapTurboModule openTransitRoute');
    let map = MapEnvConstant.getInstance().getMap();
    if (map) {
      Logger.debug(TAG, 'baiduMapTurboModule has map');
      const br: BusRoute = new BusRoute();
      const fromArr: LatLng = new LatLng(sl.latitude, sl.longitude);
      const toArr: LatLng = new LatLng(el.latitude, el.longitude);
      // 绘制起点
      let image: ImageEntity = new ImageEntity('rawfile://start.png', 50, 81);
      let marker: Marker = new Marker({
        position: fromArr,
        icon: image,
        yOffset: 0,
        isFlat: false,
        isDraggable: true,
        rotate: 0,
        alpha: 0.9,
        scaleX: 2,
        scaleY: 2,
        isTop: true
      });
      map.addOverlay(marker);
      // 绘制终点
      let image2: ImageEntity = new ImageEntity('rawfile://end.png', 50, 81);
      let marker2: Marker = new Marker({
        position: toArr,
        icon: image2,
        yOffset: 0,
        isFlat: false,
        isDraggable: true,
        rotate: 0,
        alpha: 0.9,
        scaleX: 2,
        scaleY: 2,
        isTop: true
      });
      map.addOverlay(marker2);
      // 获取公交路线规划
      br.getRouteLines(fromArr, toArr, (res: IPasspoints) => {
        try {
          let resultLine: Array<LatLng> = []
          let passPoints: Array<Passpoint> = res.passpoints
          let passPoint: Passpoint = passPoints[0]
          for (let i = 0; i < passPoint.length; i++) {
            let path = passPoint[i]
            let ll: LatLng = new LatLng(path.lat, path.lng)
            resultLine.push(ll)
          }
          let polyline: Polyline = new Polyline({
            points: resultLine,
            fillcolor: '#a6f',
            width: 10,
            join: SysEnum.LineJoinType.ROUND,
            cap: SysEnum.LineCapType.BUTT,
            isThined: true,
            isGeodesic: true
          });
          map?.addOverlay(polyline);
        } catch (e) {

        }
      }, {})
    }
  }

  /**
   * 调起百度地图步行路线
   * @param sl 起点坐标
   * @param el 终点坐标
   * @example openWalkNavi({latitude: 0.0, longitude: 0.0, name: ''}, {latitude: 0.0, longitude: 0.0, name: ''})
   */
  openWalkNavi(sl: OpenLocation, el: OpenLocation): void {
    Logger.debug(TAG, '[RNOH]:BaiduMapTurboModule openTransitRoute');
    let map = MapEnvConstant.getInstance().getMap();
    if (map) {
      Logger.debug(TAG, 'baiduMapTurboModule has map');
      const br: WalkingRoute = new WalkingRoute();
      const fromArr: LatLng = new LatLng(sl.latitude, sl.longitude);
      const toArr: LatLng = new LatLng(el.latitude, el.longitude);
      // 绘制起点
      let image: ImageEntity = new ImageEntity('rawfile://start.png', 50, 81);
      let marker: Marker = new Marker({
        position: fromArr,
        icon: image,
        yOffset: 0,
        isFlat: false,
        isDraggable: true,
        rotate: 0,
        alpha: 0.9,
        scaleX: 2,
        scaleY: 2,
        isTop: true
      });
      map.addOverlay(marker);
      // 绘制终点
      let image2: ImageEntity = new ImageEntity('rawfile://end.png', 50, 81);
      let marker2: Marker = new Marker({
        position: toArr,
        icon: image2,
        yOffset: 0,
        isFlat: false,
        isDraggable: true,
        rotate: 0,
        alpha: 0.9,
        scaleX: 2,
        scaleY: 2,
        isTop: true
      });
      map.addOverlay(marker2);
      Logger.debug('requestlbs ' + "br.getRouteLines")
      // 获取步行规划
      br.getRouteLines(fromArr, toArr, (res: walkRoutes) => {
        let routes = res.routes;
        let line: Array<LatLng> = []
        // 解析轨迹
        for (let i = 0; i < routes.length; i++) {
          let step: step = routes[i]
          let paths: Array<LatLng> = step.path
          for (let i = 0; i < paths.length; i++) {
            let ll: LatLng = new LatLng(paths[i].lat, paths[i].lng)
            line.push(ll)
          }
        }
        let polyline: Polyline = new Polyline({
          points: line,
          fillcolor: '#6af',
          width: 10,
          join: SysEnum.LineJoinType.ROUND,
          cap: SysEnum.LineCapType.ROUND,
          isThined: true,
          isGeodesic: true
        });
        map?.addOverlay(polyline);
      }, {})
    }
  }

  /**
   * iOS 初始化 SDK
   * @param appKey
   */
  initSDK(appKey: string): void {
    Logger.debug(TAG, '[RNOH]:BaiduMapTurboModule initSDK');
    Initializer.getInstance().initialize(appKey);
  }

  /**
   * 是否有定位权限
   */
  async hasLocationPermission(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const permissions: Array<Permissions> = ['ohos.permission.LOCATION'];
        let hasPermissions = await PermissionUtils.checkPermissions(permissions);
        resolve(hasPermissions);
      } catch (exception) {
        reject(exception)
      }
    })
  }


  /**
   * 经纬度查询地址详情
   * @param lat 纬度
   * @param lng 经度
   */
  reverseGeoCode(
    lat: number,
    lng: number
  ): Promise<GeoCodeData> {
    return new Promise(async (resolve, reject) => {
      try {
        let geocode = {
          "address": "s",
          "province": "d",
          "cityCode": "d",
          "city": "s",
          "district": "d",
          "streetName": "s",
          "streetNumber": "d"
        };
        resolve(geocode)
      } catch (exception) {
        reject(exception)
      }
    })
  };

  /**
   * GPS 的经纬度查询地址详情
   * @param lat 纬度
   * @param lng 经度
   */
  reverseGeoCodeGPS(
    lat: number,
    lng: number
  ): Promise<GeoCodeData> {
    return new Promise(async (resolve, reject) => {
      try {
        let geocode = {
          "address": "s",
          "province": "d",
          "cityCode": "d",
          "city": "s",
          "district": "d",
          "streetName": "s",
          "streetNumber": "d"
        };
        resolve(geocode)
      } catch (exception) {
        reject(exception)
      }
    })
  };

  /**
   * 地址转换为坐标
   * @param city 城市
   * @param addr 地址
   */
  geocode(city: string, addr: string): Promise<Location> {
    return new Promise(async (resolve, reject) => {
      try {
        let location = { "latitude": 1, "longitude": 2 };
        resolve(location)
      } catch (exception) {
        reject(exception)
      }
    })
  };

  /**
   * 获取当前定位信息
   * @param coorType 定位类型
   */
  getCurrentPosition(coorType?: CoorType): Promise<CurrentPosition> {
    return new Promise(async (resolve, reject) => {
      try {
        let currentPostion = {
          "latitude": 1,
          "longitude": 2,
          "address": "s",
          "province": "d",
          "cityCode": "d",
          "city": "s",
          "district": "d",
          "streetName": "s",
          "streetNumber": "d"
        };
        resolve(currentPostion)
      } catch (exception) {
        reject(exception)
      }
    })
  };

  /**
   * 开始持续定位
   * @param listener 持续定位触发的监听函数
   * @param coorType 定位类型
   * @exports
   * startLocating(() => { console.log() }, 'bd09ll');
   */
  startLocating(listener: Function, coorType: CoorType): void {
  };

  /**
   * 停止持续定位
   */
  stopLocating(): void {
  };

  /**
   * 计算两个坐标的距离
   * @param l1 坐标1
   * @param l2 坐标2
   * @example
   * const d = getLocationDistance({latitude: 0.0, longitude: 0.0}, {latitude: 0.0, longitude: 0.0});
   * console.log(d.distance);
   */
  getLocationDistance(
    l1: Location,
    l2: Location
  ): Promise<{
    distance: number;
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        let distance = { "distance": 1 }
        resolve(distance)
      } catch (exception) {
        reject(exception)
      }
    })
  };
}
