<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>User Detail</hero-bar>
  <main-section>
    <div>
      <div class="text-2xl">
        <a id="detail-order-id" class="font-bold">Order Id: </a>{{ orders.id }}
      </div>
    </div>

    <div id="order-detail" class="my-3 text-2xl font-bold">
      Order Detail
    </div>

    <table>
      <thead class="order-table">
        <tr>
          <th v-if="checkable" />
          <th>Order item</th>
          <th>Description</th>
          <th>Price</th>
          <th>Type</th>
          <th />
        </tr>
      </thead>
      <tbody
        v-for="item in orders.items"
        class="order-table-item"
        :key="item.id"
      >
        <tr :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']">
          <checkbox-cell
            v-if="checkable"
            @checked="checked($event, user)"
          />
          <td data-label="Id">
            {{ item.name }}
          </td>
          <td data-label="Id">
            {{ item.description }}
          </td>
          <td data-label="Id">
            {{ item.price }}
          </td>
          <td data-label="Id">
            {{ item.type }}
          </td>
        </tr>
      </tbody>
    </table>

    <div id="order-response" class="my-3 text-2xl font-bold">
      Response
    </div>

    <table>
      <thead>
        <tr>
          <th id="order-currency">Currency : </th>
          <!-- <td id="order-item-currency">{{ orders.notification_response.currency }}</td> -->
        </tr>
        <tr>
          <th id="order-fraud">Fraud Status :</th>
          <!-- <td>{{ orders.notification_response.fraud_status }}</td> -->
        </tr>
        <tr>
          <th id="order-gross">Gross Amount :</th>
          <!-- <td>{{ orders.notification_response.gross_amount }}</td> -->
        </tr>
        <tr>
          <th id="order-status">Status Message :</th>
          <!-- <td>{{ orders.notification_response.status_message }}</td> -->
        </tr>
        <tr>
          <th id="order-payment">Payment Type :</th>
          <!-- <td>{{ orders.notification_response.payment_type }}</td> -->
        </tr>
        <tr>
          <th id="order-transaction-id">Transaction Id :</th>
          <!-- <td>{{ orders.notification_response.transaction_id }}</td> -->
        </tr>
        <tr>
          <th id="order-transaction-time">Transaction Time :</th>
          <!-- <td>{{ orders.notification_response.transaction_time }}</td> -->
        </tr>
      </thead>
    </table>
  </main-section>
</template>

<script>
import { ref } from 'vue'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import Order from '@/firebase/users/Order'
export default {
	data () {
		return {
      orders: {
          notification_response: {
            currency: '',
            fraud_status: '',
            gross_amount: '',
            status_message: '',
            payment_type: '',
            transaction_id: '',
            transaction_time: ''
          }
      }
		}
	},
	created () {
        this.fetchOrder()
	},
	methods: {
        async fetchOrder () {
            this.orders = await Order.getDocument(['users', this.$route.params.id, 'orders'], this.$route.params.orderId)
        }
	}
}
</script>

<script setup>
const titleStack = ref(['Admin', 'User', 'Detail'])
</script>
