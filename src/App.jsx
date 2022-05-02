import { useEffect, useState } from 'react';
import './App.css';
import Countries from './Components/Countries';

function App() {

  const [countries, setData]=useState([])
  const [data1, setData1]=useState([])
  const [sort, setSort]=useState(0)
  // const [smaller, setSmaller]=useState(0)


  useEffect(() => {
    fetch(`https://restcountries.com/v2/all?fields=name,region,area`)

     .then((response) => response.json())
     .then((data) => {
       setData(data); 
       setData1(data)
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






  return (
    <div className="App">
     <button onClick={  sortas1}>sort</button>
     <button onClick={sml}>smaller</button>
     <button onClick={ocn}>Oceania</button>
     <button onClick={back}>back</button>
     <Countries data={countries} ></Countries>
    </div>
  );
}

export default App;
