import { appConstants } from "@/helpers/constants/appConfig";
import { localstorageService } from "@/helpers/services/localstorageService";

const localStore = {};
// Access Token
localStore.setToken = (v) =>
  localstorageService.set(appConstants.localStorage.accessToken, v);
localStore.getToken = () =>
  localstorageService.get(appConstants.localStorage.accessToken);
localStore.resetToken = () =>
  localstorageService.remove(appConstants.localStorage.accessToken);

// Refresh token
localStore.setRefreshToken = (v) =>
  localstorageService.set(appConstants.localStorage.refreshToken, v);
localStore.getRefreshToken = () =>
  localstorageService.get(appConstants.localStorage.refreshToken);
localStore.resetRefreshToken = () =>
  localstorageService.remove(appConstants.localStorage.refreshToken);

export { localStore };
