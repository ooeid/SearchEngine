import React from "react";
import { useStateValue } from "../StateProvider";
import useGoogleSearch from "../useGoogleSearch";
import "./SearchPage.css";
import Response from "../response";
import { Link } from "react-router-dom";
import Search from "../components/Search";

function SearchPage() {
  const [{ term }, dispatch] = useStateValue();

  // Mock API CALL
  // const data = Response;

  // LIVE API CALL
  const { data } = useGoogleSearch(term);

  // https://developers.google.com/custom-search/v1/using_rest
  // https://cse.google.com/cse/create/new

  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <Link to="/">
          <img
            className="searchPage__logo"
            src="https://i.ibb.co/nn9z2nH/pngegg.png"
            alt=""
          />
        </Link>
        <div className="searchPage__headerBody">
          <Search hideButtons />
          <div className="searchPage__options">
            <div className="searchPage__optionsLeft">
            </div>
            <div className="searchPage__optionsRight">
              <div className="searchPage__option">
              </div>
              <div className="searchPage__option">
              </div>
            </div>
          </div>
        </div>
      </div>
      {term && (
        <div className="searchPage__results">
          <p className="searchPage__resultCount">
            About {data?.searchInformation.formattedTotalResults} results (
            {data?.searchInformation.formattedSearchTime} seconds) for {term}
          </p>

          {data?.items.map((item) => (
            <div className="searchPage__result">
              <a className="searchPage__resultLink" href={item.link}>

                {item.displayLink}
              </a>
              <a className="searchPage__resultTitle" href={item.link}>
                <h2>{item.title}</h2>
              </a>
              <p className="searchPage__resultSnippet">{item.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
