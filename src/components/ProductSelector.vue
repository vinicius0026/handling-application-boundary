<template>
  <select v-model="selectedProduct">
    <template v-for="(product, i) in products">
      <option :value="product" :key="i">{{ product.name }}</option>
    </template>
  </select>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Mixins } from "vue-property-decorator"

@Component({})
export default class ProductSelector extends Vue {
  @Prop({ required: false, type: Object, default: null })
  value!: Types.Product | null

  products: Types.Product[] = [
    { name: "Product 01", description: "prod 01 description" },
    { name: "Product 02", description: "prod 02 description" },
  ]

  get selectedProduct() {
    return this.value
  }

  set selectedProduct(val) {
    this.$emit("input", val)
  }
}
</script>

<style scoped></style>
