import { Link } from "react-router-dom";
import img1 from "../assets/logo/logo.png";

function Home() {
  return (
    <div className="bg-[#1e1b4b] h-screen w-screen flex items-center justify-center">
      
      <div className="text-center">
        
        <div className="flex flex-col items-center">
          <div className="h-60 w-60 flex items-center justify-center sm:h-80 sm:w-80 md:h-80 md:w-80">
            <img src={img1} alt="Logo" />
          </div>
        </div>

        
        <div className="mt-10 sm:mt-16">
            <Link to="/login">
            <button className="bg-[#a5b4fc] text-[#1e1b4b] px-6 py-1 rounded-lg mr-6 text-base font-bold tracking-widest sm:px-8 sm:py-2 sm:mr-8 md:px-10 md:py-2 md:mr-8">
            Sign In
          </button>
            </Link>
          
          <Link to="/register">
          <button className="bg-[#a5b4fc] text-[#1e1b4b] px-6 py-1 rounded-lg text-base font-bold tracking-widest sm:px-8 sm:py-2 md:px-10 md:py-2">
            Sign Up
          </button>
          </Link>
         
        </div>
      </div>
    </div>
  );
}

export default Home;
