import React, { Fragment } from "react";
// import { Menu, Transition } from "@headlessui/react";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }
// --tw-border-opacity: 1;
// border-color: rgb(31 41 55/var(--tw-border-opacity));
export default function navigation() {
  return (
    <nav className="sticky top-0 w-full, h-20 flex justify-center items-center px-8 text-white bg-zinc-900/50 backdrop-blur-sm">
      <h1 className="text-3xl text-[#edeaea]">Weather Dashboard</h1>
      {/* <ul className="flex items-center">
        <li className="px-4">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button>Services</Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1  focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
                        Testing
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </li>
      </ul> */}
    </nav>
  );
}
