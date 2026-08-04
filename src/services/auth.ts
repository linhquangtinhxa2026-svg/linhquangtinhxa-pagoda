import { pb } from "@/lib/pocketbase";

export const loginSuperuserService = async (email: string, password: string) => {
  return pb.collection("_superusers").authWithPassword(email, password);
};

export const refreshSuperuserSessionService = async () => {
  return pb.collection("_superusers").authRefresh();
};

export const logoutService = () => {
  pb.authStore.clear();
};
