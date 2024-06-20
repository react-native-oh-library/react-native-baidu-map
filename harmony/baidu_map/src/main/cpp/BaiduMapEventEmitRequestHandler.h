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

#ifndef HARMONY_BAIDUMAPEVENTEMITREQUESTHANDLER_H
#define HARMONY_BAIDUMAPEVENTEMITREQUESTHANDLER_H

#include <glog/logging.h>
#include "glog/logging.h"
#include "EventEmitters.h"
#include "RNOH/ArkJS.h"
#include "RNOH/EventEmitRequestHandler.h"

using namespace facebook;
namespace rnoh {

enum BaiduMapEventType {
    MAP_STATUS_CHANGE_START = 0,
    MAP_STATUS_CHANGE = 1,
    MAP_STATUS_CHANGE_FINISH = 2,
    MAP_LOADED = 3,
    MAP_CLICK = 4,
    MAP_DOUBLE_CLICK = 5,
    MARKER_CLICK = 6,
    POI_CLICK = 7,
};

BaiduMapEventType getBaiduMapEventType(ArkJS &arkJs, napi_value eventObject) {
    auto eventType = arkJs.getString(arkJs.getObjectProperty(eventObject, "type"));
    if (eventType == "onMapStatusChangeStart") {
        return BaiduMapEventType::MAP_STATUS_CHANGE_START;
    } else if (eventType == "onMapStatusChange") {
        return BaiduMapEventType::MAP_STATUS_CHANGE;
    } else if (eventType == "onMapStatusChangeFinish") {
        return BaiduMapEventType::MAP_STATUS_CHANGE_FINISH;
    } else if (eventType == "onMapLoaded") {
        return BaiduMapEventType::MAP_LOADED;
    } else if (eventType == "onMapClick") {
        return BaiduMapEventType::MAP_CLICK;
    } else if (eventType == "onMapDoubleClick") {
        return BaiduMapEventType::MAP_DOUBLE_CLICK;
    } else if (eventType == "onMarkerClick") {
        return BaiduMapEventType::MARKER_CLICK;
    } else if (eventType == "onMapPoiClick") {
        return BaiduMapEventType::POI_CLICK;
    } else {
        throw std::runtime_error("Unknown baiduMap event type");
    }
}

class BaiduMapEventEmitRequestHandler : public EventEmitRequestHandler {
public:
    void handleEvent(EventEmitRequestHandler::Context const &ctx) override {
        if (ctx.eventName != "BaiduMapView") {
            return;
        }

        ArkJS arkJs(ctx.env);
        auto eventEmitter = ctx.shadowViewRegistry->getEventEmitter<facebook::react::BaiduMapViewEventEmitter>(ctx.tag);
        if (eventEmitter == nullptr) {
            return;
        }
        switch (getBaiduMapEventType(arkJs, ctx.payload)) {
        case BaiduMapEventType::MAP_STATUS_CHANGE_START: {
            break;
        }
        case BaiduMapEventType::MAP_STATUS_CHANGE: {
            break;
        }
        case BaiduMapEventType::MAP_STATUS_CHANGE_FINISH: {
            break;
        }
        case BaiduMapEventType::MAP_LOADED: {
            react::BaiduMapViewEventEmitter::OnMapLoaded event{};
            DLOG(INFO) << "baiduMap BaiduMapEventEmitRequestHandler MAP_LOADED";
            eventEmitter->onMapLoaded(event);
            break;
        }
        case BaiduMapEventType::MAP_CLICK: {
            DLOG(INFO) << "baiduMap BaiduMapEventEmitRequestHandler MAP_CLICK";
            RNOHNapiObject naturalSizeObject = arkJs.getObject(arkJs.getObjectProperty(ctx.payload, "location"));
            float longitude = (float)arkJs.getDouble(naturalSizeObject.getProperty("longitude"));
            float latitude = (float)arkJs.getDouble(naturalSizeObject.getProperty("latitude"));
            react::BaiduMapViewEventEmitter::OnMapClick event{};
            event.latitude = latitude;
            event.longitude = longitude;
            eventEmitter->onMapClick(event);
            break;
        }
        case BaiduMapEventType::MAP_DOUBLE_CLICK: {
            react::BaiduMapViewEventEmitter::OnMapDoubleClick event{};
            DLOG(INFO) << "baiduMap BaiduMapEventEmitRequestHandler MAP_DOUBLE_CLICK";
            eventEmitter->onMapDoubleClick(event);
            break;
        }
        case BaiduMapEventType::MARKER_CLICK: {
            break;
        }
        case BaiduMapEventType::POI_CLICK: {
            break;
        }
        default:
            break;
        }
    };
};

class BaiduMapMarkerEventEmitRequestHandler : public EventEmitRequestHandler {
public:
    void handleEvent(EventEmitRequestHandler::Context const &ctx) override {
        if (ctx.eventName != "BaiduMapOverlayMarker") {
            return;
        }

        ArkJS arkJs(ctx.env);
        auto eventEmitter =
            ctx.shadowViewRegistry->getEventEmitter<facebook::react::BaiduMapOverlayMarkerEventEmitter>(ctx.tag);
        if (eventEmitter == nullptr) {
            return;
        }
        react::BaiduMapOverlayMarkerEventEmitter::OnClick event{};
        DLOG(INFO) << "baiduMap BaiduMapEventEmitRequestHandler marker item click";
        eventEmitter->onClick(event);
    };
};
} // namespace rnoh
#endif // HARMONY_BAIDUMAPEVENTEMITREQUESTHANDLER_H
