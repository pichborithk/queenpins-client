import { ChangeEvent, Dispatch, SetStateAction } from 'react';

type Props = {
  value: string[];
  setValue: Dispatch<SetStateAction<string[]>>;
  name: string;
  type: string;
  required: boolean;
  label: string;
};

const DynamicInput = (props: Props) => {
  const { value, setValue, name, type, required, label } = props;

  function handleInput(index: number) {
    return function (event: ChangeEvent<HTMLInputElement>) {
      const newValue = [...value];
      newValue[index] = event.target.value;
      setValue(newValue);
    };
  }

  function addField() {
    setValue([...value, '']);
  }

  function removeField(index: number) {
    const newValue = [...value];
    newValue.splice(index, 1);
    setValue(newValue);
  }

  return (
    <div className='flex w-full flex-col gap-2'>
      {value.map((element, index) => (
        <fieldset
          className='group relative flex w-full gap-2 text-purple-500'
          key={index}
        >
          <label
            htmlFor={name + (index + 1)}
            className={`pointer-events-none absolute left-4 top-2 bg-purple-100 px-2 focus-within:text-purple-500 group-focus-within:-translate-x-1 group-focus-within:-translate-y-5 group-focus-within:text-base group-focus-within:text-purple-500
            ${
              element &&
              '-translate-x-1 -translate-y-5 text-base text-purple-500'
            }`}
          >
            {label}
          </label>
          <input
            name={name + (index + 1)}
            type={type}
            id={name + (index + 1)}
            required={required}
            value={element}
            onChange={handleInput(index)}
            className='flex-1 rounded-md border border-slate-400 bg-inherit px-4  py-2 focus:outline-purple-500'
          />
          <button
            type='button'
            className='rounded-md border border-purple-500 px-4 text-4xl hover:bg-purple-600 hover:text-purple-50'
            onClick={() => removeField(index)}
          >
            -
          </button>
        </fieldset>
      ))}
      <button
        type='button'
        className='mb-2 w-full rounded-lg border-2 border-purple-600 px-4 py-2 font-bold text-purple-500 hover:bg-purple-600 hover:text-purple-50'
        onClick={addField}
      >
        Add Photo
      </button>
    </div>
  );
};

export default DynamicInput;
