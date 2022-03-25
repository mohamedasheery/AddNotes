import axios from "axios";
import React, { useEffect, useState } from "react";
export default function Search() {
  const [trem, setTrem] = useState("");
  const [result, setresult] = useState([]);
 async  function getDate() {
   let { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
     params: {
       action: 'query',
       list: 'search',
       origin: '*',
       format: 'json',
       srsearch:trem,
     },
   });
  
   setresult(data.query.search);
  
  }
  useEffect(() => {

    const handelSetTimeOute = setTimeout(() => {
       if (trem) {
      getDate();
    }
    },1500)
   return ()=>clearTimeout(handelSetTimeOute)
  }, [trem]);
  

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="my-3">
            <label htmlFor="exampleFormControlInput1" className="form-label ">
              Search here
            </label>
            <input
              placeholder="search about any info"
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setTrem(e.target.value)}
              value={trem}
            />
          </div>
        </div>
      </div>
 
      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
             
            </thead>
            <tbody>
            
              {result.map((ele) => <tr key={ele.pageid}>
                <th>1</th>
                <th scope="row">{ ele.title}</th>
                <td><span dangerouslySetInnerHTML={{"__html": ele.snippet}} /></td>
             
              </tr>
               ) }
             
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}