import React from 'react';

type SelectPropsType = {
    option: Array<any> //некий массив опций, мы будем добавлять некий массив и на основании его будут появляться пункты, тоесть опции
    defaultValue: string // помимо массива нам нужно добавить какую-то дефолтную опцию, например что бы там было назвние сортировка по...
    value:any
    onChange:(sort:string)=>void

}

export const Select = ({option, defaultValue, value, onChange}: SelectPropsType) => {
    return (
        <div>
            <select value={value}
                    onChange={(e)=>onChange(e.currentTarget.value)}
            >
                <option value="value1" disabled>{defaultValue}</option>
                {/*по массиву опций с помощью функции map итерируемся и для каждой опции создаем html тег option*/}
                {
                    option.map(el =>
                        <option key={el.id} value={el.value}>
                            {el.name}
                        </option>
                    )
                }
            </select>
        </div>
    );
};

export default Select;