function Header() {
  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* Uncomment the image if needed */}
          {/* <img src="https://image.pitchbook.com/nMz385heckBMsbyFnKxQAzhsEJN1605398243081_200x200" className="h-8" alt="Flowbite Logo" /> */}
          <span className=" mt-1 self-center text-3xl font-semibold whitespace-nowrap dark:text-red-600">
            Wealth <span className="text-white">Coop</span>
          </span>
        </a>
      </div>
    </nav>
  );
}

export default Header;
