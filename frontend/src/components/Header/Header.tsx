import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";

function Header() {
  return (
    <div className="flex justify-between max-w-2xl mx-auto">
      <div className="order-2">
        <ModeToggle />
      </div>
      <Button variant="default" className="order-1">
        Press Me
      </Button>
    </div>
  );
}

export default Header;
