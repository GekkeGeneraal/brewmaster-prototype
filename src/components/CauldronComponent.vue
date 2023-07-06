<template>
<div class="cauldron">
  <div class="added-ingredients">
    <div v-for="item in cauldronIngredients" :key="item.id" class="item">
      {{ item.name }}
      <div v-if="item?.prepared">({{ item.type }})</div>
    </div>
  </div>


  <div class="made-mix">
    <div class="item">
      {{ mix?.name }}
    </div>
  </div>

  <div class="cauldron-options">
    <span>Total stir time: {{ stirTime }}</span>
    <button @click="add()">Add</button>
    <button @click="stir()">Stir</button>
    <button @click="finish()">Finish</button>
  </div>

  <div class="temperature-button">
    <span :class="{'hot': temp >= 30, 'warm': temp >= 10, 'cold': true}">Current temperature: {{ temp }}</span>
    <button @click="heat()">Heat up</button>
  </div>
</div>
</template>

<script>
export default {
  name: "CauldronComponent",
  props: ['cauldronIngredients', 'mix'],
  emits: ['onFinish', 'onAdd'],
  data() {
    return {
      stirTime: 0,
      temp: 0
    };
  },
  mounted() {
    setInterval(() => {
      this.temp = (this.temp === 0 ? this.temp : this.temp - 1);
    }, 6000);
  },
  methods: {
    heat: function() {
      this.temp += 7;
    },
    stir: function() {
      this.stirTime += 1;
    },
    add: function() {
      this.$emit('onAdd');
    },
    finish: function() {
      this.$emit('onFinish', this.stirTime, this.temp);
    }
  }
}
</script>

<style lang="scss" scoped>
.added-ingredients {
  display: inline-flex;
  margin: 50px auto 0;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border: 4px solid white;
    border-left: 2px solid white;
    border-right: 2px solid white;
    color: white;
    font-size: 12px;

    &:first-child {
      border-left: 4px solid white;
    }

    &:last-child {
      border-right: 4px solid white;
    }
  }
}

.made-mix {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
  display: inline-flex;
  margin: 50px auto 0;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border: 4px solid white;
    border-left: 2px solid white;
    border-right: 2px solid white;
    color: white;
    font-size: 12px;

    &:first-child {
      border-left: 4px solid white;
    }

    &:last-child {
      border-right: 4px solid white;
    }
  }
}

.cauldron {
  position: relative;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: #2c3e50;

  .cauldron-options {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    margin: auto;

    span {
      color: white;
    }

    button {
      margin: auto;
    }
  }

  .temperature-button {
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);

    span {
      &.cold {
        color: blue;
      }

      &.warm {
        color: green;
      }

      &.hot {
        color: red;
      }
    }
  }
}
</style>
