import React, { useState } from "react";
import Button from "./ui/Button";
import InputFile from "./ui/InputFile";
import useUpdateItemPhoto from "../hooks/useUpdateItemPhoto";

function PhotoModal({ closeModal, allItems, itemIndex, animate, pageName }) {
  const handleCloseModal = (e) => {
    if (e.target.className == `modal ${animate}`) {
      closeModal(itemIndex, "photos");
    }
  };

  const item = allItems[itemIndex];

  const {
    file,
    fieldError,
    handleFile,
    validateSubmitForm: submitForm,
  } = useUpdateItemPhoto(closeModal, itemIndex, item.id, pageName);

  const handleSubmit = () => {
    submitForm();
  };

  return (
    <div className={`modal ${animate}`} onClick={handleCloseModal}>
      <div className="modal-pics-contents">
        <div className="modal-header">
          <h4>Update {item.name}'s photos </h4>
          <div
            className="modal-close-button"
            onClick={() => closeModal(itemIndex, "photos")}
          >
            <i className="fa fa-rectangle-xmark"></i>
          </div>
        </div>
        <div className="modal-pics">
          <div className="card photos">
            <div className="profile card-header">
              <img src={item.image} alt="image" width={300} height={300} />
            </div>
            <div className="card-body">
              <span className="photo-name">Photo's {item.name}</span>
              <div className="buttons" style={{ gap: "5px" }}>
                {fieldError.file && (
                  <i className="error-text">{fieldError.file}</i>
                )}
                <InputFile
                  name="file"
                  id="file"
                  errorfield={fieldError.file && "error-field"}
                  label="file"
                  icon="fa fa-upload"
                  placeholder="file"
                  handleChange={handleFile}
                />
                <div className="category-btn-type photo-btn">
                  <i className="fa fa-pencil" onClick={handleSubmit}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoModal;
