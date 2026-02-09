import {useMemo} from "react";

type DropdownOption<T = string> = {
    value: T;
    label: string;
};

export const useDropdownOptions = <T extends object>(
    data: T[] | undefined,
    valueKey: keyof T,
    labelKey: keyof T
): DropdownOption[] => {
    return useMemo(() => {
        if (!data) return [];

        return data.map((item) => ({
            value: String(item[valueKey]),
            label: String(item[labelKey]),
        }));
    }, [data, valueKey, labelKey]);
};