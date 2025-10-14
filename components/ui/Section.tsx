import React  from 'react'

const Section = ({title, children}: {title: string, children: React.ReactNode}) => {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold text-blue-700 mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default Section
