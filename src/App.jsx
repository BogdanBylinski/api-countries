import { useEffect, useState } from 'react';
import './App.css';
import Countries from './Components/Countries';
import style from './style.scss'
import Pagination from './Components/Pagination';

function App() {

  const [countries, setCountries]=useState([])
  const [loading, setLoading] = useState(false);
  const [data1, setData1]=useState([])
  const [sort, setSort]=useState(0)
  const [currentPage, setCurrentPage] = useState(1); //pagination
  const [postsPerPage] = useState(10); //pagination
  const [arr, setArr]=useState([]) //pagination
  const [numberOfPages, setNumberOfPages ]=useState([])  //pagination
  const [currentButton, setCurrentButton] = useState(1) //pagination

  // const [pageNumber, setPageNumber]= useState(0)
  // const [userPerPage, setUserPerPage]= useState(7)
  // const pageVisited = pageNumber * userPerPage
  // const displayUsers = countries.slice(pageVisited, pageVisited + userPerPage)



  
  useEffect(() => {
    fetch(`https://restcountries.com/v2/all?fields=name,region,area`)

     .then((response) => response.json())
     .then((data) => {
       setLoading(true)
      setCountries(data); 
       setData1(data)
       setLoading(false)
    
      })
     .catch((err) => {
       console.log(err.message);
      }
      );

   }, []);
   useEffect(()=>{ // pagination, creates arr of pages
    let arr1=[] // pagination, creates arr of pages
    for (let i = 1; i <= Math.ceil(countries.length / postsPerPage); i++) { // pagination, creates arr of pages
      arr1.push(i) // pagination, creates arr of pages
    } // pagination, creates arr of pages
    setNumberOfPages([...arr1]) // pagination, creates arr of pages
   },[countries])    // pagination, creates arr of pages

   const sortas1=()=>{
     const arr = [...countries];
     if(sort===0){
       arr.sort((a, b)=> b.name.localeCompare(a.name))
        setSort(1)
        setCountries([...arr])
     }
     else if(sort===1){
       arr.sort((a, b)=> a.name.localeCompare(b.name))
        setSort(0)
        setCountries([...arr])
     }
   }
   
    const sml =()=>{

      setCurrentButton(1)
      let arr = [...data1];
      arr =  arr.filter(data => data.area < 65300)
      setCountries([...arr])
    }


    const ocn =()=>{
      setCurrentButton(1)
      let arr = [...countries];

      arr =  arr.filter(data => data.region === "Oceania")
      setCountries([...arr])
    }
    const back =()=>{
      setCountries([...data1])
      setCurrentButton(1)

    }
    // const displayUsers = countries.slice(pageVisited, pageVisited + userPerPage)
    // const pageCount =Math.ceil(countries.length/userPerPage)
    // const changePage = ({selected})=>{
    //   setPageNumber(selected)
    // }


    const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = countries.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const prev=()=>{
    if(currentPage === 1){
      return
    }else{

      setCurrentPage(a=> a - 1)
      console.log(currentPage);
    }
  }
  const next=()=>{
    if(currentPage === Math.ceil(countries.length / postsPerPage)){
      return
    }else{
      console.log(Math.ceil((countries.length) / postsPerPage));
      setCurrentPage(a=>a + 1)
    }
  }

    return (
    <div className="App">
    <div className="top">

      <h1>Countries REST API</h1>
    </div>
    <div className="btns">
        <div>

        <button onClick={  sortas1}>A-Z / Z-A</button>
        <button onClick={sml}>Smaller than LTU</button>
        </div>
        
      {/* {displayUsers} */}
      {/* <ReactPaginate
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
      </ReactPaginate> */}
      <div>

      <button onClick={ocn}>Oceania</button>
        <button onClick={back}>RESET</button>
      </div>
          </div>
          <Pagination 
        next={next}
         currentPage={currentPage}
         currentButton={currentButton}
         setCurrentButton={setCurrentButton}
         numberOfPages={numberOfPages} setArr={setArr} setCurrentPage={setCurrentPage} prev={prev}  postsPerPage={postsPerPage}
        totalPosts={countries.length}
        paginate={paginate}/>
     <Countries loading={loading} data={currentPosts}></Countries>
    </div>
  );
}

export default App;
