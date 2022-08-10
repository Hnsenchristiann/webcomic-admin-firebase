<template>
  <main-section>
    <div class="grid grid-cols-5 p-5">
      <div class="col-span-1 bg-white max-w-full py-3 text-lg">
        <div class="flex items-center justify-center">
          <div class="text-center py-3">
            <img
              class="rounded-full w-32 h-32"
              src="https:\/\/avatars.dicebear.com\/v2\/gridy\/Howell-Hand.svg"
            >
            <p id="profile-username" class="font-bold">
              Username
            </p>
            <p id="profile-admin">Admin</p>
          </div>
        </div>

        <div class="px-3">
          <div class="flex items-center justify-center">
            <div id="profile-id" class="flex-grow py-2">
              Id
            </div>
            <div>1</div>
          </div>
          <div class="flex items-center justify-center">
            <div id="profile-email" class="flex-grow py-2">
              Email
            </div>
            <div id="profile-email-address">Admin@admin.com</div>
          </div>
          <div class="flex items-center justify-center">
            <div id="profile-tokens" class="flex-grow py-2">
              Total Tokens
            </div>
            <div id="profile-total">0</div>
          </div>
          <div class="my-3">
            <button id="profile-button-tokens" class="bg-blue-500 w-full hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded">
              Grant Tokens
            </button>
          </div>
        </div>
      </div>
      <div class="col-span-4 mx-2 max-w-full bg-white py-3 text-lg">
        <div class="w-full">
          <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                id="profile-banners"
                class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                :class="{'text-blue-600 bg-white': openTab !== 1, 'text-white bg-blue-600': openTab === 1}"
                @click="toggleTabs(1)"
              >
                Banners
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                id="profile-dashboard"
                class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                :class="{'text-blue-600 bg-white': openTab !== 2, 'text-white bg-blue-600': openTab === 2}"
                @click="toggleTabs(2)"
              >
                Dashboard Tags
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                id="profile-prices"
                class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                :class="{'text-blue-600 bg-white': openTab !== 3, 'text-white bg-blue-600': openTab === 3}"
                @click="toggleTabs(3)"
              >
                Prices
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                id="profile-social"
                class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                :class="{'text-blue-600 bg-white': openTab !== 4, 'text-white bg-blue-600': openTab === 4}"
                @click="toggleTabs(4)"
              >
                Social Media
              </a>
            </li>
          </ul>
          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div class="px-4 py-5 flex-auto">
              <div class="tab-content tab-space">
                <div :class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                  <div id="profile-banners-tab">Banners Tab</div>
                </div>
                <div :class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                  <div id="profile-dashboard-tab">Dashboard Tags Tab</div>
                </div>
                <div :class="{'hidden': openTab !== 3, 'block': openTab === 3}">
                  <div id="profile-prices-tab">Prices Tab</div>
                </div>
                <div :class="{'hidden': openTab !== 4, 'block': openTab === 4}">
                  <div id="profile-social-tab">Social Media Tab</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main-section>
</template>

<script>
export default {
	name: 'FuchsiaTabs',
	data () {
		return {
			openTab: 1
		}
	},
	methods: {
		toggleTabs: function (tabNumber) {
			this.openTab = tabNumber
		}
	}
}
</script>
