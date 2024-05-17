import { SignupAuth } from "../components/SignupAuth"
import { Quote } from "../components/Quote"

export const Signup = ()=>{
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <SignupAuth/>
        </div>
        <div className="hidden lg:block">
            <Quote/>
        </div>
    </div>
}