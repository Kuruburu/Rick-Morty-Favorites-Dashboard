import { Character } from "@/lib/types/rick-and-morty";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface CharacterCardProps {
  character: Character;
  isFavorite: boolean;
  handleStarClick: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isFavorite = false,
  handleStarClick,
}) => {
  const {
    character_status,
    character_gender,
    character_image,
    character_location,
    character_name,
    character_origin,
    character_species,
  } = character;

  const statusColor = {
    Alive: "bg-green-500",
    Dead: "bg-red-500",
    unknown: "bg-gray-400",
  }[character_status];

  return (
    <div className="group rounded-xl bg-zinc-900 shadow-md hover:scale-[1.02] transition">
      <Image
        src={character_image}
        alt={character_name}
        width={300}
        height={300}
        className="rounded-t-xl object-cover"
      />

      <div
        className="
          absolute top-0 left-0 h-24 w-full bg-gradient-to-b from-black/80 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
        "
      />
      <FaStar
        className="absolute top-2 right-2"
        color={isFavorite ? "gold" : "white"}
        size={24}
        onClick={handleStarClick}
      />

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{character_name}</h3>
          <span className={`h-3 w-3 rounded-full ${statusColor}`} />
        </div>

        <p className="text-sm text-zinc-400">
          {character_species} • {character_gender}
        </p>

        <div className="text-xs text-zinc-500">
          <p>
            <span className="font-semibold">Origin:</span> {character_origin}
          </p>
          <p>
            <span className="font-semibold">Location:</span>{" "}
            {character_location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
