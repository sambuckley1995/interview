import React from "react";
import "./DashCard.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { shadow } from "../../themes/theme";

interface IDashCard {
  title: string;
  content: number | string;
  icon: IconProp;
}

const Card = styled.article`
  box-shadow: ${shadow};
`;

export const DashCard: React.FC<IDashCard> = ({
  title,
  content,
  icon,
}: IDashCard): React.ReactElement => {
  return (
    <Card className="dashcard-container">
      <h2 className="dashcard-title">{title}</h2>
      <h1 className="dashcard-content">
        <FontAwesomeIcon className="dashboard-icon" icon={icon} />
        {content}
      </h1>
    </Card>
  );
};
