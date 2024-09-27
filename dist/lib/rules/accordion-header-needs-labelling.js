"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const jsx_ast_utils_1 = require("jsx-ast-utils");
const hasNonEmptyProp_1 = require("../util/hasNonEmptyProp");
const hasTooltipParent_1 = require("../util/hasTooltipParent");
const hasTextContentChild_1 = require("../util/hasTextContentChild");
const labelUtils_1 = require("../util/labelUtils");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        messages: {
            missingAriaLabel: "Accessibility: the accordion header must have an accessible name"
        },
        type: "problem", // `problem`, `suggestion`, or `layout`
        docs: {
            description: "The accordion header is a button and it needs an accessibile name e.g. text content, aria-label, aria-labelledby.",
            recommended: false
        },
        schema: [] // Add a schema if the rule has options
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node) {
                const openingElement = node.openingElement;
                // if it is not a AccordionHeader, return
                if ((0, jsx_ast_utils_1.elementType)(openingElement) !== "AccordionHeader") {
                    return;
                }
                // if it has text content, return
                if ((0, hasTextContentChild_1.hasTextContentChild)(node)) {
                    return;
                }
                // if it is not an icon button, return
                if (!(0, jsx_ast_utils_1.hasProp)(openingElement.attributes, "icon") &&
                    !(0, jsx_ast_utils_1.hasProp)(openingElement.attributes, "expandIcon")) {
                    return;
                }
                // if it has a tooltip parent, return
                if ((0, hasTooltipParent_1.hasToolTipParent)(context)) {
                    return;
                }
                // the button has an associated label
                if ((0, labelUtils_1.hasAssociatedLabelViaAriaLabelledBy)(openingElement, context)) {
                    return;
                }
                const hasAccessibleLabelling = (0, hasNonEmptyProp_1.hasNonEmptyProp)(openingElement.attributes, "title") || (0, hasNonEmptyProp_1.hasNonEmptyProp)(openingElement.attributes, "aria-label");
                // if it has no accessible name, report error
                if (!hasAccessibleLabelling) {
                    context.report({
                        node,
                        messageId: `missingAriaLabel`
                    });
                }
            }
        };
    }
});
exports.default = rule;