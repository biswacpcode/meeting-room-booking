"use client"

import { useState } from "react"
import { Calendar } from "@/components/calendar"
import { TimeSlots } from "@/components/time-slots"
import Link from "next/link"
import type { SelectedSlot } from "@/types/booking"

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedSlots([])
  }

  const handleTimeSelect = (time: string) => {
    if (!selectedDate) return

    const newSlot = { date: selectedDate, time }
    const existingSlotIndex = selectedSlots.findIndex(
      (slot) => slot.date.toDateString() === selectedDate.toDateString() && slot.time === time,
    )

    if (existingSlotIndex >= 0) {
      setSelectedSlots(selectedSlots.filter((_, index) => index !== existingSlotIndex))
    } else {
      setSelectedSlots([...selectedSlots, newSlot])
    }
  }

  return (
    <main className="min-h-screen bg-white font-google-sans">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-[#202124] text-2xl font-medium mb-2">Meeting Room Booking</h1>
            <div className="flex items-center gap-2 text-[#5f6368] mb-6">
              <span className="inline-flex items-center">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
                30 min
              </span>
              <span className="inline-flex items-center">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 14H5V8h14v10z" />
                </svg>
                Select Date and Slots for Booking
              </span>
            </div>

            <div className={`grid grid-cols-1 ${selectedDate?"lg:grid-cols-2":"lg:grid-cols-1"} gap-8 items-start`}>
              <div className="w-full max-w-md mx-auto">
                <Calendar selectedDate={selectedDate} onSelect={handleDateSelect} />
              </div>
              <div
                className={`w-full max-w-md mx-auto transition-all duration-500 ease-in-out
                ${selectedDate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
              `}
              >
                {selectedDate && (
                  <div className="animate-in slide-in-from-right-5 duration-500">
                    <TimeSlots
                      selectedDate={selectedDate}
                      selectedSlots={selectedSlots}
                      onTimeSelect={handleTimeSelect}
                    />
                    {selectedSlots.length > 0 && (
                      <Link
                        href={`/booking?slots=${encodeURIComponent(JSON.stringify(selectedSlots))}`}
                        className="w-full mt-8 px-6 py-3 text-white bg-[#1a73e8] hover:bg-[#1557b0] rounded-lg transition-colors text-center block animate-in fade-in duration-500"
                      >
                        Next
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

