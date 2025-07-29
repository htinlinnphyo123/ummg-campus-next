import MoodleLogo from "../../public/images/ummg/moodle_logo.png"
import UniLogo from "../../public/images/ummg/uni_logo.png"
import TelegramIcon from "../../public/images/ummg/telegram_icon.png"
import FbIcon from "../../public/images/ummg/fb_icon.png"
import InfoIcon from "../../public/images/ummg/info_icon.png"

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-8 px-4">
      <div className="mx-auto flex flex-col md:flex-row justify-around items-center md:items-start gap-8">

        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/3">
          <div className="mb-4">
            <img src={UniLogo.src} alt="University Logo" className="w-24 h-24 rounded-full" />
          </div>
          <h3 className="text-xl font-bold text-purple-800 mb-2">UNIVERSITY OF MEDICINE, MAGWAY</h3>
          <p className="text-gray-700 text-sm mb-2">
            Address: 7th Mile, Natmauk Road,<br/>
            Magway City, Magway Region, Myanmar
          </p>
          <div className="flex items-center text-gray-700 text-sm mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 13v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
            </svg>
            <a href="mailto:office@ummg-campus.org" className="hover:underline">office@ummg-campus.org</a>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/3">
          <h3 className="text-xl font-bold text-purple-800 mb-4">SOCIAL LINK</h3>
          <div className="flex space-x-4">
            <a href="https://education.ummg-campus.org/" target="_blank" className="p-2 rounded-full text-white hover:opacity-80 border border-gray-500">
              <img src={MoodleLogo.src} alt="Moodle Logo" className="w-6 h-6" />
            </a>
            <a href="https://www.facebook.com/iucummg/" target="_blank" className="p-2 rounded-full text-white hover:opacity-80 border border-gray-500">
              <img src={FbIcon.src} alt="Facebook Icon" className="w-6 h-6" />
            </a>
            <a href="https://t.me/ummgcampus" target="_blank" className="p-2 rounded-full text-white hover:opacity-80 border border-gray-500">
              <img src={TelegramIcon.src} alt="Telegram Icon" className="w-6 h-6" />
            </a>
            <a href="https://t.me/infoummgiuc" target="_blank" className=" p-2 rounded-full text-white hover:opacity-80 border border-gray-500">
              <img src={InfoIcon.src} alt="Info Icon" className="w-6 h-6" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;