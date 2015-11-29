---
layout: page
title: Spec
---

## File Format

**Universal Tape** does not enforce a specific file format, but expects the data to be compatible with a spreadsheet-like format. The optimal file format for **Universal Tape** is `.csv`, since it is an open format that is easily parsed by many different programming languages.

---

## How the file is parsed

Parsing of the file happens one row at a time, from top to bottom. If a recognized Universal Tape **key** is found within one of the row columns _(usually the first row of the spreadsheet)_, we assume that the row is a **definition row** _(a row of **keys** that define the data in the upcoming rows)_. Once a definition row is found, we begin importing all the valid data within the columns of the **keys** recognized by the Universal Tape format.

#### Parsing FAQ

<dl>
    <dt>What if the file has multiple definition rows?</dt>
    <dd>Each time a row is parsed, it checks if it is a definition row. If so, the keys within it are recognized for all the following row data, until another definition row is detected.</dd>
    <dt>What if place my first definition row on the 5th row?</dt>
    <dd>The parser will ignore the first 4 rows, and then set the 5th row as the definition row, and begin importing valid data on the 6th row.</dd>
    <dt>What happens to the columns that don't have a Universal Tape key in the definition row?</dt>
    <dd>The data for that column is ignored.</dd>
    <dt>What if I have a row of values, and a column that is defined by a Universal Tape key, but the column contains an invalid data type, or is empty?</dt>
    <dd>The column will be ignored, when parsing that row.</dd>
</dl>

---

## Key Normalization

The **key** _(column title)_ is normalized _(convert to a common format)_ before interpretation. This allows the **Universal Tape** to allow flexibility in things like letter casing, etc. The formula for normalizing the key is:

1. **Lowercase** the key
2. **Replace** _"%"_ characters with _"percent"_
3. **Replace** _"#"_ characters with _"number"_
4. **Replace** _"&"_ characters with _"and"_
5. **Replace** _"$"_ characters with _"usd"_
6. **Replace** _"." (dot)_, _" " (space)_ and _"-" (dash)_ characters with _"\_" (underscore)_
7. **Remove** all _non-alphanumeric_ characters (except for _underscore_)

#### Interactive Example

The table below shows 3 different keys, and their normalized values. You can edit the text inputs to calculate the normalized value for a key.

<table>
    <thead>
        <tr>
            <th>Key</th>
            <th>Normalized Key</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><input type="text" style="width: 100%;" ng-model="normalizeDemo1" ng-init="normalizeDemo1 = 'Borrower Name'"></td>
            <td><code ng-bind="normalizeDemo1 | normalize"></code></td>
        </tr>
        <tr>
            <td><input type="text" style="width: 100%;" ng-model="normalizeDemo2" ng-init="normalizeDemo2 = 'U.P.B $'"></td>
            <td><code ng-bind="normalizeDemo2 | normalize"></code></td>
        </tr>
         <tr>
             <td><input type="text" style="width: 100%;" ng-model="normalizeDemo3" ng-init="normalizeDemo3 = 'u-p-b usd'"></td>
             <td><code ng-bind="normalizeDemo3 | normalize"></code></td>
         </tr>
    </tbody>
</table>

---

## Value Types

Keys expect certain **values types** _(formats)_ for each data cell. Below is a list of the various value types that are referenced in the spec.

<table>
    <thead>
        <tr>
            <th>Type</th>
            <th>Comments</th>
        </tr>
    </thead>
    <tbody style="font-size: 14px;">
        <tr id="type-string">
            <td><code>string</code></td>
            <td>Any value</td>
        </tr>
        <tr id="type-state">
            <td><code>state</code></td>
            <td>2-character alpha code representing a state <em>(example <code>FL</code> for <strong>Florida</strong>)</em>. Alpha codes are based on <a href="https://en.wikipedia.org/wiki/Federal_Information_Processing_Standard_state_code#FIPS_state_codes" target="_blank">FIPS State Codes</a>.</td>
        </tr>
        <tr id="type-country">
            <td><code>country</code></td>
            <td>2-character alpha code representing a country <em>(example <code>US</code> for <strong>United States of America</strong>)</em>. Alpha codes are based on <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements" target="_blank">ISO 3166-1 alpha-2 codes</a>.</td>
        </tr>
    </tbody>
</table>

---

#### Borrower Keys

<table>
    <thead>
        <tr>
            <th>Normalized Key</th>
            <th>Type</th>
            <th>Comments</th>
        </tr>
    </thead>
    <tbody style="font-size: 14px;">
        <tr>
            <td><code>borrower_name</code></td>
            <td><a href="#type-string">string</a></td>
            <td><strong>[REQUIRED]</strong> Borrower's full name. The row will not import if this column is invalid or <code>NULL</code> <em>(empty)</em>.</td>
        </tr>
        <tr>
            <td><code>borrower_street_address</code></td>
            <td><a href="#type-string">string</a></td>
            <td>Street address for the borrower's home address. This may optionally append the <code>borrower_street_address_2</code> value.</td>
        </tr>
        <tr>
            <td><code>borrower_street_address_2</code></td>
            <td><a href="#type-string">string</a></td>
            <td>Unit, suite #, etc for the borrower's home address.</td>
        </tr>
        <tr>
            <td><code>borrower_city</code></td>
            <td><a href="#type-string">string</a></td>
            <td>City for the borrower's home address.</td>
        </tr>
        <tr>
            <td><code>borrower_state</code></td>
            <td><a href="#type-state">state</a></td>
            <td><em>(For US addresses)</em> State for the borrower's home address.</td>
        </tr>
        <tr>
            <td><code>borrower_subdivision</code></td>
            <td><a href="#type-string">string</a></td>
            <td><em>(For non-US addresses)</em> The state/province/region for the borrower's home address.</td>
        </tr>
        <tr>
            <td><code>borrower_postal_code</code></td>
            <td><a href="#type-string">string</a></td>
            <td>The postal code for the borrower's home address.</td>
        </tr>
        <tr>
            <td><code>borrower_zip</code> <em>(alias)</em></td>
            <td><a href="#type-string">string</a></td>
            <td>This key can be used instead of the offical <code>borrower_postal_code</code></td>
        </tr>
        <tr>
            <td><code>borrower_county</code></td>
            <td><a href="#type-string">string</a></td>
            <td>County for the borrower's home address.</td>
        </tr>
        <tr>
            <td><code>borrower_country</code></td>
            <td><a href="#type-country">country</a></td>
            <td>Country for the borrower's home address.</td>
        </tr>
    </tbody>
</table>
