import React from 'react'
import {Input, User} from "@heroui/react";
import { Users } from 'lucide-react';

export default function BookingList() {
  return (
    <div className='flex-1 bg-white dark:bg-gray-800 rounded mb-4 p-4 space-y-4'>
        Bookings <br />
        <div>
            <Input
            isClearable
            className="max-w-xs"
            color='primary'
            placeholder="Search..."
            type="text"
            variant="bordered"
            onClear={() => console.log("input cleared")}
            />
        </div>
        <div className='space-y-4 w-full'>
            <span className='text-sm font-light'>total bookings 20</span>
            <div>
                <div className='w-full border flex justify-between items-center border-gray-200 dark:border-gray-700 px-4 py-2 mb-2 rounded space-y-2'>
                    <User
                        avatarProps={{
                            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                        }}
                        name="Zusmetha Canete"
                        description={
                            <div className='flex gap-8 text-gray-500  font-light text-sm'>
                                <div className='flex items-center'>
                                    <Users className='inline mr-2' size={16} />
                                    4 persons
                                </div>
                                <div>
                                    Room 102
                                </div>
                            </div>
                        }
                    />
                    <hr />
                    <div>
                        12 : 00 PM
                    </div>
                </div>
                <div className='w-full border flex justify-between items-center border-gray-200 dark:border-gray-700 px-4 py-2 mb-2 rounded space-y-2'>
                    <User
                        avatarProps={{
                            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                        }}
                        name="Crisiah Cogonon"
                        description={
                            <div className='flex gap-8 text-gray-500  font-light text-sm'>
                                <div className='flex items-center'>
                                    <Users className='inline mr-2' size={16} />
                                    2 persons
                                </div>
                                <div>
                                    Room 101
                                </div>
                            </div>
                        }
                    />
                    <hr />
                    <div>
                        10 : 00 PM
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
