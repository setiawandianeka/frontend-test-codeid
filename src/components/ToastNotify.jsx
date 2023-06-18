import React from "react";
import { Toaster, resolveValue, toast } from "react-hot-toast";
import { Transition } from "@headlessui/react";
import { CloseIcon } from "@/components/Icons";

export default function ToastNotify() {
  // const toastRef = useRef()
  // useOutsideClickDetect(toastRef, () => toast.dismiss())
  const renderIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return <div className="bg-green-700 w-6 h-6 rounded-full" />
      case 'blank':
        return <div className="bg-yellow-700 w-6 h-6 rounded-full"  />
      case 'error':
        return <div className="bg-red-700 w-6 h-6 rounded-full"  />
      default:
        break
    }
  }

  return (
    <Toaster
    containerClassName="mt-12"
    position="top-center"
    reverseOrder={false}
    toastOptions={{
      duration: 3000,
      error: {
        duration: 3000,
        className: "mb-4"
      }
    }}
    >
      {(t) => (
        <Transition
          appear
          show={t.visible}
          className={`transform px-2 py-3 min-w-[340px] z-50 flex justify-between bg-white ${t.type === 'blank' ? 'border-yellow-700' : t.type === 'success' ? 'border-green-700' : 'border-red-700'} border-l-8 rounded shadow-lg`}
          enter="transition-all duration-150"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
          // ref={toastRef}
        >
            <div className="flex items-center gap-2 mr-4 text-black">
                {
                  renderIcon(t?.type)
                }
                <p className="font-sans font-bold capitalize text-black">{t.type == 'blank' ? 'warning' : t.type}</p>
                <p className="font-sans first-letter:capitalize ml-1 text-black">{resolveValue(t.message, t)}</p>
            </div>
            <div className="flex items-center p-1 hover:bg-indigo-100 rounded-full" onClick={() => toast.dismiss()}>
              { <CloseIcon width={16} />}
            </div>

        </Transition>
      )}
    </Toaster>
  );
}
