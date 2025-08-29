import type {HostComponent,ViewProps} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { Float } from 'react-native/Libraries/Types/CodegenTypes';
  
type Gradient = Readonly<{
  colors?: ReadonlyArray<string>;
  startPoints?: ReadonlyArray<Float>;
}>

  type Location = Readonly<{
    latitude?: Float;
    longitude?: Float;
  }>
  
  type pointsData = ReadonlyArray<Location>;

export interface NativeProps extends ViewProps {
  points : pointsData;
  gradient: Gradient;
}

export default codegenNativeComponent<NativeProps>(
  'BaiduMapOverlayHeatMap',
) as HostComponent<NativeProps>;

