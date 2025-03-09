import React, { useState } from "react";
import Button from "./ui/Button";
import InputFile from "./ui/InputFile";
import useUpdatePhoto from "../hooks/useUpdatePhoto";

function PhotosModal({ closeModal, allCategories, categoryIndex, animate }) {
  const handleCloseModal = (e) => {
    if (e.target.className == `modal ${animate}`) {
      closeModal(categoryIndex, "photos");
    }
  };

  const category = allCategories[categoryIndex];
  const files_nbr = category.images.length;
  const {
    file,
    fieldError,
    handleFile,
    validateSubmitForm: submitForm,
  } = useUpdatePhoto(closeModal, categoryIndex, category.id);

  const handleSubmit = (submit_type, photo_id) => {
    submitForm(submit_type, photo_id);
  };

  return (
    <div className={`modal ${animate}`} onClick={handleCloseModal}>
      <div className="modal-pics-contents">
        <div className="modal-header">
          <h4>Update {category.name}'s photos / Add new </h4>
          <div
            className="modal-close-button"
            onClick={() => closeModal(categoryIndex, "photos")}
          >
            <i className="fa fa-rectangle-xmark"></i>
          </div>
        </div>
        <div className="modal-pics">
          {category.images.map((item, i) => {
            return (
              <div className="card photos" key={i}>
                <div className="profile card-header">
                  <img src={item.image} alt="image" width={300} height={300} />
                </div>
                <div className="card-body">
                  <span className="photo-name">Photo {i + 1}</span>
                  <div className="buttons" style={{ gap: "5px" }}>
                    {fieldError["file" + item.id] && (
                      <i className="error-text">
                        {fieldError["file" + item.id]}
                      </i>
                    )}
                    <InputFile
                      name={`file${i}`}
                      id={`file${i}`}
                      errorfield={fieldError["file" + item.id] && "error-field"}
                      label={`file${i}`}
                      icon="fa fa-upload"
                      placeholder="file"
                      handleChange={handleFile}
                    />
                    <div className="category-btn-type">
                      <i
                        className="fa fa-pencil"
                        onClick={() => handleSubmit("update_photo", item.id)}
                      ></i>
                      {files_nbr < 6 ? (
                        <i
                          className="fa fa-plus"
                          onClick={() => handleSubmit("add_photo", item.id)}
                        ></i>
                      ) : (
                        <i className="fa fa-plus avoid"></i>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PhotosModal;
