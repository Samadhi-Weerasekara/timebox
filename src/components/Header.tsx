
import { CalendarClock } from "lucide-react";
import { format } from "date-fns";
export const Header = () => {
    const currentDate = format(new Date(), "MMMM dd, yyyy");
    return (
        <header className="bg-white shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">Task Manager</h1>
                <div className="flex items-center gap-2 text-gray-600">
                    <CalendarClock size={20} />
                    <span>{currentDate}</span>
                </div>
            </div>
        </header>
    );
};
