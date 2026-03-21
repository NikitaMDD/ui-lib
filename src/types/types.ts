export interface Pet {
    id: number;
    name: string;
    type: string;
    dateOfBirth: string;
    presenceOfAStamp: boolean;
    vaccination: boolean;
    treatmentForEctoparasites: boolean;
    treatmentForHelminths: boolean;
    sterilization: boolean;
    files?: (File | string)[];
}

export interface PetFormData {
    name: string;
    type: string;
    dateOfBirth: string;
    presenceOfAStamp: string;
    vaccination: string;
    treatmentForEctoparasites: string;
    treatmentForHelminths: string;
    sterilization: string;
}

interface BaseFields {
    label: string;
    placeholder: string;
    key: keyof PetFormData;
}

interface InputFields extends BaseFields {
    type: 'input';
}

interface DropdownFields extends BaseFields {
    type: 'dropdown';
    options: string[];
}

interface DateFields extends BaseFields {
    type: 'date';
}

interface FileFields extends BaseFields {
    type: 'fileLoader';
}

export type FormFields = InputFields | DropdownFields | DateFields | FileFields;