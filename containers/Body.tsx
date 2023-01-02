import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Button from "components/Button";
import { styled } from "theme/styled-components";

const BodyHeaderWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  margin-bottom: 2rem;
  align-items: center;
`;

const Title = styled.div`
  color: #343434;
  font-family: "Poppins600";
  font-size: 1.5em;
`;

function Body({
  children,
  title = "",
  config,
}: {
  title?: string;
  goBack?: boolean;
  config?: { use: boolean; title: boolean; goBack: boolean };
}) {
  useEffect(() => {
    if (title) {
      document.title = title || "";
    }
  }, [title]);

  const history = useHistory();

  return (
    <>
      {config.use && (
        <BodyHeaderWrapper>
          <Title>{config.title && title}</Title>
          {config.goBack && (
            <Button size="sm" onClick={() => history.goBack()} icon={<FaArrowLeft />}>
              Back
            </Button>
          )}
        </BodyHeaderWrapper>
      )}
      <div />
      {children}
    </>
  );
}

export default Body;
