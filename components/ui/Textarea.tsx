import React, {TextareaHTMLAttributes} from "react"
import clsx from "clsx"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    label?: string;
    required?: boolean
}

const base = "border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

const Textarea: React.FC<TextareaProps> = ({label, required = false, className, ...props}) => {
    return (
        <div className="flex flex-col">
            
            {label && <label htmlFor={label} className="text-sm font-medium text-gray-700 mb-1">{label} <span className="text-red-600">{required && " *"}</span></label>}
            <textarea id={label} className={clsx(base, className)} {...props} />
        </div>
    )
}

export default Textarea