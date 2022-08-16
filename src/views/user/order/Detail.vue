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
      <thead>
        <tr>
          <th v-if="checkable" />
          <th class="order-table-item">Order item</th>
          <th class="order-table-description">Description</th>
          <th class="order-table-price">Price</th>
          <th class="order-table-type">Type</th>
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
          <td class="order-item-name" data-label="Id">
            {{ item.name }}
          </td>
          <td class="order-item-description" data-label="Id">
            {{ item.description }}
          </td>
          <td class="order-item-price" data-label="Id">
            {{ item.price }}
          </td>
          <td class="order-item-type" data-label="Id">
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
          <td class="order-item-currency">{{ orders.notification_response.currency }}</td>
        </tr>
        <tr>
          <th id="order-fraud">Fraud Status :</th>
          <td class="order-item-fraud">{{ orders.notification_response.fraud_status }}</td>
        </tr>
        <tr>
          <th id="order-gross">Gross Amount :</th>
          <td class="order-item-gross">{{ orders.notification_response.gross_amount }}</td>
        </tr>
        <tr>
          <th id="order-status">Status Message :</th>
          <td class="order-item-status">{{ orders.notification_response.status_message }}</td>
        </tr>
        <tr>
          <th id="order-payment">Payment Type :</th>
          <td class="order-item-payment">{{ orders.notification_response.payment_type }}</td>
        </tr>
        <tr>
          <th id="order-transaction-id">Transaction Id :</th>
          <td class="order-item-transactionId">{{ orders.notification_response.transaction_id }}</td>
        </tr>
        <tr>
          <th id="order-transaction-time">Transaction Time :</th>
          <td class="order-item-transactionTime">{{ orders.notification_response.transaction_time }}</td>
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
          notification_response: {}
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
