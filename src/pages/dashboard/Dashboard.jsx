import AddTodoSheet from '@/components/common/todo/AddTodoSheet'
import { KpiCard } from '@/components/common/Card'
import { todoApiActions } from '@/stores/apiSlice/todoApiSlice'
import get from "lodash.get"

const Dashboard = () => {
    const queryParams = {

    }
    const dueDateQueryParam = {}

    const { data: todoStatusData = {}, isLoading } = todoApiActions.getTodoStatus(dueDateQueryParam)
    console.log(todoStatusData)
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
        </div>
    )
}

export default Dashboard