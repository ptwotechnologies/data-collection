import { useState } from 'react';
import logoRamini from './assets/logo-ramini.png'; // Adjust path as needed
import spiritualLeader from './assets/spiritual_leader.png'; // Adjust path as needed

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-red-800 text-white p-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left logo */}
        <div className="w-1/6">
          <img src={logoRamini} alt="Organization Logo" className="w-20 h-20" />
        </div>

        {/* Center content */}
        <div className="w-4/6 text-center">
          <h1 className="text-2xl font-bold mb-1">
            सतलोक आश्रम टेणिशी सेवा, मुंडका
          </h1>
          <div className="text-lg mb-1">Mob : +91 92668-61466</div>
          <div className="text-lg mb-1">मुंडका, दिल्ली (110041)</div>
          <div className="text-lg">
            <a
              href="http://www.ramaini.org"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`${
                isHovered ? 'text-yellow-300' : ''
              } hover:underline`}
            >
              www.ramaini.org
            </a>
          </div>
        </div>

        {/* Right image */}
        <div className="w-1/6 flex justify-end">
          <img
            src={spiritualLeader}
            alt="Spiritual Leader"
            className="w-24 h-24"
          />
        </div>
      </div>
    </div>
  );
}
