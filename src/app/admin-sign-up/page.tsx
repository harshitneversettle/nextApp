import { ShowNotification } from "@/components/Notification/ShowNotification";
import AdminSignupInput from "@/components/Signup/AdminSignupInput";

export default function AdminSignUp() {
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center ">
      <div className="text-center text-white pb-3 text-3xl">Admin SignUp</div>
      <AdminSignupInput />
    </div>
  );
}
