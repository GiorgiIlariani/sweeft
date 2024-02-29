import React from "react";
import Image from "next/image";

const Images = ({ images }: any) => {
  return (
    <div className="flex justify-evenly gap-7 flex-wrap px-[25px] py-[10px]">
      {images.map((image: any) => (
        <div
          className="w-[400px] h-[250px] object-cover rounded-[7px] cursor-pointer hover:scale-110"
          key={image.id}>
          <Image
            src={image?.urls?.regular}
            alt={image?.alt_description}
            width={image?.width}
            height={image?.height}
            className="w-full h-full rounded-[7px]"
          />
        </div>
      ))}
      {/* infinitescroll */}
    </div>
  );
};

export default Images;
