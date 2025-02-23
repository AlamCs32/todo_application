import AddTodoSheet from '@/components/common/todo/AddTodoSheet'
import { KpiCard } from '@/components/common/Card'
import { todoApiActions } from '@/stores/apiSlice/todoApiSlice'
import get from "lodash.get"
import TableTodo from '@/components/common/todo/TableTodo'
import { useEffect, useState } from 'react'
import PaginationComponent from '@/components/common/Pagination'

const Dashboard = () => {
    const [queryParams, setQueryParams] = useState({
        pageNo: 1,
        pageSize: 10,
        search: "",
        status: null,
        sortBy: "updatedAt",
        sortType: "desc"
    })
    const [dueDateQueryParam, setDueDateQueryParam] = useState({
        dueDate: null
    })
    const columns = [
        { key: "Sr.No", label: "Sr.No", sortable: false },
        { key: "todoId", label: "Todo Id", sortable: false },
        { key: "title", label: "Title", sortable: true },
        { key: "description", label: "Description", sortable: false },
        { key: "dueDate", label: "Due Date", sortable: true },
        { key: "status", label: "Status", sortable: false },
        { key: "createdAt", label: "Created At", sortable: true },
        { key: "updatedAt", label: "Updated At", sortable: true },
        { key: "actions", label: "Actions", sortable: false },
    ]

    const { data: todoStatusData = [], isLoading: todoStatusIsLoading } = todoApiActions.getTodoStatus(dueDateQueryParam)
    const { data: todos = [], isLoading: todoIsLoading, refetch } = todoApiActions.getTodo(queryParams);
    console.log(todos)
    useEffect(() => {
        refetch()
    }, [queryParams, dueDateQueryParam, refetch])

    return (
        <div>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-9'>
                <KpiCard title={"Total"} value={get(todoStatusData, "totalCounts", 0)} />
                <KpiCard title={"Completed"} value={get(todoStatusData, "completed", 0)} />
                <KpiCard title={"Pending"} value={get(todoStatusData, "pending", 0)} />
                <KpiCard title={"Due Date"} value={get(todoStatusData, "dueDate", 0)} />
            </div>
            <div className='flex items-center justify-end mt-5'>
                <AddTodoSheet />
            </div>
            {/* Show Todos */}
            <div className='mt-5 overflow-x-auto'>
                <TableTodo
                    columns={columns}
                    data={todos.rows}
                    isLoading={todoIsLoading}
                    sortBy={queryParams.sortBy}
                    sortType={queryParams.sortType}
                    onSort={(column) => {
                        setQueryParams(prev => ({
                            ...prev,
                            sortBy: column,
                            sortType: prev.sortBy === column && prev.sortType === "desc" ? "asc" : "desc"
                        }));
                    }}
                />
                <PaginationComponent
                    totalPages={Math.max(1, Math.ceil(get(todos, "rowsCount", 0) / queryParams.pageSize))}
                    currentPage={queryParams.pageNo}
                    onPageChange={(newPage) => setQueryParams({ ...queryParams, pageNo: newPage })}
                />
            </div>
        </div>
    )
}

export default Dashboard