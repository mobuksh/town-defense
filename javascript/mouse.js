/**
 * Created by mobuksh on 11/10/15.
 */

var Mouse = function() {
    var self = this;

    window.addEventListener('mousedown', function(evt) { self.onMouseDown(evt); }, false);
    window.addEventListener('mouseup', function(evt) { self.onMouseUp(evt); }, false);
    window.addEventListener('mousover', function(evt) { self.onMouseOver(evt); }, false);
    window.addEventListener('mouseout', function(evt) { self.onMouseOut(evt); }, false);

    this.mouseListeners = new Array();

    this.mouse = new Array();

    // MOUSE EVENTS
    // Go here for a list of mouse events: http://www.w3schools.com/jsref/dom_obj_event.asp
    // onclick 	The event occurs when the user clicks on an element 	2
    // oncontextmenu 	The event occurs when the user right-clicks on an element to open a context menu 	3
    // ondblclick 	The event occurs when the user double-clicks on an element 	2
    // onmousedown 	The event occurs when the user presses a mouse button over an element 	2
    // onmouseenter 	The event occurs when the pointer is moved onto an element 	2
    // onmouseleave 	The event occurs when the pointer is moved out of an element 	2
    // onmousemove 	The event occurs when the pointer is moving while it is over an element 	2
    // onmouseover 	The event occurs when the pointer is moved onto an element, or onto one of its children 	2
    // onmouseout 	The event occurs when a user moves the mouse pointer out of an element, or out of one of its children 	2
    // onmouseup 	The event occurs when a user releases a mouse button over an element 	2

    // mouse constants
    //this.KEY_SPACE = 32;

};

Mouse.prototype.onMouseDown = function(evt)
{
    //this.keys[evt.keyCode] = true;
};

Mouse.prototype.onMouseUp = function(evt)
{
    //this.keys[evt.keyCode] = false;
};
Mouse.prototype.onMouseOver = function(evt)
{
    //this.keys[evt.keyCode] = false;
};
Mouse.prototype.onMouseOut = function(evt)
{
    //this.keys[evt.keyCode] = false;
};

//Mouse.prototype.isKeyDown = function(keyCode)
//{
    //return this.keys[keyCode];
//};