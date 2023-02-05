import React, { Suspense } from "react";

import { useRoutes } from "react-router-dom";

import { Loader } from "components/Spinner/Spinner";

import routes from "routes";
import styled from "theme/styled";

// const ContentBody = styled.main`
//   margin-top: 1em;
//   width: 100%;

//   background: rgba(4, 103, 160, 0.01);

//   ${theme.mixin.scrollbar({ size: '1em', foregroundColor: 'slategray' })};
// `;

const ContentBody = styled.main`
  position: relative;
  width: 100%;
  height: calc(100vh - 8em);
  overflow: auto;
  background: rgba(4, 103, 160, 0.01);
  box-sizing: border-box;
`;
/* ${theme.mixin.scrollbar({ size: "1em", foregroundColor: "slategray" })}; */

export const PageContainer = styled.div`
  position: relative;
  font-size: 1rem;
  box-sizing: border-box;
  width: 100%;
`;

function Content({ setActive }) {
  const routing = useRoutes(routes);

  return (
    <ContentBody>
      <Suspense fallback={<Loader />}>{routing}</Suspense>
    </ContentBody>
  );
}

export default React.memo(Content);
