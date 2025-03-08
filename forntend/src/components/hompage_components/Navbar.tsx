import { useNavigate } from "react-router-dom"

export const Navbar = () => {
    const navigate = useNavigate();

    return <div className="flex mt-2 justify-between ml-10 mr-10">
        <div className="font-medium text-2xl">
            SWIFTPAY
        </div>
        <div className="flex gap-2">
            <div>
                <button onClick={async() => {
                    navigate("/signin");
                }} className="bg-slate-700 rounded-xl p-1 pb-2 px-4 text-red-600"
                >Signin</button>
            </div>
            <div>
                <button onClick={async() => {
                    navigate("/signup");
                }} className="bg-slate-700 rounded-xl p-1 pb-2 px-3 text-red-600"
                >Signup</button>
            </div>
        </div>  
    </div>
}