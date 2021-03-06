import React from "react";
import "./ApplicantTable.css";

interface IApplicantTable {
  id: string;
  name: string;
  currentJob: string;
  location: string;
}

export const ApplicantTable: React.FC<IApplicantTable> = ({
  id,
  name,
  currentJob,
  location,
}: IApplicantTable): React.ReactElement => {
  return (
    <article key={id} className="applicant-table-content-container">
      <h4>{name}</h4>
      <h4>{currentJob}</h4>
      <h4>{location}</h4>
    </article>
  );
};
