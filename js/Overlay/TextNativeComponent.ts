import type {HostComponent,ViewProps} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { Float } from 'react-native/Libraries/Types/CodegenTypes';
  
  type Location = Readonly<{
    latitude?: Float;
    longitude?: Float;
  }>

export interface NativeProps extends ViewProps {
  text : string;
  fontSize : Float;
  fontColor : string;
  bgColor : string;
  rotate : Float;
  location : Location;
}

export default codegenNativeComponent<NativeProps>(
  'BaiduMapOverlayText',
) as HostComponent<NativeProps>;

