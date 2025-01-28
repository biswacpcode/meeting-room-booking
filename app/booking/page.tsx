"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { BookingForm } from "@/components/booking-form"
import { ConfirmationModal } from "@/components/confirmation-modal"
import type { BookingFormData, SelectedSlot } from "@/types/booking"

export default function BookingPage() {
  const router = useRouter()
  
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<(BookingFormData & { slots: SelectedSlot[] }) | null>(null)
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([]);
  useEffect(()=>{
    const searchParams = new URLSearchParams(window.location.search);
    const selectedSlotsParam = searchParams.get("slots");
    const selectedSlots: SelectedSlot[] = selectedSlotsParam 
      ? JSON.parse(decodeURIComponent(selectedSlotsParam)) 
      : [];

      setSelectedSlots(selectedSlots)
  }, [])
  

  const handleFormSubmit = (data: BookingFormData) => {
    const bookingData = { ...data, slots: selectedSlots }
    setBookingDetails(bookingData)
    setShowConfirmation(true)
  }

  const handleConfirmationClose = () => {
    setShowConfirmation(false)
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-white font-google-sans p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-medium text-[#202124] mb-6">Complete your booking</h1>
        <BookingForm selectedSlots={selectedSlots} onSubmit={handleFormSubmit} onCancel={() => router.push("/")} />
      </div>
      {bookingDetails && (
        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={handleConfirmationClose}
          bookingDetails={bookingDetails}
        />
      )}
    </main>
  )
}

