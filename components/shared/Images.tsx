"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { fetchImageDetails, fetchImages } from "@/lib/fetchImages";

const Images = ({ images, searchText }: ImagesProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [imageDetails, setImageDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchedMoreImages = await fetchImages(searchText, page);
      if (fetchedMoreImages) images.push(...fetchedMoreImages);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching more images:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = async ({
    imageId,
    imageUrl,
    imageDescription,
  }: {
    imageId: string;
    imageUrl: string;
    imageDescription: string;
  }) => {
    setIsOpenModal(true);
    setLoading(true);
    try {
      const details = await fetchImageDetails(imageId);
      setImageDetails({ ...details, imageUrl, imageDescription });
    } catch (error) {
      console.error("Error fetching image details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto flex justify-center items-center gap-6 flex-wrap px-4 py-[10px]">
        {images.map((image: ImageType, index: number) => (
          <div
            className="sm:w-[400px] w-[300px] sm:h-[270px] h-[190px] object-cover rounded-[7px] cursor-pointer hover:scale-105 transition duration-300 shadow-md bg-black bg-opacity-5 p-4"
            key={index}
            onClick={() =>
              openModal({
                imageId: image.id,
                imageUrl: image?.urls?.full,
                imageDescription: image?.alt_description,
              })
            }>
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
      <div className="w-[56px] mx-auto">
        <Image
          src="./spinner.svg"
          alt="spinner"
          width={56}
          height={56}
          className="object-contain"
        />
      </div>
      <Modal
        isOpen={isOpenModal}
        closeModal={closeModal}
        imageDetails={imageDetails!}
      />
    </>
  );
};

export default Images;
