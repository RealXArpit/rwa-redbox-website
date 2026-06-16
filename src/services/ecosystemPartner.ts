import { server } from "../utils/server";


const registerEcosystemPartner = (data: any) => {
    return server.post(`/cp/add`, data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
        return err.response.data;
    })
}

 export const ecosystemPartnerServices = {
    registerEcosystemPartner
}