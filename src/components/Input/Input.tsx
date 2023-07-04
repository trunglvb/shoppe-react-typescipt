/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  className?: string
  classNameInput?: string
  classNameError?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

const Input = ({
  type,
  errorMessage,
  placeholder,
  className,
  name,
  rules,
  register,
  autoComplete,
  classNameInput = 'w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
  classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600'
}: IInputProps) => {
  const registerProps = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        type={type}
        className={classNameInput}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...registerProps}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

export default Input
