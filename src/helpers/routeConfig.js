import Dashboard from "@/pages/dashboard/Dashboard";

export const getRouteConfig = (props) => {
  const { DASHBOARD_VIEW } = props;

  return [
    {
      path: "/dashboard",
      element: Dashboard,
      accessible: DASHBOARD_VIEW,
    },
  ];
};
