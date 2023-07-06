<template>
<div class="mortar-pestle">
  <div class="cauldron-options">
    <button @click="grind()">Grind</button>
  </div>
</div>
</template>

<script>
export default {
  name: "MortalPestle",
  emits: ['onProcess'],
  methods: {
    grind: function() {
      this.$emit('onProcess', 'grinded');
    },
  }
}
</script>

<style lang="scss" scoped>
.mortar-pestle {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 40px solid black;
  background: grey;
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
