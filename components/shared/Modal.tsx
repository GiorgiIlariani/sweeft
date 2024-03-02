"use client";

import Image from "next/image";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";
import { Dialog, Transition } from "@headlessui/react";

const Modal = ({
  isOpen,
  closeModal,
  imageDetails,
  loading,
}: CarDetailsProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-out duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white px-6 py-10 text-left shadow-xl transition-all flex flex-col gap-5">
                  <div
                    className="absolute right-4 top-4 text-gray-500 text-xl cursor-pointer"
                    onClick={closeModal}>
                    <IoClose />
                  </div>
                  <div className="mx-auto flex-1 flex flex-col gap-3">
                    <Image
                      src={imageDetails?.imageUrl}
                      alt={imageDetails?.imageDescription}
                      width={400}
                      height={250}
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
