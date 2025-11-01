import type { InputHTMLAttributes } from 'react'


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  label? : string
}

const CheckBox: React.FC<InputProps> = ({label, className, id, ...props}) => {
  return (
    <div className='flex gap-3 mt-2 items-center'>
      <input type="checkbox" id={id} {...props}/>
      <label className='text-gray-600' htmlFor={id}>{label}</label>
    </div>
  )
}

export default CheckBox
