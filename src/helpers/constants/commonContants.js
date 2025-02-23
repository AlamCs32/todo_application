export const ROLE_NAME = {
  admin: "ADMIN",
  user: "USER",
  teanent: "teanent",
};

export const ACCESS_TYPES = {
  DASHBOARD_VIEW: [ROLE_NAME.user],
  PROFILE_VIEW: [ROLE_NAME.user],
};

export const TOAST_VARIANT = {
  DEFAULT: "default",
  DESTRUCTIVE: "destructive",
};

export const TOAST_CONFIG = {
  success: {
    variant: TOAST_VARIANT.DEFAULT,
    title: "Successful",
    description: "Your action was completed successfully.",
  },
  error: {
    variant: TOAST_VARIANT.DESTRUCTIVE,
    title: "Error",
    description: "Something went wrong. Please try again.",
  },
};
