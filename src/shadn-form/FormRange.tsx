import { useId } from "react";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react"; // və ya React Icons
import { FieldWrapper } from "./FieldsWrapper.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover.tsx";
import { Button } from "../components/ui/button.tsx";
import { cn } from "../lib/utils.ts";
import { Calendar } from "../components/ui/calendar.tsx";

const DEFAULT_TIME_FORMAT = "YYYY-MM-DD";

interface FromDatePickerProps {
  label?: string;
  fieldName: string;
  className?: string;
  placeholder?: string;
}

export default function FromDatePicker({
  label,
  fieldName,
  className,
  placeholder = "Tarix aralığı seçin",
}: FromDatePickerProps) {
  const id = useId();

  return (
    <FieldWrapper fieldName={fieldName} label={label}>
      {(field, fieldState) => {
        // field.value -> ["2026-04-20", "2026-04-25"] formatındadır
        const startDate = field.value?.[0];
        const endDate = field.value?.[1];

        const rangeValue = {
          from: startDate ? dayjs(startDate).toDate() : undefined,
          to: endDate ? dayjs(endDate).toDate() : undefined,
        };

        return (
          <div className={cn("grid gap-2", className)}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id={id}
                  variant={"outline"}
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal bg-[#FAFAFA] transition-all duration-200",
                    !startDate && "text-muted-foreground",
                    fieldState.invalid &&
                      "border-destructive focus-visible:ring-destructive",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    endDate ? (
                      <>
                        {dayjs(startDate).format(DEFAULT_TIME_FORMAT)} -{" "}
                        {dayjs(endDate).format(DEFAULT_TIME_FORMAT)}
                      </>
                    ) : (
                      dayjs(startDate).format(DEFAULT_TIME_FORMAT)
                    )
                  ) : (
                    <span>{placeholder}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  autoFocus
                  mode="range"
                  defaultMonth={rangeValue.from}
                  selected={rangeValue}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      // Hər iki tarix seçildikdə array kimi ötürürük
                      field.onChange([
                        dayjs(range.from).format(DEFAULT_TIME_FORMAT),
                        dayjs(range.to).format(DEFAULT_TIME_FORMAT),
                      ]);
                    } else if (range?.from) {
                      // Yalnız bir tarix seçilibsə
                      field.onChange([
                        dayjs(range.from).format(DEFAULT_TIME_FORMAT),
                        null,
                      ]);
                    } else {
                      field.onChange(null);
                    }
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        );
      }}
    </FieldWrapper>
  );
}
