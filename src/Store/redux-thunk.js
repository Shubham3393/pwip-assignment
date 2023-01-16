import { clientTableActions } from "./ClientTable-redux";

export const fetchingClientTableData = () => {
    return async (dispatch) => {
        const response = await fetch("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f");
        if(!response.ok) throw new Error ("client data did not fetched!!");
        const data = await response.json();
        
        for(let i=0;i<data.result.auditLog.length;i++){
            let tempTime = [...data.result.auditLog[i].creationTimestamp];
            for(let j=0;j<tempTime.length;j++){
                if(tempTime[j]===' '){
                    tempTime[j] = '/';
                    break;
                }
            }
            data.result.auditLog[i].creationTimestamp = tempTime;
        }

        dispatch(clientTableActions.setClientData(data.result.auditLog));
        dispatch(clientTableActions.setShowData(data.result.auditLog));
    }
}