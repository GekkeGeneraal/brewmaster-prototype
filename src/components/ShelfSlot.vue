<template>
<div @click="click" class="shelf-slot">
  <span class="counter">{{ amount }}</span>
  {{ ingredient.name }}
</div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "ShelfSlot",
  props: ['ingredient', 'quantity'],
  emits: ['onClick'],
  setup(props, { emit }) {
    let amount = ref(props.quantity);
    let ingredient = ref(props.ingredient);

    const click = () => {
      if (ingredient.value == null) {
        return;
      }

      if (amount.value - 1 <= 0) {
        ingredient.value = null;
      }

      amount.value -= 1;

      emit('onClick', props.ingredient);
    }

    return {
      amount,

       click
    };
  }
}
</script>

<style lang="scss" scoped>
.shelf-slot {
  display: flex;
  width: 80px;
  height: 80px;
  position: relative;
  color: black;
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
    background: indianred;
    color: white;
    font-weight: bold;
    align-items: center;
    justify-content: center;
  }
}
</style>
