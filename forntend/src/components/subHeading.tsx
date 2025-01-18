import { LabelProps } from "./heading"

export function SubHeading({label}: LabelProps) {
    return <div className="text-slate-500 text-md pt-4 pb-4">
        {label}
    </div>
}