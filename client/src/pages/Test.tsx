import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, OnDragEndResponder, DropResult } from 'react-beautiful-dnd';

type CardType = {
  id: string;
  list_id: string;
  order: number;
  content: string;
};

type ListType = {
  id: string;
  order: number;
  content: string;
};

// Mock data arrays
let initialLists: ListType[] = [
  { id: '1', order: 0, content: 'List 1' },
  { id: '2', order: 1, content: 'List 2' },
];

let initialCards: CardType[] = [
  { id: '3', list_id: '1', order: 0, content: 'Card 1' },
  { id: '4', list_id: '1', order: 1, content: 'Card 2' },
  { id: '5', list_id: '2', order: 0, content: 'Card 3' },
  { id: '6', list_id: '2', order: 1, content: 'Card 4' },
];

export default function Test() {
  const [lists, setLists] = useState(initialLists);
  const [cards, setCards] = useState(initialCards);

  function onDragEnd(result: DropResult) {
    const { destination, source, type } = result;

    if (!destination) {
        return;
    }

    if (type === 'LIST') {
        const newLists = Array.from(lists);
        const [removed] = newLists.splice(source.index, 1);
        newLists.splice(destination.index, 0, removed);
        
        // Update order property of each list
        newLists.forEach((list, index) => {
          list.order = index;
        });

        setLists(newLists);
        return;
    }

    const startList = lists.find((list) => list.id === source.droppableId);
    const finishList = lists.find((list) => list.id === destination.droppableId);

    if (startList === finishList) {
        const newList = Array.from(cards.filter((card) => card.list_id === startList?.id));
        const [removed] = newList.splice(source.index, 1);
        newList.splice(destination.index, 0, removed);

        // Update order property of each card in the list
        newList.forEach((card, index) => {
          card.order = index;
        });

        const newCards = Array.from(cards);
        newCards.forEach((card, index) => {
          if (card.list_id === startList?.id) {
            card = newList.find(newCard => newCard.id === card.id) as CardType;
          }
        });

        setCards(newCards);
        } else {
            const startListCards = Array.from(cards.filter((card) => card.list_id === startList?.id));
            const finishListCards = Array.from(cards.filter((card) => card.list_id === finishList?.id));
            const [removed] = startListCards.splice(source.index, 1);

            // Assign new list id to the card
            removed.list_id = finishList?.id || '';

            // Insert the card at the end of the new list
            finishListCards.push(removed);

            // Update order property of each card in both lists
            startListCards.forEach((card, index) => {
            card.order = index;
            });
            finishListCards.forEach((card, index) => {
            card.order = index;
            });

            const newCards = Array.from(cards);
            newCards.forEach((card, index) => {
            if (card.list_id === startList?.id) {
                card = startListCards.find(newCard => newCard.id === card.id) as CardType;
            } else if (card.list_id === finishList?.id) {
                card = finishListCards.find(newCard => newCard.id === card.id) as CardType;
            }
            });

            setCards(newCards);
        }
    
  
    // This would be the point where you would call a setState function in a React component
    // to update the state with the new list and card orders.
    // However, in this context, we're just updating the initialCards and initialLists variables directly.
    // setLists(initialLists);
    // setCards(initialCards);
}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type='LIST'>
            {(boardDroppable) => (
            <div {...boardDroppable.droppableProps} ref={boardDroppable.innerRef} className="flex items-start">
                {lists.sort((a, b) => a.order - b.order).map((list, listIndex) => (
                <Draggable draggableId={list.id} index={listIndex} key={list.id}>
                    {(listDraggable) => (
                    <div {...listDraggable.draggableProps} {...listDraggable.dragHandleProps} ref={listDraggable.innerRef} className="bg-gray-200 m-2 p-2 w-64">
                        <h2>{list.content}</h2>
                        <Droppable droppableId={list.id} type='CARD'>
                        {(listDroppable) => (
                            <div {...listDroppable.droppableProps} ref={listDroppable.innerRef}>
                            {cards
                                .filter((card) => card.list_id === list.id)
                                .sort((a, b) => a.order - b.order)
                                .map((card, cardIndex) => (
                                <Draggable draggableId={card.id} index={cardIndex} key={card.id}>
                                    {(cardDraggable, snapshot) => (
                                    <div
                                        {...cardDraggable.draggableProps}
                                        {...cardDraggable.dragHandleProps}
                                        ref={cardDraggable.innerRef}
                                        className={`bg-white m-2 p-2 ${snapshot.isDragging ? 'rotate-6' : ''}`}>
                                        {card.content}
                                    </div>
                                    )}
                                </Draggable>
                                ))}
                            {listDroppable.placeholder}
                            </div>
                        )}
                        </Droppable>
                    </div>
                    )}
                </Draggable>
                ))}
                {boardDroppable.placeholder}
            </div>
            )}
        </Droppable>
    </DragDropContext>
  );
}
