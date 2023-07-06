<template>
  <div class="inventory-slot">
    {{ ingredient?.name }}
    <div v-if="ingredient?.prepared">({{ ingredient?.type }})</div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "InventorySlot",
  props: ['ingredient', 'quantity'],
  setup(props) {
    let amount = ref(props.quantity);

    return {
      amount
    };
  }
}
</script>

<style lang="scss" scoped>
.inventory-slot {
  display: flex;
  flex-direction: column;
  width: 80px;
  height: 80px;
  position: relative;
  color: black;
  border-radius: 10px;
  border: 3px solid grey;
  margin: 20px;
  align-items: center;
  justify-content: center;
}
</style>
