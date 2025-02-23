import { Card as CardM, CardContent, CardHeader, CardTitle } from "../ui/card";

export const Card = ({ title, value, color }) => {
    return (
        <CardM className="shadow-lg rounded-xl">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className={`text-3xl font-bold  p-4 rounded-lg ${color}`}>
                    {value}
                </div>
            </CardContent>
        </CardM>
    );
};

export const KpiCard = ({ title, value, color }) => {
    return (
        <div className="flex flex-col items-start justify-center gap-3 p-6 rounded-xl border shadow-md bg-white">
            <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
            <div className={`text-3xl font-bold ${color}`}>{value}</div>
        </div>
    );
};
