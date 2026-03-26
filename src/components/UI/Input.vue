<script setup lang="ts">

interface InputProps {
  title: string;
  modelValue: string;
  className?: string;
  // style?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
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
    <label
      class="field__label"
      :class="{
        'field__label--required': props.error,
      }"
      :for="`id_${props.title}`"
    >
      {{props.title}}
<!--      <span v-if="props.required">*</span>-->
    </label>
    <input
      class="field__input"
      :class="{
        'field__input--required': props.error,
      }"
      :id="`id_${props.title}`"
      :value="props.modelValue"
      @input="handleInput"
    />
    <div v-if="props.error" class="field__error-message">
      {{ props.error }}
    </div>
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

  .field__input--required {
    border: 1px solid rgba(255, 59, 48, 1);
    border-radius: 8px;
    background-color: rgba(255, 225, 225, 1);
  }

  .field__error-message {
    color: #FF3B30;
    font-size: 10px;
    font-weight: 400;
    line-height: 18px;
  }

</style>