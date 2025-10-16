import React from 'react'

function CheckBox({id, name, value, label}: {id: string, name: string, value: string, label: string}) {
  return (
    <div className='flex gap-3 mt-2 items-center'>
      <input type="checkbox" value={value} name={name} id={id} />
      <label className='text-gray-600' htmlFor={id}>{label}</label>
    </div>
  )
}

export default CheckBox
