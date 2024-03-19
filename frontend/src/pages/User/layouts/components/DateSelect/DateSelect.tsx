/* eslint-disable @typescript-eslint/no-unused-vars */
import range from 'lodash/range'
import React, { useEffect, useState } from 'react'

interface IDateSelectProps {
  value?: Date
  onChange?: (value: Date) => void
  errorMessage?: string
}
const DateSelect = (props: IDateSelectProps, _ref: React.LegacyRef<HTMLSelectElement>) => {
  const { value, onChange, errorMessage } = props
  const [date, setDate] = useState({
    day: value?.getDay() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        day: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value: inputValue } = event.target
    const newDate = {
      day: value?.getDay() || date.day,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: inputValue
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate?.year, newDate?.month, newDate?.day))
  }

  return (
    <div>
      <div className='mt-2 flex flex-wrap'>
        <div className='w-[20%] truncate pt-3 text-right capitalize'>Ngày sinh</div>
        <div className='w-[80%] pl-5'>
          <div className='flex justify-between gap-3'>
            <select
              className='h-10 w-full cursor-pointer rounded-sm border border-black/10 hover:border-orange'
              name='day'
              onChange={handleChange}
              value={value?.getDate() || date?.day}
            >
              {range(1, 32).map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              className='h-10 w-full cursor-pointer rounded-sm border border-black/10 hover:border-orange'
              name='month'
              onChange={handleChange}
              value={value?.getMonth() || date?.month}
            >
              {range(0, 12).map((item) => (
                <option value={item} key={item}>
                  {item + 1}
                </option>
              ))}
            </select>
            <select
              className='h-10 w-full cursor-pointer rounded-sm border border-black/10 hover:border-orange'
              name='year'
              onChange={handleChange}
              value={value?.getFullYear() || date?.year}
            >
              {range(1990, new Date().getFullYear() + 1).map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage ?? ''}</div>
        </div>
      </div>
    </div>
  )
}

export default React.forwardRef(DateSelect)
