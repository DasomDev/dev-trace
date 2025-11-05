import { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  ref?: React.Ref<HTMLTextAreaElement>
}

export const Textarea = ({ label, error, className = '', ref, ...props }: TextareaProps) => {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="block text-sm font-medium mb-1 pl-1">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={`w-full bg-transparent text-orange-300 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

