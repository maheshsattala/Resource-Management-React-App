import React from "react";

import "./index.css";

const ResourceItem = (props) => {
  const { resourceDetails } = props;
  const { title, description, category, iconUrl, link } = resourceDetails;

  return (
    <li className="resource-item-card">
      <div className="resource-card-header">
        <img className="card-icon" src={iconUrl} alt={title} />
        <div className="card-text-container">
          <h1 className="card-title">{title}</h1>
          <p className="card-category">{category}</p>
        </div>
      </div>
      <a className="card-link" href={link}>
        {link}
      </a>
      <p className="card-description">{description}</p>
    </li>
  );
};

export default ResourceItem;
