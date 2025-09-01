'use client'
import UserTable from "./_components/user-table"
import Header from "./_components/header"

export default function UserAccounts() {
  return (
    <div className="space-y-2">
      <Header />
      <UserTable />
    </div>
  )
}
