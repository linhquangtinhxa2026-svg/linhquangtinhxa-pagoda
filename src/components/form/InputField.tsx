import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface InputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
}

export function InputField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: InputFieldProps<T>) {
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs tracking-widest uppercase font-semibold text-[#c4973a]">
            {label}
          </label>
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className="bg-white border border-[#c4973a]/25 text-[#2c1810] text-sm px-4 py-3 placeholder:text-[#2c1810]/30 focus:outline-none focus:border-[#c4973a] transition-colors duration-200"
          />
          {fieldState.error?.message && (
            <p className="text-xs text-[#8b3a2e]">{t(fieldState.error.message)}</p>
          )}
        </div>
      )}
    />
  );
}
