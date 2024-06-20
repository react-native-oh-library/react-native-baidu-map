import type {HostComponent,ViewProps} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { Float } from 'react-native/Libraries/Types/CodegenTypes';

export interface NativeProps extends ViewProps {
  offsetY : Float;
}

export default codegenNativeComponent<NativeProps>(
  'BaiduMapOverlayInfoWindow',
) as HostComponent<NativeProps>;

