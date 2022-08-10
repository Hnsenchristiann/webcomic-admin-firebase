import DetailOrder from '../../../../src/views/user/order/Detail.vue'
import { mount, flushPromises } from '@vue/test-utils'
import options from '../../../utils/pluginInitializer.js'
import { nextTick } from 'vue'

test('DetailOrder', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    options.plugins.router.push({ name: 'orderDetail', params: { id: 'user-1', orderId: 'order-1' } })
    await options.plugins.router.isReady()
    await nextTick()
    await nextTick()
    await flushPromises()
    await flushPromises()

    const wrapper = mount(DetailOrder, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    expect(wrapper.find('#detail-order-id').text()).toBe('Order Id:')
    expect(wrapper.find('#order-detail').text()).toBe('Order Detail')
    expect(wrapper.findAll('.order-table').map(v => v.text())).toEqual(expect.arrayContaining(["Order itemDescriptionPriceType"]))
    expect(wrapper.find('#order-response').text()).toBe('Response')
    expect(wrapper.find('#order-currency').text()).toBe('Currency :')
    // expect(wrapper.find('#order-item-currency').text()).toBe('Currency :')
    expect(wrapper.find('#order-fraud').text()).toBe('Fraud Status :')
    expect(wrapper.find('#order-gross').text()).toBe('Gross Amount :')
    expect(wrapper.find('#order-status').text()).toBe('Status Message :')
    expect(wrapper.find('#order-payment').text()).toBe('Payment Type :')
    expect(wrapper.find('#order-transaction-id').text()).toBe('Transaction Id :')
    expect(wrapper.find('#order-transaction-time').text()).toBe('Transaction Time :')
    expect(wrapper.find('#hero-bar').text()).toContain('User Detail')
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "User", "Detail"]))
})