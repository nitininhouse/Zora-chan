import type { FormData } from "@/types/FormData";
import type { Errors } from '@/types/Errors';
export function handleInputChange(
    field: keyof FormData,
    value: string,
    setFormData: React.Dispatch<React.SetStateAction<FormData>>,
    errors: Errors,
    setErrors: React.Dispatch<React.SetStateAction<Errors>>
  ): void {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  }