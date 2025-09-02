import React from 'react'

export default function RoomList() {
    const rooms = [
        { id: 1, name: 'Room 101', status: 'Available' },
        { id: 2, name: 'Room 102', status: 'Occupied' },
        { id: 3, name: 'Room 103', status: 'Cleaning' },
    ]

  return (
    <div className=' bg-white dark:bg-gray-800 rounded mb-4 flex flex-col p-4 space-y-4'>
        Rooms <br />
        <div className='grid grid-cols-6 gap-4'> 
            {rooms.map(room => (
                <div key={room.id} className='w-20 h-20 p-2 rounded border border-slate-400 bg-gray-50 flex flex-col justify-center items-center'>
                    <div className='text-center font-light text-gray-500'>
                        {room.name}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
