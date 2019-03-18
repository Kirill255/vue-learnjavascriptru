// https://monterail.github.io/vuelidate/#sub-optional-validator
import { helpers } from 'vuelidate/lib/validators';

// сделал костыль, а дело в том, что
// моя маска по умолчанию добавляет в инпут вот такие знаки "_", примерно вот так +7 (1__) ___-____
// и исходя из этого я валидирую значение инпута, тоесть если значение не содержит "_", то валидно

// допустимые значения для телефона "+", "(", ")", "числа", " "(пробел), "-", хочу исключить "_"
// export const validPhone = (value) => !helpers.req(value) || (/^[\+\(\)\d -]+$/ig).test(value);

// тоже самое, только тут проверяется, чтобы значение не содержало "_"
// https://learn.javascript.ru/string#%D0%BF%D0%BE%D0%B8%D1%81%D0%BA-%D0%BF%D0%BE%D0%B4%D1%81%D1%82%D1%80%D0%BE%D0%BA%D0%B8
// export const validPhone = (value) => !helpers.req(value) || !~value.indexOf("_");

// es6 метод includes https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/includes
export const validPhone = (value) => !helpers.req(value) || !value.includes("_");
