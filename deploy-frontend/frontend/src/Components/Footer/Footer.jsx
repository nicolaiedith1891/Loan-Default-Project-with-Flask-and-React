import React from 'react'

function Footer() {
  return (<footer className="bg-gray-900 text-white py-6 text-center">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between px-6">
      <div className="flex-1 text-left mb-6 md:mb-0">
        <h3 className="text-lg font-semibold">Contact Us</h3>
        <p className="mt-2">Wealth Cooperative Bank<br/>251/41, Kirula Road, Colombo 05<br/>Sri Lanka</p>
        <p className="mt-2 flex items-center"><i className='bx bxs-phone bx-sm mr-2'></i> +94 112 081 281</p>
        <p className="mt-2 flex items-center"><i className='bx bxs-envelope bx-sm mr-2'></i> info@wealthcoopbank.lk</p>
      </div>
      <div className="flex-1 text-left">
        <h3 className="text-lg font-semibold">Follow Us</h3>
        <ul className="flex space-x-4 mt-2">
          <li><a href="#" className="text-white text-2xl"><i className='bx bxl-twitter bx-sm'></i></a></li>
          <li><a href="#" className="text-white text-2xl"><i className='bx bxl-facebook bx-sm'></i></a></li>
          <li><a href="#" className="text-white text-2xl"><i className='bx bxl-instagram-alt bx-sm'></i></a></li>
          <li><a href="#" className="text-white text-2xl"><i className='bx bxl-linkedin bx-sm'></i></a></li>
        </ul>
        <p className="mt-2 text-sm">Stay connected with us on social media for updates.</p>
      </div>
    </div>
    <p className="mt-4 text-sm">Copyright © 2025. All Rights Reserved.</p>
  </footer>
);
}

export default Footer