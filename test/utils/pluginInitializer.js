import router from '../../src/router/index.js'
import helpers from '../../src/utils/helpers'
import DRM from '../../src/utils/DRM.js'
import emitter from '../../src/utils/emitter.js'
import routeResolver from '../../src/utils/routeResolver';
import detectMobile from '../../src/utils/detectMobile'
import fbAnalytics from '../../src/utils/analytics.js'
import asyncComponentLoader from '../../src/utils/asyncComponentLoader.js'
import { createPinia } from 'pinia';

const vuePropertySetter = (app, name, instance) => {
    app.provide(name, instance)
    app.config.globalProperties[name] = instance
}
// const emitter = mitt()
const injector = {
    install(app){
        vuePropertySetter(app, 'emitter', emitter)
        vuePropertySetter(app, 'DRM', DRM)
        vuePropertySetter(app, 'helpers', helpers)
        vuePropertySetter(app, 'routeResolver', routeResolver)
        // vuePropertySetter(app, 'qrCode', QRCode)
        vuePropertySetter(app, 'detectMobile', detectMobile)
        vuePropertySetter(app, 'fbAnalytics', fbAnalytics)
        vuePropertySetter(app, 'asyncComponentLoader', asyncComponentLoader)
        vuePropertySetter(app, '$loading', {
            show: () => ({
                hide: () => {}
            }),
        })
        // app.provide('swal', Swal)
        // app.provide('emitter', emitter)
        // app.config.globalProperties.emitter = emitter
        // app.provide('DRM', DRM)
        // app.provide('helpers', helpers)
        // app.provide('routeResolver', routeResolver)
        // app.provide('qrCode', QRCode)
    }
}

export default {
    plugins: {
        injector,
        router,
        // VueLoading,
        pinia: createPinia()
    },
    components: {
    }
}