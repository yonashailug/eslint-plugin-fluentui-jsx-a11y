// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/counter-badge-needs-count";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("counter-badge-needs-count", rule as unknown as Rule.RuleModule, {
    valid: [
        `<CounterBadge count={5} appearance="filled" />`,
        `<CounterBadge icon={<PasteIcon aria-label="paste" />} count={1} />`,
        `<CounterBadge dot />`,
        `<CounterBadge>5</CounterBadge>`,
        `<div><CounterBadge count={10} appearance="filled" /></div>`
    ],

    invalid: [
        {
            code: `<CounterBadge appearance="filled" size="extra-large" />`,
            errors: [{ messageId: "counterBadgeNeedsCount" }],
            output: `<CounterBadge count={0} appearance="filled" size="extra-large" />`
        },
        {
            code: `<CounterBadge icon={<PasteIcon />} />`,
            errors: [
                {
                    messageId: "counterBadgeIconNeedsLabelling"
                },
                { messageId: "counterBadgeNeedsCount" }
            ],
            output: `<CounterBadge count={0} icon={<PasteIcon aria-label="" />} />`
        },
        {
            code: `<CounterBadge></CounterBadge>`,
            errors: [{ messageId: "counterBadgeNeedsCount" }],
            output: `<CounterBadge count={0}></CounterBadge>`
        }
    ]
});
