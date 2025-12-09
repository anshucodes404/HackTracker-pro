import React, { useState } from "react";
import { Button } from "../ui";

interface SearchFilters {
  search: string;
  status: "all" | "upcoming" | "ongoing" | "past";
  teamSize: string;
  tags: string[];
}

const availableTags = [
  "AI/ML",
  "Web Development",
  "Blockchain",
  "Mobile Apps",
  "Open Innovation",
  "UI/UX",
];

const SearchHackathons = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    search: "",
    status: "upcoming",
    teamSize: "any",
    tags: [],
  });

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div>
              <span className="block text-sm font-medium mb-2">Search</span>
              <input
                type="text"
                placeholder="Search hackathons..."
                className="w-full px-4 py-2 rounded border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
              />
            </div>

            {/* Status Filter */}
            <div>
              <span className="block text-sm font-medium mb-2">Status</span>
              <select
                className="w-full px-4 py-2 rounded border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                value={filters.status}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    status: e.target.value as SearchFilters["status"],
                  }))
                }
              >
                <option value="all">All</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="past">Past</option>
              </select>
            </div>

            {/* Team Size Filter */}
            <div>
              <span className="block text-sm font-medium mb-2">
                Team Size
              </span>
              <select
                className="w-full px-4 py-2 rounded border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                value={filters.teamSize}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, teamSize: e.target.value }))
                }
              >
                <option value="any">Any Size</option>
                <option value="solo">Solo</option>
                <option value="duo">Duo (2)</option>
                <option value="small">Small (3-4)</option>
                <option value="large">Large (5+)</option>
              </select>
            </div>

            {/* Tags Filter */}
            <div>
              <span className="block text-sm font-medium mb-2">Tags</span>
              <div className="flex flex-wrap gap-2">
                {availableTags.slice(0, 3).map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        tags: prev.tags.includes(tag)
                          ? prev.tags.filter((t) => t !== tag)
                          : [...prev.tags, tag],
                      }))
                    }
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.tags.includes(tag)
                        ? "bg-primary text-white"
                        : "bg-background text-textSecondary hover:bg-primary/10"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
                <Button variant="secondary" className="text-sm">
                  More Tags
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchHackathons;
