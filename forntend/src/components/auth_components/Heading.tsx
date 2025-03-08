export type LabelProps = {
    label: string;
}

export function Heading({label}: LabelProps) {
    return <div className="font-bold text-4xl pt-6">
        {label}
    </div>
}

