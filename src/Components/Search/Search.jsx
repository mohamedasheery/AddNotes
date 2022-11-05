import axios from "axios";
import React, { useEffect, useState } from "react";
export default function Search() {
  const [trem, setTrem] = useState("");
  const [result, setresult] = useState([]);
  async function getDate() {
    let { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "query",
        list: "search",
        origin: "*",
        format: "json",
        srsearch: trem,
      },
    });

    setresult(data.query.search);
  }

  function clearResulet(){
   setresult([]);
   setTrem('');
  }
  useEffect(() => {
    const handelSetTimeOute = setTimeout(() => {
      if (trem) {
        getDate();
      }
    }, 1500);
    return () => clearTimeout(handelSetTimeOute);
  }, [trem]);

  return (
    <div className="container vh-100">
      <h3 className="minBgColor text-center rounded p-2 text-light">Search About Any Thing And Save It In Note Page</h3>
      <div className="row">
        <div className="col">
          <div className="my-3">
       

            <div class="">
              <input
                class="form-control me-2 w-75"
                type="search"
                placeholder="Search"
                aria-label="Search"
                id="exampleFormControlInput1"
                onChange={(e) => setTrem(e.target.value)}
                value={trem}
              />
              <button class="btn btn-outline-success my-2" onClick={()=>clearResulet()} >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <table className="table">
            <thead></thead>
            <tbody>
              {result.map((ele,index) => (
                <tr key={ele.pageid}>
                  <th>{index+1}</th>
                  <th scope="row">{ele.title}</th>
                  <td>
                    <span dangerouslySetInnerHTML={{ __html: ele.snippet }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
