import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./Episode.css";
import APIFetch from "../../utils/APIFetch";
import PImage from "./components/PImage";
import { Button } from "@mui/material";

const Episode = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const state = location.state || { earray: [], eidx: 0 };
  const { earray, eidx } = state;
  const [resp, setResp] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await APIFetch(`content?pid=${params.eid}`);
      setResp(data);
    };
    fetchData();
  }, [params.eid, eidx]);

  const prev_eid = eidx > 0 ? earray[eidx - 1].attributes.pratilipiId : 0;
  const next_eid =
    eidx < earray.length - 1 ? earray[eidx + 1].attributes.pratilipiId : 0;

  useEffect(() => {
    setResp(null);
  }, [params.eid]);

  return (
    <div className="ep-data">
      <div className="button-container">
        <Button
          variant="contained"
          color="primary"
          disabled={eidx === 0}
          onClick={() => {
            if (eidx > 0) {
              navigate(`/episode/${prev_eid}`, {
                state: { earray, eidx: eidx - 1 },
                replace: true,
              });
            }
          }}
          className="prev-button-top"
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={eidx === earray.length - 1}
          onClick={() => {
            if (eidx < earray.length - 1) {
              navigate(`/episode/${next_eid}`, {
                state: { earray, eidx: eidx + 1 },
                replace: true,
              });
            }
          }}
          className="next-button-top"
        >
          Next
        </Button>
      </div>
      {resp &&
        resp.content.chapters[0].pages[0].pagelets.map((page, index) => (
          <PImage key={index} data={page.data} pid={resp.pratilipiId} />
        ))}
      <div className="button-container">
        <Button
          variant="contained"
          color="primary"
          disabled={eidx === 0}
          onClick={() => {
            if (eidx > 0) {
              navigate(`/episode/${prev_eid}`, {
                state: { earray, eidx: eidx - 1 },
                replace: true,
              });
            }
          }}
          className="prev-button"
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={eidx === earray.length - 1}
          onClick={() => {
            if (eidx < earray.length - 1) {
              navigate(`/episode/${next_eid}`, {
                state: { earray, eidx: eidx + 1 },
                replace: true,
              });
            }
          }}
          className="next-button"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Episode;
