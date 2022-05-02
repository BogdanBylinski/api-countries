export default function Countries({data}){

    return(
        <>
        {
            data.map((e,i)=><div key={i}>{e.name} {e.region} {e.area}</div>)
        }
        </>
    )

}