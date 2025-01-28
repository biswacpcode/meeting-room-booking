export interface TimeSlot {
  time: string
  isBooked: boolean
}

export interface BookingFormData {
  name: string
  council: string
  society?: string
  purpose: string
  phone: string
  email: string
}

export interface SelectedSlot {
  date: Date
  time: string
}

