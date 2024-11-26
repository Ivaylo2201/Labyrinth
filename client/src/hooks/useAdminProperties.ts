import { useQuery } from "@tanstack/react-query";
import { Property } from "../types/Property";
import { Axios } from "../helpers/http";

export default function useAdminProperties() {
  return useQuery({
    queryKey: ["adminProperties"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await Axios.get<Property[]>("admin/properties", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });
}
