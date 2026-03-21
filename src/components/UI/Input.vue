<script setup lang="ts">

interface InputProps {
  title: string;
  modelValue: string;
  className?: string;
  style?: string;
  placeholder?: string;
}

const props = defineProps<InputProps>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

</script>

<template>
  <div class="field">
    <label class="field__label" :for="`id_${props.title}`">{{props.title}}</label>
    <input
      class="field__input"
      :id="`id_${props.title}`"
      :value="props.modelValue"
      @input="handleInput"
    />
  </div>
</template>

<style scoped>

  .field__input {
    max-width: 100%;
    border-radius: 8px;
    border: 1px solid #d6d7d8;
    background-color: #eaeaeb;
    padding: 8.5px 13px 8.5px;
    color: #2B3033;
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    outline: none;
    transition: border-color 0.3s ease-in-out;
  }

  .field__input:focus {
    border: 1px solid #EFFE7D;
  }
</style>