import type {HostComponent,ViewProps} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { DirectEventHandler, Float } from 'react-native/Libraries/Types/CodegenTypes';
  

  type Location = Readonly<{
    latitude?: Float;
    longitude?: Float;
  }>

  type ImageSourcePropType = Readonly<{
    uri?: string,
    bundle?: string,
    method?: string,
    // headers?: Object,
    body?: string,
    // cache?: ('default' | 'reload' | 'force-cache' | 'only-if-cached'),
    width?: Float,
    height?: Float,
    scale?: Float,
  }>
  
  type onMarkerClickEvent = Readonly<{
    position?: Readonly<{
      latitude?: Float;
      longitude?: Float;
    }>;
    title?: string;
  }>

export interface NativeProps extends ViewProps {
    title: string;

    titleOffsetY: Float;

    location: Location;

    perspective: boolean;

    flat: boolean;

    rotate?: Float;

    icon?: ImageSourcePropType;

    animateType: string;

    alpha: Float;

    pinColor: string;

    onClick?: DirectEventHandler<onMarkerClickEvent>;
  // 添加其它 props
}

export default codegenNativeComponent<NativeProps>(
  'BaiduMapOverlayMarker',
) as HostComponent<NativeProps>;

