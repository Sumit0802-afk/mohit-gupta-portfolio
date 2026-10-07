import { categories } from "@/data/portfolio";
import PortfolioCard from "./PortfolioCard";

/**
 * The three genre cards. Each one sticks a little lower than the last so they
 * stack like a deck of prints as the page scrolls.
 */
export default function PortfolioGrid() {
  return (
    <div className="flex flex-col gap-6 md:gap-10">
      {categories.map((category, index) => (
        <div
          key={category.slug}
          className="sticky"
          style={{ top: `calc(5.25rem + ${index * 0.9}rem)` }}
        >
          <PortfolioCard category={category} index={index} />
        </div>
      ))}
    </div>
  );
}
