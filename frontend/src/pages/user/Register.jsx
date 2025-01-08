import { useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../utilities/providers/AuthProvider";
import GoogleLogin from "../../components/Social/GoogleLogin";


const Register = () => {
  const navigate = useNavigate();
  const { signUp, updateUser, setError } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError(""); // Clear previous errors
    try {
      const result = await signUp(data.email, data.password);
      const user = result.user;

      if (user) {
        await updateUser(data.name, data.photoUrl);
        const userImp = {
          name: user?.displayName,
          email: user?.email,
          photoUrl: data.photoUrl,
          role: data.role,
        };

        if (user.email && user.displayName) {
          await axios.post("http://localhost:5000/new-user2", userImp);
          setError("");
          navigate("/");
          alert("Registration Successful!");
        }
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already in use. Please use a different email.");
      } else {
        console.error(error);
        setError(error.message || "An unexpected error occurred.");
      }
    }
  };

  const password = watch("password", "");

  return (
    <div className="h-screen bg-[#1e1b4b]">
<div className="flex  justify-center bg-[#1e1b4b] h-auto  w-screen p-4">
      <div className="sm:p-8 p-2">
        <h2 className="mb-6 text-3xl font-bold text-center text-white mt-11">
          Create Your Account
        </h2>

        {/* form data */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-11">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 font-medium text-gray-300"
              >
                <AiOutlineUser className="inline-block mb-1 mr-2 text-lg" />
                Name
              </label>
              <input
                type="name"
                placeholder="Enter your name"
                {...register("name", { required: true })}
                className="w-full  p-2  border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-xs  "
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 font-medium text-gray-300"
              >
                <AiOutlineMail className="inline-block mb-1 mr-2 text-lg" />
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                {...register("email", { required: true })}
                className="w-full  p-2  border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-xs  "
              />
            </div>
          </div>

          <div >
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 font-medium text-gray-300"
              >
                <AiOutlineLock className="inline-block mb-1 mr-2 text-lg" />
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full  p-2  border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-xs  "
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 font-medium text-gray-300"
              >
                <AiOutlineLock className="inline-block mb-1 mr-2 text-lg" />
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "Password does not match",
                })}
                className="w-full  p-2  border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-xs  "
              />
            </div>
          </div>

          

          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 bg-[#a5b4fc] text-[#1e1b4b] rounded-md hover:bg-[#9e98e4] mt-6"
            >
              Register
            </button>
            {errors.password && (
              <div className="w-full mt-1 text-sm text-red-500">
                <p>Password doesn't match!</p>
              </div>
            )}
          </div>
        </form>
        <p className="mt-4 text-center text-gray-300">
          Already have an account?
          <Link to="/login" className="ml-1 underline ">
            {" "}
            Login
          </Link>
        </p>

        <GoogleLogin />
      </div>
    </div>
    </div>
    
  );
};

export default Register;
