import { TSESTree } from "@typescript-eslint/utils";
declare const rule: import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<"noUnlabelledCheckbox", [], {
    JSXOpeningElement(node: TSESTree.JSXOpeningElement): void;
}>;
export default rule;