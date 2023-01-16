import ClientTable from "./ClientTable";
import { useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchingClientTableData } from "../Store/redux-thunk";
import classes from './LoggerSearch.module.scss';
import { clientTableActions } from "../Store/ClientTable-redux";

const LoggerSearch = () => {
    
    const dispatch = useDispatch();
    const allData = useSelector(state => state.clientTable.clientData);
    const showData = useSelector(state => state.clientTable.showData);
    let temp1 = new Set(), temp2 = new Set();
    let tableData = [...showData];

    const sortClickHandler = (value) => {
        tableData.sort(function (a, b) {
            if (a[value] < b[value]) {
                return -1;
             }
             if (a[value] > b[value]) {
                return 1;
             }
             return 0;
        })
        console.log(tableData);
        dispatch(clientTableActions.setShowData(tableData));
    }

    const logIDRef = useRef();
    const actionTypeRef = useRef();
    const applicationTypeRef = useRef();
    const fromDateRef = useRef();
    const toDateRef = useRef();
    const applicationIDRef = useRef();

    for(const data of allData){
        temp1.add(data.actionType);
        if(data.applicationType!==null) temp2.add(data.applicationType)
    }
    const actionTypeData = [...temp1];
    const applicationTypeData = [...temp2];

    useEffect(()=>{
        dispatch(fetchingClientTableData());
    },[dispatch])

    const filterData = (arr, func) =>{
        return arr.filter(curr => {
            return func(curr);
        });
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if(logIDRef.current.value!=="") tableData = filterData(tableData,(curr)=>{return curr["logId"] === parseInt(logIDRef.current.value)});
        if(actionTypeRef.current.value!=="") tableData = filterData(tableData,(curr)=>{return curr["actionType"] === actionTypeRef.current.value});
        if(applicationTypeRef.current.value!=="") tableData = filterData(tableData,(curr)=>{return curr["applicationType"] === applicationTypeRef.current.value});
        if(applicationIDRef.current.value!=="") tableData = filterData(tableData,(curr)=>{return curr["applicationId"] === parseInt(applicationIDRef.current.value)}, );
        if(fromDateRef.current.value!==""){
            tableData = filterData(tableData,(curr)=>{
                let tempTime="";
                for(let i=0;i<curr["creationTimestamp"].length;i++){
                    if(curr["creationTimestamp"][i]==='/'){
                        break;
                    }
                    tempTime +=  curr["creationTimestamp"][i];
                }
                return  tempTime >= fromDateRef.current.value
            });
        }
        if(toDateRef.current.value!==""){
            tableData = filterData(tableData,(curr)=>{
                let tempTime="";
                for(let i=0;i<curr["creationTimestamp"].length;i++){
                    if(curr["creationTimestamp"][i]==='/'){
                        break;
                    }
                    tempTime +=  curr["creationTimestamp"][i];
                }
                return  tempTime <= toDateRef.current.value
            });
        }
        
        dispatch(clientTableActions.setShowData(tableData));
        
        logIDRef.current.value = "";
        actionTypeRef.current.value = "";
        applicationTypeRef.current.value = "";
        applicationIDRef.current.value = "";
        fromDateRef.current.value = "";
        toDateRef.current.value = "";

    }


    return (
        <div>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.element}>
                    <label className={classes.label}>Log ID</label>
                    <input className={classes.input} ref={logIDRef} type="number" placeholder="eg. 871144428189016" />
                </div>
                <div className={classes.element}>
                    <label className={classes.label}>Action Type</label>
                    <select  className={classes.input} ref={actionTypeRef}>
                        <option></option>
                        {actionTypeData.map(data => <option key={data}>{data}</option>)}
                    </select>
                </div>
                <div className={classes.element}>
                    <label className={classes.label}>Application Type</label>
                    <select  className={classes.input} ref={applicationTypeRef}>
                        <option></option>
                        {applicationTypeData.map(data => <option key={data}>{data}</option>)}
                    </select>
                </div>
                <div className={classes.element}>
                    <label className={classes.label}>From Date</label>
                    <input className={classes.input} type="date" ref={fromDateRef}/>
                </div>
                <div className={classes.element}>
                    <label className={classes.label}>To Date</label>
                    <input className={classes.input} type="date"ref={toDateRef}/>
                </div>
                <div className={classes.element}>
                    <label className={classes.label}>Application ID</label>
                    <input className={classes.input} type="number" placeholder="eg. 613702333734300" ref={applicationIDRef}/>
                </div>
                <button className={classes.btn}>Search Logger</button>
            </form>
            <ClientTable data={showData} sortClickHandler={sortClickHandler}/>
        </div>
    )
}

export default LoggerSearch;