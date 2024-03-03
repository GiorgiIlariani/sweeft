"use client";

import React, { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";

const Search = () => {
  const [query, setQuery] = useState("");
  const [urlHistory, setUrlHistory] = useState<string[]>(() => {
    const storedHistory =
      typeof window !== "undefined" && sessionStorage.getItem("urlHistory");
    return storedHistory ? JSON.parse(storedHistory) : [];
  });
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      if (query && !urlHistory.includes(query)) {
        setUrlHistory((prevHistory) => [
          query,
          ...prevHistory.filter((item) => item !== ""),
        ]);
      } else if (query) {
        setUrlHistory((prevHistory) => [
          query,
          ...prevHistory.filter((item) => item !== query && item !== ""),
        ]);
      }

      typeof window !== "undefined" &&
        sessionStorage.setItem("urlHistory", JSON.stringify(urlHistory));

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, router, searchParams, urlHistory]);

  return (
    <div className="max-w-4xl mx-auto px-4 mb-8">
      <input
        type="text"
        name="ძებნა"
        placeholder="Search images..."
        value={query}
        onChange={handleChange}
        className="w-full px-6 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-600 focus:border-2 bg-transparent text-lg"
      />
    </div>
  );
};

export default Search;
