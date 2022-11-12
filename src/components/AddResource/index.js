import { Link } from "react-router-dom";
import React, { Component } from "react";
import Header from "../Header";
import { FiChevronLeft } from "react-icons/fi";

import "./index.css";
import FormInput from "../FormInput";

const inputs = [
  {
    id: 1,
    name: "itemName",
    type: "text",
    placeholder: "Item Name",
    errorMessage:
      "Item Name should be 3-16 characters with no special characters!",
    label: "ITEM NAME",
    required: true,
    pattern: "^[A-Za-z0-9]{3,16}$",
  },
  {
    id: 2,
    name: "link",
    type: "text",
    placeholder: "Link",
    errorMessage: "It should be a valid link!",
    label: "LINK",
    pattern:
      "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})",
    required: true,
  },
  {
    id: 3,
    name: "resourceName",
    type: "text",
    placeholder: "Resource Name",
    errorMessage:
      "Resource Name should be 3-16 characters with no special characters and integers!",
    label: "RESOURCE NAME",
    pattern: "^[A-Za-z]{1,16}$",
    required: true,
  },
  {
    id: 4,
    name: "description",
    type: "text",
    placeholder: "Description",
    errorMessage: "Description shouldn't be Empty!",
    label: "DESCRIPTION",
  },
];

export class AddResource extends Component {
  state = {
    values: {
      itemName: "",
      link: "",
      resourceName: "",
      description: "",
    },
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const formData = Object.fromEntries(data.entries());
    const { itemName, link, resourceName, description } = formData;
    if (
      itemName === "" ||
      link === "" ||
      resourceName === "" ||
      description === ""
    ) {
      alert("enter valid form data");
    }
  };

  /*
  renderFormInput = (item) => {
    const { placeholder } = item;
    return (
      <div className="input-container">
        <label className="input-label">{placeholder.toUpperCase()}</label>
        <input
          className="input-field"
          placeholder={`Enter ${placeholder}`}
          type="text"
        />
      </div>
    );
  };
    
  renderFromTextArea = (item) => {
    const { placeholder, name } = item;
    return (
      <div className="input-container">
        <label className="input-label">{placeholder.toUpperCase()}</label>
        <textarea
          name={name}
          className="input-field"
          placeholder={`Enter ${placeholder}`}
          type="text"
          rows={2}
          cols={40}
        />
      </div>
    );
  };
  */

  onChange = (event) => {
    const { values } = this.state;
    this.setState({
      values: { ...values, [event.target.name]: event.target.value },
    });
  };

  render() {
    const { values } = this.state;
    console.log(values);

    return (
      <>
        <Header isButton={false} />
        <div className="add-resource-container">
          <div className="item-details-container">
            <div className="resources-button-container">
              <Link to="/" className="back-to_resources-link">
                <button className="back-arrow-btn" type="button">
                  <FiChevronLeft className="arrow-icon" />
                  Resources
                </button>
              </Link>
            </div>
            <div className="form-details-container">
              <form className="form-container" onSubmit={this.onSubmitForm}>
                <h1 className="form-heading">Item Details</h1>
                {inputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={this.onChange}
                  />
                ))}
                <button className="submit-button" type="submit">
                  CREATE
                </button>
              </form>
            </div>
          </div>
          <div className="image-container">
            <img
              className="add-resource-image"
              src="https://res.cloudinary.com/dinhpbueh/image/upload/v1668151416/image_9_d22hov.png"
              alt="add resource"
            />
          </div>
        </div>
      </>
    );
  }
}

export default AddResource;
