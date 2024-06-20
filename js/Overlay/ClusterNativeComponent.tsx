import type {HostComponent,ViewProps} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { Float } from 'react-native/Libraries/Types/CodegenTypes';

export interface NativeProps extends ViewProps {

}

export default codegenNativeComponent<NativeProps>(
  'BaiduMapOverlayCluster',
) as HostComponent<NativeProps>;

