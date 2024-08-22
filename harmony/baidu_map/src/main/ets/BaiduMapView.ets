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

import { Descriptor, RNOHContext, RNViewBase, Tag, ViewBaseProps } from '@rnoh/react-native-openharmony';

import Logger from './Logger';

import {
  Stroke as BaiduStroke,
  Circle,
  Event,
  ImageEntity,
  InfoWindow,
  Label,
  LocationLayer,
  MapComponent,
  MapController,
  MapEvent,
  MapOptions,
  MapStatus,
  Marker,
  Polygon,
  Polyline,
  SysEnum,
  OverlayEvent,
  EventBundle,
  TLayer,
  BaseLayer
} from '@bdmap/map';
import { AsyncCallback, BusinessError } from '@ohos.base';
import { LatLng } from '@bdmap/base';
import { emitter } from '@kit.BasicServicesKit';
import { Location } from './PublicClass';
import { BAIDU_MAP_OVERLAY_TEXT_TYPE, BaiduMapOverlayTextProps } from './BaiduMapOverlayText';
import { BAIDU_MAP_OVERLAY_MARKER_TYPE, BaiduMapOverlayMarkerProps } from './BaiduMapOverlayMarker';
import { BAIDU_MAP_OVERLAY_POLYGON_TYPE, BaiduMapOverlayPolygonProps } from './BaiduMapOverlayPolygon';
import { BAIDU_MAP_OVERLAY_POLYLINE_TYPE, BaiduMapOverlayPolylineProps } from './BaiduMapOverlayPolyline';
import { BAIDU_MAP_OVERLAY_CIRCLE_TYPE, BaiduMapOverlayCircleProps } from './BaiduMapOverlayCircle';
import { BAIDU_MAP_OVERLAY_INFO_WINDOW_TYPE } from './BaiduMapOverlayInfowindow';
import { AnimateDefine, ESatelliteLayerType } from '@bdmap/map/src/main/ets/r/u/util/l1/m1';
import { MapEnvConstant } from './MapEnvConstant';

interface mapEvent {
  geo: object,
}

class onMarkerClickEvent {
  position: Location = {
    latitude: 0,
    longitude: 0
  };
  title?: string;
}

class onMapStatusChangeEvent {
  overlook: number = 0;
  target: Location = {
    latitude: 0,
    longitude: 0
  };
}

export interface BaiduMapViewProps extends ViewBaseProps {
  zoomControlsVisible: boolean,
  trafficEnabled: boolean,
  baiduHeatMapEnabled: boolean,
  zoomGesturesEnabled: boolean, //是否充许手势缩放
  scrollGesturesEnabled: boolean, //是否允许拖动
  mapType: number,
  zoom: number,
  showsUserLocation: boolean,
  locationData: Location,
  center: Location,
}

export const BAIDU_MAP_VIEW_TYPE: string = "BaiduMapView"


export type BaiduMapViewDescriptor = Descriptor<"BaiduMapView", BaiduMapViewProps>;

@Component
export struct BaiduMapView {
  ctx!: RNOHContext
  tag: number = -1
  @State descriptor: BaiduMapViewDescriptor = {} as BaiduMapViewDescriptor
  private unregisterDescriptorChangesListener?: () => void = undefined
  callback?: AsyncCallback<MapController>;
  @State mapController: MapController | null = null;
  mapStatus: MapStatus = new MapStatus({});
  mapOpt: MapOptions = new MapOptions({});
  center: LatLng = new LatLng(39.914935, 116.403119);
  zoom: number = 10;
  showTraffic: boolean = false;
  zoomGesturesEnabled: boolean = true;
  scrollGesturesEnabled: boolean = true;
  zoomControlsVisible: boolean = true;
  showsUserLocation: boolean = false;
  locationData: Location = { latitude: 0, longitude: 0 };
  @State loc: Nullable<TLayer> | null = null;
  label: Label | null = null;
  circle: Circle | null = null;
  polyline: Polyline | null = null;
  pointArray: LatLng[] = [];
  polygon: Polygon | null = null;
  infoWindow: InfoWindow | null = null;
  marker: Marker | null = null;
  textProp: BaiduMapOverlayTextProps | null = null;
  circleProp: BaiduMapOverlayCircleProps | null = null;
  polylineProp: BaiduMapOverlayPolylineProps | null = null;
  polygonProp: BaiduMapOverlayPolygonProps | null = null;
  markerProp: BaiduMapOverlayMarkerProps | null = null;
  image: ImageEntity | null = null;

  onMapStatusChangeStart(): void {
    this.ctx.rnInstance.emitComponentEvent(
      this.tag,
      BAIDU_MAP_VIEW_TYPE, {
      type: 'onMapStatusChangeStart'
    }
    )
  }

  onMapStatusChange(mapChange: onMapStatusChangeEvent): void {
    this.ctx.rnInstance.emitComponentEvent(
      this.tag,
      BAIDU_MAP_VIEW_TYPE, {
      type: 'onMapStatusChange',
      onMapStatusChangeEvent: mapChange
    }
    )
  }

  onMapStatusChangeFinish(): void {
    this.ctx.rnInstance.emitComponentEvent(
      this.tag,
      BAIDU_MAP_VIEW_TYPE, {
      type: 'onMapStatusChangeFinish'
    }
    )
  }

  onMapLoaded(): void {
    this.ctx.rnInstance.emitComponentEvent(
      this.tag,
      BAIDU_MAP_VIEW_TYPE, {
      type: 'onMapLoaded'
    }
    )
  }

  onMapClick(location: Location): void {
    this.ctx.rnInstance.emitComponentEvent(
      this.tag,
      BAIDU_MAP_VIEW_TYPE, {
      type: 'onMapClick',
      location: location
    }
    )
  }

  onMapDoubleClick(): void {
    this.ctx.rnInstance.emitComponentEvent(
      this.tag,
      BAIDU_MAP_VIEW_TYPE, {
      type: 'onMapDoubleClick'
    }
    )
  }

  onMarkerClick(event: onMarkerClickEvent): void {
    this.ctx.rnInstance.emitComponentEvent(
      this.tag,
      BAIDU_MAP_VIEW_TYPE, {
      type: 'onMarkerClick',
      onMarkerClickEvent: event
    }
    )
  }

  onMapPoiClick(): void {
    this.ctx.rnInstance.emitComponentEvent(
      this.tag,
      BAIDU_MAP_VIEW_TYPE, {
      type: 'onMapPoiClick'
    }
    )
  }

  onMarkerItemClick(tag: Tag): void {
    this.ctx.rnInstance.emitComponentEvent(
      tag,
      BAIDU_MAP_OVERLAY_MARKER_TYPE, {
      type: 'onClick'
    }
    )
  }

  aboutToAppear() {
    Logger.debug('RNOH in BaiduMap aboutToAppear')
    this.descriptor = this.ctx.descriptorRegistry.getDescriptor<BaiduMapViewDescriptor>(this.tag)
    this.getProp(this.descriptor);
    this.unregisterDescriptorChangesListener = this.ctx.descriptorRegistry.subscribeToDescriptorChanges(this.tag,
      (newDescriptor) => {
        /*------ 当RN侧属性props有更改 -------*/
        Logger.debug(`RNOH in BaiduMap descriptor change, `);
        this.descriptor = (newDescriptor as BaiduMapViewDescriptor)
        this.getProp(this.descriptor);
      }
    )

  }

  private getProp(descriptor: BaiduMapViewDescriptor) {
    Logger.debug(`RNOH in BaiduMap descriptor props, ${JSON.stringify(descriptor.props)}`);
    Logger.debug(`RNOH in BaiduMap descriptor layoutMetrics, ${JSON.stringify(descriptor.layoutMetrics)}`);
    Logger.debug(`RNOH in BaiduMap descriptor tag length, ${JSON.stringify(descriptor.childrenTags.length)}`);

    if (descriptor.props.center) {
      Logger.debug(`RNOH in BaiduMap descriptor center, ${JSON.stringify(descriptor.props.center)}`);
      this.center.lat = descriptor.props.center.latitude;
      this.center.lng = descriptor.props.center.longitude;
    }

    if (descriptor.props.zoom) {
      Logger.debug(`RNOH in BaiduMap descriptor zoom, ${JSON.stringify(descriptor.props.zoom)}`);
      this.zoom = descriptor.props.zoom;
    }

    if (descriptor.props.trafficEnabled != null) {
      Logger.debug(`RNOH in BaiduMap descriptor trafficEnabled, ${JSON.stringify(descriptor.props.trafficEnabled)}`);
      this.showTraffic = descriptor.props.trafficEnabled;
    }

    if (descriptor.props.zoomGesturesEnabled != null) {
      Logger.debug(`RNOH in BaiduMap descriptor zoomGesturesEnabled, ${JSON.stringify(descriptor.props.zoomGesturesEnabled)}`);
      this.zoomGesturesEnabled = descriptor.props.zoomGesturesEnabled;
    }

    if (descriptor.props.scrollGesturesEnabled != null) {
      Logger.debug(`RNOH in BaiduMap descriptor zoomGesturesEnabled, ${JSON.stringify(descriptor.props.scrollGesturesEnabled)}`);
      this.scrollGesturesEnabled = descriptor.props.scrollGesturesEnabled;
    }

    if (descriptor.props.zoomControlsVisible != null) {
      Logger.debug(`RNOH in BaiduMap descriptor zoomControlsVisible, ${JSON.stringify(descriptor.props.zoomControlsVisible)}`);
      this.zoomControlsVisible = descriptor.props.zoomControlsVisible;
    }

    if (descriptor.props.showsUserLocation != null) {
      Logger.debug(`RNOH in BaiduMap descriptor showsUserLocation, ${JSON.stringify(descriptor.props.showsUserLocation)}`);
      this.showsUserLocation = descriptor.props.showsUserLocation;
    }

    if (descriptor.props.locationData) {
      Logger.debug(`RNOH in BaiduMap descriptor locationData, ${JSON.stringify(descriptor.props.locationData)}`);
      this.locationData = descriptor.props.locationData;
    }

    this.mapStatus = new MapStatus({ center: this.center, zoom: this.zoom });
    this.mapOpt.mapStatus = this.mapStatus;
    this.mapOpt.showTrafficMap = this.showTraffic;
    this.mapOpt.zoomGesturesEnabled = this.zoomGesturesEnabled;
    this.mapOpt.moveGesturesEnabled = this.scrollGesturesEnabled;
    if (descriptor.props.mapType == 2) {
      //卫星图
      this.mapOpt.showSatelliteMap = ESatelliteLayerType.NO_ROUTE;
    }

  }

  private getOverlay(descriptor: BaiduMapViewDescriptor) {
    Logger.debug('RNOH in BaiduMap getOverlay');
    let tagName = '';
    for (let i = 0; i < descriptor.childrenTags.length; i++) {
      tagName =
        this.ctx.rnInstance.getComponentNameFromDescriptorType(this.ctx.descriptorRegistry.getDescriptor(descriptor.childrenTags[i])?.type);
      Logger.debug('RNOH in BaiduMap tagName:' + tagName);
      switch (tagName) {
        case BAIDU_MAP_OVERLAY_CIRCLE_TYPE:
          Logger.debug('RNOH in BaiduMap circle');
          this.circleProp =
            this.ctx.descriptorRegistry.getDescriptor(descriptor.childrenTags[i]).props as BaiduMapOverlayCircleProps;
          if (this.circleProp) {
            Logger.debug(`RNOH in BaiduMap addOverlay circle prop, ${JSON.stringify(this.circleProp)}`);
            this.circle = new Circle({
              center: new LatLng(this.circleProp.center.latitude, this.circleProp.center.longitude),
              fillcolor: '#' + this.circleProp.fillColor,
              radius: this.circleProp.radius
            });
            if (this.circleProp.stroke) {
              this.circle.setStroke(new BaiduStroke({
                strokeWidth: this.circleProp.stroke.width,
                color: '#' + this.circleProp.stroke.color
              }));
            }

            if (this.mapController) {
              Logger.debug('RNOH in BaiduMap Overlay circle');
              this.mapController.addOverlay(this.circle);
            }
          }
          break;
        case BAIDU_MAP_OVERLAY_MARKER_TYPE:
          Logger.debug('RNOH in BaiduMap marker');
          this.markerProp =
            this.ctx.descriptorRegistry.getDescriptor(descriptor.childrenTags[i]).props as BaiduMapOverlayMarkerProps;
          if (this.markerProp) {
            Logger.debug(`RNOH in BaiduMap addOverlay marker prop, ${JSON.stringify(this.markerProp)}`);
            if (this.markerProp.icon && this.markerProp.icon.uri) {
              this.image = new ImageEntity(this.markerProp.icon.uri);
            }

            this.marker = new Marker();
            this.marker.setIcon(this.image);
            if (this.markerProp.location) {
              this.marker.setPosition(new LatLng(this.markerProp.location.latitude,
                this.markerProp.location.longitude));
            }

            if (this.markerProp.rotate) {
              this.marker.setRotate(this.markerProp.rotate);
            }

            if (this.markerProp.alpha) {
              this.marker.setAlpha(this.markerProp.alpha);
            }

            if (this.markerProp.flat != null) {
              this.marker.setFlat(this.markerProp.flat);
            }

            if (this.markerProp.perspective != null) {
              this.marker.setPerspective(this.markerProp.perspective);
            }

            if (this.markerProp.animateType) {
              switch (this.markerProp.animateType) {
                case 'drop':
                  this.marker.setAnimateType(AnimateDefine.DROP);
                  break;
                case 'grow':
                  this.marker.setAnimateType(AnimateDefine.GROW);
                  break;
                case 'jump':
                  this.marker.setAnimateType(AnimateDefine.JUMP);
                  break;
                default:
                  this.marker.setAnimateType(AnimateDefine.NONE);
                  break;
              }
            }

            this.marker.addEventListener(OverlayEvent.CLICK, () => {
              Logger.debug('RNOH in BaiduMap marker click');
              this.onMarkerItemClick(this.ctx.descriptorRegistry.getDescriptor(descriptor.childrenTags[i]).tag);
            })

            if (this.mapController) {
              Logger.debug('RNOH in BaiduMap Overlay marker');
              this.mapController?.addOverlay(this.marker);
            }

          }
          break;
        case BAIDU_MAP_OVERLAY_INFO_WINDOW_TYPE:
          Logger.debug('RNOH in BaiduMap infoWindow');
          break;
        case BAIDU_MAP_OVERLAY_POLYLINE_TYPE:
          Logger.debug('RNOH in BaiduMap polyline');
          this.polylineProp =
            this.ctx.descriptorRegistry.getDescriptor(descriptor.childrenTags[i]).props as BaiduMapOverlayPolylineProps;
          if (this.polylineProp) {
            Logger.debug(`RNOH in BaiduMap addOverlay polyline prop, ${JSON.stringify(this.polylineProp)}`);
            for (let i = 0; i < this.polylineProp.points.length; i++) {
              this.pointArray[i] =
                new LatLng(this.polylineProp.points[i].latitude, this.polylineProp.points[i].longitude)
            }
            this.polyline = new Polyline({
              points: this.pointArray,
              width: 20,
              join: SysEnum.LineJoinType.ROUND,
              cap: SysEnum.LineCapType.ROUND,
              isThined: true
            })

            if (this.polylineProp.stroke) {

            }

            if (this.mapController) {
              Logger.debug('RNOH in BaiduMap Overlay polyline');
              this.mapController.addOverlay(this.polyline);
            }

            this.pointArray = []
          }
          break;
        case BAIDU_MAP_OVERLAY_POLYGON_TYPE:
          Logger.debug('RNOH in BaiduMap polygon');
          this.polygonProp =
            this.ctx.descriptorRegistry.getDescriptor(descriptor.childrenTags[i]).props as BaiduMapOverlayPolygonProps;
          if (this.polygonProp) {
            Logger.debug(`RNOH in BaiduMap addOverlay polygon prop, ${JSON.stringify(this.polygonProp)}`);
            for (let i = 0; i < this.polygonProp.points.length; i++) {
              this.pointArray[i] =
                new LatLng(this.polygonProp.points[i].latitude, this.polygonProp.points[i].longitude)
            }
            this.polygon = new Polygon({
              points: this.pointArray,
              fillcolor: '#' + this.polygonProp.fillColor
            })

            if (this.polygonProp.stroke) {
              this.polygon?.setStroke(new BaiduStroke({
                strokeWidth: this.polygonProp.stroke.width,
                color: '#' + this.polygonProp.stroke.color
              }));
            }

            if (this.mapController) {
              Logger.debug('RNOH in BaiduMap Overlay polygon');
              this.mapController.addOverlay(this.polygon);
            }

            this.pointArray = []
          }
          break;
        case BAIDU_MAP_OVERLAY_TEXT_TYPE:
          Logger.debug('RNOH in BaiduMap text');
          this.textProp =
            this.ctx.descriptorRegistry.getDescriptor(descriptor.childrenTags[i]).props as BaiduMapOverlayTextProps;
          if (this.textProp) {
            Logger.debug(`RNOH in BaiduMap addOverlay text prop, ${JSON.stringify(this.textProp)}`);
            // 添加文字标注
            this.label = new Label();
            if (this.textProp.text) {
              this.label.setText(this.textProp.text);
            }
            if (this.textProp.fontSize) {
              this.label.setFontSize(this.textProp.fontSize);
            }
            if (this.textProp.location) {
              this.label.setPosition(new LatLng(this.textProp.location.latitude, this.textProp.location.longitude));
            }
            if (this.textProp.bgColor) {
              this.label.setBgColor("#" + this.textProp.bgColor);
            }
            if (this.textProp.rotate) {
              this.label.setRotate(this.textProp.rotate);
            }
            if (this.textProp.fontColor) {
              this.label.setFontColor("#" + this.textProp.fontColor);
            }

            if (this.mapController) {
              Logger.debug('RNOH in BaiduMap Overlay text');
              this.mapController.addOverlay(this.label);
            }
          }
          break;
      }
    }
  }

  aboutToDisappear() {
    this.unregisterDescriptorChangesListener?.()
  }

  build() {
    RNViewBase({ ctx: this.ctx, tag: this.tag }) {
      MapComponent({
        onReady: async (err: BusinessError, mapController: MapController) => {
          if (!err && mapController) {
            // 获取地图的控制器类，用来操作地图
            this.mapController = mapController;
            MapEnvConstant.getInstance().setMap(this.mapController);
            this.onMapLoaded();
            this.getOverlay(this.descriptor);

            emitter.emit({ eventId: Event.ZoomCom }, {
              data: { show: this.zoomControlsVisible }
            })

            if (this.showsUserLocation) {
              this.loc = this.mapController.getLayerByTag(SysEnum.LayerTag.LOCATION);
              if (this.loc) {
                let locReal = this.loc as LocationLayer;
                locReal.location = new LatLng(this.locationData.latitude, this.locationData.longitude);
              }
            }

            this.mapController.addEventListener(MapEvent.CLICK, (event) => {
              let eventModel = event as EventBundle;
              Logger.debug(`RNOH in BaiduMap MapEvent.CLICK event.geo, ${JSON.stringify(eventModel.geo)}`);
              let clickData = eventModel.geo as LatLng;
              if (clickData) {
                this.onMapClick({ latitude: clickData.lat, longitude: clickData.lng });
              }
            });

            this.mapController.addEventListener(MapEvent.DOUBLECLICK, (event) => {
              Logger.debug('RNOH in BaiduMap MapEvent.DOUBLECLICK');
              this.onMapDoubleClick();
            });
          }
        }, mapOptions: this.mapOpt
      }).width('100%').height('100%')
    }
  }
}
