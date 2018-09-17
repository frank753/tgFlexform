 [comment]: <> (Home)
# tgFlexform
a [jQuery](http://jquery.com/)-plugin that creates flexible forms from HTML and handle them

create forms from your HTML-code that try to optimal use of available space. 
* adjustable to different intended purpose
* provides directly html5 form elements
* provides by easy programmable interface to other extandabled form elements like jqueryUI or jqxWidgets
* provide single data records and multi data records

### minimal requierements
* jquery 
* your form elements placed in a div-container

that's all you really need

### use
bind the plugin to the div-container that includes your form elements:
```js
// very minimalistic
$('#myDivContainer').tgFlexform();

// with options
var options={}; 
$('#myDivContainer').tgFlexform(options);

// run a method
$('#myDivContainer').tgFlexform("runme", "parameter");

// combined
var options={};
$('#myDivContainer').tgFlexform(options, "runme", "parameter");
```
### Basics
##### a little bit background
* <div> and <p> -tags devides your form in logical groups
* use the "data-tgflexform" attribute in your tag definition to infiltrate individual properties to your controls and groups
* properties are inherited to sub elements
* at first running, the plugin parse your form container and creates a div-based table depending from the detected logical groups and the element properties

### API

##### - options
- control the whole plugin, changeable during design and runtime 
 
| records | Array of Objects | `[{}, {}]` `[]` | the data-Array | 

#### - properties
handle the view and the behaviour of controls and groups, changeable only during design or with methods at runtime

#### - methods

#### - events

