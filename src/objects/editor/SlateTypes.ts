export type CustomText = { text: string; bold?: boolean; size?: number };

export type ParagraphElement = { type: "paragraph"; children: CustomText[] };
export type HeadingElement = {
  type: "heading";
  level: number;
  children: CustomText[];
};
export type CodeElement = { type: "code"; children: CustomText[] };
export type ListElement = { type: "list"; children: ListItem[] };
export type ListItem = { type: "list-item"; children: CustomText[] };

export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | CodeElement
  | ListElement
  | ListItem;
