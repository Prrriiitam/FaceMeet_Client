import React, { useContext } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useEffect } from "react";
import { useStats } from '../../context/SocketProvider';

function Navbar() {
  const { user } = useAuth();
  const { liveUsers} = useStats();
  useEffect(() => {
    console.log("Google profile picture URL →", user?.picture);
  }, [user]);



  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Project Title */}
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-4xl font-bold text-teal-800 dark:text-teal-300" href="#">
              FaceMeet
            </a>
          </div>

          {/* Navigation Links */}
          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-8 text-lg">
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-900 dark:text-white dark:hover:text-white/75"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-900 dark:text-white dark:hover:text-white/75"
                    href="/policy"
                  >
                    Policy
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-900 dark:text-white dark:hover:text-white/75"
                    href="/about"
                  >
                    About us
                  </a>
                </li>
                <li>
                <span className="hidden md:inline-block rounded-full bg-teal-600/20 px-2 py-0.5 text-xs font-semibold text-teal-300 ml-3">
    🟢          Live {liveUsers}
                </span>
                </li>

                <li>
                {user?.picture && (
                <img
                src={user.picture}
                alt="Profile"
                referrerPolicy="no-referrer"               /* ← add this line */
                onError={(e) => {
                e.currentTarget.src = "/images/default-avatar.png";
                }}
                className="h-10 w-10 rounded-full border-2 border-teal-500 object-cover ml-4 shadow"
                />
                )}  
                </li>
              </ul>

            </nav>


          

         
          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
