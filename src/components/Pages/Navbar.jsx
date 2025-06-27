import React from 'react'

function Navbar() {
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
                    href="/try"
                  >
                    Policy
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-900 dark:text-white dark:hover:text-white/75"
                    href="/reachus"
                  >
                    About us
                  </a>
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
