<template>
  <full-screen-section bg="login">
    <div class="w-full md:w-96 md:mx-auto min-h-screen flex flex-col p-5 justify-center">
      <div class="mb-4">
        <input
          id="login-email"
          v-model="email"
          name="email"
          for="email"
          class="shadow appearance-none border rounded-full w-full py-2 px-3 text-grey-darker"
          type="text"
          placeholder="Email"
        >
      </div>
      <div class="pass-form">
        <input
          id="login-password"
          v-model="password"
          name="password"
          for="password"
          class="shadow appearance-none border border-red rounded-full w-full py-2 px-3 text-grey-darker mb-3"
          type="password"
          placeholder="Password"
        >
      </div>
      <div id="login-forgot" class="text-sm text-center text-white mb-10">
        <router-link to="#">
          Forgot Password?
        </router-link>
      </div>
      <div
      id="login-wrong"
        v-if="loginFailed"
        class="text-red-400 mb-2"
      >
        Wrong password or email
      </div>
      <div id="login-button-container" class="flex items-center justify-between">
        <button
          id="login-button"
          class="bg-green-400 w-full hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-full"
          type="button"
          @click="login"
        >
          LOG IN
        </button>
      </div>
      <div class="text-m text-center mt-6 text-white">
        <p id="login-description">Dont have an account yet? Sign up</p>
      </div>
      <div id="login-google" class="flex flex-row items-center justify-center pt-5">
        <img
          class="w-10"
          :src="facebookIcon"
        >
        <img
          class="w-10"
          :src="instagramIcon"
        >
        <img
          class="w-10"
          :src="twitterIcon"
        >
      </div>
    </div>
  </full-screen-section>
</template>

<script>
// import { reactive } from 'vue'
// import { useRouter } from 'vue-router'
// import { mdiAccount, mdiAsterisk } from '@mdi/js'
import FullScreenSection from '@/components/FullScreenSection.vue'
// import CardComponent from '@/components/CardComponent.vue'
// import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
// import Field from '@/components/Field.vue'
// import Control from '@/components/Control.vue'
// import Divider from '@/components/Divider.vue'
// import JbButton from '@/components/JbButton.vue'
// import JbButtons from '@/components/JbButtons.vue'
import { useAuthStore } from '../store/auth.js'
export default {
	name: 'Login',
	components: {
		FullScreenSection
	},
	// mounted () {
	//   this.emitter.on('loginError', () => {
	//     this.loginFailed = true
	//     this.email = ''
	//     this.password = ''
	//   })
	// },
	setup () {
		const authStore = useAuthStore()

		return {
			authStore
		}
	},
	data () {
		return {
			email: '',
			password: '',
			loginFailed: false,
			facebookIcon: require('../assets/icons/facebook.png'),
			instagramIcon: require('../assets/icons/instagram.png'),
			twitterIcon: require('../assets/icons/twitter.png'),
			karaBackground: require('../assets/kara_bg.jpg')
		}
	},
	methods: {
		login () {
			this.authStore.login(this.email, this.password,
				() => {
					// const fromRouteStr = localStorage.getItem('fromRoute')
					// const fromRoute = fromRouteStr ? JSON.parse(fromRouteStr) : { name: 'Dashboard' }
					this.$router.push('Dashboard')
				},
				() => {
					console.log('error')
					this.loginFailed = true
					this.email = ''
					this.password = ''
				}
			)
		}
	}
}
</script>
