import api from "@/interceptor/api";

export const jobServices = {
    getJob: () => {
        return api.get("/api/jobs");
    }


}