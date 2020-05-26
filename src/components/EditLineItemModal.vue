<template>
  <SimpleModal class="edit-line-item">
    <h3 slot="header">{{ title }}</h3>
    <div slot="body" class="edit-line-item-body">
      <label>
        Product<br />
        <ProductSelector v-model="localLineItem.product" />
      </label>
      <label for="rate">
        Rate<br />
        <input
          name="rate"
          type="number"
          placeholder="Rate"
          v-model="rate"
          class="number-input"
        />
      </label>
      <label for="quantity">
        Quantity <br />
        <input
          type="number"
          placeholder="Quantity"
          v-model.number="localLineItem.quantity"
          class="number-input"
        />
      </label>
    </div>
    <div slot="footer">
      <button @click="updateLineItem" :disabled="!isValidLineItem">Ok</button>
      <button @click="$emit('close')">Cancel</button>
    </div>
  </SimpleModal>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator"
import { cloneDeep } from "lodash"
import ProductSelector from "./ProductSelector.vue"
import SimpleModal from "./SimpleModal.vue"
import Decimal from "decimal.js"

@Component({
  components: {
    SimpleModal,
    ProductSelector,
  },
})
export default class EditLineItemModal extends Vue {
  @Prop({ required: true, type: Object })
  item!: Types.Partial<Types.LineItem>

  @Prop({ type: String, default: "edit" })
  mode!: "edit" | "create"

  localLineItem: Types.Partial<Types.LineItem> = {
    product: null,
    rate: null,
    quantity: 0,
  }

  get title() {
    return this.mode == "edit" ? "Edit Line Item" : "Add Line Item"
  }

  get rate() {
    const rate = this.localLineItem.rate
    return rate ? rate.toNumber() : null
  }
  set rate(val) {
    this.localLineItem.rate = val ? new Decimal(val) : null
  }

  get isValidLineItem() {
    return (
      !!this.localLineItem.product &&
      !!this.localLineItem.rate &&
      typeof this.localLineItem.quantity == "number"
    )
  }

  @Watch("value", { immediate: true, deep: true })
  valueChangeHandler() {
    this.localLineItem = cloneDeep(this.item)
  }

  updateLineItem() {
    this.$emit("update", this.localLineItem)
  }
}
</script>

<style scoped>
.edit-line-item {
  text-align: left;
}
.edit-line-item-body {
  display: grid;
  grid-template-columns: 1fr 100px 100px;
}

.number-input {
  width: 60px;
}
</style>
