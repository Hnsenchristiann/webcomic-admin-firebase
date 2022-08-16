import UserList from '../../../src/views/user/List.vue'
import UserDetail from '../../../src/views/user/Detail.vue'
import UserProfile from '../../../src/views/user/Profile.vue'
import { mount, flushPromises } from '@vue/test-utils'
import options from '../../utils/pluginInitializer.js'
import { nextTick } from 'vue'

test('UserList', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    const wrapper = mount(UserList, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    expect(wrapper.find('#hero-bar').text()).toContain('User List')
    expect(wrapper.find('#card-component-title').exists()).toBe(true)
    expect(wrapper.find('#card-component-title').text()).toBe('Create new User')
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "User List"]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)

    expect(wrapper.find('#user-role').text()).toBe('Role')
    expect(wrapper.find('#user-name').text()).toBe('Name')
    expect(wrapper.find('#user-email').text()).toBe('Email')
    expect(wrapper.find('#user-password').text()).toBe('Password')
    expect(wrapper.find('#user-confirm').text()).toBe('Confirm Password')
    expect(wrapper.find('#user-id').text()).toBe('Id')
    expect(wrapper.find('#user-name').text()).toBe('Name')
    expect(wrapper.find('#user-email').text()).toBe('Email')
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    expect(wrapper.findAll('.user-item-id').map(v => v.text())).toEqual(expect.arrayContaining(["user-1"]))
    expect(wrapper.findAll('.user-item-name').map(v => v.text())).toEqual(expect.arrayContaining(["ppramesii"]))
    expect(wrapper.findAll('.user-item-email').map(v => v.text())).toEqual(expect.arrayContaining(["ppramesi@visi8.com"]))
})

test('UserDetail', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    const wrapper = mount(UserDetail, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    expect(wrapper.find('#hero-bar').text()).toContain('User Detail')
    expect(wrapper.find('#detail-username').text()).toBe('Username:')
    expect(wrapper.find('#detail-email').text()).toBe('Email:')
    expect(wrapper.find('#detail-order').text()).toBe(`User's Order`)
    expect(wrapper.find('#detail-purchased').text()).toBe(`User's Purchased Comic`)
    expect(wrapper.find('#detail-purchased-title').text()).toBe(`Title`)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "User", "Detail"]))
    expect(wrapper.findAll('.detail-table').map(v => v.text())).toEqual(expect.arrayContaining(["Order IdTotal AmountStatusDetails"]))
})

test('UserProfile', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    const wrapper = mount(UserProfile, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    expect(wrapper.find('#profile-username').text()).toBe('Username')
    expect(wrapper.find('#profile-admin').text()).toBe('Admin')
    expect(wrapper.find('#profile-admin').text()).toBe('Admin')
    expect(wrapper.find('#profile-id').text()).toBe('Id')
    expect(wrapper.find('#profile-email').text()).toBe('Email')
    expect(wrapper.find('#profile-email-address').text()).toBe('Admin@admin.com')
    expect(wrapper.find('#profile-tokens').text()).toBe('Total Tokens')
    expect(wrapper.find('#profile-total').text()).toBe('0')
    expect(wrapper.find('#profile-banners').text()).toBe('Banners')
    expect(wrapper.find('#profile-dashboard').text()).toBe('Dashboard Tags')
    expect(wrapper.find('#profile-prices').text()).toBe('Prices')
    expect(wrapper.find('#profile-social').text()).toBe('Social Media')
    expect(wrapper.find('#profile-banners-tab').text()).toBe('Banners Tab')
    expect(wrapper.find('#profile-dashboard-tab').text()).toBe('Dashboard Tags Tab')
    expect(wrapper.find('#profile-prices-tab').text()).toBe('Prices Tab')
    expect(wrapper.find('#profile-social-tab').text()).toBe('Social Media Tab')
})