import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface IInputProps {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className?: string
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: string
}

const Input = ({ type, errorMessage, placeholder, className, name, register, autoComplete }: IInputProps) => {
  return (
    <div className={className}>
      <input
        type={type}
        className='w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name)}
      />
      <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
    </div>
  )
}

export default Input
