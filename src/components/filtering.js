import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)
      .forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName])
                      .map(name => {
                            const option = document.createElement('option');
                            option.textContent = name;
                            option.value = name;
                            return option;
                      })
        )
     })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if(action && action.name === 'clear') {
            const filterWrapper = document.querySelector('.filter-wrapper');
            const input = filterWrapper.querySelector('input');
            input.value = '';
            const field = input.name;
            state[field] = '';
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}