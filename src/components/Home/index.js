import React, { Component } from "react";
import { BiSearch } from "react-icons/bi";
import { ThreeDots } from "react-loader-spinner";
import Header from "../Header";
import Resources from "../Resources";
import TabItem from "../TabItem";

import "./index.css";

const tabsList = [
  { tabId: "resources", displayText: "Resources" },
  { tabId: "user", displayText: "Users" },
  { tabId: "request", displayText: "Requests" },
];

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

export class Home extends Component {
  state = {
    searchInput: "",
    activeTabId: tabsList[0].tabId,
    apiStatus: apiStatusConstants.initial,
    resourcesList: [],
  };

  componentDidMount() {
    this.getResourcesData();
  }

  getUpdatedResource = (eachResource) => ({
    category: eachResource.category,
    description: eachResource.description,
    iconUrl: eachResource.icon_url,
    id: eachResource.id,
    link: eachResource.link,
    tag: eachResource.tag,
    title: eachResource.title,
  });

  getResourcesData = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const resourceApiURL =
      "https://media-content.ccbp.in/website/react-assignment/resources.json";
    const options = {
      method: "GET",
    };
    const response = await fetch(resourceApiURL, options);

    if (response.ok) {
      const fetchedData = await response.json();
      const updatedData = fetchedData.map((eachResource) =>
        this.getUpdatedResource(eachResource)
      );
      this.setState({
        apiStatus: apiStatusConstants.success,
        resourcesList: updatedData,
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  clickTabItem = (tabValue) => {
    this.setState({ activeTabId: tabValue });
  };

  renderTabItems = () => {
    const { activeTabId } = this.state;
    console.log(activeTabId);
    return (
      <ul className="tabs-container">
        {tabsList.map((tabDetails) => (
          <TabItem
            key={tabDetails.tabId}
            tabDetails={tabDetails}
            clickTabItem={this.clickTabItem}
            isActive={activeTabId === tabDetails.tabId}
          />
        ))}
      </ul>
    );
  };

  onChangeSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  onEnterSearchInput = (event) => {
    if (event.key === "Enter") {
      this.getResourcesData();
    }
  };

  renderSearchInput = () => {
    const { searchInput } = this.state;

    return (
      <div className="search-input-container">
        <button
          className="search-button"
          type="button"
          onClick={this.onClickSearchBtn}
        >
          <BiSearch className="search-icon" />
        </button>
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
      </div>
    );
  };

  renderNoResourcesView = () => {
    const { searchInput } = this.state;

    return (
      <div className="no-resources-view-container">
        <img
          className="no-resources-view-image"
          src="https://res.cloudinary.com/dinhpbueh/image/upload/v1662554096/SearchNotFound_dfk3mn.png"
          alt="no resources"
        />
        <p className="no-resources-view-description">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    );
  };

  renderSuccessView = () => {
    const { resourcesList, searchInput, activeTabId } = this.state;

    let filteredResources = resourcesList;
    if (activeTabId !== "resources") {
      filteredResources = resourcesList.filter(
        (eachResource) => eachResource.tag === activeTabId
      );
    }

    const searchResults = filteredResources.filter((eachResource) =>
      eachResource.title.toUpperCase().includes(searchInput.toUpperCase())
    );

    const resourcesLength = searchResults.length;
    const showNoResourcesView = resourcesLength === 0;

    return (
      <>
        {showNoResourcesView ? (
          this.renderNoResourcesView()
        ) : (
          <>
            <Resources data={searchResults} />
          </>
        )}
      </>
    );
  };

  renderLoadingView = () => (
    <div className="home-loader-container" testid="loader">
      <ThreeDots type="ThreeDots" color="#0284C7" height={50} width={50} />
    </div>
  );

  onClickTryAgain = () => {
    this.getResourcesData();
  };

  renderFailureView = () => {
    return (
      <div className="home-failure-view">
        <img
          className="home-failure-view-image"
          src="https://res.cloudinary.com/dinhpbueh/image/upload/v1662554492/SomethingWentWrong_qek4y3.png"
          alt="failure view"
        />
        <p className="home-failure-view-description">
          Something went wrong, Please try again.
        </p>
        <button
          type="button"
          className="try-again-btn"
          onClick={this.onClickTryAgain}
        >
          Try Again
        </button>
      </div>
    );
  };

  renderAllResourcesSection = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    return (
      <div>
        <Header isButton={true} />
        <div className="home-container">
          {this.renderTabItems()}
          {this.renderSearchInput()}
          {this.renderAllResourcesSection()}
        </div>
      </div>
    );
  }
}

export default Home;
