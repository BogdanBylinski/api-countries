import { useEffect, useState } from 'react';
import './App.css';
import Countries from './Components/Countries';
import ReactPaginate from 'react-paginate';
import style from './style.scss'

function App() {

  const [countries, setData]=useState([])
  const [data1, setData1]=useState([])
  const [sort, setSort]=useState(0)
  const [pageNumber, setPageNumber]= useState(0)
  const [userPerPage, setUserPerPage]= useState(7)
  const pageVisited = pageNumber * userPerPage
  // const displayUsers = countries.slice(pageVisited, pageVisited + userPerPage)


  // const [smaller, setSmaller]=useState(0)


  useEffect(() => {
    fetch(`https://restcountries.com/v2/all?fields=name,region,area`)

     .then((response) => response.json())
     .then((data) => {
       setData(data); 
       console.log(data);
       setData1(data)
       console.log(countries);
      })
     .catch((err) => {
       console.log(err.message);
      }
      );

   }, []);

   const sortas1=()=>{
     const arr = [...countries];
     if(sort===0){
       arr.sort((a, b)=> b.name.localeCompare(a.name))
        setSort(1)
        setData([...arr])
     }
     else if(sort===1){
       arr.sort((a, b)=> a.name.localeCompare(b.name))
        setSort(0)
        setData([...arr])
     }
   }
   
    const sml =()=>{

      let arr = [...countries];

      arr =  arr.filter(data => data.area < 65300)
      setData([...arr])
    }


    const ocn =()=>{

      let arr = [...countries];

      arr =  arr.filter(data => data.region === "Oceania")
      setData([...arr])
    }
    const back =()=>{
      setData([...data1])
      // console.log(data1);

    }
    // const displayUsers = countries.slice(pageVisited, pageVisited + userPerPage)
    const pageCount =Math.ceil(countries.length/userPerPage)
    const changePage = ({selected})=>{
      setPageNumber(selected);
    }




    return (
    <div className="App">
    <div className="top">

      <h1>Countries REST API</h1>
    </div>
    <div className="btns">
        
        <button onClick={  sortas1}>sort</button>
        <button onClick={sml}>smaller</button>
        
      {/* {displayUsers} */}
      <ReactPaginate
        previousLabel={'<<'}
        nextLabel={'>>'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'paginationBttns'}
        previousLinkCLassName={'previousBttn'}
        nextLinkClassName={'nextBttn'}
        disabledClassName={'paginationDisabled'}
        activeClassNAme={'paginationActive'}
        >
      </ReactPaginate>
      <button onClick={ocn}>Oceania</button>
        <button onClick={back}>back</button>
          </div>
  
     <Countries pageVisited={pageVisited} userPerPage={userPerPage} data={countries} ></Countries>
    </div>
  );
}

export default App;
