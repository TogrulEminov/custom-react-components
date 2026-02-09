import {useId} from "react";
import {DatePicker} from "antd";
import type {RangePickerProps} from "antd/es/date-picker";
import dayjs from "dayjs";
import {useFormContext} from "react-hook-form";
import {FieldWrapper} from "./FieldsWrapper.tsx";

const DEFAULT_TIME_FORMAT = "YYYY-MM-DD";

interface FormRangePickerProps extends Omit<RangePickerProps, 'name'> {
    label?: string;
    fieldName: [string, string];
    className?: string;
}

export default function FormRangePicker({
                                            label,
                                            fieldName,
                                            className,
                                            ...props
                                        }: FormRangePickerProps) {
    const id = useId();
    const {watch, setValue, formState: {errors}} = useFormContext();
    const startDate = watch(fieldName[0]);
    const endDate = watch(fieldName[1]);
    const hasError = !!(errors[fieldName[0]] || errors[fieldName[1]]);

    return (

        <FieldWrapper fieldName={fieldName[0] as any} label={label}>
            {() => (
                <DatePicker.RangePicker
                    {...props}
                    id={id}
                    format={DEFAULT_TIME_FORMAT}
                    style={{width: "100%"}}
                    className={className}
                    status={hasError ? "error" : ""}
                    value={
                        startDate && endDate
                            ? [dayjs(startDate, DEFAULT_TIME_FORMAT), dayjs(endDate, DEFAULT_TIME_FORMAT)]
                            : null
                    }
                    onChange={(dates) => {
                        if (!dates) {
                            setValue(fieldName[0], undefined, {shouldValidate: true});
                            setValue(fieldName[1], undefined, {shouldValidate: true});
                        } else {
                            setValue(fieldName[0], dates[0] ? dates[0].format(DEFAULT_TIME_FORMAT) : undefined, {shouldValidate: true});
                            setValue(fieldName[1], dates[1] ? dates[1].format(DEFAULT_TIME_FORMAT) : undefined, {shouldValidate: true});
                        }
                    }}
                />
            )}
        </FieldWrapper>
    );
}
