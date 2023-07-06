<template>
  <div class="board">
    <div class="cauldron-options">
      <button @click="cut()">Cut</button>
      <button @click="crush()">Crush</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CuttingBoard",
  emits: ['onProcess'],
  methods: {
    cut: function() {
      this.$emit('onProcess', 'cut');
    },
    crush: function() {
      this.$emit('onProcess', 'crushed');
    }
  }
}
</script>

<style lang="scss" scoped>
.board {
  width: 300px;
  height: 200px;
  background: saddlebrown;
}
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
</style>
