<template>
  <div class="inventory-slot">
    <span class="counter">{{ amount }}</span>
    {{ ingredient?.name }}
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
  width: 80px;
  height: 80px;
  background: red;
  position: relative;
  color: white;
  border-radius: 10px;
  border: 3px solid grey;
  margin: 20px;
  align-items: center;
  justify-content: center;

.counter {
  display: flex;
  position: absolute;
  top: -10px;
  right: -10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: blue;
  color: white;
  font-weight: bold;
  align-items: center;
  justify-content: center;
}
}
</style>
