import { SymbolIcon } from "@radix-ui/react-icons";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-full">
            <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="#000000" strokeWidth="2" r="23" strokeDasharray="108.38494654884786 38.12831551628262"/>
            </svg>
        </div>
    )
}