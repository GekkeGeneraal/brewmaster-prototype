<template>
  <div class="hand">
    {{ hand?.name }}
    <div v-if="hand?.prepared">({{ hand?.type }})</div>
  </div>

  <div class="table">
    <CauldronComponent :mix="madeMix" @on-finish="finish" @on-add="addToCauldron" :cauldron-ingredients="cauldronIngredients" class="cauldron"></CauldronComponent>
    <MortalPestle @on-process="processIngredient" class="mortar"></MortalPestle>
    <CuttingBoard @on-process="processIngredient" class="cutting-board"></CuttingBoard>
  </div>

  <div class="inventory">
    <InventorySlot @click="select(0)" :ingredient="inventory[0]"></InventorySlot>
    <InventorySlot @click="select(1)" :ingredient="inventory[1]"></InventorySlot>
    <InventorySlot @click="select(2)" :ingredient="inventory[2]"></InventorySlot>
    <InventorySlot @click="select(3)" :ingredient="inventory[3]"></InventorySlot>
  </div>

  <div class="shelf">
    <ShelfSlot @on-click="addItemToInventory" :ingredient="shelf[0]" :quantity="14"></ShelfSlot>
    <ShelfSlot @on-click="addItemToInventory" :ingredient="shelf[1]" :quantity="14"></ShelfSlot>
    <ShelfSlot @on-click="addItemToInventory" :ingredient="shelf[2]" :quantity="14"></ShelfSlot>
    <ShelfSlot @on-click="addItemToInventory" :ingredient="shelf[3]" :quantity="14"></ShelfSlot>
    <ShelfSlot @on-click="addItemToInventory" :ingredient="shelf[4]" :quantity="14"></ShelfSlot>
  </div>
</template>

<script>
import ShelfSlot from "@/components/ShelfSlot";
import Ingredient from "@/models/Ingredient";
import InventorySlot from "@/components/InventorySlot";
import {ref} from "vue";
import CuttingBoard from "@/components/CuttingBoard.vue";
import MortalPestle from "@/components/MortalPestle.vue";
import CauldronComponent from "@/components/CauldronComponent.vue";
import Property from "@/models/Property";
import Buff from "@/models/Buff";

export default {
  name: 'App',
  components: {
    CauldronComponent,
    MortalPestle,
    CuttingBoard,
    InventorySlot,
    ShelfSlot
  },
  setup() {
    let absorbing = new Property(1, 'Absorbing');
    let duration = new Property(2, 'Duration');

    let walkingRoot = new Ingredient(1, 'Walking root');
    walkingRoot.propertyMap['cut'] = {
      property: absorbing,
      stirTime: 10,
      minTemp: 40,
      maxTemp: 70
    };

    let greenLeaf = new Ingredient(5, 'Greenleaf');
    greenLeaf.propertyMap['grinded'] = {
      property: duration,
      stirTime: 3,
      minTemp: 10,
      maxTemp: 50
    };

    let tempHealing = new Buff(1, 'Temporary Healing', 'Heals the user x health per second for x seconds');
    tempHealing.combination = [
        1, 2
    ];

    let madeMix = ref(null);

    let buffs = ref([
        tempHealing
    ]);

    let shelf = ref([
      walkingRoot,
      new Ingredient(2, 'Dittany'),
      new Ingredient(3, 'Bezoar'),
      new Ingredient(4, 'Murkbane'),
      greenLeaf
    ]);
    let inventory = ref([
        null,
        null,
        null,
        null
    ]);
    let cauldronIngredients = ref([]);
    let hand = ref(null);

    const addItemToInventory = (item) => {
      for (let i = 0; i < 4; i++ ) {
        if (inventory.value[i] === null) {
          inventory.value[i] = item
          break;
        }
      }
    }

    const select = (index) => {
      let temp = inventory.value[index];
      inventory.value[index] = hand.value;
      hand.value = temp;
    };

    const addToCauldron = () => {
      if (hand.value == null) return;

      cauldronIngredients.value.push(hand.value);
      hand.value = null;
    };
    const finish = (stirTime, averageTemp) => {
      let completedProperties = [];
      let processedIndexes = [];

      for (let item of cauldronIngredients.value) {
        let property = item.propertyMap[item.type];
        if (property) {
          if (stirTime >= property.stirTime && (averageTemp >= property.minTemp && averageTemp <= property.maxTemp)) {
            processedIndexes.push(cauldronIngredients.value.indexOf(item));
            completedProperties.push(property.property);
          }
        }
      }

      for (var i = processedIndexes.length -1; i >= 0; i--)
        cauldronIngredients.value.splice(processedIndexes[i],1);

      let completedBuffs = [];
      for (let buff of buffs.value) {
        let itemNotFound = false;
        let modProperties = completedProperties;
        for (let property of buff.combination) {
          let item = modProperties.find(item => item.id === property);
          if (item) {
            modProperties.splice(modProperties.indexOf(item), 1);
          } else {
            itemNotFound = true;
          }
        }

        if (modProperties.length === 0 && !itemNotFound) {
          completedBuffs.push(buff);
        }
      }

      console.log(cauldronIngredients.value.length === 0)
      madeMix.value = completedBuffs.length === 1 && cauldronIngredients.value.length === 0 ? completedBuffs[0] : null;
      cauldronIngredients.value = [];
    };

    const processIngredient = (type) => {
      if (hand.value == null || hand.value.prepared) {
        return;
      }

      hand.value.prepared = true;
      hand.value.type = type;
    }

    return {
      madeMix,
      hand,
      shelf,
      inventory,
      Ingredient,
      cauldronIngredients,

      addItemToInventory,
      processIngredient,
      select,
      addToCauldron,
      finish
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

.table {
  position: relative;
  margin: 0 150px;
  width: calc(100% - 300px);
  height: 600px;
  background: sandybrown;

  .cutting-board {
    position: absolute;
    bottom: 20px;
    right: 220px;
  }

  .mortar {
    position: absolute;
    top: 50px;
    right: 100px;
  }

  .cauldron {
    position: absolute;
    top: 40px;
    left: 80px;
  }
}

.shelf {
  position: fixed;
  top: 0;
  right: 0;
}

.inventory {
  display: inline-flex;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
}

.hand {
  display: flex;
  flex-direction: column;
  width: 80px;
  height: 80px;
  position: absolute;
  bottom: 0;
  left: 0;
  color: black;
  border-radius: 10px;
  border: 3px solid grey;
  margin: 20px;
  align-items: center;
  justify-content: center;
}
</style>
