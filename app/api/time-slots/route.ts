
import { GenerateTimeSlots } from '@/lib/actions';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { selectedDate } = await req.json();
    
    const result = await GenerateTimeSlots(selectedDate);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Failed to confirm booking", error)
    return NextResponse.json({ success: false, message: error.message });
  }
}
