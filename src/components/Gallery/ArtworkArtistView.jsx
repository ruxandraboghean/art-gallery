import React from "react";
import { Link } from "react-router-dom";
import * as MdIcons from "react-icons/md";

export const ArtworkArtistView = ({ artwork }) => {
  return (
    <div className="artworks-wrapper">
      <div className="title">Manage Artworks</div>

      <div className="filter">
        <div className="filter-item">
          <label htmlFor="title">TITLE</label>
          <input type="text" id="title" />
        </div>
        <div className="filter-item">
          <label htmlFor="artwork">ARTWORK</label>
          <input type="text" id="artwork" />
        </div>
        <div className="filter-item">
          <label htmlFor="tags">TAGS</label>
          <input type="text" id="tags" />
        </div>
        <div className="filter-item">
          <label htmlFor="technique">TECHNIQUE</label>
          <input type="text" id="technique" />
        </div>
        <div className="filter-item">
          <label htmlFor="sort">SORT BY</label>
          <input type="text" id="sort" />
        </div>
        <div className="filter-item">
          <label htmlFor="order">ORDER</label>
          <input type="text" id="order" />
        </div>
        <button className="search-btn">SEARCH</button>
        <button className="show-all-btn">SHOW ALL</button>
        <Link to="/add-artwork">
          <button className="add-artwork">ADD NEW ARTWORK</button>
        </Link>
      </div>
      <div className="header">
        <div className="header-item">IMAGE</div>
        <div className="header-item">TITLE</div>
        <div className="header-item">STATUS</div>
        <div className="header-item">ACTION</div>
      </div>
      <div className="artwork">
        <img src={artwork.photoURL} />
        <p>{artwork?.artworkInfo?.title}</p>
        <p>{artwork?.artworkInfo?.description}</p>
        <MdIcons.MdOutlineSettingsSuggest className="settings-icon" />
      </div>
    </div>
  );
};
