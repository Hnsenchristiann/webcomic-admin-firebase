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

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    expect(wrapper.findAll('.order-table-item').map(v => v.text())).toEqual(expect.arrayContaining(["Order item"]))
    expect(wrapper.findAll('.order-table-description').map(v => v.text())).toEqual(expect.arrayContaining(["Description"]))
    expect(wrapper.findAll('.order-table-price').map(v => v.text())).toEqual(expect.arrayContaining(["Price"]))
    expect(wrapper.findAll('.order-table-type').map(v => v.text())).toEqual(expect.arrayContaining(["Type"]))

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    expect(wrapper.findAll('.order-item-name').map(v => v.text())).toEqual(expect.arrayContaining(["order name"]))
    expect(wrapper.findAll('.order-item-description').map(v => v.text())).toEqual(expect.arrayContaining(["order des"]))
    expect(wrapper.findAll('.order-item-price').map(v => v.text())).toEqual(expect.arrayContaining(["order price"]))
    expect(wrapper.findAll('.order-item-type').map(v => v.text())).toEqual(expect.arrayContaining(["order type"]))

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    expect(wrapper.find('#order-response').text()).toBe('Response')
    expect(wrapper.find('#order-currency').text()).toBe('Currency :')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    expect(wrapper.findAll('.order-item-currency').map(v => v.text())).toEqual(expect.arrayContaining(["IDR"]))
    expect(wrapper.findAll('.order-item-fraud').map(v => v.text())).toEqual(expect.arrayContaining(["accept"]))
    expect(wrapper.findAll('.order-item-gross').map(v => v.text())).toEqual(expect.arrayContaining(["1.00"]))
    expect(wrapper.findAll('.order-item-status').map(v => v.text())).toEqual(expect.arrayContaining(["G854442052"]))
    expect(wrapper.findAll('.order-item-payment').map(v => v.text())).toEqual(expect.arrayContaining(["gopay"]))
    expect(wrapper.findAll('.order-item-transactionId').map(v => v.text())).toEqual(expect.arrayContaining(["b3ba65e7-459e-4195-ac91-629fcfc5e2ec"]))
    expect(wrapper.findAll('.order-item-transactionTime').map(v => v.text())).toEqual(expect.arrayContaining(["date"]))
    expect(wrapper.find('#order-fraud').text()).toBe('Fraud Status :')
    expect(wrapper.find('#order-gross').text()).toBe('Gross Amount :')
    expect(wrapper.find('#order-status').text()).toBe('Status Message :')
    expect(wrapper.find('#order-payment').text()).toBe('Payment Type :')
    expect(wrapper.find('#order-transaction-id').text()).toBe('Transaction Id :')
    expect(wrapper.find('#order-transaction-time').text()).toBe('Transaction Time :')
    expect(wrapper.find('#hero-bar').text()).toContain('User Detail')
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "User", "Detail"]))
})