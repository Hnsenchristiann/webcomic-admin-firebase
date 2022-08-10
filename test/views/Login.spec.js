import Login from '../../src/views/Login.vue'
import { flushPromises, mount } from '@vue/test-utils'
import options from '../utils/pluginInitializer.js'
import { getAuthStore } from '../__mocks__/authMock.js'

test('Login', async () => {
    const wrapper = mount(Login, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    const promises = [
        wrapper.find('input[name="email"]').setValue('email@email.com'),
        wrapper.find('input[name="password"]').setValue('password')
    ]

    await Promise.all(promises)

    await wrapper.find('#login-button').trigger('click')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    expect(getAuthStore().getState(['currentUser', 'email'])).toEqual('email@email.com')
    expect(getAuthStore().getState(['currentUser', 'password'])).toEqual('password')
    
    expect(wrapper.find('#login-forgot').text()).toBe('Forgot Password?')
    expect(wrapper.find('#login-wrong').exists()).toBe(false)
    expect(wrapper.find('#login-description').text()).toBe('Dont have an account yet? Sign up')
})