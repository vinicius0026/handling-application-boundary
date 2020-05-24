<template>
  <div>
    <button @click="showModal = true">Add Line Item</button>
    <EditLineItemModal
      v-if="showModal"
      :item="newLineItem()"
      mode="create"
      @update="addLineItem"
      @close="showModal = false"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator"
import EditLineItemModal from "./EditLineItemModal.vue"
import Decimal from "decimal.js"

@Component({
  components: {
    EditLineItemModal,
  },
})
export default class AddLineItem extends Vue {
  showModal = false

  newLineItem(): Types.Partial<Types.LineItem> {
    return {
      product: null,
      rate: new Decimal(0),
      quantity: 0,
    }
  }

  @Emit("add")
  addLineItem(lineItem: Types.LineItem) {
    this.showModal = false
    return lineItem
  }
}
</script>
