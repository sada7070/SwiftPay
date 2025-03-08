import { LabelProps } from "./Heading"

export function SubHeading({label}: LabelProps) {
    return <div className="text-slate-500 text-md py-4">
        {label}
    </div>
}