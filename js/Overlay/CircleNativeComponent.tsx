import type {HostComponent,ViewProps} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { Float } from 'react-native/Libraries/Types/CodegenTypes';
  
  type Stroke = Readonly<{
    color?: string;
    width?: Float;
  }>

  type Location = Readonly<{
    latitude?: Float;
    longitude?: Float;
  }>

export interface NativeProps extends ViewProps {
  radius: Float;
  fillColor: string;
  stroke: Stroke;
  center: Location;
  // 添加其它 props
}

export default codegenNativeComponent<NativeProps>(
  'BaiduMapOverlayCircle',
) as HostComponent<NativeProps>;

