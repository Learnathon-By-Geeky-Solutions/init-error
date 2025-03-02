import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "Discover",
  "Animation",
  "Branding",
  "Illustration",
  "Mobile",
  "Print",
  "Product Design",
  "Typography",
  "Web Design",
];

const FilterNav: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("Discover");
  const [showArrows, setShowArrows] = useState({ left: false, right: false });

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setShowArrows({
      left: container.scrollLeft > 0,
      right:
        container.scrollLeft <
        container.scrollWidth - container.clientWidth - 1,
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    checkScrollButtons();
    container.addEventListener("scroll", checkScrollButtons);
    window.addEventListener("resize", checkScrollButtons);
    return () => {
      container.removeEventListener("scroll", checkScrollButtons);
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    scrollContainerRef.current?.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="shadow-md pb-2">
      <div className="flex h-14 items-center px-4 justify-between">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Popular" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recent</SelectItem>
            <SelectItem value="most-liked">Most Liked</SelectItem>
            <SelectItem value="most-viewed">Most Viewed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative px-4 pb-3 flex justify-center">
        {showArrows.left && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-2 top-1/2 h-8 w-8 bg-gray-200 dark:bg-gray-700 shadow-md"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </Button>
        )}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scroll-smooth px-1 [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant="ghost"
              className={`h-8 whitespace-nowrap ${
                activeCategory === category
                  ? "bg-muted font-medium"
                  : "font-normal"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        {showArrows.right && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-2 top-1/2 h-8 w-8 bg-gray-200 dark:bg-gray-700 shadow-md"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterNav;
