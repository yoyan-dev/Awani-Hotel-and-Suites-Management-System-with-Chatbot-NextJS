'use client'
import { Input, Button, Checkbox, Link } from "@heroui/react"
import { MailIcon, LockIcon } from "lucide-react";

export default function Auth() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4 p-4">
        <div className="p-8 max-w-md w-full bg-white dark:bg-gray-800 rounded shadow space-y-4">
            <div className="flex flex-col text-center">
                Welcome to Awani Hotel and Suite.
                <span className="text-gray-500"> Please login to continue.</span>
            </div>
            <div className="mt-4 flex flex-col gap-4">
                <Input
                    color="primary"
                    endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                    }
                    label="Email"
                    labelPlacement="outside"
                    placeholder="Enter your email"
                    variant="bordered"
                />
                <Input
                    color="primary"
                    endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                    }
                    label="Password"
                    labelPlacement="outside"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                        classNames={{
                            label: "text-small",
                        }}
                        >
                        Remember me
                    </Checkbox>
                    <Link color="primary" href="#" size="sm">
                    Forgot password?
                    </Link>
                    
                </div>
                <Button color="primary" fullWidth>
                    Login
                </Button>
            </div>
        </div>
    </div>
  )
}
