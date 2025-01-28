import { format } from "date-fns"
import type { BookingFormData, SelectedSlot } from "@/types/booking"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  bookingDetails: BookingFormData & { slots: SelectedSlot[] }
}

export function ConfirmationModal({ isOpen, onClose, bookingDetails }: ConfirmationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 text-left max-h-[90vh] overflow-y-auto">
        <div className="w-16 h-16 bg-[#1a73e8] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-medium text-[#202124] mb-4 text-center">Booking Confirmed!</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-[#5f6368]">Name:</h3>
            <p>{bookingDetails.name}</p>
          </div>
          <div>
            <h3 className="font-medium text-[#5f6368]">Council:</h3>
            <p>{bookingDetails.council}</p>
          </div>
          {bookingDetails.society && (
            <div>
              <h3 className="font-medium text-[#5f6368]">Society:</h3>
              <p>{bookingDetails.society}</p>
            </div>
          )}
          <div>
            <h3 className="font-medium text-[#5f6368]">Purpose:</h3>
            <p>{bookingDetails.purpose}</p>
          </div>
          <div>
            <h3 className="font-medium text-[#5f6368]">Phone Number:</h3>
            <p>{bookingDetails.phone}</p>
          </div>
          <div>
            <h3 className="font-medium text-[#5f6368]">Email:</h3>
            <p>{bookingDetails.email}</p>
          </div>
          <div>
          <h3 className="font-medium text-[#5f6368] mb-4">Selected slots:</h3>
        <div>
          <div className="text-lg text-[#1a73e8] mb-3">{format(new Date(bookingDetails.slots[0]?.date), "MMMM d")}</div>
          <div className="flex flex-wrap gap-2">
            {bookingDetails.slots.map((slot, i) => (
              <div key={i} className="px-6 py-2 bg-[#1a73e8] text-white rounded-full text-sm font-medium">
                {slot.time}
              </div>
            ))}
          </div>
        </div>
          </div>
        </div>

        <p className="text-[#5f6368] my-4 text-center">
          You will receive a confirmation email with the meeting details shortly.
        </p>
        <div className="text-center">
          <button onClick={onClose} className="px-6 py-2 bg-[#1a73e8] text-white rounded-lg hover:bg-[#1557b0]">
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

