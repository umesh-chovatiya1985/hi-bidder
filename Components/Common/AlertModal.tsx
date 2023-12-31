import React from "react";

export default function AlertModal({
  closeModal,
  isConfirm,
  confirmEvent,
  value
}: any) {
  return (
    <>
      <div
        id="popup-modal"
        tabIndex={-1}
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 md:inset-0 h-modal h-full"
      >
        <div className="relative w-full h-full modal-backdrop"></div>
        <div className="relative w-full content-center-middle h-full md:h-auto z-[999999]">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="popup-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <img src="/img/popup.png" className="max-w-100 p-3" />
              <h3 className="mb-5 mt-2 text-lg font-normal text-gray-700 dark:text-gray-400">
                Are you sure you want to delete?
              </h3>
              {isConfirm && (
                <div>
                  <button
                    onClick={() => confirmEvent(value)}
                    data-modal-toggle="popup-modal"
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    onClick={closeModal}
                    data-modal-toggle="popup-modal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
