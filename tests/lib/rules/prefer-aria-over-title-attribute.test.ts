// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/prefer-aria-over-title-attribute";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("prefer-aria-over-title-attribute", rule as unknown as Rule.RuleModule, {
    valid: [
        // give me some code that won't trigger a warning
        '<Button title="hello" icon={<CloseIcon />} aria-label="Close" />',
        '<Button title="hello" icon={<CloseIcon />} aria-label="Close"></Button>',
        '<Button title="hello">Example</Button>',
        "<Button icon={<CloseIcon />}>Close</Button>",
        "<Image />",
        '<Datepicker daysToSelectInDayView={0} popup="Compress program" />',
        '<Tooltip content="With calendar icon only" relationship="label"><Button title="hello" icon={<CalendarMonthRegular />} /></Tooltip>',
        '<Tooltip content="With calendar icon only" relationship="label"><ToggleButton title="hello" icon={<CalendarMonthRegular />} /></Tooltip>',
        '<Tooltip content="icon" relationship="label"><CompoundButton title="hello" icon={<CalendarMonthRegular />} /></Tooltip>',
        '<><Label id="label-id-4">Close</Label><Button title="hello" icon={<CloseIcon />} aria-labelledby="label-id-4"></Button></>',
        '<><Label id="label-id-4">Close</Label><Button title="hello" icon={<CloseIcon />} aria-labelledby="label-id-4" /></>'
    ],

    invalid: [
        {
            code: '<Button icon={<CloseIcon />} title="hello"></Button>',
            errors: [{ messageId: "preferAria" }],
            output: '<Button icon={<CloseIcon />} title="hello" aria-label="hello"></Button>'
        }
    ]
});
