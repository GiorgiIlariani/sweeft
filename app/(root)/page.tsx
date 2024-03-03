import Images from "@/components/shared/Images";
import { fetchImages } from "@/lib/fetchImages";
import Search from "@/components/shared/Search";

const HomePage = async ({ searchParams }: SearchParams) => {
  const searchText = (searchParams?.query as string) || "";

  const allImages = await fetchImages(searchText);

  return (
    <>
      <h3 className="text-center font-bold text-3xl md:text-4xl mb-8 text-gray-800 mt-12 px-2">
        Discover and explore your{" "}
        <span className="text-blue-600">favorite</span> images
      </h3>
      <div className="wrapper mx-auto">
        <Search />
      </div>
      <Images images={allImages} searchText={searchText} />
    </>
  );
};

export default HomePage;
