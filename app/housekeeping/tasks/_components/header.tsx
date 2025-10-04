import React from "react";

export default function Header() {
  return (
    <div className="rounded mb-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Housekeeping Task</h1>
        <p className="text-gray-600">
          Manage and tract housekeeping tasks efficiently.
        </p>
      </div>
    </div>
  );
}
