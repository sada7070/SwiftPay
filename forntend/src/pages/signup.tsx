import { Button } from "../components/button"
import { ButtonWarning } from "../components/buttonWarning"
import { Heading } from "../components/heading"
import { InputBox } from "../components/inputBox"
import { SubHeading } from "../components/subHeading"

export const Signup = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your information to create your account"} />
                <InputBox label={"First Name"} placeholder={"John"} />
                <InputBox label={"Last Name"} placeholder={"Smith"} />
                <InputBox label={"Email"} placeholder={"john@gmail.com"} />
                <InputBox label={"Password"} placeholder={"1234"} />
                <Button label={"Sign up"} onClick={() =>{

                }} />
                <ButtonWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"} />
            </div>
        </div>
    </div>
}