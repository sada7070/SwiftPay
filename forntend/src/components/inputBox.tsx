type InputBoxProps = {
    label: string;
    placeholder: string;
}

export function InputBox({label, placeholder}: InputBoxProps) {
    return <div>
        <div className="text-sm fond-medium text-left py-2">
            {label}
        </div>
        <input placeholder={placeholder} className="w-full px-2 border rounded border-slate-200" />
    </div>
}