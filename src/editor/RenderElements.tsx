import { RenderElementProps } from "slate-react";

const HeaderElement = (props: RenderElementProps) => {
  return <header {...props.attributes}>{props.children}</header>;
};

const CodeElement = (props: RenderElementProps) => (
  <pre {...props.attributes}>
    <code>{props.children}</code>
  </pre>
);

const ListElement = (props: RenderElementProps) => (
  <ul {...props.attributes}>{props.children}</ul>
);

const ListItem = (props: RenderElementProps) => (
  <li {...props.attributes}>{props.children}</li>
);

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export const renderElement = (props: RenderElementProps) => {
  switch (props.element.type) {
    case "code":
      return <CodeElement {...props} />;
    case "list":
      return <ListElement {...props} />;
    case "list-item":
      return <ListItem {...props} />;
    case "heading":
      return <HeaderElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};
