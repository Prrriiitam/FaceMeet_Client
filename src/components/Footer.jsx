import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-4 w-full">
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3">

        {/* Col 1 */}
        <div className="space-y-2 text-center sm:text-left">
          <a href="/" className="hover:underline block">Home</a>
          <a href="https://github.com/Prrriiitam/FaceMeet_Server" target="_blank" className="hover:underline block">Source Code</a>
        </div>

        {/* Col 2 */}
        <div className="space-y-2 text-center">
          <a href="/community" className="hover:underline block">View Community</a>
          <a href="/policy" className="hover:underline block">View Our Policy</a>
        </div>

        {/* Col 3 */}
        <div className="space-y-4 text-center sm:text-left md:pl-20">
          <p className="font-semibold">Connect with the team</p>
          <p>Pritam Kumar Sarangi</p>
          <div className="flex justify-center sm:justify-start gap-4 text-xl">
            <a href="https://www.linkedin.com/in/pritam-kumar-sarangi-7b952a232/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://github.com/prrriiitam" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://x.com/prrriiitam" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}



// import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

// export default function Footer() {
//   return (
//     <footer className="bg-black text-white py-10 px-4 w-full">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-64 text-base font-light">
        
//         {/* Column 1 */}
//         <div className="space-y-2 text-center md:text-left">
//           <a href="/" className="hover:underline cursor-pointer block">Home</a>
//           <a href="https://github.com/Prrriiitam/FaceMeet_Server" target='_blank' className="hover:underline cursor-pointer block">Source Code</a>
//         </div>

//         {/* Column 2 */}
//         <div className="space-y-2 text-center">
//           <a href="/community" rel="noopener noreferrer" className="hover:underline cursor-pointer block">
//             View Community
//           </a>
//           <a href="/policy" rel="noopener noreferrer" className="hover:underline cursor-pointer block">
//            View Our Policy
//          </a>
//     </div>

//         {/* Column 3 */}
//         <div className="space-y-4 text-left md:text-left md:items-start">
//           <div>
//             <p className="font-semibold">Connect with the team</p>
//             <p className="mt-2">Pritam Kumar Sarangi</p>
//             <div className="flex gap-3 text-lg mt-1">
//               <a href="https://www.linkedin.com/in/pritam-kumar-sarangi-7b952a232/" target="_blank" rel="noopener noreferrer">
//                 <FaLinkedin className="hover:text-blue-400 cursor-pointer" />
//               </a>
//               <a href="https://github.com/prrriiitam" target="_blank" rel="noopener noreferrer">
//                 <FaGithub className="hover:text-gray-400 cursor-pointer" />
//               </a>
//               <a href="https://x.com/prrriiitam" target="_blank" rel="noopener noreferrer">
//                 <FaTwitter className="hover:text-blue-400 cursor-pointer" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
