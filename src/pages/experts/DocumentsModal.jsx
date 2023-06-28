import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "../../firebase";
import * as ImIcons from "react-icons/im";
import * as TiIcons from "react-icons/ti";
import { BsFiletypeDoc } from "react-icons/bs";
import { BsFiletypeJpg } from "react-icons/bs";
import { BsFiletypeSvg } from "react-icons/bs";
import { BsFiletypePng } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa";

import { useDropzone } from "react-dropzone";
import { Spinner } from "../../components/utils/Spinner";

export const DocumentsModal = ({
  artwork,
  setIsOpenDocumentsModal,
  request,
}) => {
  const [formValues, setFormValues] = useState({
    report: null,
    certificate: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const isReportUploaded = formValues?.report !== null;
  const isCertificateUploaded = formValues?.certificate !== null;
  const [isChecked, setIsChecked] = useState(false);
  const [isPdf, setIsPdf] = useState(false);
  const [isPNG, setIsPNG] = useState(false);
  const [isSVG, setIsSVG] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFormValues({
      ...formValues,
      report: acceptedFiles[0],
    });
  };
  const onDropCertificate = (acceptedFiles) => {
    setFormValues({
      ...formValues,
      certificate: acceptedFiles[0],
    });

    if (acceptedFiles[0].name.endsWith(".pdf")) {
      setIsPdf(true);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const {
    getRootProps: getRootCertificateProps,
    getInputProps: getInputCertificateProps,
  } = useDropzone({ onDrop: onDropCertificate });

  const handleClose = () => {
    setIsOpenDocumentsModal(false);
  };

  const handleChange = (name, value) => {
    console.log(name, value, "change values");
    setFormValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));

    if (value.name.endsWith(".pdf")) {
      setIsPdf(true);
    }
    if (value.name.endsWith(".docx") || value.name.endsWith(".doc")) {
      setIsPdf(false);
    }

    if (value.name.endsWith(".svg")) {
      setIsSVG(true);
    }
    if (value.name.endsWith(".png")) {
      setIsPNG(true);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleRemoveImg = (name) => {
    setFormValues((previousValues) => ({
      ...previousValues,
      [name]: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const report = !isReportUploaded
      ? e.target[0].files[0] || null
      : formValues.report;
    const certificate = !isCertificateUploaded
      ? e.target[1].files[0] || null
      : formValues.certificate;

    if (!report) {
      alert("Please upload the report");
      setIsLoading(false);
    } else {
      try {
        const storageRefFile = ref(storage, artwork.id + "/report");

        await uploadBytesResumable(storageRefFile, report).then(() => {
          getDownloadURL(storageRefFile).then(async (downloadURL) => {
            try {
              if (isChecked) {
                await updateDoc(doc(db, "artworks", artwork.id), {
                  reportURL: downloadURL,
                  isAuthenticated: false,
                });
              } else {
                await updateDoc(doc(db, "artworks", artwork.id), {
                  reportURL: downloadURL,
                });
              }
            } catch (err) {
              console.error(err);
            }
          });
        });
        const storageRefCertificate = ref(storage, artwork.id + "/certificate");

        await uploadBytesResumable(storageRefCertificate, certificate).then(
          () => {
            getDownloadURL(storageRefCertificate).then(async (downloadURL) => {
              try {
                await updateDoc(doc(db, "artworks", artwork.id), {
                  certificateURL: downloadURL,
                  isAuthenticated: true,
                  status: "authenticated",
                });
                await updateDoc(doc(db, "requests", request.id), {
                  status: "completed",
                });
              } catch (err) {
                console.error(err);
              }
            });
          }
        );

        setIsLoading(false);
        setIsOpenDocumentsModal(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }
  };
  return (
    <>
      <section id="biography-modal">
        <div className="modal-header" id="close-documents-modal">
          <button className="close_button" onClick={handleClose}>
            x
          </button>
        </div>
        <form
          className="modal-content"
          id="documents-modal"
          onSubmit={handleSubmit}
        >
          <label htmlFor="report" className="custom-label">
            upload report
          </label>
          <div
            className={`drag-container ${
              !isReportUploaded && "center-content"
            }`}
          >
            <div
              className={`drag-drop ${isReportUploaded && "drag-drop-none"}`}
              {...getRootProps()}
            >
              <ImIcons.ImDownload className="drag-icon" />
              <p>Drag & Drop your report here.</p>
            </div>

            {isReportUploaded && (
              <>
                <TiIcons.TiDelete
                  className="remove-icon"
                  onClick={() => handleRemoveImg("report")}
                />
                <div className="dragged-content">
                  {isPdf ? (
                    <FaRegFilePdf className="file-type" />
                  ) : (
                    <BsFiletypeDoc className="file-type" />
                  )}

                  <div className="file-name">{formValues.report.name}</div>
                </div>
              </>
            )}
          </div>

          <input
            {...getInputProps()}
            multiple={false}
            type="file"
            id="report"
            accept=".pdf, .doc, .docx"
            name="report"
            onChange={(e) => handleChange("report", e.target.files[0])}
          />

          <label htmlFor="certificate" className="custom-label">
            upload certificate
          </label>
          <input
            {...getInputCertificateProps()}
            multiple={false}
            type="file"
            id="certificate"
            accept=".jpg, .png, .svg"
            name="certificate"
            onChange={(e) => handleChange("certificate", e.target.files[0])}
          />
          <div
            className={`drag-container ${
              !isCertificateUploaded && "center-content"
            }`}
          >
            <div
              className={`drag-drop ${
                isCertificateUploaded && "drag-drop-none"
              }`}
              {...getRootCertificateProps()}
            >
              <ImIcons.ImDownload className="drag-icon" />
              <p>Drag & Drop your certificate here.</p>
            </div>

            {isCertificateUploaded && (
              <>
                <TiIcons.TiDelete
                  className="remove-icon"
                  onClick={() => handleRemoveImg("certificate")}
                />
                <div className="dragged-content">
                  {isPNG ? (
                    <BsFiletypePng className="file-type" />
                  ) : isSVG ? (
                    <BsFiletypeSvg className="file-type" />
                  ) : (
                    <BsFiletypeJpg className="file-type" />
                  )}
                  <div className="file-name">{formValues.certificate.name}</div>
                </div>
              </>
            )}
          </div>

          <div className="input-item-checkbox">
            <input
              type="checkbox"
              id="forgery"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="forgery">is forgery</label>
          </div>

          <div className="modal-footer">
            <button className="modal-button">Save Changes</button>
          </div>
        </form>
        {isLoading && <Spinner />}
      </section>
      <div className="overlay"></div>
    </>
  );
};
