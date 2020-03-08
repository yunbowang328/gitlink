import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const List = styled.div`
  background: lightgrey;
  padding: 10px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid grey;
  background: white;
  &:hover {
    background: lightgrey;
  }
`;

const DragHandle = styled.div`
  width: 15px;
  height: 15px;
  margin-right: 8px;
  background: grey;
  visibility: hidden;
  &:hover {
    background: black;
  }
  ${Item}:hover & {
    visibility: visible;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(10)
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <List ref={provided.innerRef}>
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <Item ref={provided.innerRef} {...provided.draggableProps}>
                      <DragHandle {...provided.dragHandleProps} />
                      {item.content}
                    </Item>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default App;


// Put the thing into the DOM!
// ReactDOM.render(<App />, document.getElementById("root"));
