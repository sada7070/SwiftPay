import { Link } from "react-router-dom";

type ButtonWarningProos = {
    label: string;
    buttonText: string;
    to: string; // Ensure 'to' is a string since it's passed to the 'Link' component
}

export function ButtonWarning({label, buttonText, to}: ButtonWarningProos) {
    return <div className="py-2 text-sm flex justify-center">
        <div>
            {label}
        </div>
        <Link className="pointer underline pl-1" to={to}>
            {buttonText}
        </Link>
    </div>
}