"use client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { ThemeProvider } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import { calendarTheme } from "./theme";

type SelectorFechaProps = {
    value: Dayjs | null;
    onChange: (value: Dayjs | null) => void;
    diasHaciaAdelante?: number;
};

export function SelectorFecha({
    value,
    onChange,
    diasHaciaAdelante = 10,
}: SelectorFechaProps) {
    return (
        <ThemeProvider theme={calendarTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <DateCalendar
                    value={value}
                    onChange={onChange}
                    minDate={dayjs().startOf("day")}
                    maxDate={dayjs().startOf("day").add(diasHaciaAdelante, "day")}
                    sx={{
                        "& .MuiPickersDay-root.Mui-selected": {
                            backgroundColor: "#243054",
                            "&:hover": {
                                backgroundColor: "#1A1D29",
                            },
                        },
                        "& .MuiPickersDay-today": {
                            borderColor: "#243054",
                        },
                    }}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}