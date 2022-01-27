var SmoothScroll = function(args){
	if (!args) args = {};

	var _self = this;
	
	this.ui = {
		el: document.querySelector('.js-scroll'),
		heightEl: null      
	}
	
	this.state = {
		scroll: {
			target: 0,
			current: 0,
			// ease: 0.095
			ease: 0.18
		},
		bounds: {
			scrollHeight: 0
		},
		isResizing: false
	}
   

	this.init = function(){
		this.bindAll();
		this.setInitial();
		this.setFakeHeight();
		this.addListeners();
	}

	this.bindAll = function(){
		['onScroll', 'onResize', 'render', 'consineInterpolation', 'cubicInterpolation'].forEach(function (fn) {
			return _self[fn] = _self[fn].bind(_self);
		});
	}

	this.render = function(){
		var scroll = this.state.scroll;

		//Linear interpolation
		// scroll.current += (scroll.target - scroll.current) * scroll.ease;

		//Cosine interpolation
		scroll.current = this.consineInterpolation(scroll.current, scroll.target, scroll.ease);
		
		//Cubic Interpolation
		// scroll.current = this.cubicInterpolation(scroll.current, scroll.target, scroll.ease);


		if (scroll.current < .1) scroll.current = 0;

		this.translateContainer();
	}

	// *******************************************************************
	this.consineInterpolation = function(current, target, ease) {
		var ease2 = (1 - Math.cos(ease * Math.PI)) / 2;

		return current * (1 - ease2) + target * ease2;
	}
	// *******************************************************************
	this.cubicInterpolation = function(current, target, ease) {

		var y0 = current;
		var y1 = target;
		var y2 = current + current * ease;
		var y3 = target * ease;

		var a0, a1, a2, a3, ease2;

		ease2 = ease * ease;
		a0 = y3 - y2 - y0 + y1;
		a1 = y0 - y1 - a0;
		a2 = y2 - y0;
		a3 = y1;

		return a0 * ease * ease2 + a1 * ease2 + a2 * ease2 + a3;
	}
	// *******************************************************************

	this.translateContainer = function() {
		var _state = this.state;
		var isResizing = _state.isResizing;
		var scroll = _state.scroll;

		var translate = "translate3d(0, " + -scroll.current + "px, 0)";

		_self.ui.el.style.transform = translate;
	}

	this.setInitial = function(){
		var el = this.ui.el;

		Object.assign(el.style, {
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%'
		});

		document.body.classList.add('is-smooth-scroll');
	}

	this.setFakeHeight = function(){
		var _state = this.state;
		var bounds = _state.bounds;


		if (!this.ui.heightEl) {
			this.ui.heightEl = document.createElement('div');
			this.ui.heightEl.classList.add('js-fake-scroll');
			document.body.appendChild(this.ui.heightEl);
		}

		var bottom = _self.ui.el.getBoundingClientRect().height;

		bounds.scrollHeight = bottom;

		this.ui.heightEl.style.height = bottom + 'px';
	}

	this.onScroll = function(){
		var scroll = this.state.scroll;
		scroll.target = window.scrollY;
	}

	this.onResize = function(){
		this.state.isResizing = true;

		this.setFakeHeight();
		this.translateContainer();

		this.state.isResizing = false;
	}

	this.addListeners = function(){
		window.addEventListener('scroll', this.onScroll);
		window.addEventListener('resize', this.onResize);
	}

}


var RAF = {
    els: [],
    add: function(object) {
    	this.els.push(object);
        object.init();
    },
    remove: function(object) {
    	var idx = this.els.indexOf(object);
    	this.els.splice(idx, 1);
    },
    init: function() {
        this.animate();
    },
    animate: function() {
        requestAnimationFrame(RAF.animate);
        RAF.render();
    },
    render: function() {
        for (var i = 0; i < RAF.els.length; i++) {
            RAF.els[i].render();
        }
    }
}



var PageSmoothScroll = new SmoothScroll();

RAF.init();
RAF.add(PageSmoothScroll);
