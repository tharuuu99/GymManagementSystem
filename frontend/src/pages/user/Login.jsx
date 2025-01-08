import { useState } from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import GoogleLogin from "../../components/Social/GoogleLogin";


const Login = () => {

const [showPassword, setShowPassword] = useState(false)
const location = useLocation();
const {login, error, setError, loader, setLoader} = useAuth();
const navigate = useNavigate();

const handleSubmit = e =>{
  setError('');
  e.preventDefault();

  const data = new FormData(e.target);
  const formData = Object.fromEntries(data)
  //console.log(formData);
  login(formData.email, formData.password).then(()=>{
    alert("Login successful")
    navigate(location.state?.from || '/dashboard')
  }).catch((err)=>{
    setError(err.code);
    setLoader(false);
  })
  
}
    
  return (
    <div className='w-screen h-screen px-4 py-16 mx-auto sm:px-6 lg:px-8 bg-[#1e1b4b]'>
      <h1 className='text-2xl font-bold text-center text-secondary sm:text-3xl text-white'> Welcome Back!</h1>
      

     <div className='max-w-lg p-4 mx-auto mt-6 mb-0  sm:p-6 lg:p-8'>
        <form onSubmit={handleSubmit} className='space-y-4'>
            <p className='text-lg font-medium text-center text-slate-600 dark:text-white'>Sign in to your account</p>
            <div>
                <label htmlFor="email" className='sr-only'>Email</label>
                <div className='relative'>
                    <input type="email" name='email' placeholder='Enter email' className='w-full p-2 text-sm border rounded-lg shadow-sm outline-none-gray-200 pe-12'/>
                    <span className="absolute inset-y-0 grid px-4 place-content-center end-0"><MdOutlineAlternateEmail className="w-4 h-4 text-gray-400 "/></span>
                </div>
            </div>

            {/* password */}

            <div>
                <label htmlFor="password" className='sr-only'>Password</label>
                <div className='relative'>
                    <input type={showPassword ? 'text' : 'password'} name='password' placeholder='Enter password' className='w-full p-2 text-sm border rounded-lg shadow-sm outline-none-gray-200 pe-12'/>
                    <span onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 grid px-4 place-content-center end-0"><MdOutlineRemoveRedEye className="w-4 h-4 text-gray-400"/></span>
                </div>
            </div>

            <button type='submit' className="block w-full px-5 py- text-sm font-medium bg-[#a5b4fc] text-[#1e1b4b] rounded-lg  hover:bg-[#9e98e4]">Sign in</button>
            <p className="text-sm text-center text-gray-500">No account? <Link className='underline' to="/register">Sign up</Link></p>
        </form>
        <GoogleLogin/>
        
     </div>
      
    </div>
  )
}

export default Login
