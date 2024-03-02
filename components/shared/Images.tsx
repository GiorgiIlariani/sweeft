"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { fetchImageDetails, fetchImages } from "@/lib/fetchImages";
import { useInView } from "react-intersection-observer";

const Images = ({ images, searchText }: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [imageDetails, setImageDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      const fetchData = async () => {
        const fetchedMoreImages = await fetchImages(
          searchText ? searchText : "",
          page
        );
        images.push(...fetchedMoreImages);
        setPage((prev) => (prev += 1));
      };
      fetchData();
    }
  }, [inView, images]);

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
    setLoading(true); // Set loading state to true while fetching details
    try {
      const details = await fetchImageDetails(imageId);
      setImageDetails({ ...details, imageUrl, imageDescription });
    } catch (error) {
      console.error("Error fetching image details:", error);
      // Handle error as needed
    } finally {
      setLoading(false); // Set loading state to false after fetching
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto flex justify-start gap-6 flex-wrap px-4 py-[10px]">
        {images.map((image: any, index: number) => (
          <div
            className="w-[400px] h-[270px] object-cover rounded-[7px] cursor-pointer hover:scale-105 transition duration-300"
            key={index}
            onClick={() =>
              openModal({
                imageId: image.id,
                imageUrl: image?.urls?.full,
                imageDescription: image?.alt_description,
              })
            }>
            <Image
              src={image?.urls?.regular}
              alt={image?.alt_description}
              width={image?.width}
              height={image?.height}
              className="w-full h-full rounded-[7px]"
              priority
            />
          </div>
        ))}
      </div>
      <div className="text-3xl font-bold text-red-700" ref={ref}>
        {loading && "Loading..."}
      </div>
      <Modal
        isOpen={isOpenModal}
        closeModal={closeModal}
        imageDetails={imageDetails}
        loading={loading}
      />
    </>
  );
};

export default Images;
