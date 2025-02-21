import {PieChart, Pie, Cell, ResponsiveContainer, Legend} from "recharts";

export const TaskChart = ({tasks}) => {
    const getTaskStats = () => {
        const stats = tasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(stats).map(([name, value]) => ({
            name,
            value,
        }));
    };
    const COLORS = ["#4299E1", "#48BB78", "#F6AD55"];
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 h-64">
            <h3 className="text-lg font-medium mb-4">Task Status Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={getTaskStats()}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                    >
                        {getTaskStats().map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
