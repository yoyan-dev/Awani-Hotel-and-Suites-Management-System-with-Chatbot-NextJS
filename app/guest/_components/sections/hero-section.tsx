import { User } from "@/types/users";
import { Button, Link } from "@heroui/react";
import LoginPromptModal from "../modals/login-prompt-modal";

interface Props {
  user: User | null;
  isLoading: boolean;
}

export const HeroBanner: React.FC<Props> = ({ user, isLoading }) => {
  return (
    <section
      className="h-[500px] flex flex-col items-center justify-center text-center text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <h1 className="text-4xl font-bold">
        Welcome to Our Luxurious Hotel & Suites
      </h1>
      <p className="text-gray-200 mt-2">Modern Luxury and Timeless Elegance</p>
      {user?.id && !isLoading ? (
        <Button
          className="mt-6"
          color="primary"
          as={Link}
          href="/guest/rooms/reservation/null"
        >
          Book Apartments
        </Button>
      ) : (
        <LoginPromptModal name="Book Apartments" />
      )}
    </section>
  );
};

export default HeroBanner;
