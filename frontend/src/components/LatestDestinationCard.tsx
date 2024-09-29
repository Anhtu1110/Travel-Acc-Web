import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="absolute top-0 bg-opacity-50 w-fit right-0 bg-black px-2 rounded-bl-md">
        <span className="text-white font-bold tracking-tight text-md">
          £{hotel.pricePerNight}
        </span>
      </div>
      <div className="absolute bottom-0 p-3 bg-black bg-opacity-50 w-full rounded-b-md">
        <span className="text-white font-bold tracking-tight text-xl">
          {hotel.name}
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
