import React from "react";

class Footer extends React.Component {
    constructor(props) {
      super(props);
      this.state = { selectedFilter: "all" };
    }
  
    onFilterRadioChanged = (event) => {
      this.props.changeFilter(event.target.value);
      this.setState({ selectedFilter: event.target.value });
    };
  
    onClearCompletedClicked = () => {
      this.props.clearCompletedItems();
    };
  
    render() {
      return (
        <div className="footer">
          <div className="row">
            <div className="col-3 item">
              {this.props.activeItems.length == 1 ? (
                <p>{this.props.activeItems.length} item left</p>
              ) : (
                <p>{this.props.activeItems.length} items left</p>
              )}
            </div>
            <div className="col-5">
              <input
                className="footerradio"
                onChange={(e) => {
                  this.onFilterRadioChanged(e);
                }}
                type="radio"
                id="filter1"
                name="filter"
                value="all"
                checked={this.state.selectedFilter === "all"}
              ></input>
              <label for="filter1">All</label>
              <input
                className="footerradio"
                onChange={(e) => {
                  this.onFilterRadioChanged(e);
                }}
                type="radio"
                id="filter2"
                name="filter"
                value="active"
                checked={this.state.selectedFilter === "active"}
              ></input>
              <label for="filter2">Active</label>
              <input
                className="footerradio"
                onChange={(e) => {
                  this.onFilterRadioChanged(e);
                }}
                type="radio"
                id="filter3"
                name="filter"
                value="completed"
                checked={this.state.selectedFilter === "completed"}
              ></input>
              <label for="filter3">Completed</label>
            </div>
            <div className="col-4">
              {this.props.completedItems.length > 0 && (
                <button
                  className="footerbtn"
                  onClick={() => {
                    this.onClearCompletedClicked();
                  }}
                >
                  Clear Completed
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  export default Footer;