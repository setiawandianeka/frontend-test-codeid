import React from "react";

export const ModalBasic = ({
  children,
  showModal,
  classes
}) => {

  return showModal ? (
    <>
      <div className={` justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}>
        <div className={`relative my-6 mx-auto  ${classes} w-auto max-w-5xl lg:max-w-7xl`}>
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*body*/}
            <div className="px-6 py-0">
              {children}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black pointer-events-none" ></div>
    </>
  ) : null;
};
