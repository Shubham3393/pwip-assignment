import SortData from "./SortData";
import classes from './ClientTable.module.scss';
import { useState } from "react";
import Pagination from "./Pagination";

const ClientTable = (props) => {

    const [currPage, setCurrPage] = useState(1);
    const tableData = props.data;
    const dataPerPage = 10;
    const showData = tableData.slice((currPage-1)*dataPerPage, currPage*dataPerPage)

    let pages = [];
    for(let i=0;i<tableData.length;i+=dataPerPage){
        pages.push(Math.ceil(i/dataPerPage));
    }
    const lastPage = pages.length;
    const handlePageClick = (newPage) =>{
        if(newPage>0&&newPage<=lastPage) setCurrPage(newPage);
        
    }

    return (
        <>
            <div className={classes.table}>
                <div className={classes.row}>
                    <div className={classes.head}><div className={classes.header}>Log ID</div><SortData sortClickHandler={()=>{props.sortClickHandler("logId")}}/></div>
                    <div className={classes.head}><div className={classes.header}>Application Type</div><SortData sortClickHandler={()=>{props.sortClickHandler("applicationType")}}/></div>
                    <div className={classes.head}><div className={classes.header}>Application ID</div><SortData sortClickHandler={()=>{props.sortClickHandler("applicationId")}}/></div>
                    <div className={classes.head}><div className={classes.header}>Action</div><SortData sortClickHandler={()=>{props.sortClickHandler("actionType")}} /></div>
                    <div className={classes.head}><div className={classes.header}>Action Details</div><SortData sortClickHandler={()=>{props.sortClickHandler("actionType")}}/></div>
                    <div className={classes.head}><div className={classes.header}>Date Time</div><SortData sortClickHandler={()=>{props.sortClickHandler("creationTimestamp")}}/></div>
                </div>
                {showData.map(data => {
                    return(
                        <div className={classes.row} key={data.logId}>
                            <div className={classes.data}>{data.logId}</div>
                            <div className={classes.data}>{data.applicationType}</div>
                            <div className={classes.data}>{data.applicationId}</div>
                            <div className={classes.data}>{data.actionType}</div>
                            <div className={classes.data}>{data.actionType}</div>
                            <div className={classes.data}>{data.creationTimestamp}</div>
                        </div>
                    )
                })}
                <Pagination  handlePageClick={handlePageClick} pages={pages} currPage={currPage}/>
            </div>
        </>
    )
}

export default ClientTable;