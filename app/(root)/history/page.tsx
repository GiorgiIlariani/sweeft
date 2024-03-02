"use client";

import React, { useState } from "react";

import Search from "@/components/shared/Search";
import { fetchImages } from "@/lib/fetchImages";
import { IoMdArrowDropdown } from "react-icons/io";
import Images from "@/components/shared/Images";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const HistoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [searchedImages, setSearchedImages] = useState<any>([]);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchedUrl = searchParams.get("url");

  const urlHistoryString =
    typeof window !== "undefined" && sessionStorage.getItem("urlHistory");
  const urlHistory = urlHistoryString ? JSON.parse(urlHistoryString) : [];

  const handleUrlClick = async (url: string) => {
    setLoading(true);
    try {
      // Check if the clicked URL is the same as the currently displayed URL
      const isSameUrl = searchedUrl === url;

      // If it's the same URL, clear the images
      if (isSameUrl) {
        setSearchedImages([]);
        router.push(pathname); // Remove query parameter from the URL
      } else {
        // Otherwise, fetch new images
        router.push(`${pathname}?url=${url}`);
        const images = await fetchImages(url);
        setSearchedImages(images);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="py-5 md:py-10">
        <h3 className="wrapper font-semibold text-4xl text-center sm:text-left ">
          History
        </h3>
        <Search placeholder="Search for image history..." />
        <h3 className="text-center font-bold text-3xl mb-8 text-gray-800">
          Here you can see your <span className="text-blue-600">searched</span>{" "}
          images history!
        </h3>
        <div className="wrapper">
          {urlHistory.length === 0 ? (
            <p className="text-gray-500 text-2xl text-center mt-20">
              No searched images history to show.
            </p>
          ) : (
            <ul className="wrapper mt-8 flex flex-col gap-5">
              {urlHistory.map((url: string, index: number) => (
                <>
                  <li
                    key={index}
                    className="flex items-center justify-between gap-2 border border-gray-200 rounded-md py-2 px-8 hover:shadow transition duration-300 cursor-pointer"
                    onClick={() => handleUrlClick(url)}>
                    <p className="text-blue-500 font-semibold text-2xl hover:underline">
                      {url}
                    </p>
                    <span className="text-xl text-gray-500 hover:text-gray-700 transition duration-300">
                      <IoMdArrowDropdown />
                    </span>
                  </li>
                  <div className="max-w-7xl mx-auto flex justify-start gap-6 flex-wrap px-4 py-[10px]">
                    {searchedUrl === url
                      ? searchedImages.map((image: any) => (
                          <div
                            className="w-[400px] h-[270px] object-cover rounded-[7px] cursor-pointer hover:scale-105 transition duration-300"
                            key={index}>
                            <Image
                              src={image?.urls?.regular}
                              alt={image?.alt_description}
                              width={image?.width}
                              height={image?.height}
                              className="w-full h-full rounded-[7px]"
                              priority
                            />
                          </div>
                        ))
                      : null}
                  </div>
                </>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default HistoryPage;
