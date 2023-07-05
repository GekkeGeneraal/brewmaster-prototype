<template>
  <img alt="Vue logo" src="./assets/logo.png">

  <div class="inventory">
    <InventorySlot :ingredient="inventory[0]"></InventorySlot>
    <InventorySlot :ingredient="inventory[1]"></InventorySlot>
    <InventorySlot :ingredient="inventory[2]"></InventorySlot>
    <InventorySlot :ingredient="inventory[3]"></InventorySlot>
  </div>

  <div class="shelf">
    <ShelfSlot @on-click="addItemToInventory" :ingredient="new Ingredient(1, 'Walking root')" :quantity="14"></ShelfSlot>
    <ShelfSlot @on-click="addItemToInventory" :ingredient="new Ingredient(2, 'Dittany')" :quantity="14"></ShelfSlot>
    <ShelfSlot @on-click="addItemToInventory" :ingredient="new Ingredient(3, 'Bezoar')" :quantity="14"></ShelfSlot>
    <ShelfSlot @on-click="addItemToInventory" :ingredient="new Ingredient(4, 'Murkbane')" :quantity="14"></ShelfSlot>
    <ShelfSlot @on-click="addItemToInventory" :ingredient="new Ingredient(5, 'Greenleaf')" :quantity="14"></ShelfSlot>
  </div>
</template>

<script>
import ShelfSlot from "@/components/ShelfSlot";
import Ingredient from "@/models/Ingredient";
import InventorySlot from "@/components/InventorySlot";
import {ref} from "vue";

export default {
  name: 'App',
  components: {
    InventorySlot,
    ShelfSlot
  },
  setup() {
    let inventory = ref([
        null,
        null,
        null,
        null
    ]);

    const addItemToInventory = (item) => {
      for (let i = 0; i < 4; i++ ) {
        if (inventory.value[i] === null) {
          inventory.value[i] = item
          break;
        }
      }
    }

    return {
      inventory,
      Ingredient,

      addItemToInventory
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.shelf {
  position: absolute;
  right: 0;
}

.inventory {
  display: inline-flex;
  position: absolute;
  bottom: 0;
  margin: 0 auto;
}
</style>
