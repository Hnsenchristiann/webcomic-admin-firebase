<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>User Detail</hero-bar>
  <main-section>
    <div>
      <div id="detail-username" class="text-3xl">
        <a class="font-bold">Username: </a>{{ user.name }}
      </div>
      <div id="detail-email" class="text-2xl">
        <a class="font-bold">Email: </a>{{ user.email }}
      </div>
    </div>

    <button
      class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
      @click="$refs.comicBestowal.openModal()"
    >
      Give Comic
    </button>
    <comic-bestowal ref="comicBestowal" :user="user"></comic-bestowal>

    <div id="detail-order" class="my-3 text-2xl font-bold">
      User's Order
    </div>

    <table>
      <thead class="detail-table">
        <tr>
          <th v-if="checkable" />
          <th>Order Id</th>
          <th>Total Amount</th>
          <th>Status</th>
          <th>Details</th>
          <th />
        </tr>
      </thead>
      <tbody
        v-for="item in orders"
        class="detail-item-orders"
        :key="item.id"
      >
        <tr :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']">
          <checkbox-cell
            v-if="checkable"
            @checked="checked($event, user)"
          />
          <td data-label="Id">
            {{ item.id }}
          </td>
          <td data-label="Id">
            {{ item.total_amount }}
          </td>
          <td data-label="Id">
            {{ item.status }}
          </td>
          <td class="actions-cell">
            <div
              class="flex"
              no-wrap
            >
              <div class="px-2">
                <router-link :to="{name: 'orderDetail', params: { orderId: item.id}}">
                  <button id="order-button-detail" class="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded">
                    Detail
                  </button>
                </router-link>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div id="detail-purchased" class="my-3 text-2xl font-bold">
      User's Purchased Comic
    </div>

    <table>
      <thead>
        <tr>
          <th v-if="checkable" />
          <th id="detail-purchased-title">Title</th>
          <th />
        </tr>
      </thead>
      <tbody
        v-for="item in comics"
        :key="item.id"
      >
        <tr :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']">
          <checkbox-cell
            v-if="checkable"
            @checked="checked($event, user)"
          />
          <td data-label="Id">
            {{ item.title }}
          </td>
        </tr>
      </tbody>
    </table>
  </main-section>
</template>

<script>
import { ref } from 'vue'
import ComicBestowal from '@/views/user/component/ComicBestowal.vue'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import User from '@/firebase/users/User'
import Order from '@/firebase/users/Order'
import History from '@/firebase/users/PurchasedComic'
import Comic from '@/firebase/comics/Comic'
// import { getDoc } from '@firebase/firestore'
export default {
	data () {
		return {
			user: {},
            orders: {},
            purchased_comics: {},
            comics: {}
		}
	},
	created () {
		this.fetchUser(),
        this.fetchOrder()
        this.fetchHistory()
	},
  components: {
    ComicBestowal
  },
	methods: {
		async fetchUser () {
			this.user = await User.getDocument(this.$route.params.id)
		},
        async fetchOrder () {
            this.orders = await Order.getOrders(['users', this.$route.params.id, 'orders'])
        },
        async fetchHistory () {
            this.purchased_comics = await History.getHistories(['users', this.$route.params.id, 'purchased_comics'])
            const comics = await Promise.all(this.purchased_comics.map(v => v.id).map((id) => {
                return Comic.getDocument(id)
            }))
            console.log(comics)
            this.comics = comics
        }
	}
}
</script>

<script setup>
const titleStack = ref(['Admin', 'User', 'Detail'])
</script>
