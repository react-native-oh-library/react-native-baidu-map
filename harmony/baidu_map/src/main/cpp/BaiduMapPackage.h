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

#include "RNOH/Package.h"
#include "ComponentDescriptors.h"
#include "BaiduMapOverlayArcJSIBinder.h"
#include "BaiduMapOverlayCircleJSIBinder.h"
#include "BaiduMapOverlayClusterJSIBinder.h"
#include "BaiduMapOverlayHeatMapJSIBinder.h"
#include "BaiduMapOverlayInfoWindowJSIBinder.h"
#include "BaiduMapOverlayMarkerIconJSIBinder.h"
#include "BaiduMapOverlayMarkerJSIBinder.h"
#include "BaiduMapOverlayPolygonJSIBinder.h"
#include "BaiduMapOverlayPolylineJSIBinder.h"
#include "BaiduMapOverlayTextJSIBinder.h"
#include "BaiduMapViewJSIBinder.h"
#include "NativeTurboModule.h"
#include "BaiduMapEventEmitRequestHandler.h"
using namespace rnoh;
using namespace facebook;

class BaiduMapFactoryTurboModuleDelegate : public TurboModuleFactoryDelegate {
public:
    SharedTurboModule createTurboModule(Context ctx, const std::string &name) const override {
        if (name == "NativeTurboModule") {
            return std::make_shared<NativeTurboModule>(ctx, name);
        }
        return nullptr;
    };
};

namespace rnoh {

class BaiduMapPackage : public Package {
public:
    BaiduMapPackage(Package::Context ctx) : Package(ctx) {}

    std::unique_ptr<TurboModuleFactoryDelegate> createTurboModuleFactoryDelegate() override {
        return std::make_unique<BaiduMapFactoryTurboModuleDelegate>();
    }

    std::vector<facebook::react::ComponentDescriptorProvider> createComponentDescriptorProviders() override {
        return {
            facebook::react::concreteComponentDescriptorProvider<
                facebook::react::BaiduMapOverlayArcComponentDescriptor>(),
            facebook::react::concreteComponentDescriptorProvider<
                facebook::react::BaiduMapOverlayCircleComponentDescriptor>(),
            facebook::react::concreteComponentDescriptorProvider<
                facebook::react::BaiduMapOverlayClusterComponentDescriptor>(),
            facebook::react::concreteComponentDescriptorProvider<
                facebook::react::BaiduMapOverlayHeatMapComponentDescriptor>(),
            facebook::react::concreteComponentDescriptorProvider<
                facebook::react::BaiduMapOverlayInfoWindowComponentDescriptor>(),
            facebook::react::concreteComponentDescriptorProvider<
                facebook::react::BaiduMapOverlayMarkerIconComponentDescriptor>(),
            facebook::react::concreteComponentDescriptorProvider<
                facebook::react::BaiduMapOverlayMarkerComponentDescriptor>(),
            facebook::react::concreteComponentDescriptorProvider<
                facebook::react::BaiduMapOverlayPolygonComponentDescriptor>(),
            facebook::react::concreteComponentDescriptorProvider<
                facebook::react::BaiduMapOverlayPolylineComponentDescriptor>(),
            facebook::react::concreteComponentDescriptorProvider<
                facebook::react::BaiduMapOverlayTextComponentDescriptor>(),
            facebook::react::concreteComponentDescriptorProvider<facebook::react::BaiduMapViewComponentDescriptor>(),
        };
    }
    ComponentJSIBinderByString createComponentJSIBinderByName() override {
        return {
            {"BaiduMapOverlayArc", std::make_shared<BaiduMapOverlayArcJSIBinder>()},
            {"BaiduMapOverlayCircle", std::make_shared<BaiduMapOverlayCircleJSIBinder>()},
            {"BaiduMapOverlayCluster", std::make_shared<BaiduMapOverlayClusterJSIBinder>()},
            {"BaiduMapOverlayHeatMap", std::make_shared<BaiduMapOverlayHeatMapJSIBinder>()},
            {"BaiduMapOverlayInfoWindow", std::make_shared<BaiduMapOverlayInfoWindowJSIBinder>()},
            {"BaiduMapOverlayMarkerIcon", std::make_shared<BaiduMapOverlayMarkerIconJSIBinder>()},
            {"BaiduMapOverlayMarker", std::make_shared<BaiduMapOverlayMarkerJSIBinder>()},
            {"BaiduMapOverlayPolygon", std::make_shared<BaiduMapOverlayPolygonJSIBinder>()},
            {"BaiduMapOverlayPolyline", std::make_shared<BaiduMapOverlayPolylineJSIBinder>()},
            {"BaiduMapOverlayText", std::make_shared<BaiduMapOverlayTextJSIBinder>()},
            {"BaiduMapView", std::make_shared<BaiduMapViewJSIBinder>()},
        };
    };

    EventEmitRequestHandlers createEventEmitRequestHandlers() override {
        return {std::make_shared<BaiduMapEventEmitRequestHandler>(),
                std::make_shared<BaiduMapMarkerEventEmitRequestHandler>()};
    }
};
} // namespace rnoh
