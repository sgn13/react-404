import axios, { Method } from "axios";
import Button from "components/Button";
import DataViewTable from "components/DataViewTable";
import env from "constants/env";
import { useDispatch } from "react-redux";
import { setDownloadingInfo } from "store/app/actions";
import { getFileExtension } from "utils/general";

function DownloadView({
  urlLink,
  filename,
  children,
  ext,
  buttonTitle,
  method = "GET",
  body,
}: {
  urlLink: string;
  filename: string;
  children?: any;
  ext: string;
  method: Method;
  buttonTitle?: string;
  body?: any;
}) {
  const dispatch = useDispatch();
  const downloadFile = (url: string) => {
    try {
      dispatch(setDownloadingInfo({ count: 1, meta: filename }));

      axios({
        url,
        method,
        responseType: "arraybuffer",
        baseURL: env.api.url || "http://localhost:3001/api/v1", // .env-api-url is needed
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        data: body,
        timeout: 45000,
        onDownloadProgress: (progressEvent) => {
          dispatch(
            setDownloadingInfo({
              progress: progressEvent.total
                ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                : ".",
            }),
          );
        },
      }).then((response) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", `${String(filename).replace(`.${ext}`, "")}.${ext}`);
        document.body.appendChild(link);
        link.click();

        setTimeout(() => dispatch(setDownloadingInfo({ count: 0, meta: "", progress: 0 })), 3000);
      });
    } catch (e) {
      console.error("error in downloading", e);
    }
  };

  return (
    <span
      style={{ cursor: "pointer", color: "skyblue" }}
      title="Click to Download"
      onClick={() => downloadFile(urlLink)}
      onKeyDown={() => downloadFile(urlLink)}
      role="button"
      tabIndex={0}
    >
      {children}
      {buttonTitle && (
        <Button size="sm" className="mr-2">
          {buttonTitle}
        </Button>
      )}
    </span>
  );
}

export function MultiDownloadView({
  source = [
    { docfile0: "http://example.com/download/filename.txt" },
    { docfile1: "http://example.com/download/filename.txt" },
  ],
  maxFile,
}) {
  const data = [];

  // An array of counting numbers
  Array.from({ length: maxFile }, (_, i) => i + 1).forEach((number, index) => {
    const fileName = String(source[`docfile${number}`]);
    const splittedFileName = fileName && fileName.split("/");

    if (source[`docfile${number}`])
      data.push({
        key: `Doc ${index + 1}`,
        value: (
          <DownloadView
            url={source[`docfile${number}`]}
            filename={
              splittedFileName.length
                ? splittedFileName[splittedFileName.length - 1]
                : `Document ${number}`
            }
            ext={getFileExtension(fileName)}
          >
            {splittedFileName.length && splittedFileName[splittedFileName.length - 1]}
          </DownloadView>
        ),
      });
  });

  return (
    <>
      {JSON.stringify(data)}
      <DataViewTable data={[...data]} />
    </>
  );
}

export default DownloadView;
