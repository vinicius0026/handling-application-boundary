<template>
  <div class="hello" style="width: 400px; margin: auto;">
    <Invoice v-model="invoice" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import User from "@/modules/user"
import InvoiceModule from "@/modules/invoice"
import Invoice from "@/components/Invoice.vue"

@Component({
  components: {
    Invoice,
  },
})
export default class HelloWorld extends Vue {
  get currentUser() {
    return User.create()
  }

  invoice: Types.Invoice = InvoiceModule.create(this.currentUser)
}
</script>
