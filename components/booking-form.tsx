"use client"

import { format } from "date-fns"
import type { BookingFormData, SelectedSlot } from "@/types/booking"
import { ConfirmBooking } from "@/lib/actions"
import { useEffect, useState } from "react"

interface BookingFormProps {
  selectedSlots: SelectedSlot[]
  onSubmit: (data: BookingFormData) => void
  onCancel: () => void
}

export function BookingForm({ selectedSlots, onSubmit, onCancel }: BookingFormProps) {
  const[date, setDate] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const booking ={
      name: formData.get("name") as string,
      council: formData.get("council") as string,
      society: formData.get("society") as string,
      purpose: formData.get("purpose") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      slots: selectedSlots
    };
    await fetch('/api/confirm-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ booking }),
    });

    onSubmit({
      name: formData.get("name") as string,
      council: formData.get("council") as string,
      society: formData.get("society") as string,
      purpose: formData.get("purpose") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
    })
  }
 
  useEffect(()=>{
    console.log("checking date")
    if(selectedSlots[0]?.date){
      console.log("updating date")
      console.log("new date : ", selectedSlots[0]?.date )
      setDate(format(new Date(selectedSlots[0]?.date), "MMMM d"))
    }
      
    else
    setDate(format(new Date(), "MMMM d"))
  }, [selectedSlots])



  return (
    <div className="bg-white rounded-lg w-full p-6">
      <div className="mb-6">
        <h3 className="font-medium text-[#5f6368] mb-4">Selected slots:</h3>
        <div>
          <div className="text-lg text-[#1a73e8] mb-3">{date}</div>
          <div className="flex flex-wrap gap-2">
            {selectedSlots.map((slot, i) => (
              <div key={i} className="px-6 py-2 bg-[#1a73e8] text-white rounded-full text-sm font-medium">
                {slot.time}
              </div>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#5f6368] mb-1">Name</label>
          <input
            required
            name="name"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#5f6368] mb-1">Council</label>
          <input
            required
            name="council"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#5f6368] mb-1">Society (Optional)</label>
          <input
            name="society"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#5f6368] mb-1">Purpose</label>
          <input
            required
            name="purpose"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#5f6368] mb-1">Phone Number</label>
          <input
            required
            name="phone"
            type="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#5f6368] mb-1">Email</label>
          <input
            required
            name="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-[#1a73e8] text-white rounded-lg hover:bg-[#1557b0]">
            Book Now
          </button>
        </div>
      </form>
    </div>
  )
}

