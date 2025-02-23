import { createApi } from "@reduxjs/toolkit/query/react";
import { apiServiceSlice } from "./apiServiceSlice";

const todoApi = createApi({
  baseQuery: apiServiceSlice.baseQueryWithInterceptor,
  tagTypes: ["TODO", "TODO_STATUS"],
  endpoints: (qb) => ({
    // Create Todo
    createTodo: qb.mutation({
      query: ({ title, description, dueDate, status }) => ({
        url: "/todo",
        method: "POST",
        body: { title, description, dueDate, status },
      }),
      invalidatesTags: ["TODO", "TODO_STATUS"],
    }),
    // Get Todo Status
    getTodoStatus: qb.query({
      query: ({ dueDate }) => {
        const params = {};
        if (dueDate) params.dueDate = dueDate;
        return `/todo/status?${new URLSearchParams(params).toString()}`;
      },
      transformResponse: (res) => res.data,
      providesTags: ["TODO_STATUS"],
    }),
    // Get Todo Lists
    getTodo: qb.query({
      query: ({
        search,
        status,
        dueDate,
        sortBy = "updatedAt",
        sortType = "desc",
        pageNo = 1,
        pageSize = 10,
      }) => {
        const params = { sortBy, sortType, pageNo, pageSize };
        // Que                          ry Params
        if (dueDate) params.dueDate = dueDate;
        if (search) params.search = search;
        if (status && status !== "Total") params.status = status;

        return `/todo?${new URLSearchParams(params).toString()}`;
      },
      transformResponse: (res) => res.data,
      providesTags: ["TODO"],
    }),
    // Update Todo Status
    updateTodoStatus: qb.mutation({
      query: ({ todoId }) => ({
        url: `/todo/${todoId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["TODO", "TODO_STATUS"],
    }),
    // Update Todo Details
    updateTodo: qb.mutation({
      query: ({ todoId, title, description, dueDate, status }) => ({
        url: `/todo/:${todoId}`,
        method: "PUT",
        body: { title, description, dueDate, status },
      }),
      invalidatesTags: ["TODO", "TODO_STATUS"],
    }),
    // Delete Todo
    deleteTodo: qb.mutation({
      query: ({ todoId }) => ({
        url: `/todo/${todoId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TODO", "TODO_STATUS"],
    }),
  }),
});

export const todoApiReducer = todoApi.reducer;

export const todoApiActions = {
  middleware: todoApi.middleware,
  reducerPath: todoApi.reducerPath,
  createTodo: todoApi.useCreateTodoMutation,
  getTodoStatus: todoApi.useGetTodoStatusQuery,
  getTodo: todoApi.useGetTodoQuery,
  updateTodoStatus: todoApi.useUpdateTodoStatusMutation,
  updateTodo: todoApi.useUpdateTodoMutation,
  deleteTodo: todoApi.useDeleteTodoMutation,
};
