import { useQuery } from "@tanstack/react-query";
import { Property } from "../types/Property";
import { Axios } from "../helpers/http";

// export default function useProperties(url: string) {
export default function useProperties() {
  return useQuery({
    queryKey: ["properties"],
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
