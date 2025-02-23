import { selectAuthState } from "@/stores/slices/authSlice";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { ACCESS_TYPES, ROLE_NAME } from "../constants/commonContants";

const accessValidator = (userRole) => {
  return Object.entries(ACCESS_TYPES).reduce((finalP, [module, role]) => {
    finalP[module] =
      userRole === ROLE_NAME.user ? true : role.includes(userRole);
    return finalP;
  }, {});
};

export const usePermission = () => {
  const { role, ...restAuth } = useSelector(selectAuthState);

  const permissions = useMemo(() => accessValidator(role), [role]);
  return { ...permissions };
};
