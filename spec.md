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

<dl class="accordion">
    <dt ng-click="parsingFaq = 1" ng-class="{'active': parsingFaq == 1}">What if the file has multiple definition rows?</dt>
    <dd ng-show="parsingFaq == 1">Each time a row is parsed, it checks if it is a definition row. If so, the keys within it are recognized for all the following row data, until another definition row is detected.</dd>
    <dt ng-click="parsingFaq = 2" ng-class="{'active': parsingFaq == 2}">What if place my first definition row on the 5th row?</dt>
    <dd ng-show="parsingFaq == 2">The parser will ignore the first 4 rows, and then set the 5th row as the definition row, and begin importing valid data on the 6th row.</dd>
    <dt ng-click="parsingFaq = 3" ng-class="{'active': parsingFaq == 3}">What happens to the columns that don't have a Universal Tape key in the definition row?</dt>
    <dd ng-show="parsingFaq == 3">The data for that column is ignored.</dd>
    <dt ng-click="parsingFaq = 4" ng-class="{'active': parsingFaq == 4}">What if I have a row of values, and a column that is defined by a Universal Tape key, but the column contains an invalid data type, or is empty?</dt>
    <dd ng-show="parsingFaq == 4">The column will be ignored, when parsing that row.</dd>
    <dt ng-click="parsingFaq = 5" ng-class="{'active': parsingFaq == 5}">What happens if required data (like <code>property_street_address</code>) is missing from a row?</dd>
    <dd ng-show="parsingFaq == 5">The row will be skipped and not parsed.</dd>
    <dt ng-click="parsingFaq = 6" ng-class="{'active': parsingFaq == 6}">Do I need to include all Universal Tapes keys in my definition row?</dt>
    <dd ng-show="parsingFaq == 6">No. Only the <a href="#required-data">required data</a> keys are required.
    <dt ng-click="parsingFaq = 7" ng-class="{'active': parsingFaq == 7}">Can I use my own properietary keys that are not part of the Universal Tape spec?</dt>
    <dd ng-show="parsingFaq == 7">Yes. Applications that import/parse your tape will simply ignore that column.</dd>
</dl>

---

<h2 id="key-normalization">Key Normalization</h2>

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

<h2 id="value-types">Value Types</h2>

Keys expect certain **values types** _(formats)_ for each data cell. Below is a list of the various value types that are referenced in the spec.

<table>
    <thead>
        <tr>
            <th>Type</th>
            <th>Comments</th>
        </tr>
    </thead>
    <tbody style="font-size: 14px; vertical-align: top;">
        <tr id="type-boolean">
            <td><code>boolean</code></td>
            <td>Case-insensitive representation of <strong>Yes</strong> or <strong>No</strong>. A shorter single-letter <strong>Y</strong> or <strong>N</strong> is also acceptable.  Therefore, acceptable values for <strong>yes</strong> include: <code>y</code>, <code>Y</code>, <code>yes</code>, <code>Yes</code> and <code>YES</code>.</td>
        <tr id="type-string">
            <td><code>string</code></td>
            <td>Any value</td>
        </tr>
        <tr id="type-state">
            <td><code>state</code></td>
            <td>2-character alpha code representing a state <em>(example <code>FL</code> for <strong>Florida</strong>)</em>. Alpha codes are based on <a href="https://en.wikipedia.org/wiki/Federal_Information_Processing_Standard_state_code#FIPS_state_codes" target="_blank">FIPS State Codes</a>.</td>
        </tr>
        <tr id="type-zip">
            <td><code>zip</code></td>
            <td>5-digit zip code (US)</td>
        </tr>
        <tr id="type-country">
            <td><code>country</code></td>
            <td>2-character alpha code representing a country <em>(example <code>US</code> for <strong>United States of America</strong>)</em>. Alpha codes are based on <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements" target="_blank">ISO 3166-1 alpha-2 codes</a>.</td>
        </tr>
        <tr id="type-date">
            <td><code>date</code></td>
            <td>Date in either <code>M/D/YY</code>, or <code>YYYY-MM-DD</code> format. The date <strong>January, 23 2016</strong> could be formatted as either <code>1/23/16</code> or <code>2016-01-23</code>.</td>
        </tr>
        <tr id="type-email">
            <td><code>email</code></td>
            <td>Email address</td>
        </tr>
        <tr id="type-number">
            <td><code>number</code></td>
            <td><a href="http://dictionary.reference.com/browse/whole-number" target="_blank">Whole number</a>. Positive integer or zero. e.g. <code>0</code>, <code>1</code>, <code>2</code>, ...</td>
        </tr>
        <tr id="type-percent">
            <td><code>percent</code></td>
            <td>A percentage value. Requires <code>%</code> symbol to come immediately after the value - e.g. <code>50%</code>.</td>
        </tr>
        <tr id="type-phone">
            <td><code>phone</code></td>
            <td>A string that contains between 10-15 numeric characters.</td>
        </tr>
        <tr id="type-usd">
            <td><code>usd</code></td>
            <td>A currency format that represents United States Dollars. Smaller cents units should be represented with a decimal (e.g. <code>.50</code>, <strong>NOT</strong> <code>50¢</code>).  The dollar sign (<code>$</code>) and comma-separators (e.g. <code>1,000</code>) are optional.</td>
        </tr>
        <tr id="type-choice">
            <td><code>choice</code></td>
            <td>Requires a value from available choices for that key. If the column value is not recognized, then the value will fallback to <code>other</code>. The value is normalized, using the same formula that definition keys are <a href="#key-normalization">normalized</a> with, before interpretation.  So, <code>Original Appraisal</code> is the same as <code>original_appraisal</code>.</td>
        </tr>
    </tbody>
</table>

---

<h2 id="keys">Keys</h2>

Below are the **keys** that **Universal Tape** recognizes.  It should be said that a tape will most likely **not** contain all of these keys.  Also, a tape will contain proprietary data that is not part of the **Universal Tape** spec, and will be ignored by any applications parsing the data. If there is a certain key that you would like to see added to the spec, please fill out an [issue](https://github.com/UniversalTape/universaltape.org/issues) on our Github page.

#### Borrower Keys

<table>
    <thead>
        <tr>
            <th>Normalized Key</th>
            <th>Type</th>
            <th>Comments</th>
        </tr>
    </thead>
    <tbody style="font-size: 14px; vertical-align: top;">
        <tr>
            <td><code>borrower_name</code></td>
            <td><a href="#type-string">string</a></td>
            <td>Borrower's full name. This key is used as an alternative to outputting the first and last name individually.</td>
        </tr>
        <tr>
            <td><code>borrower_first_name</code></td>
            <td><a href="#type-string">string</a></td>
            <td>Borrower's fist name. Normally, the <code>borrower_last_name</code> key is used in combination with this key as an alternative to <code>borrower_name</code>.</td>
        </tr>
        <tr>
            <td><code>borrower_last_name</code></td>
            <td><a href="#type-string">string</a></td>
            <td>Borrower's last name. Normally, the <code>borrower_first_name</code> key is used in combination with this key as an alternative to <code>borrower_name</code>.</td>
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
            <td><code>borrower_subdivision</code></td>
            <td><a href="#type-string">string</a></td>
            <td>The state/province/region for the borrower's home address.</td>
        </tr>
        <tr>
            <td><code>borrower_state</code></td>
            <td><a href="#type-state">state</a></td>
            <td><em>(For US addresses only)</em> A more strict-type version of <code>borrower_subdivision</code> that requires a 2-character state code.</td>
        </tr>
        <tr>
            <td><code>borrower_postal_code</code></td>
            <td><a href="#type-string">string</a></td>
            <td>The postal code for the borrower's home address.</td>
        </tr>
        <tr>
            <td><code>borrower_zip</code></td>
            <td><a href="#type-zip">zip</a></td>
            <td><em>(For US addresses only)</em>. A more strict-type version of <code>borrower_postal_code</code> using a 5-digit US zip code.</td>
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
        <tr>
            <td><code>borrower_home_number</code></td>
            <td><a href="#type-phone">phone</a></td>
            <td>Borrower's home phone number.</td>
        </tr>
        <tr>
            <td><code>borrower_work_number</code></td>
            <td><a href="#type-phone">phone</a></td>
            <td>Borrower's work phone number.</td>
        </tr>
        <tr>
            <td><code>borrower_mobile_number</code></td>
            <td><a href="#type-phone">phone</a></td>
            <td>Borrower's mobile phone number.</td>
        </tr>
        <tr>
            <td><code>borrower_fax_number</code></td>
            <td><a href="#type-phone">phone</a></td>
            <td>Borrower's fax number.</td>
        </tr>
        <tr>
            <td><code>borrower_email</code></td>
            <td><a href="#type-email">email</a></td>
            <td>Borrower's email address.</td>
        </tr>
    </tbody>
</table>

#### Property Keys

<table>
    <thead>
        <tr>
            <th>Normalized Key</th>
            <th>Type</th>
            <th>Comments</th>
        </tr>
    </thead>
    <tbody style="font-size: 14px; vertical-align: top;">
        <tr>
            <td><code>property_street_address</code></td>
            <td><a href="#type-string">string</a></td>
            <td>Street address for the property. This may optionally append the <code>property_street_address_2</code> value.</td>
        </tr>
        <tr>
            <td><code>property_street_address_2</code></td>
            <td><a href="#type-string">string</a></td>
            <td>Unit, suite #, etc for the property.</td>
        </tr>
        <tr>
            <td><code>property_city</code></td>
            <td><a href="#type-string">string</a></td>
            <td>City the property resides in.</td>
        </tr>
        <tr>
            <td><code>property_subdivision</code></td>
            <td><a href="#type-string">string</a></td>
            <td>The state/province/region for the property resides in.</td>
        </tr>
        <tr>
            <td><code>property_state</code></td>
            <td><a href="#type-state">state</a></td>
            <td><em>(For US addresses only)</em> A more strict-type version of <code>property_subdivision</code> that requires a 2-character state code.</td>
        </tr>
        <tr>
            <td><code>property_postal_code</code></td>
            <td><a href="#type-string">string</a></td>
            <td>The postal code for the property.</td>
        </tr>
        <tr>
            <td><code>property_zip</code></td>
            <td><a href="#type-zip">zip</a></td>
            <td><em>(For US addresses only)</em>. A more strict-type version of <code>property_postal_code</code> using a 5-digit US zip code.</td>
        </tr>
        <tr>
            <td><code>property_county</code></td>
            <td><a href="#type-string">string</a></td>
            <td>County the property resides in.</td>
        </tr>
        <tr>
            <td><code>property_country</code></td>
            <td><a href="#type-country">country</a></td>
            <td>Country the property resides in.</td>
        </tr>
        <tr>
            <td><code>valuation_type</code></td>
            <td><a href="#type-choice">choice</a></td>
            <td>Choices: <code>original_appraisal</code>, <code>current_appraisal</code>, <code>bpo</code>, <code>avm</code>, <code>other</code>.</td>
        </tr>
        <tr>
            <td><code>property_value_usd</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td>The valuation given to the property in relation to the <code>valuation_type</code>.</td>
        </tr>
        <tr>
            <td><code>valuation_date</code></td>
            <td><a href="#type-date">date</a></td>
            <td>The date that the valuation related to the <code>valuation_type</code> was assessed.</td>
        </tr>
        <tr>
            <td><code>occupancy_status</code></td>
            <td><a href="#type-choice">choice</a></td>
            <td>Choices: <code>primary_borrower</code>, <code>vacant</code>, <code>unknown</code>,<code>other</code>.</td>
        </tr>
        <tr>
            <td><code>property_type</code></td>
            <td><a href="#type-choice">choice</a></td>
            <td>Choices: <code>single_family</code>, <code>multi_family</code>, <code>pud</code>, <code>mobile_home</code>, <code>condominium</code>, <code>other</code>.</td>
        </tr>
    </tbody>
</table>

#### Other Keys

<table>
    <thead>
        <tr>
            <th>Normalized Key</th>
            <th>Type</th>
            <th>Comments</th>
        </tr>
    </thead>
    <tbody style="font-size: 14px; vertical-align: top;">
        <tr>
            <td><code>original_balance_usd</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>u_p_b_usd</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>interest_rate_percent</code></td>
            <td><a href="#type-percent">percent</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>sold_rate_percent</code></td>
            <td><a href="#type-percent">percent</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>lien_position</code></td>
            <td><a href="#type-number">number</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>escrow_amount_usd</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>loan_charges_usd</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>accrued_late_charges_usd</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>payments_last_12_months</code></td>
            <td><a href="#type-number">number</a></td>
            <td>The amount of payments the borrower has made in the past 12 months.</td>
        </tr>
        <tr>
            <td><code>unpaid_interest_usd</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>past_due_taxes_usd</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>p_and_i_usd</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>foreclosure_started</code></td>
            <td><a href="#type-boolean">boolean</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>bankruptcy</code></td>
            <td><a href="#type-boolean">boolean</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>grace_days</code></td>
            <td><a href="#type-number">number</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>late_charge_percent</code></td>
            <td><a href="#type-percent">percent</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>late_charge_usd</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>paid_to_date</code></td>
            <td><a href="#type-date">date</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>first_pay_date</code></td>
            <td><a href="#type-date">date</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>next_pay_date</code></td>
            <td><a href="#type-date">date</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>last_pay_date</code></td>
            <td><a href="#type-date">date</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>maturity_date</code></td>
            <td><a href="#type-date">date</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>original_loan_usd</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>total_payoff_usd</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>origination_date</code></td>
            <td><a href="#type-date">date</a></td>
            <td></td>
        </tr>
    </tbody>
</table>
