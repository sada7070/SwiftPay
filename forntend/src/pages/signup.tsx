import { useState } from "react"
import { Button } from "../components/auth_components/Button"
import { ButtonWarning } from "../components/auth_components/ButtonWarning"
import { Heading } from "../components/auth_components/Heading"
import { InputBox } from "../components/auth_components/InputBox"
import { SubHeading } from "../components/auth_components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"} />
                <SubHeading label={"Enter your information to create your account"} />
                <InputBox onchange={(e) => {
                     const value = e.target.value;
                     setFirstName(value.charAt(0).toUpperCase() + value.slice(1));
                }} label={"First Name"} placeholder={"John"} />
                <InputBox onchange={(e) => {
                     const value = e.target.value;
                     setLastName(value.charAt(0).toUpperCase() + value.slice(1));
                }} label={"Last Name"} placeholder={"Smith"} />
                <InputBox onchange={(e) => {
                    setEmail(e.target.value);
                }} label={"Email"} placeholder={"john@gmail.com"} />
                <InputBox onchange={(e) => {
                    setPassword(e.target.value);
                }} label={"Password"} placeholder={"1234"} />
                <Button onClick={async() => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                        firstName,
                        lastName,
                        email,
                        password
                    });
                    localStorage.setItem("token", response.data.token);
                    navigate("/dashboard");
                }} label={"Sign up"} />
                <ButtonWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"} />
            </div>
        </div>
    </div>
}