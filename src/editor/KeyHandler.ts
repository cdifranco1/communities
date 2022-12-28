import {
  Editor,
  Transforms,
  Text,
  EditorNodesOptions,
  Node,
  NodeEntry,
  NodeMatch,
} from "slate";

const keyboardEvents = [
  "meta+h", // create header. Do I actually want this?
  "meta+k", // turn selection into code -- need to update
  "-+return", // create unordered list -- need to update
  "meta+i", // italicize selection -- need to create
  "1+return", // create ordered list -- need to create
];

export type SelectorFunc = (
  options?: EditorNodesOptions<Node> | undefined
) => Generator<NodeEntry<Node>, void, undefined>;

export function nodeSelector<T extends Node>(editor: Editor): SelectorFunc {
  return (options?: EditorNodesOptions<T>) => Editor.nodes(editor, options);
}

export function matchNode<T extends Node>(
  editor: Editor,
  matchFunc: NodeMatch<T>
): Array<NodeEntry<Node>> {
  return Array.from(nodeSelector(editor)({ match: matchFunc }));
}

const toggleHeader = (editor: Editor) => {
  const matcher = (n: Node) =>
    Editor.isBlock(editor, n) && n.type === "heading";
  const [node] = matchNode(editor, matcher);

  Transforms.setNodes(
    editor,
    { type: node ? "paragraph" : "heading" },
    {
      match: (n) => Editor.isBlock(editor, n),
    }
  );

  Transforms.setNodes(
    editor,
    { size: node ? 20 : 32 },
    { match: (n) => Text.isText(n) }
  );
};

const toggleBold = (editor: Editor) => {
  const matchBold = (n: Node) => {
    if (Text.isText(n) && n.bold) {
      return true;
    } else {
      return false;
    }
  };
  const [boldMatch] = matchNode(editor, matchBold);
  Transforms.setNodes(
    editor,
    { bold: boldMatch ? false : true },
    { match: (n) => Text.isText(n), split: true }
  );
};

const toggleCode = (editor: Editor) => {
  Transforms.setNodes(
    editor,
    { type: "code" },
    { match: (n) => Editor.isBlock(editor, n) }
  );
};

const handleBackSpace = (
  event: React.KeyboardEvent<HTMLDivElement>,
  editor: Editor
) => {
  const { selection } = editor;
  const [lowest] = Array.from(Editor.nodes(editor, { mode: "lowest" }));
  const node = lowest[0];
  const leafIdx = selection?.anchor.path[1];

  if (Text.isText(node) && node.text === "" && leafIdx !== 0) {
    event.preventDefault();
    Transforms.liftNodes(editor);
    Transforms.setNodes(editor, { type: "paragraph" });
  }
};

const handleListStart = (
  event: React.KeyboardEvent<HTMLDivElement>,
  editor: Editor
) => {
  event.preventDefault();
  Transforms.setNodes(editor, { type: "list-item" });
  Transforms.wrapNodes(editor, { type: "list", children: [] });
};

export const handleKeyDown = (
  event: React.KeyboardEvent<HTMLDivElement>,
  editor: Editor
) => {
  const { selection } = editor;
  console.log(selection);
  if (event.key === "h" && event.metaKey) {
    event.preventDefault();
    toggleHeader(editor);
  }

  if (event.key === "`" && event.metaKey) {
    event.preventDefault();
    toggleCode(editor);
  }

  if (event.key === "b" && event.metaKey) {
    event.preventDefault();
    toggleBold(editor);
  }

  if (event.key == "Backspace") {
    handleBackSpace(event, editor);
  }

  if (event.key == "-") {
    handleListStart(event, editor);
  }
};
