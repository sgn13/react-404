import React, { useState, useRef, useEffect, Ref, RefObject } from "react";

function useDropzone({
  dropzoneRef,
  multiple = false,
  accept = "image/*",
  onChange,
  onRemove,
  onClear,
}: {
  dropzoneRef: Ref<any>;
}) {
  const [isDragged, setIsDragged] = useState(false);
  const [isDropped, setIsDropped] = useState(false);
  const [filelist, setFilelist] = useState([]);
  const [dataUrls, setDataUrls] = useState([]);

  useEffect(() => {
    if (!filelist || !filelist.length) return;
    const generateDataUrls = async (files = []) => {
      const urlsPromises = files.map((file) => {
        const reader = new FileReader();

        return new Promise((resolve) => {
          reader.onload = () =>
            resolve({ name: file?.name, dataUrl: reader?.result });
          reader.readAsDataURL(file);
        });
      });
      const urls = await Promise.all(urlsPromises);
      if (urlsPromises.length) {
        setDataUrls(urls as string[]);
      }
    };

    generateDataUrls(filelist);
    onChange(filelist);
  }, [filelist]);

  const handleDragEnter = (e) => {
    // console.log("File entered the drag area.");
    e.preventDefault();
    e.stopPropagation();
    if (!isDragged) {
      setIsDragged(true);
    }
  };

  const handleDragOver = (e) => {
    // console.log("file is held OVER the isDraging area but NOT being dragged");
    // stops browser from opening the file
    e.preventDefault();
    e.stopPropagation();
    if (!isDragged) setIsDragged(true);
  };

  const handleDragLeave = (e) => {
    // console.log("File left the Dragging area.");
    e.preventDefault();
    e.stopPropagation();
    if (isDragged) {
      setIsDragged(false); // why is this statement failing to set isDragged to false.??
    }
  };

  const handleDrop = async (e) => {
    // console.log("File dropped over the dragging area.");
    e.preventDefault();
    e.stopPropagation();
    if (isDragged) setIsDragged(false);
    if (!isDropped) setIsDropped(true);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesUploaded = [...e.dataTransfer.files]; // copying since type Filelist is not iterable
      setFilelist(filesUploaded);
      // onFileAvailable(filesUploaded);
    }
    e.dataTransfer.clearData();
  };

  const clickOnHiddenInput = () => {
    // inputRef.current && inputRef.current?.click();
    const clickInput = () => {
      const input = document.createElement("input");
      input.style.display = "none";
      input.setAttribute("type", "file");
      if (multiple) input.setAttribute("multiple", true);
      input.setAttribute("accept", accept);
      input.addEventListener("change", handleFileChoosen);
      input.click();
      input.remove();
    };
    clickInput();
  };

  const removeFile = (filename) => {
    setDataUrls((prev) => prev.filter((item) => item.name !== filename));
    setFilelist((prev) => prev.filter((item) => item.name !== filename));
    setIsDropped(false);
    setIsDragged(false);
    onRemove(filename);
  };

  const removeAll = () => {
    setDataUrls([]);
    setFilelist([]);
    setIsDragged(false);
    setIsDropped(false);
    onClear();
  };

  const handleFileChoosen = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesUploaded = [...e.target.files];
      if (filesUploaded.length) {
        setFilelist(filesUploaded);
      }
    }
  };

  useEffect(() => {
    if (dropzoneRef.current) {
      const dropzone = dropzoneRef.current;
      dropzone.addEventListener("dragenter", handleDragEnter);
      dropzone.addEventListener("dragleave", handleDragLeave);
      dropzone.addEventListener("drop", handleDrop);
      dropzone.addEventListener("dragover", handleDragOver);
      dropzone.addEventListener("click", clickOnHiddenInput);

      return function cleanup() {
        dropzone.removeEventListener("dragenter", handleDragEnter);
        dropzone.removeEventListener("dragleave", handleDragLeave);
        dropzone.removeEventListener("drop", handleDrop);
        dropzone.removeEventListener("dragover", handleDragOver);
        dropzone.removeEventListener("click", clickOnHiddenInput);
      };
    }
  }, [dropzoneRef.current]);

  // const UI = (
  //   <div>
  //     <HiddenInput
  //       id="file-input"
  //       ref={inputRef}
  //       type="file"
  //       onChange={handleFileChoosen}
  //       multiple
  //     />
  //     {!!dropzoneRef || dropzoneRef?.current ? null : (
  //       <DropArea
  //         onDragEnter={handleDragEnter}
  //         onDragLeave={handleDragLeave}
  //         onDrop={handleDrop}
  //         onDragOver={handleDragOver}
  //         isDragged={isDragged}
  //         isDropped={isDropped}
  //         onClick={clickOnHiddenInput}
  //       >
  //         {filelist.length && !isDragged ? (
  //           <ol>
  //             {filelist.map((item) => (
  //               <li key={item.name}>{item.name}</li>
  //             ))}
  //           </ol>
  //         ) : (
  //           <>
  //             <h1>Upload</h1>
  //             <div>Click or Drop</div>
  //           </>
  //         )}
  //       </DropArea>
  //     )}
  //   </div>
  // );

  return { filelist, dataUrls, removeFile, removeAll, isDragged, isDropped };
}

export default useDropzone;
