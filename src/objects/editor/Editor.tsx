import { useState, useCallback } from "react";
import { createEditor, Descendant, BaseEditor } from "slate";
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  RenderLeafProps,
} from "slate-react";
import { renderElement } from "./RenderElements";
import { CustomElement, CustomText } from "./SlateTypes";
import { handleKeyDown } from "./KeyHandler";

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "some text" }],
  },
  {
    type: "list",
    children: [
      {
        type: "list-item",
        children: [{ text: "First item" }],
      },
    ],
  },
];

const Leaf = (props: RenderLeafProps) => {
  const textSize = props.text.size ? { fontSize: `${props.text.size}px` } : {};
  const fontWeight = { fontWeight: props.leaf.bold ? "bold" : "normal" };
  const style = { ...fontWeight, ...textSize };

  return (
    <span {...props.attributes} style={style}>
      {props.children}
    </span>
  );
};

const Editor = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const renderElementCallback = useCallback(renderElement, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(e) => console.log(e)}
    >
      <Editable
        renderElement={renderElementCallback}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => handleKeyDown(event, editor)}
      />
    </Slate>
  );
};

export default Editor;
