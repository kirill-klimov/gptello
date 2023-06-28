// @ts-nocheck
import ExampleTheme from "./themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import './styles.css';
import { Popover } from "@headlessui/react";
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import { $getRoot, EditorState, LexicalEditor } from "lexical";
import { $generateNodesFromDOM } from "@lexical/html";
import { Fragment, useEffect, useState } from "react";
import MyButton from "../MyButton";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { initialEditorState } from "./data";
import { trpc } from "../../trpc";

function Placeholder() {
  return <div className="editor-placeholder text-sm">Add more details...</div>;
}

function SetEmptyPlugin({ setEmpty }: { setEmpty: Function }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.getEditorState().read(() => {
      const root = $getRoot();
      setEmpty(!root.getChildren().reduce((prev, curr, acc) => {
        return prev += curr.getTextContentSize();
      }, 0)); 
    })
  }, [editor]);

  return <></>;
}

type Props = {
  content?: string
  card_id: string
  onSave: Function
}

export default function TextEditor({ content, card_id, onSave }: Props) {
  const [state, setState] = useState<EditorState>({} as EditorState);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  async function saveChanges(close: Function) {
    await trpc.card.update.mutate({ 
      id: card_id, 
      content: JSON.stringify(state.toJSON()), 
    });
    close();
    onSave();
  }

  function onChange(editorState: EditorState, editor: LexicalEditor) {
    setState(editorState);
    editorState.read(() => {
      const root = $getRoot();
      setIsEmpty(!root.getChildren().reduce((prev, curr, acc) => {
        return prev += curr.getTextContentSize();
      }, 0));   
    });
  }

  const editorConfig = {
    // The editor theme
    theme: ExampleTheme,
    editorState: content || initialEditorState,
    // Handling of errors during update
    onError: (error: any) => console.log(error),
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      AutoLinkNode,
      LinkNode,
    ]
  };

  return (
    <Popover as={Fragment}>
    {({ open, close }) => 
    <div className="grow flex flex-col">
      {/* @ts-ignore */}
      <LexicalComposer initialConfig={editorConfig}>
      {!open ? 
        <Popover.Button>
          <div className={`relative rounded animate-editor ${isEmpty ? 'h-16 overflow-hidden bg-gray-200 hover:bg-gray-300' : ''} text-sm`}>
            <RichTextPlugin
            contentEditable={<ContentEditable 
            spellCheck={false}
            className={`editor-input text-sm ${ !isEmpty ? 'pt-2' : '' }`} />}
            placeholder={<div className="absolute top-2 left-3 w-max">Add more details...</div>}
            ErrorBoundary={LexicalErrorBoundary} />
            <SetEmptyPlugin setEmpty={setIsEmpty} />
          </div>
        </Popover.Button> :
        <>
          <Popover.Panel>
            <div className="editor-container mt-0 border mb-3 flex flex-col text-sm">
              <ToolbarPlugin card_id={card_id} />
              <div className={`editor-inner rounded text-left`}>
                <RichTextPlugin
                contentEditable={<ContentEditable className="editor-input max-h-[40vh] overflow-y-scroll text-sm" />}
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}/>
                <HistoryPlugin />
                <AutoFocusPlugin />
                <CodeHighlightPlugin />
                <ListPlugin />
                <LinkPlugin />
                <AutoLinkPlugin />
                <ListMaxIndentLevelPlugin maxDepth={7} />
                <OnChangePlugin onChange={onChange} />
              </div>
            </div>
            <div className="flex">
              <MyButton
                onClick={_ => saveChanges(close)}
                style="subtle" 
                text="Save" 
                className="mr-2"
              />
              <MyButton
                onClick={_ => close()}
                style="pale" 
                text="Cancel" 
              />
            </div>
          </Popover.Panel>
        </>
        }
        {/* <LoadInitialState content={content} /> */}
      </LexicalComposer>
    </div>
    }
  </Popover>
  );
}
