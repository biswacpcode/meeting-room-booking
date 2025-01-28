'use client'
import Link from "next/link"
import { useEffect } from "react"

export default function CancelledPage({params}: {
    params: {
        id: string
    }
}) {
    const id = params.id
    useEffect(()=>{
        async function deleteBooking(id: string){
            await fetch('/api/cancel-booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
              }); 
        }
        deleteBooking(id);
    }, [params.id]);

    return(
        <main className="min-h-screen bg-white font-google-sans flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-medium text-[#202124] mb-2">Booking Cancelled</h1>
          <p className="text-[#5f6368] mb-6">
            Your Meeting Room Booking has been cancelled successfully.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-[#1a73e8] text-white rounded-lg hover:bg-[#1557b0] transition-colors"
          >
            Return to Booking
          </Link>
        </div>
      </div>
    </main>
    )
}