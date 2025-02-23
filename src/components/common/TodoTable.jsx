import { useState } from "react";
import { useGetTodoQuery } from "@/redux/apiService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import Button from "./Button";

const TodoTable = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [pageNo, setPageNo] = useState(1);
    const pageSize = 5;

    const { data, isLoading, error } = useGetTodoQuery({ search, status, pageNo, pageSize });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 text-center">Failed to load todos</p>;
    }

    return (
        <>
            <div className="p-4 bg-white rounded-xl shadow-md">
                {/* Filters */}
                <div className="flex gap-4 mb-4">
                    <Input
                        placeholder="Search Todos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-1/3"
                    />
                    <Select onValueChange={setStatus} value={status}>
                        <SelectTrigger className="w-1/4">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="COMPLETED">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Table */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.rows?.map((todo) => (
                            <TableRow key={todo.todoId}>
                                <TableCell>{todo.title}</TableCell>
                                <TableCell>{todo.description}</TableCell>
                                <TableCell>{todo.dueDate}</TableCell>
                                <TableCell
                                    className={todo.status === "COMPLETED" ? "text-green-600" : "text-yellow-600"}
                                >
                                    {todo.status}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <Button
                        onClick={() => setPageNo((prev) => Math.max(prev - 1, 1))}
                        disabled={pageNo === 1}
                    >
                        Previous
                    </Button>
                    <span>Page {pageNo}</span>
                    <Button
                        onClick={() => setPageNo((prev) => prev + 1)}
                        disabled={data?.rows.length < pageSize}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
};

export default TodoTable;
