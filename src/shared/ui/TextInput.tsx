import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
}

/**
 *       <Input
        label="기능명 *"
        value={formData.featureName}
        onChange={(e) => {
          setFormData({ ...formData, featureName: e.target.value });
          setErrors({ ...errors, featureName: "" });
        }}
        error={errors.featureName}
        placeholder="예: 결제 취소 로직"
      />
 */

export const TextInput = ({ label, error, className = "", ref, ...props }: TextInputProps) => {
  return (
    <div className="w-full ">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <input
        ref={ref}
        className={`w-full bg-transparent text-orange-300 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
