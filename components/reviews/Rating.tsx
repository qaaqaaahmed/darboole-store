import { FaStar, FaRegStar } from "react-icons/fa6";

function Rating({ rating }: { rating: number }) {
  // initial i = 0 then i + 1 = 1 < say rating is 2 so you get [true, ...]
  const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= rating);
  return (
    <div className="flex items-center gap-x-1">
      {stars.map((isFilled, i) => {
        const className = `w-3 h-3 ${
          isFilled ? "text-primary" : "text-grey-400"
        }`;
        return isFilled ? (
          <FaStar className={className} key={i} />
        ) : (
          <FaRegStar className={className} key={i} />
        );
      })}
    </div>
  );
}

export default Rating;
