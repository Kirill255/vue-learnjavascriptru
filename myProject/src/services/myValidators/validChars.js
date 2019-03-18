// Пишем свой валидатор, так как встроенный не поддерживает русские символы (Cyrillic), только Latin

// если к полю !НЕ применяется required-валидатор

// export const validChars = (value) => {
//   return (/^[a-zA-Zа-яА-ЯЁё]+$/ig).test(value)
// }

// если кроме вашего валидатора, к полю применяется required-валидатор

// https://monterail.github.io/vuelidate/#sub-optional-validator
import { helpers } from 'vuelidate/lib/validators';

export const validChars = (value) => !helpers.req(value) || (/^[a-zA-Zа-яА-ЯЁё]+$/ig).test(value);

