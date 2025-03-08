import { useEffect, useState } from "react"
import { Button } from "../auth_components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users= () => {
    const[users, setUsers] = useState([]);                      // to list all users.
    const[filter, setFilter] = useState("");                    // for search input.

    // add debouncing here
    useEffect(() => {
        // to list users from DB.
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user);
            })
    }, [filter]);

    return <div className="px-8">
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value);
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border border-rounded border-slate-200"></input>
        </div>

        {/* The below line is using the JavaScript map() method to iterate over the 'users' array and render a 'User' component for each user in the array. */}
        <div>
            {users.map(user => <User user={user} />)}       
        </div>
    </div>
}

type UserProps = {
    user:{
    firstName: string;
    lastName: string;
    _id: number;
    }
}
// 'User' component.
function User({user}: UserProps) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full w-10 h-10 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flext felx-col justify-center h-full mt-3 font-semibold">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="felx flex-col justify-center h-full">
            <Button onClick={() =>{
                navigate(`/transfer?id=${user._id}&fName=${user.firstName}&lName=${user.lastName}`);
            }}  label={"Send Money"} />
        </div>
    </div>
}