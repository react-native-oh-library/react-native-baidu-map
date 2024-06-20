import { TurboModule, TurboModuleRegistry } from 'react-native';
import type { UnsafeObject, Float } from 'react-native/Libraries/Types/CodegenTypes';

type OpenLocation = Readonly<{
  latitude?: Float;
  longitude?: Float;
  name?:string;
}>

type Location = Readonly<{
  latitude?: Float;
  longitude?: Float;
}>

type CoorType = "bd09ll" | "gcj02";

export interface Spec extends TurboModule {
  /**
   * 调起百度地图驾车规划
   * @param sl 起点坐标
   * @param el 终点坐标
   * @example openDrivingRoute({latitude: 0.0, longitude: 0.0, name: ''}, {latitude: 0.0, longitude: 0.0, name: ''})
   */
 openDrivingRoute(sl: OpenLocation, el: OpenLocation): void;

  /**
   * 调起百度地图公交路线
   * @param sl 起点坐标
   * @param el 终点坐标
   * @example openTransitRoute({latitude: 0.0, longitude: 0.0, name: ''}, {latitude: 0.0, longitude: 0.0, name: ''})
   */
  openTransitRoute(sl: OpenLocation, el: OpenLocation): void;

  /**
   * 调起百度地图步行路线
   * @param sl 起点坐标
   * @param el 终点坐标
   * @example openWalkNavi({latitude: 0.0, longitude: 0.0, name: ''}, {latitude: 0.0, longitude: 0.0, name: ''})
   */
  openWalkNavi(sl: OpenLocation, el: OpenLocation): void;

   /**
     * iOS 初始化 SDK
     * @param appKey
     */
   initSDK(appKey: string): void;

   /**
    * 是否有定位权限
    */
   hasLocationPermission(): Promise<boolean>;


 

   /**
    * 经纬度查询地址详情
    * @param lat 纬度
    * @param lng 经度
    */
   reverseGeoCode(
     lat: Float,
     lng: Float
   ): Promise<{
     address: string;
     province: string;
     cityCode: string;
     city: string;
     district: string;
     streetName: string;
     streetNumber: string;
   }>;

   /**
    * GPS 的经纬度查询地址详情
    * @param lat 纬度
    * @param lng 经度
    */
   reverseGeoCodeGPS(
     lat: Float,
     lng: Float
   ): Promise<{
     address: string;
     province: string;
     cityCode: string;
     city: string;
     district: string;
     streetName: string;
     streetNumber: string;
   }>;

   /**
    * 地址转换为坐标
    * @param city 城市
    * @param addr 地址
    */
   geocode(city: string, addr: string): Promise<Location>;

   /**
    * 获取当前定位信息
    * @param coorType 定位类型
    */
   getCurrentPosition(
     coorType?: CoorType
   ): Promise<{
     latitude: Float;
     longitude: Float;
     address: string;
     province: string;
     cityCode: string;
     city: string;
     district: string;
     streetName: string;
     streetNumber: string;
   }>;

   /**
    * 开始持续定位
    * @param listener 持续定位触发的监听函数
    * @param coorType 定位类型
    * @exports
    * startLocating(() => { console.log() }, 'bd09ll');
    */
   startLocating(listener: () => void, coorType: CoorType): void;

   /**
    * 停止持续定位
    */
   stopLocating(): void;

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
    }>;
}

export default TurboModuleRegistry.get<Spec>('NativeTurboModule');
