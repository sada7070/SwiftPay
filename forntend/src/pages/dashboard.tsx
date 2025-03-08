import { Appbar } from "../components/dashboard_components/Appbar"
import { Balance } from "../components/dashboard_components/Balance"
import { Users } from "../components/dashboard_components/Users"

export const Dashboard = () => {
    return <div>
        <Appbar />
        <Balance />
        <Users />
    </div>
}