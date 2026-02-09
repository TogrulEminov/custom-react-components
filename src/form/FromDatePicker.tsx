import {DatePicker} from "antd";
import type {RangePickerProps} from "antd/es/date-picker";
import dayjs from "dayjs";
import {FieldWrapper} from "./FieldsWrapper.tsx";
const DEFAULT_TIME_FORMAT = "YYYY-MM-DD";

interface BaseFormProps extends RangePickerProps {
    className?: string;
    fieldName: string;
    label?: string;
}

export type FormProps = BaseFormProps;

function FromDatePicker({label, fieldName, className, ...rest}: FormProps) {
    return (
        <FieldWrapper fieldName={fieldName} label={label}>
            {(field, fieldState) => (
                <DatePicker.RangePicker
                    {...rest}
                    id={field.id}
                    className={`${className} w-full`}
                    status={fieldState.invalid ? "error" : ""}
                    format={DEFAULT_TIME_FORMAT}
                    style={{width: "100%"}}
                    value={
                        field.value && field.value[0] && field.value[1]
                            ? [dayjs(field.value[0]), dayjs(field.value[1])]
                            : null
                    }
                    onChange={(dates) => {
                        if (dates && dates[0] && dates[1]) {
                            const dateStrings = [
                                dates[0].format(DEFAULT_TIME_FORMAT),
                                dates[1].format(DEFAULT_TIME_FORMAT)
                            ];
                            field.onChange(dateStrings);
                        } else {
                            field.onChange(null);
                        }
                    }}
                />
            )}
        </FieldWrapper>
    );
}

export default FromDatePicker;