import Images from "@/components/Images";
import { fetchImages } from "@/lib/fetchImages";
import React from "react";

const HomePage = async ({ searchParams }: SearchParams) => {
  const searchText = (searchParams?.query as string) || "";
  const allImages = await fetchImages(searchText);

  return (
    <div>
      <Images images={allImages} />
    </div>
  );
};

export default HomePage;
