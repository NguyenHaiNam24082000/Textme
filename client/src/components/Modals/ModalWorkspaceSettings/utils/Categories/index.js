import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const channels = [
  // {
  //   id: "1",
  //   title: "Fresh Board",
  //   columns: [
  {
    id: "1",
    title: "Todo",
    cards: [
      {
        id: "1-1",
        title: "This is a card",
        img: "https://cdn.pixabay.com/photo/2021/01/09/20/33/sunset-5903426_960_720.jpg",
      },
      {
        id: "1-2",
        title: "This is a card 2",
        img: "https://cdn.pixabay.com/photo/2021/04/13/05/20/beach-6174684_960_720.jpg",
      },
      {
        id: "1-3",
        title: "This is a card 3",
        img: "https://cdn.pixabay.com/photo/2019/07/10/22/23/beach-4329694_960_720.jpg",
      },
    ],
  },
  { id: "2", title: "In Progress", cards: [] },
  { id: "3", title: "Done", cards: [] },
  // ],
  // },
];

export default function Categories() {
  const onDragEnd = (result) => {
    // if (!result.destination) return;
    // onChange(reorder(items, result.source.index, result.destination.index));
  };
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full h-full">
        <h3 className="text-xl font-semibold mb-3">Các danh mục</h3>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={0} type="BOARD" direction="horizontal">
            {(provided) => {
              return (
                <div
                  className="flex  w-full h-full"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {channels?.map((channel, index) => (
                    <div key={channel.id}>
                      <Draggable
                        key={channel.id}
                        draggableId={channel.id}
                        index={index}
                      >
                        {(provided) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                              }}
                              className="inline-flex bg-yellow-400 mr-3 p-2 flex-col w-64 rounded-md relative max-h-full h-auto flex-shrink-0"
                            >
                              <div className="flex w-full h-8">Test</div>
                              <div
                                // {...provided.draggableProps}
                                // ref={provided.innerRef}
                                // style={{
                                //   ...provided.draggableProps.style,
                                // }}
                                className="inline-flex"
                                style={{ minHeight: "250px" }}
                              >
                                <Droppable
                                  droppableId={channel.id}
                                  type="COLUMN"
                                  // renderClone={(
                                  //   provided,
                                  //   snapshot,
                                  //   rubric
                                  // ) => (
                                  //   <div
                                  //     ref={provided.innerRef}
                                  //     {...provided.draggableProps}
                                  //     {...provided.dragHandleProps}
                                  //     className="card w-full p-2 mb-2 h-10 bg-red-200 rounded-md"
                                  //   >
                                  //     {
                                  //       channel?.cards[rubric.source.index]
                                  //         .title
                                  //     }
                                  //   </div>
                                  // )}
                                >
                                  {(provided) => {
                                    return (
                                      <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="cards flex flex-col w-full"
                                        style={{ borderRadius: "inherit" }}
                                      >
                                        {channel.cards?.map((card, index) => {
                                          return (
                                            <Draggable
                                              key={card.id}
                                              draggableId={card.id}
                                              index={index}
                                            >
                                              {(provided, snapshot) => {
                                                return (
                                                  <>
                                                    <div
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      {...provided.dragHandleProps}
                                                      style={{
                                                        ...provided
                                                          .draggableProps.style,
                                                      }}
                                                      className="card w-full p-2 mb-2 h-10 bg-red-200 rounded-md"
                                                    >
                                                      {card.title}
                                                    </div>
                                                  </>
                                                );
                                              }}
                                            </Draggable>
                                          );
                                        })}
                                        {provided.placeholder}
                                      </div>
                                    );
                                  }}
                                </Droppable>
                              </div>
                              <div
                                className="flex w-full h-8 justify-center items-center cursor-pointer hover:bg-slate-200"
                                style={{ borderRadius: "inherit" }}
                              >
                                Add
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
