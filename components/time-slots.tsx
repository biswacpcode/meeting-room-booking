"use client"

import { format } from "date-fns"
import type { SelectedSlot, TimeSlot } from "@/types/booking"
import { useEffect, useState } from "react"

interface TimeSlotsProps {
  selectedDate: Date
  selectedSlots: SelectedSlot[]
  onTimeSelect: (time: string) => void
}

export function TimeSlots({ selectedDate, selectedSlots, onTimeSelect }: TimeSlotsProps) {
  const dateStr = format(selectedDate, "yyyy-MM-dd");
  const [timeSlots, setSlots] = useState<TimeSlot[]>([]);
  useEffect(()=>{
    async function getSlots(selectedDate: Date){
      console.log("Date selected : ", selectedDate)
      const response = await fetch('/api/time-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedDate }),
      });

      const slot = await response.json();
      setSlots(slot);
    }
    getSlots(selectedDate)
    
  },[selectedDate])

  return (
    <div>
      <h3 className="text-lg font-medium text-[#202124] mb-4">{format(selectedDate, "EEEE, MMMM d")}</h3>
      <div className="grid gap-2 max-h-[400px] overflow-y-auto pr-2">
        {timeSlots.map(({ time, isBooked }, index) => {
          const isSelected = selectedSlots.some(
            (slot) => slot.date.toDateString() === selectedDate.toDateString() && slot.time === time,
          )

          return (
            <button
              key={time}
              onClick={() => !isBooked && onTimeSelect(time)}
              disabled={isBooked}
              className={`
                w-full px-4 py-3 rounded-lg border text-left
                transition-all duration-300 ease-in-out
                animate-in slide-in-from-left
                ${
                  isBooked
                    ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                    : isSelected
                      ? "border-[#1a73e8] bg-[#e8f0fe] text-[#1a73e8]"
                      : "border-gray-300 hover:bg-gray-50"
                }
              `}
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "forwards"
              }}
            >
              {time}
            </button>
          )
        })}
      </div>
    </div>
  )
}

