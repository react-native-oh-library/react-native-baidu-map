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

import { Descriptor, RNOHContext, RNViewBase, ViewBaseProps } from '@rnoh/react-native-openharmony';

import Logger from './Logger';

import { Location, Stroke } from './PublicClass';

export interface BaiduMapOverlayPolygonProps extends ViewBaseProps {
  fillColor: string;
  stroke: Stroke;
  points: Array<Location>;
}

export const BAIDU_MAP_OVERLAY_POLYGON_TYPE: string = "BaiduMapOverlayPolygon"


export type BaiduMapOverlayPolygonDescriptor = Descriptor<"BaiduMapOverlayPolygon", BaiduMapOverlayPolygonProps>;

@Component
export struct BaiduMapOverlayPolygon {
  ctx!: RNOHContext
  tag: number = -1
  @State descriptor: BaiduMapOverlayPolygonDescriptor = {} as BaiduMapOverlayPolygonDescriptor
  private unregisterDescriptorChangesListener?: () => void = undefined

  aboutToAppear() {
    Logger.debug('RNOH in BaiduMapOverlayPolygon aboutToAppear')
    this.descriptor = this.ctx.descriptorRegistry.getDescriptor<BaiduMapOverlayPolygonDescriptor>(this.tag)
    Logger.debug(`RNOH in BaiduMapOverlayPolygon descriptor props, ${JSON.stringify(this.descriptor.props)}`);
    this.unregisterDescriptorChangesListener = this.ctx.descriptorRegistry.subscribeToDescriptorChanges(this.tag,
      (newDescriptor) => {
        /*------ 当RN侧属性props有更改 -------*/
        Logger.debug(`RNOH in BaiduMap descriptor change, `);
        this.descriptor = (newDescriptor as BaiduMapOverlayPolygonDescriptor)
        Logger.debug(`RNOH in BaiduMap descriptor props, ${JSON.stringify(this.descriptor.props)}`);
      }
    )

  }

  aboutToDisappear() {
    this.unregisterDescriptorChangesListener?.()
  }

  build() {
    RNViewBase({ ctx: this.ctx, tag: this.tag }) {

    }
  }
}
