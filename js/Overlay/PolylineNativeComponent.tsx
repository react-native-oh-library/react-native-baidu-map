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
  

  type pointsData = ReadonlyArray<Location>;

export interface NativeProps extends ViewProps {
  stroke : Stroke;
  points : pointsData;
  // 添加其它 props
}

export default codegenNativeComponent<NativeProps>(
  'BaiduMapOverlayPolyline',
) as HostComponent<NativeProps>;

