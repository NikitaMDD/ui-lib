<script setup lang="ts">

  interface BtnProps {
    text: string;
    style?: string;
    className?: string;
    disabled?: boolean;
  }

  const props = defineProps<BtnProps>();

  const emit = defineEmits<{
    click: [event: MouseEvent];
  }>();

  const handleClick = (event: MouseEvent) => {
    emit('click', event);
  }

</script>

<template>
  <button
    :class="['btn', props.className]"
    :disabled="props.disabled"
    @click="handleClick"
    :style="props.style"
  >
    {{props.text}}
  </button>
</template>

<style scoped>

  .btn {
    width: 332px;
    padding: 17px 0;
    border-radius: 16px;
    background: #EFFE7D;
    transition: background 0.3s ease-in-out;
    max-height: 56px;
    font-size: 18px;
    font-weight: 600;
    display: block;
  }

  .btn:hover {
    background: #eaeaeb;
  }

</style>