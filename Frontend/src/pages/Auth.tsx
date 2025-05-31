import Button from "../components/Button";
import Input from "../components/Input";

export default function Signup({isSignup}:{
    isSignup: boolean
}){
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
         <div className="bg-white rounded-xl border-gray-600 border min-w-48 p-8">
            <Input placeholder="Username"/>
            <Input placeholder="Password"/>

<div className="flex justify-center pt-4">
            <Button variant="primary" text={`${isSignup ? "Sign Up" : "Sign In"}`} fullWidth={true} loading={false}/></div>
         </div>
    </div>
}