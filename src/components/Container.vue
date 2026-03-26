<script setup lang="ts">

import Btn from "./UI/Btn.vue";
import Table from "./UI/Table.vue";
import Input from "./UI/Input.vue";
import Dropdown from "./UI/Dropdown.vue";
import ModalWindow from "./UI/ModalWindow.vue";
import FileLoader from "./UI/FileLoader.vue";

import {computed, reactive, ref} from "vue";
import type {FileWithMeta, FormFields, Pet, PetFormData} from "../types/types.ts";

const isModalOpen = ref(false);

const currentEditItem = ref<Pet | null>(null);
const formData = reactive<PetFormData>({
  name: '',
  type: '',
  dateOfBirth: '',
  presenceOfAStamp: '',
  vaccination: '',
  treatmentForEctoparasites: '',
  treatmentForHelminths: '',
  sterilization: '',
  files: [],
});

const formErrors = reactive<Record<string, string>>({});

const validateForm = (): boolean => {
  Object.keys(formErrors).forEach(key => delete formErrors[key]);

  let isValid = true;

  formFields.value.forEach(field => {
    if (field.required) {
      const value = formData[field.key];

      if (field.type === 'fileLoader') {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          formErrors[field.key] = 'Пожалуйста, прикрепите файл';
          isValid = false;
        }
      } else {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          formErrors[field.key] = 'Пожалуйста, заполните поле';
          isValid = false;
        }
      }
    }
  })

  return isValid;

}

const clearError = (key: string) => {
  if (formErrors[key]) {
    delete formErrors[key];
  }
}

const formFields = ref<FormFields[]>([
  {
    label: 'Кличка',
    key: 'name',
    type: 'input',
    placeholder: '',
    required: true,
  },
  {
    label: 'Вид',
    key: 'type',
    type: 'dropdown',
    options: [
        'Собака',
        'Кот',
        'Птица',
    ],
    placeholder: '',
    required: true,
  },
  {
    label: 'Дата рождения',
    key: 'dateOfBirth',
    type: 'date',
    placeholder: '',
    required: true,
  },
  {
    label: 'Наличие клейма',
    key: 'presenceOfAStamp',
    type: 'dropdown',
    options: [
      'да',
      'нет',
    ],
    placeholder: '',
    required: true,
  },
  {
    label: 'Вакцинация',
    key: 'vaccination',
    type: 'dropdown',
    options: [
      'да',
      'нет',
    ],
    placeholder: '',
    required: true,
  },
  {
    label: 'Обработка от эктопаразитов',
    key: 'treatmentForEctoparasites',
    type: 'dropdown',
    options: [
      'да',
      'нет',
    ],
    placeholder: '',
    required: true,
  },
  {
    label: 'Обработка от гельминтов',
    key: 'treatmentForHelminths',
    type: 'dropdown',
    options: [
      'да',
      'нет',
    ],
    placeholder: '',
    required: true,
  },
  {
    label: 'Стерилизация',
    key: 'sterilization',
    type: 'dropdown',
    options: [
      'да',
      'нет',
    ],
    placeholder: '',
    required: true,
  },
  {
    label: 'Добавьте документы',
    key: 'files',
    type: 'fileLoader',
    placeholder: '',
    required: true,
  },
]);

const pets = ref<Pet[]>([
  { id: 1, name: 'Бобик', type: 'Собака', dateOfBirth: '21.12.2026', presenceOfAStamp: true, sterilization: false, treatmentForEctoparasites: true, treatmentForHelminths: false, vaccination: false },
  { id: 2, name: 'Мурка', type: 'Кошка', dateOfBirth: '21.12.2026', presenceOfAStamp: true, sterilization: false, treatmentForEctoparasites: true, treatmentForHelminths: false, vaccination: false },
]);

const openCreateModal = () => {
  currentEditItem.value = null;
  Object.assign(formData, {
    name: '',
    type: '',
    date: '',
    presenceOfAStamp: '',
    vaccination: '',
    treatmentForEctoparasites: '',
    treatmentForHelminths: '',
    sterilization: '',
    files: [],
  });
  isModalOpen.value = true;
}

const openEditModal = (item: Pet) => {
  currentEditItem.value = item;

  const existingFiles:FileWithMeta[] = item.files?.map((f, index) => ({
    id: `existing-${index}`,
    date: new Date(),
    customName: f instanceof File ? f.name : 'Документ',
    file: f instanceof File ? f : new File([], 'placeholder'),
  })) || [];

  Object.assign(formData, {
    name: item.name,
    type: item.type,
    dateOfBirth: item.dateOfBirth,
    presenceOfAStamp: item.presenceOfAStamp ? 'да' : 'нет',
    vaccination: item.vaccination ? 'да' : 'нет',
    treatmentForEctoparasites: item.treatmentForEctoparasites ? 'да' : 'нет',
    treatmentForHelminths: item.treatmentForHelminths ? 'да' : 'нет',
    sterilization: item.sterilization ? 'да' : 'нет',
    files: existingFiles,
  });
  isModalOpen.value = true;
}

const convertFormDataToPet = (formData: PetFormData): Omit<Pet, 'id' | 'files'> => {
  return {
    name: formData.name,
    type: formData.type,
    dateOfBirth: formData.dateOfBirth,
    presenceOfAStamp: formData.presenceOfAStamp === 'да',
    vaccination: formData.vaccination === 'да',
    treatmentForEctoparasites: formData.treatmentForEctoparasites === 'да',
    treatmentForHelminths: formData.treatmentForHelminths === 'да',
    sterilization: formData.sterilization === 'да',
  }
}

const saveData = () => {

  if (!validateForm()) {
    return;
  }

  const petData = convertFormDataToPet(formData);
  const filesToSave = formData.files.map(f => f.file);

  if (currentEditItem.value) {
    const index = pets.value.findIndex(p => p.id === currentEditItem.value!.id);
    if (index !== -1) {
        pets.value[index] = {
          ...pets.value[index],
          ...petData,
          files: filesToSave,
        }
    }
  } else {
    pets.value.push({
      id: Date.now(),
      ...petData,
      files: filesToSave,
    });
  }

  isModalOpen.value = false;
}

const modalTitle = computed(() =>
  currentEditItem.value ? 'Редактирование данных о питомце' : 'Добавление питомца'
);

const btnText = computed(() =>
  currentEditItem.value ? 'Сохранить' : 'Добавить'
)

</script>

<template>
  <Table :items="pets" @click="openEditModal"/>

  <ModalWindow
    :title="modalTitle"
    v-model="isModalOpen"
  >

    <div v-for="field in formFields" :key="field.key">

      <Input
        v-if="field.type === 'input'"
        :title="field.label"
        :placeholder="field.placeholder"
        :modelValue="formData[field.key]"
        :required="field.required"
        :error="formErrors[field.key]"
        @update:modelValue="
          val => {
            formData[field.key] = val;
            clearError(field.key);
          }
        "
      />

      <Dropdown
        v-if="field.type === 'dropdown'"
        :title="field.label"
        :placeholder="field.placeholder"
        :items="field.options"
        :modelValue="formData[field.key]"
        :required="field.required"
        :error="formErrors[field.key]"
        @update:modelValue="
          val => {
            formData[field.key] = val;
            clearError(field.key);
          }
        "
      />

      <FileLoader
          v-if="field.type === 'fileLoader'"
          :title="field.label"
          :fileArr="formData.files"
          :required="field.required"
          @change="
            val => {
              formData.files = val;
              clearError(field.key);
            }
          "
      />
    </div>

    <Btn :text="btnText" @click="saveData" :style="'margin: 38px auto 0;'"/>
    <div
      v-if="currentEditItem"
      :class="{
        'remove-btn': true,
      }"
    >
      Удалить запись
    </div>
  </ModalWindow>
  <Btn text="Добавить питомца" :disabled="false" :style="'margin: 20px 0 0;'" @click="openCreateModal"/>
</template>

<style scoped>

</style>