import Link from "next/link";
import { FaFaceTired } from "react-icons/fa6";
import { Button } from "../ui/button";

function Logo() {
  return (
    <Button asChild size="icon">
        <Link href="/">
          <FaFaceTired  className="h-6 w-6"/>
        </Link>
    </Button>
    
  )
}

export default Logo