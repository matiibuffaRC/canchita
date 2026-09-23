"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DatePickerProps = {
    date: string;
    onDateChange: (date: string) => void;
};

export function DatePicker({ date, onDateChange }: DatePickerProps) {
    const selectedDate = new Date(`${date}T12:00:00`);

    return (
        <Popover>
            <PopoverTrigger
                render={
                    <Button
                        variant="outline"
                        data-empty={!date}
                        className="bg-white justify-start text-left font-normal data-[empty=true]:text-muted-foreground w-50"
                    />
                }
            >
                <CalendarIcon />
                {date ? format(selectedDate, "PPP") : <span>Pick a date</span>}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(nextDate) => { if (nextDate) onDateChange(format(nextDate, "yyyy-MM-dd"));}}
                />
            </PopoverContent>
        </Popover>
    );
}
