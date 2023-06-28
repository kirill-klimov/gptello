// @ts-nocheck
import { useEffect, useState, startTransition, useRef, Fragment } from "react";
import { DefaultParams, useLocation } from "wouter";
import { Card, fetchBoard } from "../redux/boardSlice";
import { trpc } from "../trpc";
import Spinner from "./Spinner";
import BookSvg from "../assets/book.svg";
import BarsSvg from "../assets/bars.svg";
import TrashSvg from "../assets/trash.svg";
import CheckmarkSvg from "../assets/checkmark-square.svg";
import QuestionSvg from "../assets/question.svg";
import XSvg from "../assets/x.svg";
import ContentEditable from "react-contenteditable";
import { Popover } from "@headlessui/react";
import MyButton from "./MyButton";
import TextEditor from "./TextEditor/TextEditor";
import { initialEditorState } from "./TextEditor/data";
import GptPng from '../assets/gpt.png';
import { useAppDispatch } from "../hooks";

type Props = {
  params: {
    board_id: string;
    card_id: string;
  } | DefaultParams;
};

export default function CardView(props: Props) {
  const id = props.params.card_id;
  const [_, navigate] = useLocation();
  const [card, setCard] = useState<Card>({} as Card);
  const [loading, setLoading] = useState<boolean>(false);
  const nameRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const name = useRef<string>("");

  async function fetchCard() {
    if (!id) return;
    setLoading(true);
    const card = await trpc.card.get.query({ id });
    startTransition(() => {
      setCard(card as Card);
      setLoading(false);
    });
    if (!card.content) {
      await trpc.card.update.mutate({
        id: card.id,
        content: initialEditorState,
      });
      fetchCard();
    }
  }

  async function handleSubmitName(e: React.KeyboardEvent | React.FocusEvent) {
    e.preventDefault();
    const div = nameRef.current as HTMLDivElement;
    if (!name.current.length) {
      name.current = card.name;
      div.textContent = card.name;
      div.blur();
    } else {
      await trpc.card.update.mutate({ id, name: name.current.trim() });
      div.blur();
    }
  }

  async function handleDelete(close: Function) {
    if (!id) return;
    await trpc.card.delete.mutate({ id });
    dispatch(fetchBoard(props.params.board_id || ''));
    navigate(`/board/${props.params.board_id}`);
  }

  useEffect(() => {
    fetchCard();

    function handle(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        navigate(`/board/${props.params.board_id}`)
      }
    }
    document.addEventListener('keydown', handle)
    return () => { document.removeEventListener('keydown', handle) }
  }, [id]);

  return (
    <div
      onClick={(_) => navigate(`/board/${props.params.board_id}`)}
      className="fixed w-full h-full top-0 left-0 bg-black/50 z-[1001] grid place-items-center px-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="min-h-[600px] w-full max-w-3xl bg-gray-100 rounded-xl p-6 pt-7 flex flex-col relative">
        <div
          onClick={(_) => navigate(`/board/${props.params.board_id}`)}
          className="hover:bg-gray-200 cursor-pointer rounded-full p-2 absolute right-1 top-1">
          <XSvg className="h-5 w-5 stroke-text-500" />
        </div>
        {loading && !card ? (
          <div className="grow grid place-content-center pb-10">
            <Spinner className="border-primary-500 h-10 w-10 border-4" />
          </div>
        ) : (
          <div id="te-sh">
            <div className="flex items-center mb-6">
              <BookSvg className="h-6 w-6 stroke-text-500 stroke-2 mr-3 shrink-0" />
              <ContentEditable
                spellCheck={false}
                innerRef={nameRef}
                id="ce-1"
                onPaste={async (e) => {
                  e.preventDefault();
                  const text = e.clipboardData.getData("text/plain");
                  const div = document.getElementById("ce-1");
                  if (div) div.textContent += text;
                }}
                className={`text-lg font-medium w-full outline-primary-500 px-1 focus:bg-white mr-8`}
                onChange={(e) => (name.current = e.target.value)}
                onBlur={handleSubmitName}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitName(e)}
                html={card.name || ""}
              />
            </div>
            <div className="flex">
              <div className="flex grow mr-4">
                <BarsSvg className="h-6 w-6 stroke-text-500 stroke-2 mr-3 shrink-0" />
                <div className="grow">
                  <div className="flex items-center mb-3">
                    <span className="font-medium block mr-2">Content</span>
                    <Popover as={Fragment}>
                    {({ open, close }) => <div className="relative">
                        <Popover.Button>
                            <div className={`p-1 -m-1 -mb-2 hover:bg-gray-200 rounded-md cursor-pointer ${open?'bg-gray-200':''}`}>
                                <QuestionSvg className="h-5 w-5 stroke-text-500" />
                            </div>
                        </Popover.Button>
                        <Popover.Panel>
                            <div className=" z-50 absolute -top-[10px] left-8 bg-white shadow rounded border p-3 w-[320px]">
                                <div className="border-b flex items-center justify-between pb-2 mb-2">
                                    <div />
                                    <span className="text-sm text-gray-500">Generate with AI</span>
                                    <div 
                                    onClick={_ => close()}
                                    className="rounded-full hover:bg-gray-200 p-1 -m-1 cursor-pointer">
                                        <XSvg className="h-5 w-5 stroke-text-500" />
                                    </div>
                                </div>
                                <p className="text-sm w-full mb-2">You can generate content for this card using AI by clicking on 
                                "<img className="inline h-5 w-5 mr-[1px] ml-[2px]" src={GptPng} alt="gpt" />" button in text editor. This option usually <span className="font-medium">takes around 30 seconds</span>, so don't close the card while waiting.</p>
                                <p className="text-sm">Generated content is based on names of the board, card and it's list. When ready, content will be pasted into text editor <span className="font-medium">replacing existing content.</span></p>
                            </div>
                        </Popover.Panel>
                    </div>}
                    </Popover>
                  </div>
                  <div className="grow overflow-y-auto max-h-[55vh] card-scroll">
                    {card.content && (
                      <TextEditor
                        onSave={fetchCard}
                        card_id={card.id}
                        content={card.content}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="min-w-[170px]">
                <div className="mb-4">
                  <span className="font-medium text-xs block mb-2">
                    Add to card
                  </span>
                  <div className="flex items-center rounded bg-gray-200 px-[10px] py-[6px] select-none cursor-pointer hover:bg-gray-300">
                    <CheckmarkSvg className="h-4 w-4 stroke-text-500 mr-2" />
                    <span className="text-sm">Checklist</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-xs block mb-2">
                    Actions
                  </span>
                  <Popover as={Fragment}>
                    {({ close, open }) => (
                      <>
                        {!open && (
                          <Popover.Button>
                            <div className="flex items-center rounded bg-gray-200 px-[10px] py-[6px] select-none cursor-pointer hover:bg-gray-300">
                              <TrashSvg className="h-4 w-4 stroke-text-500 mr-2" />
                              <span className="text-sm">Delete card</span>
                            </div>
                          </Popover.Button>
                        )}
                        <Popover.Panel>
                          <div>
                            <span className="block mb-2 text-sm font-medium text-center">
                              Delete card?
                            </span>
                            <div className="flex">
                              <MyButton
                                style="pale"
                                className="grow mr-2"
                                onClick={(_) => close()}
                                text="Cancel"
                              />
                              <MyButton
                                style="subtle"
                                onClick={() => handleDelete(close)}
                                className="grow red-button"
                                text="Delete"
                              />
                            </div>
                          </div>
                        </Popover.Panel>
                      </>
                    )}
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
