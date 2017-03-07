---
layout: page
title: Spec
---

## File Format

**Universal Tape** is transferred via Comma-separated values (CSV) format.  This is due to tape data traditionally being shared in a spreadsheet-like format, and the fact that CSV's are a common format that can easily be imported/exported.

---

## How the file is parsed

Parsing of the file happens one row at a time, from top to bottom. The top row is the **definition row** _(the row of **keys** that define the data in the upcoming rows)_. All remaining rows count as one record per row.  So, a Universal Tape CSV file with 10 rows, should contain 9 records (the first row being the definition row, and the following 9 rows being record items).

---

<h2 id="key-normalization">Key Normalization</h2>

The **key** _(column title)_ is normalized _(converted to a common format)_ before interpretation. This allows **Universal Tape** to be flexible with things like letter casing, etc. The formula for normalizing the key is:

1. **Lowercase** the key
2. **Replace** _"&" with _"and"_
3. **Replace** _"%" with _"percent"_
4. **Replace** _" " (space)_ and _"-" (dash)_ characters with _"\_" (underscore)_
5. **Remove** all _non-alphanumeric_ characters (except for _underscore_)

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
        <tr id="type-decimal">
            <td><code>decimal</code></td>
            <td>A decimal value. This can be a <a href="#type-number">number</a>, decimal or percentage value.  If your value is a percentage, then you must have a `%` symbol. So if your input is `.125` or `12.5%`, they will both equal the same value.</td>
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

Below are the **keys** that **Universal Tape** recognizes.  It should be said that a tape will most likely **not** contain all of these keys.  Also, a tape might contain proprietary data that is not part of the **Universal Tape** spec. If there is a certain key that you would like to see added to the spec, please fill out an [issue](https://github.com/UniversalTape/universaltape.org/issues) on our Github page.

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
            <td><code>borrower_state</code></td>
            <td><a href="#type-state">state</a></td>
            <td><em>(For US addresses only)</em> 2-character state code for the borrower's home address.</td>
        </tr>
        <tr>
            <td><code>borrower_zip</code></td>
            <td><a href="#type-zip">zip</a></td>
            <td><em>(For US addresses only)</em>. 5-digit US zip code for the borrower's home address.</td>
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
            <td><code>property_state</code></td>
            <td><a href="#type-state">state</a></td>
            <td><em>(For US addresses only)</em> 2-character state code for the property.</td>
        </tr>
        <tr>
            <td><code>property_zip</code></td>
            <td><a href="#type-zip">zip</a></td>
            <td><em>(For US addresses only)</em>. 5-digit US zip code for the property.</td>
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
            <td><code>property_value</code></td>
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
            <td>Choices: <code>occupied</code>, <code>vacant</code>, <code>unknown</code>.</td>
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
            <td><code>original_balance</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td>The original balance of the loan from the origination date.</td>
        </tr>
        <tr>
            <td><code>upb</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td>Current unpaid principal balance.</td>
        </tr>
        <tr>
            <td><code>interest_rate</code></td>
            <td><a href="#type-decimal">decimal</a></td>
            <td>Current interest rate of loan.</td>
        </tr>
        <tr>
            <td><code>sold_rate</code></td>
            <td><a href="#type-decimal">decimal</a></td>
            <td>Sold rate of note if different than <code>interest_rate<code></td>
        </tr>
        <tr>
            <td><code>lien_position</code></td>
            <td><a href="#type-number">number</a></td>
            <td>This is the lien position of the subject loan.</td>
        </tr>
        <tr>
            <td><code>loan_status</code></td>
            <td><a href="#type-choice">choice</a></td>
            <td>Choices: <code>performing</code>, <code>non_performing</code></td>
        </tr>
        <tr>
            <td><code>escrow_amount</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td>Amount of monthly payment that is escrowed for taxes and insurance.</td>
        </tr>
        <tr>
            <td><code>loan_charges</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td>Current charges to the loan.</td>
        </tr>
        <tr>
            <td><code>accrued_late_charges</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td>Total late charges on the loan.</td>
        </tr>
        <tr>
            <td><code>payments_last_12_months</code></td>
            <td><a href="#type-number">number</a></td>
            <td>The amount of payments the borrower has made in the past 12 months.</td>
        </tr>
        <tr>
            <td><code>unpaid_interest</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td>Amount of unpaid interest.</td>
        </tr>
        <tr>
            <td><code>past_due_taxes</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td>Amount of taxes that are past due.</td>
        </tr>
        <tr>
            <td><code>p_and_i</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td>Principal and interest payment amount.</td>
        </tr>
        <tr>
            <td><code>total_monthly_payment</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td>Amount to be paid by borrower each month including principal, interest, taxes and insurance.</td>
        </tr>
        <tr>
            <td><code>foreclosure_started</code></td>
            <td><a href="#type-boolean">boolean</a></td>
            <td>Choices: <code>yes</code>, <code>no</code></td>
        </tr>
        <tr>
            <td><code>bankruptcy</code></td>
            <td><a href="#type-boolean">boolean</a></td>
            <td>Choices: <code>yes</code>, <code>no</code></td>
        </tr>
        <tr>
            <td><code>grace_days</code></td>
            <td><a href="#type-number">number</a></td>
            <td>Number of days of grace before late charge.</td>
        </tr>
        <tr>
            <td><code>late_charge_percent</code></td>
            <td><a href="#type-decimal">decimal</a></td>
            <td>Amount of late charge if calculated as a percentage.</td>
        </tr>
        <tr>
            <td><code>late_charge</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td>Amount of late charge if calculated as a dollar figure.</td>
        </tr>
        <tr>
            <td><code>paid_to_date</code></td>
            <td><a href="#type-date">date</a></td>
            <td>Last due date that the borrower made a payment for. </td>
        </tr>
        <tr>
            <td><code>first_pay_date</code></td>
            <td><a href="#type-date">date</a></td>
            <td>First date the borrower was required to make a payment after <code>origination_date<code></td>
        </tr>
        <tr>
            <td><code>next_pay_date</code></td>
            <td><a href="#type-date">date</a></td>
            <td>Next date that the borrower is due to make a payment.</td>
        </tr>
        <tr>
            <td><code>last_pay_date</code></td>
            <td><a href="#type-date">date</a></td>
            <td>Last date the borrower made a payment.</td>
        </tr>
        <tr>
            <td><code>maturity_date</code></td>
            <td><a href="#type-date">date</a></td>
            <td>Date the loan is set to mature.</td>
        </tr>
        <tr>
            <td><code>original_loan</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td></td>
        </tr>
        <tr>
            <td><code>total_payoff</code></td>
            <td><a href="#type-usd">usd</a></td>
            <td>The total amount due on the loan, including principal and interest, late charges, and loan charges.</td>
        </tr>
        <tr>
            <td><code>origination_date</code></td>
            <td><a href="#type-date">date</a></td>
            <td>The date the loan was originated.</td>
        </tr>
    </tbody>
</table>
