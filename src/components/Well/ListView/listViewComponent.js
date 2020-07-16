import React, { Component } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../../../styles/listViewComponent.css";

export default class ListView extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.data);
    this.state = this.props.data;
  }
  render() {}
}
