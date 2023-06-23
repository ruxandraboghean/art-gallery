import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "../../firebase";

export const DocumentsModal = ({
  id,
  artwork,
  isOpenDocumentsModal,
  setIsOpenDocumentsModal,
}) => {
  const [formValues, setFormValues] = useState({
    report: "",
    certificate: "",
  });

  const handleClose = () => {
    setIsOpenDocumentsModal(false);
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    const { name, value } = e.target;

    setFormValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const report = e.target[0].files[0] || null;
    const certificate = e.target[1].files[0] || null;

    if (!report) {
      alert("Please upload the report");
    } else {
      try {
        const storageRefFile = ref(storage, artwork.id + "/report");

        await uploadBytesResumable(storageRefFile, report).then(() => {
          getDownloadURL(storageRefFile).then(async (downloadURL) => {
            try {
              await updateDoc(doc(db, "artworks", artwork.id), {
                reportURL: downloadURL,
              });
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
                });
              } catch (err) {
                console.error(err);
              }
            });
          }
        );
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <>
      <section id="biography-modal">
        <div className="modal-header">
          <button className="close_button" onClick={handleClose}>
            x
          </button>
        </div>
        <form className="modal-content" onSubmit={handleSubmit}>
          <label htmlFor="report"></label>

          <input
            type="file"
            id="report"
            accept=".pdf, .doc, .docx"
            name="report"
            value={formValues.file}
            onChange={handleChange}
          />
          <label htmlFor="certificate">upload certificate</label>

          <input
            type="file"
            id="certificate"
            accept=".jpg, .png, .svg"
            name="certificate"
            value={formValues.certificate}
            onChange={handleChange}
          />
          <div className="modal-footer">
            <button className="modal-button">Save Changes</button>
          </div>
        </form>
      </section>
      <div className="overlay"></div>
    </>
  );
};
