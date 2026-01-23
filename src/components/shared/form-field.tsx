"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import clsx from "clsx";
import { CalendarIcon, Eye, EyeOff, LucideProps } from "lucide-react";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { format } from "date-fns";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { dateFormat } from "@/src/lib/utils";

type FormFieldProps = {
  form: UseFormReturn<any>;
  fieldName: string;
  label?: string;
  placeholder?: string;
  isMandatory?: boolean;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  disabled?: boolean;
  inline?: boolean;
  displayError?: boolean;
  formDescription?: string;
  innerIcon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  computedValue?: string | number;
};

function TextField({
  form,
  fieldName,
  label,
  placeholder,
  isMandatory,
  icon: Icon,
  innerIcon: InnerIcon,
  inline = false,
  displayError = true,
  formDescription,
  disabled,
  computedValue,
}: FormFieldProps) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field, fieldState }) => (
        <FormItem
          className={clsx("w-full", {
            "block gap-4 sm:flex": inline,
          })}
        >
          <FormLabel
            className={clsx("flex items-center gap-0.5", {
              "w-28": inline,
            })}
          >
            {Icon && <Icon size={20} />}
            <span>
              {label}{" "}
              {isMandatory && <span className="text-foreground-grey">*</span>}
            </span>
          </FormLabel>
          <FormControl>
            <div className="relative">
              {InnerIcon && (
                <InnerIcon
                  size={20}
                  className="absolute left-1 top-1/2 -translate-y-1/2 translate-x-1/2 text-foreground-grey"
                />
              )}
              <Input
                placeholder={placeholder}
                type="text"
                {...field}
                value={computedValue ?? field.value ?? ""}
                className={`touch-none ${InnerIcon && "pl-11"}`}
                disabled={disabled || computedValue !== undefined}
              />
            </div>
          </FormControl>
          {fieldState.error && displayError && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
          {formDescription && (
            <FormDescription>{formDescription}</FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}

function PasswordField({
  form,
  fieldName,
  label,
  placeholder,
  innerIcon: InnerIcon,
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const pathname = usePathname();

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field, fieldState }) => (
        <FormItem className="w-full">
          <FormLabel htmlFor="password">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              {InnerIcon && (
                <InnerIcon
                  size={20}
                  className="absolute left-1 top-1/2 -translate-y-1/2 translate-x-1/2 text-foreground-grey"
                />
              )}
              <Input
                autoComplete="new-password"
                id="password"
                placeholder={placeholder}
                type={showPassword ? "text" : "password"}
                {...field}
                className={`${InnerIcon && "pl-11"}`}
              />
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer md:right-3"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <Eye size={20} className="text-foreground-grey" />
                ) : (
                  <EyeOff size={20} className="text-foreground-grey" />
                )}
              </div>
            </div>
          </FormControl>
          {pathname.endsWith("/login") && fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}

export type SelectOption = {
  label: string;
  value: string;
};

type SelectFieldProps = FormFieldProps & {
  options: SelectOption[];
};

export function SelectField({
  form,
  fieldName,
  label,
  placeholder,
  options,
  disabled,
  displayError = true,
  formDescription,
}: SelectFieldProps) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={disabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>

          {formDescription && (
            <FormDescription>{formDescription}</FormDescription>
          )}

          {displayError && <FormMessage />}
        </FormItem>
      )}
    />
  );
}

function NumberField({ form, fieldName, label }: FormFieldProps) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type="number"
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.valueAsNumber)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function DateField({
  form,
  fieldName,
  label,
  placeholder,
  icon: Icon,
}: FormFieldProps) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="flex items-center gap-2">
            {Icon && <Icon size={20} />}
            <span>{label}</span>
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {field.value ? (
                  format(field.value, dateFormat)
                ) : (
                  <span className="text-gray-400">{placeholder}</span>
                )}
                <CalendarIcon size={20} className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => field.onChange(date)}
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}

export { PasswordField, TextField, NumberField, DateField };
