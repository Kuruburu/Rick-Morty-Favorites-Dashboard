import Link from "next/link";
import { Button } from "./ui/button";

export function NavigateFavoritesButton() {
  return (
    <>
      <Link href="/favorites" target="_self">
        <Button className="flex items-center gap-2" size="sm">
          <span>Favorites</span>
        </Button>
      </Link>
    </>
  );
}
