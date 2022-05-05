// export default function Pagination({ prev, postsPerPage, totalPosts, paginate, next}){

//     const pageNumbers = [];

//     for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      
//         pageNumbers.push(i);
//     }
    
  
//     return (
//       <nav>
//         <ul className='pagination'>
//             <li className='page-item'> <p onClick={(e)=>prev(e)}  className='page-link' > &lt;&lt; </p></li>
//           {pageNumbers.map(number => (
//               <li key={number} className='page-item'>
//               <p onClick={() => paginate(number)}  className='page-link'>
//                 {number}
//               </p>
//             </li>
//           ))}
//           <li className='page-item'> <p onClick={(e)=>next(e)} href="/#" className='page-link' > &gt;&gt; </p></li>
//         </ul>
//       </nav>
//     );
//   };
  
import React, { useState, useEffect } from 'react';

function Pagination({postsPerPage, numberOfPages, totalPosts, setCurrentPage,currentPage ,setCurrentButton,currentButton}) {

  //Set number of pages
//   const [numberOfPages, setNumberOfPages ]=useState([]) 
//   let arr=[]
//   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//     arr.push(i)
//   }  
//   setNumberOfPages([...arr])
  // Current active button number
//   const [currentButton, setCurrentButton] = useState(1)

  // Array of buttons what we see on the page
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons]

    let dotsInitial = '...'
    let dotsLeft = '... '
    let dotsRight = ' ...'

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages
    }

    else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
    }

    else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5)
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
    }

    else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {              
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton)                
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1)               
      tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length])
    }
    
    else if (currentButton > numberOfPages.length - 3) {                 
      const sliced = numberOfPages.slice(numberOfPages.length - 4)       
      tempNumberOfPages = ([1, dotsLeft, ...sliced])                        
    }
    
    else if (currentButton === dotsInitial) {
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length-3] + 1) 
    }
    else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2)
    }

    else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 2)
    }

    setArrOfCurrButtons(tempNumberOfPages)
    setCurrentPage(currentButton)
  }, [currentButton, numberOfPages,currentPage ])


  return (
    <div className="pagination-container">
      <p 
        className={ `pgn-btn ${currentButton === 1 ? 'disabled' : ''}`}
        onClick={() => setCurrentButton(prev => prev <= 1 ? prev : prev - 1)}> &lt;&lt;</p>

      {arrOfCurrButtons.map(((item, index) => 
         <p
          key={index}
          className={` pgn-btn ${currentButton === item ? 'active' : ''}`}
          onClick={() => setCurrentButton(item)}
        >
          {item}
        </p>
      ))}

      <p
       className={`pgn-btn next ${currentButton === numberOfPages.length ? 'disabled' : ''}`} onClick={() => setCurrentButton(prev => prev >= numberOfPages.length ? prev : prev + 1)}
      >
        &gt;&gt;
      </p>
    </div>
  );
}


export default Pagination