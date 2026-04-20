"use client";

import { useState } from "react";
import { type DateRange } from "react-day-picker";
import { format, parseISO } from "date-fns";

import { CalendarIcon } from "lucide-react";
import { FieldWrapper } from "./FieldsWrapper.tsx";
import { type FieldValues, type Path } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover.tsx";
import { Button } from "../components/ui/button.tsx";
import { Calendar } from "../components/ui/calendar.tsx";
import { cn } from "../lib/utils.ts";

const DATE_FORMAT = "yyyy-MM-dd";
const DISPLAY_FORMAT = "dd MMM yyyy";

interface FormDateRangePickerProps<T extends FieldValues> {
    fieldName: Path<T>;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

export default function FormDateRangePicker<T extends FieldValues>({
    fieldName,
    label,
    placeholder = "Tarix aralığı seçin",
    disabled,
    className,
}: FormDateRangePickerProps<T>) {
    const [open, setOpen] = useState(false);

    return (
        <FieldWrapper<T, Path<T>> fieldName={fieldName} label={label}>
            {(field, fieldState) => {
                const value = field.value as [string, string] | null | undefined;

                const dateRange: DateRange | undefined =
                    value?.[0] && value?.[1]
                        ? {
                            from: parseISO(value[0]),
                            to: parseISO(value[1]),
                        }
                        : undefined;

                const displayText =
                    dateRange?.from && dateRange?.to
                        ? `${format(dateRange.from, DISPLAY_FORMAT)} – ${format(dateRange.to, DISPLAY_FORMAT)}`
                        : placeholder;

                return (
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                id={field.id}
                                variant="outline"
                                disabled={disabled}
                                className={cn(
                                    "w-full justify-start text-left font-normal h-[44px] bg-[#FAFAFA]",
                                    !dateRange && "text-muted-foreground",
                                    fieldState.invalid && "border-destructive focus-visible:ring-destructive",
                                    className,
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                                <span className="truncate">{displayText}</span>
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="range"
                                selected={dateRange}
                                onSelect={(range: DateRange | undefined) => {
                                    if (range?.from && range?.to) {
                                        field.onChange([
                                            format(range.from, DATE_FORMAT),
                                            format(range.to, DATE_FORMAT),
                                        ]);
                                        setOpen(false);
                                    } else if (range?.from) {
                                        field.onChange([
                                            format(range.from, DATE_FORMAT),
                                            null,
                                        ]);
                                    } else {
                                        field.onChange(null);
                                    }
                                }}
                                numberOfMonths={2}
                                disabled={disabled}
                            />
                        </PopoverContent>
                    </Popover>
                );
            }}
        </FieldWrapper>
    );
}