import ReactPaginate from "react-paginate"

export default function Countries({data, userPerPage,pageVisited}){
 
    // data.slice(pageVisited, pageVisited + userPerPage)
    return(
        <>
        {
            data.slice(pageVisited, pageVisited + userPerPage).map((e,i)=>
            <div className="country" key={i}>
                <h2>
                    {e.name} 
                    </h2>
                    <h3>
                Region: {e.region} 

                    </h3>
                    <h3>

                Area: {e.area} km<span>2</span>
                    </h3>
                </div>)
        }
        </>
    )

}