import "./Packages.css";

import { dummyPackageResponse } from "utils/dummyPackageData";

export const Packages = () => {
  const renderPackages = () => (
    <div className="packages-container">
      {dummyPackageResponse.map((packageItem) => (
        <div className="package-container">
          <p className="package-name">{packageItem.name}</p>
          <h3 className="package-price">
            <span>£{packageItem.price}</span>/ Month
          </h3>
          <p className="package-tag">{packageItem.tag}</p>
          <div className="package-details">
            <ul>
              {packageItem.details.map((packageItemDetail) => (
                <li>{packageItemDetail}</li>
              ))}
            </ul>
          </div>
          <button className="standard-button package-button" type="button">
            Choose
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="packages-page-container">
      <h1>Simple, transparent pricing</h1>
      <h2>No contracts. No surprise fees</h2>
      {renderPackages()}
    </div>
  );
};
