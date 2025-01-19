type ValueProps = {
    value: string;
}

export const Balance = ({value}: ValueProps) => {
    return <div className="flex mt-8 pl-8">
        <div className="font-bold text-lg">
        Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {value}
        </div>
    </div>
}