import { Query } from 'node-appwrite';
import { database } from './appwrite.config';
import { SelectedSlot, TimeSlot } from "@/types/booking";
interface Booking{
    name: string,
      council?: string,
      society?: string,
      purpose: string,
      phone: string,
      email: string,
      slots: SelectedSlot[]
}
export async function ConfirmBooking(booking: Booking){
    console.log(booking);
    const date = booking.slots[0].date;
    const timesString = booking.slots.map(slot => slot.time).join(',');
    try{
        await database.createDocument(
            process.env.DATABASE_ID!,
            process.env.COLLECTION_ID!,
            "unique()",
            {
                name: booking.name,
          council: booking.council,
          society: booking.society,
          purpose: booking.purpose,
          phone: booking.phone,
          email: booking.email,
          date:date,
          times:timesString
            }
        )
    }catch(error){
        console.error("Failed to create booking", error);
        
    }
    
}

export async function GenerateTimeSlots(date: Date){
    console.log(date.toString());
    const allTimes: TimeSlot[] = generateTimeSlots();

    const response = await database.listDocuments(
        process.env.DATABASE_ID!,
            process.env.COLLECTION_ID!,
            [Query.equal('date',[date.toString()])]
    );
    if (response.documents.length===0)
    return allTimes
    else{
        console.log("Changing the array")
        let booked: string[]=[]
        for (const doc of response.documents){
            const timeArray = doc.times.split(',');
            booked = [...booked,...timeArray];
        }
        const finalSlots: TimeSlot[] =[]
        allTimes.forEach((obj)=>{
            finalSlots.push(
                {
                    time:obj.time,
                    isBooked: booked.includes(obj.time) || false
                }
            )
        })

        return finalSlots
    }

}
function generateTimeSlots(): TimeSlot[] {
    const times = [
        "7:00am", "7:30am", 
        "8:00am", "8:30am", 
        "9:00am", "9:30am", 
        "10:00am", "10:30am", 
        "11:00am", "11:30am", 
        "12:00pm", "12:30pm", 
        "1:00pm", "1:30pm", 
        "2:00pm", "2:30pm", 
        "3:00pm", "3:30pm", 
        "4:00pm", "4:30pm", 
        "5:00pm", "5:30pm", 
        "6:00pm", "6:30pm", 
        "7:00pm", "7:30pm", 
        "8:00pm", "8:30pm", 
        "9:00pm", "9:30pm", 
        "10:00pm", "10:30pm", 
        "11:00pm", "11:30pm"
      ];
      const slots: TimeSlot[] = [];
      times.forEach((time) => {
        slots.push({
          time,
          isBooked: false
        })
      })
  
    return slots;
  }