/* 
  Unused 
*/

import { useState, useEffect } from "react";

const useFetch = url => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  //   if (url !== "") {

  const fetchURL = async () => {
    const response = await fetch(url);
    const json = response.json();
    setData(json);
    setLoading(false);
  };

  //   }
  useEffect(() => {
    fetchURL();
  }, []);
  return [data, loading];
};

export { useFetch };
