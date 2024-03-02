import Image from "next/image";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({
  isOpen,
  closeModal,
  imageDetails,
  loading,
}: CarDetailsProps) => {
  // Toggle 'overflow-hidden' class on body based on isOpen prop
  if (isOpen) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  return (
    <>
      {isOpen && (
        <Fragment>
          <div className="fixed inset-0 bg-black bg-opacity-25 z-50" />
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex items-center justify-center min-h-screen p-4 text-center">
              <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white px-6 py-10 text-left shadow-xl transition-all flex flex-col gap-5">
                <div
                  className="absolute top-4 right-4 text-gray-500 text-xl cursor-pointer"
                  onClick={closeModal}>
                  <IoClose />
                </div>
                <div className="mx-auto flex-1 flex flex-col gap-5">
                  <Image
                    src={imageDetails?.imageUrl}
                    alt={imageDetails?.imageDescription}
                    width={400}
                    height={280}
                    className="object-cover rounded"
                  />

                  <div className="flex items-center justify-between mt-4 gap-4 text-gray-600 text-base">
                    <p>
                      <span className="text-blue-600 font-semibold">
                        {imageDetails?.likes?.total}{" "}
                      </span>
                      Likes
                    </p>
                    <p>
                      <span className="text-blue-600 font-semibold">
                        {imageDetails?.downloads?.total}{" "}
                      </span>
                      Downloads
                    </p>
                    <p>
                      <span className="text-blue-600 font-semibold">
                        {imageDetails?.views?.total}{" "}
                      </span>
                      Views
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Modal;
