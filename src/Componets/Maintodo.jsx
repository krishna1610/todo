import React from "react";
import Footer from "./Footer";

class Maintodos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], filter: "all" };
  }

  onInputKeyPressed = (e) => {
    if (e.key === "Enter") {
      // create local copy of items
      // push item to local copy
      // assign this local copy to items
      var allItems = this.state.items; //[{}, {}, {}] ["", "", ""]

      var newItem = { text: e.target.value, check: false };
      allItems.push(newItem); //[{}, {}, {}, {}] ["", "", "", ""]

      this.setState({ items: allItems });
      e.target.value = "";
    }
  };

  onCheckboxChanged = (e, item) => {
    // localcopy
    // update  value of chec for item at index i
    // setstate
    var allItems = this.state.items;
    var index = allItems.indexOf(item);
    allItems[index].check = e.target.checked;
    this.setState({ items: allItems });
  };

  onDeleteItemClicked = (item) => {
    var allItems = this.state.items;
    var index = allItems.indexOf(item);
    allItems.splice(index, 1);
    this.setState({ items: allItems });
  };

  isUncheckedItem = (item) => {
    //{text:"dcd",check:true}
    if (item.check === false) return true;
    else return false;
  };

  isFilteredItem = (item) => {
    var f = this.state.filter;
    if (f === "all") {
      return true; // show all items
    } else if (f === "active") {
      return this.isUncheckedItem(item);
    } else {
      return !this.isUncheckedItem(item);
    }
  };

  changeFilter = (newFilter) => {
    this.setState({ filter: newFilter });
  };

  clearCompletedItems = () => {
    // local copy of items
    // filter all items from local copy which are unchecked
    // set state
    var allItems = this.state.items;
    var uncheckedItems = allItems.filter(this.isUncheckedItem);
    this.setState({ items: uncheckedItems });
  };

  isCheckedItem = (item) => {
    if (item.check === true) return true;
    else return false;
  };

  render() {
    return (
      <div>
        <h1 className="todos">todos</h1>

        <input
          className="new_todo"
          type="text"
          placeholder="What needs to be done?"
          onKeyPress={(event) => {
            this.onInputKeyPressed(event);
          }}
        />
        <ul className="thelist">
          {this.state.items.filter(this.isFilteredItem).map((item) => {
            return (
              <li>
                <div className="row lirow">
                  <div className="col-1">
                    <input className="checkbox-round"
                      type="checkbox"
                      checked={item.check}
                      onChange={(event) => {
                        this.onCheckboxChanged(event, item);
                      }}
                    ></input>
                  </div>

                  <div className="col-10">
                    <span>{item.text}</span>
                  </div>
                  <div className="col-1">
                    <button
                      className="button"
                      onClick={() => {
                        this.onDeleteItemClicked(item);
                      }}
                    >
                      X
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {this.state.items.length > 0 && (
          <Footer
            activeItems={this.state.items.filter(this.isUncheckedItem)}
            changeFilter={this.changeFilter}
            clearCompletedItems={this.clearCompletedItems}
            completedItems={this.state.items.filter(this.isCheckedItem)}
          />
        )}
      </div>
    );
  }
}
export default Maintodos;
