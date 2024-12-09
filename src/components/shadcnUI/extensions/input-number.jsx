import { ChevronDown, ChevronUp } from 'lucide-react';
import { forwardRef, useCallback, useEffect, useState, useRef } from 'react';
import { NumericFormat } from 'react-number-format';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const NumberInput = forwardRef(
  (
    {
      stepper,
      thousandSeparator,
      placeholder,
      defaultValue,
      min = -Infinity,
      max = Infinity,
      onValueChange,
      fixedDecimalScale = false,
      decimalScale = 0,
      suffix,
      prefix,
      value: controlledValue,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef(null); // Create an internal ref
    const combinedRef = ref || internalRef; // Use provided ref or internal ref
    const [value, setValue] = useState(controlledValue ?? defaultValue);

    const handleIncrement = useCallback(() => {
      setValue((prev) =>
        prev === undefined
          ? (stepper ?? 1)
          : Math.min(prev + (stepper ?? 1), max)
      );
    }, [stepper, max]);

    const handleDecrement = useCallback(() => {
      setValue((prev) =>
        prev === undefined
          ? -(stepper ?? 1)
          : Math.max(prev - (stepper ?? 1), min)
      );
    }, [stepper, min]);

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (document.activeElement === combinedRef.current) {
          if (e.key === 'ArrowUp') {
            handleIncrement();
          } else if (e.key === 'ArrowDown') {
            handleDecrement();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [handleIncrement, handleDecrement, combinedRef]);

    useEffect(() => {
      if (controlledValue !== undefined) {
        setValue(controlledValue);
      }
    }, [controlledValue]);

    const handleChange = (values) => {
      const newValue =
        values.floatValue === undefined ? undefined : values.floatValue;
      setValue(newValue);
      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    const handleBlur = () => {
      if (value !== undefined) {
        if (value < min) {
          setValue(min);
          combinedRef.current.value = String(min);
        } else if (value > max) {
          setValue(max);
          combinedRef.current.value = String(max);
        }
      }
    };

    return (
      <div className='flex items-center'>
        <NumericFormat
          value={value}
          onValueChange={handleChange}
          thousandSeparator={thousandSeparator}
          decimalScale={decimalScale}
          fixedDecimalScale={fixedDecimalScale}
          allowNegative={min < 0}
          valueIsNumericString
          onBlur={handleBlur}
          max={max}
          min={min}
          suffix={suffix}
          prefix={prefix}
          customInput={Input}
          placeholder={placeholder}
          className='relative rounded-r-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
          getInputRef={combinedRef} // Use combined ref
          {...props}
        />
        <div className='flex flex-col'>
          <Button
            aria-label='Increase value'
            className='h-5 rounded-l-none rounded-br-none border-b-[0.5px] border-l-0 border-input px-2 focus-visible:relative'
            variant='outline'
            onClick={handleIncrement}
            disabled={value === max}
          >
            <ChevronUp size={15} />
          </Button>
          <Button
            aria-label='Decrease value'
            className='h-5 rounded-l-none rounded-tr-none border-l-0 border-t-[0.5px] border-input px-2 focus-visible:relative'
            variant='outline'
            onClick={handleDecrement}
            disabled={value === min}
          >
            <ChevronDown size={15} />
          </Button>
        </div>
      </div>
    );
  }
);
