export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
        <div>
          <h3 className="font-bold text-white">Discover</h3>
          <p>Resort • Rooms • Offers</p>
        </div>
        <div>
          <h3 className="font-bold text-white">Experiences</h3>
          <p>Spa • Dining • Activities</p>
        </div>
        <div>
          <h3 className="font-bold text-white">Contact Us</h3>
          <p>123 Beach Road, Paradise City</p>
          <p>+63 912 345 6789</p>
        </div>
      </div>
      <p className="text-center mt-6 text-sm">
        © 2025 Ma. AWANI. All Rights Reserved.
      </p>
    </footer>
  );
}
