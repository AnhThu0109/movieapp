import "./style.css";
import { useEffect, useState, useRef } from "react";
import { POSTER_SRC } from "../../utils/posterSrc";
import { BG_SRC } from "../../utils/bgSrc";
import { Image } from "antd";
import { Link } from "react-router-dom";
import { fetchPage } from "../../utils/fetchData";

function Popular() {
  const [data, setData] = useState({});
  const [imgSrc, setImgSrc] = useState([]);
  const [bgSrc, setBgSrc] = useState([]);
  const [detailLink, setDetailLink] = useState("");
  const containerRef = useRef(null);

  const showBrief = (str) => {
    if(str.length > 17){
      const numLetters = 17;
      const shortenedStr = str.slice(0, numLetters) + "..."; 
      return shortenedStr;
    } else return str; 
  }
  
  const getData = async () => {
    const json = await fetchPage(1, "/movie/popular?", "&language=en-US&page=")
    if (json) {
      console.log(json);
      setData(json);
      let imgSrcArr = [];
      let bgSrcArr = [];
      let detailLinkArr = [];
      json.results.map(item => {
        imgSrcArr.push(`${POSTER_SRC}`+ item.poster_path);
        bgSrcArr.push(`${BG_SRC}` + item.backdrop_path);
        detailLinkArr.push(`/movies/${item.id}`);
      })
      setImgSrc(imgSrcArr);
      setBgSrc(bgSrcArr);
      setDetailLink(detailLinkArr);
    }
  }

  useEffect(() => {
    getData().catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div id="popular">
      <h2 className="title pt-3 px-3 fw-bolder">What's Popular</h2>
      <div className="p-3 trending-film" ref={containerRef} style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
        {
          data?.results?.map((item, index) => (
            <div className="film col-3 me-3">
              <Link to={detailLink[index]} className="movieLink">
              <Image           
                src={imgSrc[index]} className="rounded-4"
              />
              <h6 className="pt-2 text-center">{showBrief(item.title)}</h6>
              <p className="text-center">{item.release_date}</p>
              </Link>
            </div>
          ))
        }       
      </div>
    </div>
  );
}

export default Popular;