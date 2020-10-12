## What is this

A simple calculator class constructor with function in js

## Instalation

Run `npm i alhasandev-calculator`

## HTML

`<div class="calculator-wrapper"></div>`

## JavaScript:

```
import Calculator from 'alhasandev-calculator'

// Init calculator object
const calculator = new Calculator()

// Render calculator on a html element
calculator.renderTo(".calculator-wrapper");

// Init controls event
calculator.initControlsEvent();

```

## Parameters contructor

Calculator constructor accepts two parameters, `_id` (optional) and `initEvent` (optional).

By default, `_id` is undefined and will be given random characters and `initEvent` set to false.

## Parameters of method renderTo

calculator method renderTo accepts one required parameter, `identifier` (query selector string format).
