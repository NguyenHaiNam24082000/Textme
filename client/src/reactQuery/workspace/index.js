import { useQuery } from "react-query";
import { getAllWorkspaces } from "../../apis/workspace";
import { OPEN_SERVER } from "../../configs/queryKeys";

export const GetAllWorkspaces = () => {
    return useQuery(OPEN_SERVER, async ()=>{
        let data = [];
        try {
            let workspaces = await getAllWorkspaces().then((res) => res.data);
            data = [...workspaces];
        } catch (error) {
            console.log(error);
        }
        return data;
    })
};