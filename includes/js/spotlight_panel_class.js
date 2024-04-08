
/* this is the default namespace for all bp app objects. 
any utilities can be added to the bp app namespace. */ 
var bpApp = 
{
	/* this will extend an object and return the extedned 
	object or false.  
	@param (object) sourceObj = the original object 
	@param (object) targetObj = the target object */ 
	extendObject: function(sourceObj, targetObj) 
	{ 
		if(typeof sourceObj === 'object' && typeof targetObj === 'object') 
		{ 
			for(var property in sourceObj) 
			{ 
				if(sourceObj.hasOwnProperty(property) && typeof targetObj[property] === 'undefined') 
				{ 
					targetObj[property] = sourceObj[property]; 
				} 
			} 
			return targetObj; 
		} 
		return false; 
	}, 
	
	/* this will extend an object by creating a clone object and 
	returning the new object with the added object or false. 
	@param (mixed) sourceClass = the original (class function 
	constructor or class prototype) unextended 
	@param (mixed) addingClass = the (class function constructor
	or class prototype) to add to the original */ 
	extendClass: function(sourceClass, targetClass) 
	{ 
		/* if we are using a class constructor function 
		we want to get the class prototype object */  
		var source = (typeof sourceClass === 'function')? sourceClass.prototype : sourceClass, 
		target = (typeof targetClass === 'function')? targetClass.prototype : targetClass;			
		
		if(typeof source === 'object' && typeof target === 'object') 
		{ 
			/* we want to create a new object and add the source 
			prototype to the new object */ 
			var obj = this.createObject(source); 
			
			/* we need to add any settings from the source that 
			are not on the prototype */ 
			this.extendObject(source, obj); 
			
			/* we want to add any additional properties from the 
			target class to the new object */ 
			for(var prop in target) 
			{ 
				if(target.hasOwnProperty(prop) && typeof obj[prop] === 'undefined') 
				{ 
					obj[prop] = target[prop]; 
				} 
			} 
			return obj; 
		} 
		return false; 
	}, 
	
	/* this will return a new object and extend it if an object it supplied. 
	@param [(object)] object = the extending object 
	@return (object) this will return a new object with the 
	inherited object */ 
	createObject: function(object) 
	{ 
		if(typeof Object.create !== 'function') 
		{ 
			var obj = function(){}; 
			obj.prototype = object;
			return new obj(); 
		} 
		else 
		{ 
			return Object.create(object); 
		} 
	}, 
	
	/* this will bind the method to an object to return 
	the bound method. 
	@param (object) obj = the object to bind the method 
	@param (function) method = the method to bind 
	@return a bound method or false on error */ 
	createCallBack: function(obj, method, argArray) 
	{ 
		if(typeof method === 'function') 
		{ 
			argArray = argArray || []; 
			return function() 
			{ 
				return method.apply(obj, argArray); 
			}; 
		} 
		else 
		{ 
			return false; 
		}
	}
	
}; 

/* this add a module to the bp app object that will 
allow html elements to be build easily. */ 
bpApp.htmlBuilder = function(){}; 

bpApp.htmlBuilder.prototype = 
{ 
	constructor: bpApp.htmlBuilder, 
	
	/* this will create an html element by nodeType, add to 
	the specified parent container and return the new 
	element. 
	@param (string) nodeType = the element node type name
	@param (object) attrObject = the node attributes to add 
	to the element. 
	@param (mixed) container = the parent container element 
	or id 
	@param (bool) prepend = this will add the element 
	to the begining of theparent */
	create: function(nodeName, attrObject, container, prepend)
	{ 
		var filterProperty = function(prop) 
		{ 
			switch(prop) 
			{ 
				case 'class': 
					prop = 'className'; 
					break; 
			} 
			
			return prop; 
		}; 
		
		/* this will return the property without the on prefix */ 
		var removePrefix = function(prop) 
		{ 
			if(typeof prop !== 'undefined') 
			{ 
				if(prop.substring(0, 2) === 'on') 
				{ 
					prop = prop.substring(2);   
				}  
			} 
			return prop; 
		};
		  
		var obj = document.createElement(nodeName);
		
		/* we want to check if we have attrributes to add */ 
		if(typeof attrObject === 'object') 
		{ 
			/* we want to add each attr to the obj */ 
			for(var prop in attrObject) 
			{   
				var propName = filterProperty(prop); 
				
				/* we want to check to add the attr settings
				 by property name */  
				if(prop === 'innerHTML') 
				{ 
					/* we need to check if we are adding inner 
					html content */
					obj.innerHTML = attrObject[prop]; 
				} 
				else if(prop.substring(0, 5) === 'data-') 
				{ 
					jQuery(obj).data(prop, attrObject[prop]); 
				}
				else 
				{ 
					/* we want to add the new attr as a named array 
					because this allows dynamic event attr and 
					normal attr */ 
					if(typeof attrObject[prop] !== 'undefined' && attrObject[prop] != '') 
					{ 
						/* we want to check to add a value or amn event listener */ 
						if(typeof attrObject[prop] === 'function') 
						{ 
							propName = removePrefix(propName); 
							jQuery(obj).on(propName, attrObject[prop]); 
						} 
						else 
						{ 
							obj[propName] = attrObject[prop]; 
						}
					}  
				}
			}
		}
		
		try
		{ 
			/* we want to check if the new element should be 
			added to the begining or end */ 
			if(prepend == true) 
			{ 
				this.prepend(container, obj); 
			} 
			else 
			{ 
				this.append(container, obj); 
			} 
		} 
		catch(e) 
		{ 
			console.log(obj);
			//this.error(e, obj); 
		} 
		
		return obj;  
	
	}, 
	
	append: function(parent, child) 
	{ 
		if(typeof parent === "undefined") 
		{ 
			parent = document.body; 
		} 
		else if(typeof parent === 'string') 
		{    
			parent = document.getElementById(parent); 
		} 
		 
		if(typeof parent === 'object') 
		{ 
			parent.appendChild(child); 
		}
	},  
	
	prepend: function(parent, child) 
	{ 
		if(typeof parent === "undefined") 
		{ 
			parent = document.body; 
		} 
		else if(typeof parent === 'string') 
		{ 
			parent = document.getElementById(parent);  
		} 
	 
	 	if(typeof parent === 'object') 
		{ 
			parent.insertBefore(child, parent.firstChild); 
		}	 
	},
	
	/* create an html object */
	createObject: function(object, id, tmpClass, text, container, prepend)
	{ 
		var attr = { id: id, 'className': tmpClass, innerHTML: text };  
		
		var obj = this.create(object, attr, container, prepend); 
		return obj;   
	}, 
	
	/* this will create an html element by type and 
	add an onclick to the callback function */ 
	createButton: function(type,id,tmpClass,text,callBackFn,container,prepend)
	{ 
		var attr = { id: id, 'className': tmpClass, innerHTML: text };  
		
		if(typeof callBackFn === 'function') 
		{ 
			attr.onclick = callBackFn; 
		}
		
		var obj = this.create(type, attr, container, prepend); 
		return obj; 
	},  
	
	/* this will create a link */ 
	createLink: function(type,id,tmpClass,text,url,container,prepend)
	{ 
		var attr = { id: id, 'className': tmpClass, innerHTML: text };  
		
		if(url !== null) 
		{ 
			attr.href = url; 
		}
		
		var obj = this.create(type, attr, container, prepend); 
		return obj; 
	}, 
	
	createIframe: function(id, className, src, container, prepend)
	{ 
		var attr = { id: id, 'className': className };  
		
		if(typeof src !== 'undefined') 
		{ 
			attr.src = src; 
		} 
		
		attr.width = '100%'; 
		attr.height = '100%';   
		attr.frameBorder = "0"; 
		
		return this.create('iframe', attr, container, prepend);   
	}, 
	
	/* this will create an image */ 
	createImage: function(id, tmpClass, src, alt, container, prepend)
	{ 
		var attr = { id: id, 'className': tmpClass };  
		
		if(typeof alt !== 'undefined') 
		{ 
			attr.alt = alt; 
		} 
		
		if(typeof src !== 'undefined') 
		{ 
			attr.src = src; 
		} 
		
		var obj = this.create('img', attr, container, prepend); 
		return obj;   
	} 
}; 

/* this is a helper fuction to remove a class and hide 
an element. 
@param (object) obj = the element to hide 
@param (string) animationClass = the css class name */ 
var removeClassAndHide = function(obj, animationClass)
{  
	obj.style.display = 'none'; 
	removeAnimationClass(obj, animationClass); 
}; 

/* this is a helper fuction to remove an animation 
class after it has been animated.  
@param (object) obj = the element object 
@param (string) animationClass = the css class name */
var removeAnimationClass = function(obj, animationClass)
{ 
	jQuery(obj).removeClass(animationClass); 
	bpApp.animate.animating.remove(obj);   
};

/* this will add and remove css animations */ 
bpApp.animate = { 
	
	/* this class tracks all objects being animated and can 
	add and remove them when completed */  
	animating: 
	{ 
		objects: [],  
		add: function(object, className, timer) 
		{ 
			this.stopPreviousAnimations(object); 
			this.addObject(object, className, timer);  
		}, 
		
		addObject: function(object, className, timer) 
		{ 
			if(object) 
			{ 
				var animation = { 
					object: object, 
					className: className, 
					timer: timer 
				}; 
				
				this.objects.push(animation); 
			} 
		}, 
		
		remove: function(object) 
		{ 
			/* we need to get the object index to 
			know which timer to remove */
			var objectIndex = this.removeObject(object);  
		}, 
		
		removeObject: function(object, removeClass) 
		{ 
			if(object) 
			{ 
				var animating = this.checkAnimating(object); 
				if(animating !== false) 
				{ 
					var animations = animating; 
					for(var i = 0, maxLength = animations.length; i < maxLength; i++) 
					{ 
						var animation = animations[i]; 
						
						/* we want to stop the timer */ 
						this.stopTimer(animation); 
						
						if(removeClass) 
						{ 
							/* we want to remove the className */ 
							jQuery(animation.object).removeClass(animation.className); 
						}
						
						/* we want to remove the animation fron the object array */ 
						var indexNumber = jQuery.inArray(animation, this.objects);
						if(indexNumber >= 0) 
						{ 
							this.objects.splice(indexNumber, 1); 
						}
					}
				}  
			} 
		}, 
		
		stopTimer: function(animation) 
		{ 
			if(animation) 
			{ 
				var timer = animation.timer; 
				window.clearTimeout(timer); 
			}
		}, 
		
		checkAnimating: function(obj) 
		{ 
			var animationArray = []; 
			
			/* we want to get any timers set for our object */ 
			for(var i = 0, maxLength = this.objects.length; i < maxLength; i++) 
			{ 
				 var animation = this.objects[i]; 
				 if(animation.object === obj) 
				 { 
					animationArray.push(animation); 
				 } 
			} 
			
			return (animationArray.length >= 1)? animationArray : false;  
		}, 
		
		stopPreviousAnimations: function(obj) 
		{ 
			/* we want to remove the timers and class names 
			from the object */ 
			this.removeObject(obj, 1);   
		}, 
		
		reset: function() 
		{ 
			this.objects = [];   
		}
	}, 
	
	setupSelectingObject: function(object) 
	{ 
		return (typeof object === 'string')? document.getElementById(object) : object;
	}, 
	
	/* this will perform an animation on the object and 
	then turn the object to display none after the 
	duration */  
	hide: function(object, animationClass, duration)
	{ 
		var obj = this.setupSelectingObject(object);
		 
		jQuery(obj).addClass(animationClass);    
		
		var callBack = bpApp.createCallBack(null, removeClassAndHide, [obj, animationClass]); 
		
		var timer = window.setTimeout(callBack, duration); 
		this.animating.add(obj, animationClass, timer); 
	}, 
	
	/* this will dsiplay the object then perform an animation 
	on the object and remove the class after the duration */ 
	show: function(object, animationClass, duration)
	{ 
		var obj = this.setupSelectingObject(object); 
		
		jQuery(obj).addClass(animationClass); 
		obj.style.display = 'block'; 
		
		var callBack = bpApp.createCallBack(null, removeAnimationClass, [obj, animationClass]);
		
		var timer = window.setTimeout(callBack, duration); 
		this.animating.add(obj, animationClass, timer); 
	},  
	
	/* this will add an animation class on the object then 
	it will remove the class when the duration is done */ 
	set: function(object, animationClass, duration)
	{ 
		var obj = this.setupSelectingObject(object);  
		
		jQuery(obj).addClass(animationClass);  
		
		var callBack = bpApp.createCallBack(null, removeAnimationClass, [obj, animationClass]);
		
		var timer = window.setTimeout(callBack, duration); 
		this.animating.add(obj, animationClass, timer); 
	} 
};

/* 
	slideShow 
	
	this creates a spotlight panel that will build each 
	spotlight with all the spotlight option settings. 
	
	@param (mixed) container = the parent element or 
	id to contain the new slideshow
	@param [(string)] defaultPathUrl = the default url of 
	the slide images 
	@param [(bool)] setAsBg = true will set the images as a bg 
	in the slide 
*/
bpApp.slideShow = function(container, defaultPathUrl, setAsBg, startNumber) 
{ 
	/* we want to be able to build spotlight panels in 
	the same system so we need to give each instance 
	a unique id */
	this.number = (typeof bpApp.slideShow.number === 'undefined')? bpApp.slideShow.number = 0 : (++bpApp.slideShow.number);
	this.id = 'bp_spotlight_' + this.number; 
	
	this.defaultPathUrl = (defaultPathUrl)? defaultPathUrl : '/slideshow/'; 
	this.setAsBg = (setAsBg)? setAsBg : false; 
	
	/* this will set the slide animation 'fade' or 'left_right' */ 
	this.animationMode = 'fade'; 
	
	/* this will store all the options 
	and the last selected option */  
	this.lastSelectedOption = null; 
	this.onNumber = typeof startNumber !== 'undefined'? startNumber : null; 
	this.optionsArray = [];
	
	this.timer = null; 
	
	this.container = container; 
}; 

/* we want to inherit the bp html builder to the slideshow 
prototype to allow the slideshow to build html elements */
bpApp.slideShow.prototype = bpApp.extendClass(bpApp.htmlBuilder, 
{ 
	constructor: bpApp.slideShow, 
	
	/* this will add keyboard support to switch spotlights 
	with the arrow keys.*/
	addKeyboardSupport: function() 
	{ 
		var self = this; 
		
		jQuery(document).on('keydown', function(e){ self.keyPress(e); }); 
	}, 
	
	keyPress: function(e) 
	{ 
		var keyCode = e.keyCode; 
		switch(keyCode) 
		{ 
			case 37: 
				this.selectPreviousOption(); 
				break; 
			case 39: 
				this.selectNextOption(); 
				break; 
		}
	},
	
	/* this creates a the option panel and saves the option to the option array . 
	 @param (object) container = string: pass the id of the parent 
	 element that you want to contain the spotlight panel*/
	addOption: function(option) 
	{ 
		var number = this.optionsArray.length; 
		/* setup option settings */ 
		option.optionNumber = number; 
		option.nameId = this.id + '_option_number_' + number; 
		option.crumbId = this.id + '_crumb_number_' + number;
		option.selected = 'no';  
		
		this.optionsArray.push(option); 
		
		/* we wantto add a crumb */ 
		this.createCrumb(option);   
		
		/* add a new option to the list panel */ 
		var panel = this.createOptionPanel(option,this.container);  
	}, 
	
	/* this will reset the spotlight container */ 
	resetContainer: function() 
	{ 
		var container = document.getElementById(this.container); 
		container.innerHTML = ''; 
	}, 
	
	/* this will setup the spotlight panel with the 
	spotlight options array. 
	@param (array) optionsArray = the array of objects that 
	are to be built as spotlight option panels */ 
	setup: function(optionsArray) 
	{ 
		this.resetContainer(); 
		this.setupControlPanel(); 
		this.setupOptions(optionsArray);  
		this.addKeyboardSupport(); 
	}, 
	
	/* this will add the left and right arrows and 
	setup the crumb container */ 
	setupControlPanel: function() 
	{ 
		var self = this; 
		
		var button = this.createButton('a', '', 'arrow arrow_left', '', function(){ self.selectPreviousOption(); }, this.container); 
		
		button = this.createButton('a', '', 'arrow arrow_right', '', function(){ self.selectNextOption(); }, this.container); 
		
		var numberContainer = this.createObject('div', this.id + '_crumb_container', 'number_crumb_container', '', this.container); 
		
		var slideTab = this.createObject('div', this.id + '_slide_tab', 'slideTab', '', numberContainer); 
	}, 
		
	setupOptions: function(optionsArray) 
	{ 
		var maxLength = optionsArray.length; 
		if(maxLength > 0) 
		{ 			
			var tmpNumber = 0; 
			
			/* create the option array and setup the options */ 
			for(var i = 0; i < maxLength; i++) 
			{ 
				var tmpOption = optionsArray[i]; 
				this.addOption(tmpOption);   
			} 
		} 
		
		this.selectNewPanel(); 
	}, 
	
	createOptionPanel: function(tmpOption, container) 
	{ 
		/* we wantt o add a link around the spotlight 
		if the option has a url */ 
		if(tmpOption && tmpOption.url) 
		{ 
			container = this.createLink('a','','','',tmpOption.url,container); 
		} 
		
		var spotlightContainer = this.createObject('div', tmpOption.nameId, 'splash_container', '', container); 
 
		//spotlightContainer.onmouseover = bpApp.createCallBack(this, this.stopTimer); 
		//spotlightContainer.onmouseout = bpApp.createCallBack(this, this.startTimer); 
		spotlightContainer.style.display = 'none'; 
		
		var imageURL = tmpOption.image; 
		
		if(this.setAsBg == true)
		{
			if(imageURL)
			{
				spotlightContainer.style.backgroundImage = 'url(' + wpThemeUrl + this.defaultPathUrl + imageURL + ')';
			}
		}
		else
		{
			if(imageURL) 
			{ 
				var imageContainer = this.createObject('div','','image_container','',spotlightContainer); 
				var image = this.createImage('','',wpThemeUrl + this.defaultPathUrl + imageURL,tmpOption.alt,imageContainer); 
			} 
		}
		
		var articleContainer = this.createObject('article', '', 'content_container ' + tmpOption.className, '', spotlightContainer); 
		
		var animation = this.getAnimation(); 
		
		var sectionContainer = this.createObject('section', '', 'spotlight dark ' + animation, '', articleContainer);
		
		var h2 = this.createObject('h2', '', 'title_text blue', tmpOption.title, sectionContainer);  
		
		var text = this.createObject('div', '', 'light', tmpOption.content, sectionContainer);  
 
	}, 	
	
	getAnimation: function() 
	{ 
		var animations = ['pullLeftIn','pullRightIn']; 
		
		var animationNumber = Math.round(Math.random() * (animations.length - 1)); 
		
		return animations[animationNumber]; 
	}, 
	
	createCrumb: function(tmpOption) 
	{ 
		var self = this; 
		var crumbContainer = this.id + '_crumb_container'; 
		
		var optionClass = this.getCrumbClass(tmpOption);  
		
		var option = this.createButton('div', tmpOption.crumbId, optionClass, tmpOption.crumbContent, function(){ self.selectOption(tmpOption); }, crumbContainer); 
	}, 
	
	getCrumbClass: function(tmpOption) 
	{ 
		if(tmpOption.selected === 'yes') 
		{ 
			return 'option selected'; 
		} 
		else 
		{ 
			return 'option'; 
		} 
	}, 
	
	selectNewPanel: function()
	{ 
		//if the current number is > canvas number 
		if(this.onNumber < (this.optionsArray.length - 1) && this.onNumber != null) 
		{ 
			this.onNumber++; 
		} 
		else 
		{ 
			this.onNumber = 0; 
		} 
		
		this.selectOptionByNumber(this.onNumber); 
	}, 
	
	/* this will get the panel animation class for the 
	panel being selected and the panel being removed */ 
	getPanelClass: function(lastNum, currentNum) 
	{ 
		var animation = { 
			selecting: 'same', 
			removing: '' 
		}; 
		
		var mode = this.animationMode || 'fade'; 
		
		if(mode === 'left_right') 
		{ 
			if(currentNum > lastNum) 
			{ 
				animation.removing = 'pullLeft'; 
				animation.selecting = 'pullRightIn';
			} 
			else if(currentNum < lastNum) 
			{ 
				animation.removing = 'pullRight'; 
				animation.selecting = 'pullLeftIn';
			}  
		} 
		else 
		{ 
			animation.removing = 'fadeOut'; 
			animation.selecting = 'fadeIn'; 
		} 
		
		return animation; 
	}, 
	
	getPanelAnimations: function() 
	{ 
		/* we needto get the panel number to get the 
		selecting animation class */ 
		var selection = this.getSelectedOption();
		var panelNumber = selection.optionNumber; 
		var lastPanelNumber = (typeof this.lastSelectedOption !== 'undefined')? jQuery.inArray(this.lastSelectedOption, this.optionsArray): 0; 
		return this.getPanelClass(lastPanelNumber, panelNumber); 
	}, 
	
	/* this will select the panel */ 
	selectPanel: function(tmpOption) 
	{ 
		/* we needto get the panel number to get the 
		selecting animation class */  
		var animations = this.getPanelAnimations(); 
		
		/* we need to get the selected panel and remove 
		any previously selected panels */ 
		for(var i = 0, maxLength = this.optionsArray.length; i < maxLength; i++) 
		{ 
			var option = this.optionsArray[i], 
			nameId = option.nameId, 
			panel = document.getElementById(nameId); 
			
			if(panel) 
			{ 
				/* we need to check if the panel is the selected panel */ 
				if(tmpOption.nameId === nameId) 
				{ 
					panel.style.zIndex = 2; 
					panel.style.position = (this.setAsBg === true)? 'absolute' : 'relative'; 
	 
					// setup select animation    
					bpApp.animate.show(panel, animations.selecting, 1000); 
				} 
				else 
				{ 
					/* we need to check if the panel is diaplyed */ 
					if(this.lastSelectedOption && this.lastSelectedOption.nameId === nameId) 
					{ 
						panel.style.zIndex = 1; 
						panel.style.position = 'absolute'; 
						panel.style.top = '0px'; 
	 
						// setup remove animation
						bpApp.animate.hide(panel, animations.removing, 1000); 
					} 
				} 
			}
			
			var crumbId = option.crumbId; 
			if(typeof crumbId !== 'undefined') 
			{ 
				/* we want to get the crumb class name */ 
				var crumbClass = this.getCrumbClass(option), 
				crumb = document.getElementById(crumbId); 
				if(crumb) 
				{ 
					crumb.className = crumbClass; 
				}
			} 
		} 
	},
	
	/* we can use the get and select next options to 
	move through the list 
	@return (object) the next option to select */
	getNextOption: function() 
	{ 
		/* we want to get the last option and setup the next option 
		number be incremeneting the last option number */ 
		var lastSelectedOption = (this.lastSelectedOption !== null)? this.lastSelectedOption.optionNumber : 0; 
		var nextOptionNumber = ++lastSelectedOption; 

		/* we need to check if we are at the end of the list */ 
		if(nextOptionNumber < this.optionsArray.length) 
		{ 
			/* return next option */ 
			return this.optionsArray[nextOptionNumber]; 
		} 
		else 
		{ 
			return this.optionsArray[0];  
		} 
	},  
	
	/* this will select the next option */ 
	selectNextOption: function() 
	{ 
		var nextOption = this.getNextOption(); 
		if(nextOption) 
		{ 
			this.selectOption(nextOption); 
		} 
	},  
	
	/* we can use the get and select previous options to 
	move in reverse through the list 
	@return (object) the previous option to select */  
	getPreviousOption: function() 
	{ 
		/* we want to get the last option and setup the previous option 
		number be decremeneting the last option number */ 
		var lastSelectedOption = (this.lastSelectedOption !== null)? this.lastSelectedOption.optionNumber : 0; 
		var previousOptionNumber = --lastSelectedOption; 
		
		/* we need to check if we have reached the begining of the list */ 
		if(previousOptionNumber >= 0) 
		{ 
			/* return next option */
			return this.optionsArray[previousOptionNumber]; 
		} 
		else 
		{ 
			return this.optionsArray[(this.optionsArray.length - 1)]; 
		} 
	},  
	
	/* this will select the previous option */ 
	selectPreviousOption: function() 
	{ 
		var previousOption = this.getPreviousOption(); 
		if(previousOption) 
		{ 
			this.selectOption(previousOption); 
		} 
	}, 
	
	/* this will save the last selected option */ 
	setLastSelectedOption: function(option) 
	{ 
		this.lastSelectedOption = option; 
	},
	
	unselectOption: function(tmpOption) 
	{ 
		for(var j = 0, maxLength = this.optionsArray.length; j < maxLength; j++) 
		{ 
			var option = this.optionsArray[j]; 
			/* if the option is not the last selected option */ 
			if(option !== tmpOption) 
			{ 
				/* unselect any option that is selected */ 
				if(option.selected === 'yes') 
				{ 
					option.selected = 'no';  
				} 
			} 
		} 
	},
	
	moveSlideTab: function(e)
	{
		var offset = jQuery(e).position();
		var slideTab = jQuery('#' + this.id + '_slide_tab').css('left', offset.left + 'px');
	},
	
	selectOption: function(tmpOption)
	{ 
		/* stop any timers*/ 
		this.stopTimer(); 
		
		var object = document.getElementById(tmpOption.nameId);  
		
		var slideTab = document.getElementById(tmpOption.crumbId);
		if(slideTab)
		{
			this.moveSlideTab(slideTab);
		}
		
		if(tmpOption.selected === 'no') 
		{  
			tmpOption.selected = 'yes';  
			this.onNumber = jQuery.inArray(tmpOption, this.optionsArray);  
		} 
		else 
		{  
			tmpOption.selected = 'no'; 
		}  
		
		this.unselectOption(tmpOption);  
		this.selectPanel(tmpOption); 
		
		/* we want to save the last selected option */ 
		this.setLastSelectedOption(tmpOption); 
		
		this.startTimer();  
	},
	
	selectOptionByNumber: function(number) 
	{ 
		for(var i = 0, maxLength = this.optionsArray.length; i < maxLength; i++) 
		{ 
			if(i == number) 
			{ 
				var tmpOption = this.optionsArray[i]; 
				var selection = tmpOption;  
			}  
		}  
	
		if(selection) 
		{ 
			this.selectOption(selection); 
		} 
	},
	
	getSelectedOption: function() 
	{ 
		for(var j = 0, maxLength = this.optionsArray.length; j < maxLength; j++) 
		{ 
			var option = this.optionsArray[j]; 
			if(option.selected === 'yes') 
			{ 
				return option;  
			} 
		} 
		
		return false; 
	},
	
	startTimer: function()
	{ 
		var self = this; 
		
		this.stopTimer(); 
		this.timer = window.setTimeout(function(){ self.selectNewPanel(); }, 7000); 
	},  
	
	stopTimer: function()
	{ 
		window.clearTimeout(this.timer);  
	}
}); 

/* we want to make an alias to the new slideshow object 
to allow older systems to use the new slideshow object */  
var spotlightPanel = bpApp.slideShow; 

bpApp.videoPanel = function(video, callbackFunction, container)
{ 
	this.number = (typeof bpApp.videoPanel.number === 'undefined')? bpApp.videoPanel.number = 0 : (++bpApp.videoPanel.number);
	this.id = 'video_panel_' + this.number;     
	
	this.video = video;     
	this.callbackFunction = callbackFunction;     
	
	this.container = container; 
}; 

bpApp.videoPanel.prototype = bpApp.extendClass( bpApp.htmlBuilder, 
{ 
	constructor: bpApp.videoPanel, 
	
	remove: function()
	{ 
		var panel = document.getElementById(this.id); 
		if(panel) 
		{ 
			panel.parentNode.removeChild(panel); 
		} 
		
		panel = document.getElementById(this.id + '_shadow'); 
		if(panel) 
		{ 
			panel.parentNode.removeChild(panel); 
		} 
	}, 
	
	createPanel: function() 
	{ 
		var panel = this.createObject('div', this.id, 'panel video-panel slideIn', '', this.container); 
		
		var title = this.createObject('div', this.id + '_title_container', 'title-container', '', this.id); 
		
		var titleLabel = this.createObject('h1', '', 'title title-text left dark', this.video.title, title);  
		
		var container = this.createObject('div', '', 'body-container', '', this.id);  
		
		var self = this;
		window.setTimeout(function(){ self.createIframe(self.id + '_iframe', '', self.video.source, container); }, 500);   
		
		var buttons = this.createObject('div', this.id + '_button_container', 'button-container', '', this.id); 
		
		var button1 = this.createButton('button', this.id + '_button_1', 'bttn bttn-decline', 'Close', function(){ self.decline(); }, buttons);   
		
	},   		       
	
	setup: function()
	{ 
		this.createPanel();     
	},  
	
	decline: function()
	{    
		this.display(); 
	}, 
	
	display: function()
	{   
		this.toggleDisplay();  	
	}, 
	
	createShadow: function() 
	{ 
		var self = this; 
		var backdrop = this.createButton('div', this.id + '_shadow','panel-shadow video-shadow fadeIn','', function(){ self.decline(); }, document.body); 
		this.createButton('button', '', 'bttn top close',  '<span></span><span></span>', '', backdrop); 
	}, 
	
	toggleMode: null, 
	
	toggleDisplay: function() 
	{ 
		var obj = document.getElementById(this.id);  
		
		if(!obj.style.display || obj.style.display === 'none')
		{  
			obj.style.display = 'block'; 
			this.toggleMode = 'block';   
			this.createShadow();   
		}
		else
		{ 
			obj.style.display = 'none'; 
			this.toggleMode = 'none';
			this.remove(); 
		} 
	} 	
});