"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfDay,
} from "date-fns"

interface CalendarProps {
  selectedDate: Date | null
  onSelect: (date: Date) => void
}

export function Calendar({ selectedDate, onSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | "">("")
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const handlePreviousMonth = () => {
    setSlideDirection("right")
    setCurrentMonth(subMonths(currentMonth, 1))
    // Reset animation direction after animation completes
    setTimeout(() => setSlideDirection(""), 300)
  }

  const handleNextMonth = () => {
    setSlideDirection("left")
    setCurrentMonth(addMonths(currentMonth, 1))
    // Reset animation direction after animation completes
    setTimeout(() => setSlideDirection(""), 300)
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          disabled={slideDirection !== ""}
        >
          <ChevronLeft className="w-5 h-5 text-[#5f6368]" />
        </button>
        <h2 className="text-[#202124] text-lg font-medium">{format(currentMonth, "MMMM yyyy")}</h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          disabled={slideDirection !== ""}
        >
          <ChevronRight className="w-5 h-5 text-[#5f6368]" />
        </button>
      </div>

      <div className="relative overflow-hidden">
        <div className="grid grid-cols-7 gap-1 mb-1">
          {days.map((day) => (
            <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-[#5f6368]">
              {day}
            </div>
          ))}
        </div>

        <div
          key={currentMonth.toISOString()}
          className={`grid grid-cols-7 gap-1 transition-all duration-300 ease-in-out
            ${slideDirection === "left" ? "animate-calendar-slide-left" : ""}
            ${slideDirection === "right" ? "animate-calendar-slide-right" : ""}
          `}
        >
          {monthDays.map((day, i) => {
            const isSelected = selectedDate && isSameDay(day, selectedDate)
            const isCurrentMonth = isSameMonth(day, currentMonth)
            const isPastDate = isBefore(day, startOfDay(new Date()))
            const isDisabled = !isCurrentMonth || isPastDate

            return (
              <button
                key={i}
                onClick={() => !isDisabled && onSelect(day)}
                disabled={isDisabled}
                className={`
                  h-10 rounded-full flex items-center justify-center text-sm
                  transition-all duration-300 ease-in-out
                  ${isDisabled ? "text-[#dadce0] cursor-not-allowed" : "hover:bg-[#e8f0fe]"}
                  ${isSelected ? "bg-[#1a73e8] text-white" : ""}
                  ${!isDisabled && isSelected && "hover:bg-[#e8f0fe] hover:text-[#1a73e8]"}
                  ${!isDisabled && !isSelected && "hover:bg-[#57a0ff] hover:text-[#e8f0fe]"}
                  ${isCurrentMonth && !isSelected && !isPastDate ? "bg-[#e8f0fe] text-[#1a73e8]" : ""}
                `}
              >
                {format(day, "d")}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

