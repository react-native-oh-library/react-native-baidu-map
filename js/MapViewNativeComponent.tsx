import type {HostComponent,ViewProps} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { Float,DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
  
  type Stroke = Readonly<{
    color?: string;
    width?: Float;
  }>

  type Location = Readonly<{
    latitude?: Float;
    longitude?: Float;
  }>

  type onMarkerClickEvent = Readonly<{
    position: {
      latitude?: Float;
      longitude?: Float;
    };
    title?: string;
  }>

  type onMapStatusChangeEvent = Readonly<{
    overlook: Float;
    target?: {
      latitude?: Float;
      longitude?: Float;
    };
  }> 
  
  export type VoidEventData = Readonly<{}>;

  type pointsData = ReadonlyArray<Location>;

export interface NativeProps extends ViewProps {
  zoomControlsVisible: boolean,
  trafficEnabled: boolean,
  baiduHeatMapEnabled: boolean,
  zoomGesturesEnabled: boolean,//是否充许手势缩放
  scrollGesturesEnabled: boolean, //是否允许拖动
  mapType: Float,
  zoom: Float,
  showsUserLocation: boolean,
  locationData: Location,
  center: Location,
  onMapStatusChangeStart: DirectEventHandler<VoidEventData>,
  onMapStatusChange: DirectEventHandler<onMapStatusChangeEvent>,
  onMapStatusChangeFinish: DirectEventHandler<VoidEventData>,
  onMapLoaded: DirectEventHandler<VoidEventData>,
  onMapClick: DirectEventHandler<Location>,
  onMapDoubleClick: DirectEventHandler<VoidEventData>,
  onMarkerClick: DirectEventHandler<onMarkerClickEvent>,
  onMapPoiClick: DirectEventHandler<VoidEventData>
}

export default codegenNativeComponent<NativeProps>(
  'BaiduMapView',
) as HostComponent<NativeProps>;

