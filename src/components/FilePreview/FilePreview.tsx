import { useEffect, useState } from "react";
import shadows from "src/constants/css/shadows";
import styled from "src/theme_old/styled";

// for pdf preview without using react-pdf
{
  /* <object
  data="http://africau.edu/images/default/sample.pdf"
  type="application/pdf"
  width="100%"
  height="100%"
>
  <p>
    Alternative text - include a link{" "}
    <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a>
  </p>
</object>; */
}

const ListContainer = styled.ul`
  font-size: 1rem;
  padding: 0;
  margin: 0;
  list-style-type: none;
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

const ListItem = styled.li`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  position: relative;
  width: fit-content;
  outline: 1px solid;
  box-shadow: ${shadows[2]};
  border-radius: 4px;
`;

const Crossmark = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  transition: 0.3s transform;
  :hover {
    transform: scale(1.1);
  }
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  object-position: center;
`;

function ImagePreview({ dataUrls = [], value = [], httpUrls, setHttpUrls, removeFile }) {
  const [previewList, setPreviewlist] = useState(dataUrls || []);

  // for locally choosen image
  useEffect(() => {
    setPreviewlist(dataUrls);
  }, [dataUrls]);

  const imagePreviewsLocal = previewList.length
    ? previewList.map((item, index) => (
        <ListItem key={item?.id}>
          <Crossmark
            onClick={(e) => {
              e.stopPropagation();
              removeFile(item.name);
            }}
          >
            &#10060;
          </Crossmark>
          <Img key={item.name} src={item.dataUrl} alt={`preview ${item.name}`} style={{}} />
        </ListItem>
      ))
    : null;

  const imagePreviewsHttp = httpUrls.length
    ? httpUrls.map((item, index) => (
        <ListItem key={item}>
          <Crossmark
            onClick={(e) => {
              e.stopPropagation();
              setHttpUrls((prev) => prev.filter((httpUrlItem) => httpUrlItem !== item));
            }}
          >
            &#10060;
          </Crossmark>
          <Img key={item} src={item} alt={`preview ${item}`} style={{}} />
        </ListItem>
      ))
    : null;

  return <ListContainer>{httpUrls?.length ? imagePreviewsHttp : imagePreviewsLocal}</ListContainer>;
}

export default ImagePreview;
