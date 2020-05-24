<template>
  <div class="line-item">
    <div class="product-name">{{ item.product.name }}</div>
    <div class="rate">$ {{ item.rate }}</div>
    <div class="quantity">x{{ item.quantity }}</div>
    <div class="line-total">$ {{ lineItemTotal }}</div>
    <div class="actions">
      <a href="#" @click.prevent="showEditModal = true">Edit</a>&nbsp;
      <a href="#" @click.prevent="removeLineItem">Delete</a>
    </div>
    <EditLineItemModal
      v-if="showEditModal"
      :item="item"
      mode="edit"
      @close="showEditModal = false"
      @update="updateLineItem"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import EditLineItemModal from "./EditLineItemModal.vue"
import LineItem from "../modules/lineItem"

@Component({ components: { EditLineItemModal } })
export default class LineItemComp extends Vue {
  @Prop({ required: true, type: Object })
  item!: Types.LineItem

  @Prop({ required: true, type: Number })
  index!: number

  showEditModal = false

  get lineItemTotal() {
    return LineItem.calculateLineTotal(this.item)
  }

  updateLineItem(lineItem: Types.LineItem) {
    this.$emit("update", this.index, lineItem)
    this.showEditModal = false
  }
  removeLineItem() {
    this.$emit("remove", this.index)
  }
}
</script>

<style scoped>
.line-item {
  display: grid;
  grid-template-columns: 1fr 50px 50px 50px auto;
  gap: 10px;
}
.product-name {
  text-align: left;
}
.rate,
.quantity,
.line-total {
  text-align: right;
}
</style>
