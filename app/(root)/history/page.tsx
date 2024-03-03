"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { fetchImages } from "@/lib/fetchImages";
import { IoMdArrowDropdown } from "react-icons/io";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

const HistoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [searchedImages, setSearchedImages] = useState<any>([]);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchedUrl = searchParams.get("url");
  const [page, setPage] = useState(2);
  const { ref, inView } = useInView();

  const urlHistoryString =
    typeof window !== "undefined" && sessionStorage.getItem("urlHistory");
  const urlHistory = urlHistoryString ? JSON.parse(urlHistoryString) : [];

  useEffect(() => {
    if (inView) {
      fetchData();
    }
  }, [inView]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchedMoreImages = await fetchImages(searchedUrl || "", page);
      if (fetchedMoreImages) {
        setSearchedImages([...searchedImages, ...fetchedMoreImages]);
      }
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching more images:", error);
    } finally {
      setLoading(false);
    }
  };

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
        <h3 className="wrapper font-semibold text-4xl text-center sm:text-left">
          History
        </h3>
        <h3 className="text-center font-bold text-3xl mb-8 text-gray-800 mt-8 px-2">
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
                <React.Fragment key={index}>
                  <li
                    className="flex items-center justify-between gap-2 border border-gray-200 rounded-md py-2 px-8 hover:shadow transition duration-300 cursor-pointer"
                    onClick={() => handleUrlClick(url)}>
                    <p className="text-blue-500 font-semibold text-2xl hover:underline">
                      {url}
                    </p>
                    <span className="text-xl text-gray-500 hover:text-gray-700 transition duration-300">
                      <IoMdArrowDropdown />
                    </span>
                  </li>
                  {searchedUrl === url ? (
                    <div className="flex flex-col max-w-7xl max-h-[800px] overflow-y-auto">
                      <div className="mx-auto flex justify-center gap-6 flex-wrap px-4 py-[10px]">
                        {searchedImages.map((image: any, i: number) => (
                          <div
                            className="w-[400px] h-[270px] object-cover rounded-[7px] cursor-pointer hover:scale-105 transition duration-300"
                            key={i}>
                            <Image
                              src={image?.urls?.regular || ""}
                              alt={image?.alt_description || "image"}
                              width={image?.width}
                              height={image?.height}
                              className="w-full h-full rounded-[7px]"
                              priority
                            />
                          </div>
                        ))}
                      </div>
                      <div className="w-[56px] mx-auto" ref={ref}>
                        <Image
                          src="./spinner.svg"
                          alt="spinner"
                          width={56}
                          height={56}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ) : null}
                </React.Fragment>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default HistoryPage;
