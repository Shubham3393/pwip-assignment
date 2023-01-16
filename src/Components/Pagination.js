import classes from './Pagination.module.scss';

const Pagination = (props) =>{

    const pages = props.pages;
    const currPage = props.currPage;
    const lastPage = pages.length;
    const paginationPages = pages.slice(currPage-1, currPage+2);

    
    const showPages = paginationPages.map(curr => <div key={curr} className={currPage === curr+1 ? `${classes.number} ${classes.selected}` : classes.number} onClick={()=>(props.handlePageClick(curr+1))}>{curr+1}</div>) 

    const y =   <>
                    {showPages}
                    <div className={classes.break} onClick={()=>(props.handlePageClick(currPage+3))}>...</div>
                    <div className={currPage === lastPage ? `${classes.number} ${classes.selected}` : classes.number} onClick={()=>(props.handlePageClick(lastPage))}>{lastPage}</div>
                </>
    const z =   <>
                    <div className={classes.break} onClick={()=>(props.handlePageClick(currPage-3))}>...</div>
                    {showPages}
                </>
    const showPagination = currPage + 3 >= lastPage ? z : y;

    const previousArrowClass = currPage === 1 ? `${classes.invalid} ${classes.svgs}` : classes.svgs;
    const nextArrowClass = currPage === lastPage ? `${classes.invalid} ${classes.svgs}` : classes.svgs;

    const previousArrow =   <div className={previousArrowClass} onClick={()=>(props.handlePageClick(currPage-1)) }>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </div>

    const nextArrow =   <div className={nextArrowClass} onClick={()=>(props.handlePageClick(currPage+1))}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
    return(
        <div className={classes.pagination}>
            {previousArrow}
            {showPagination}
            {nextArrow}
        </div>
    )
}
export default Pagination;