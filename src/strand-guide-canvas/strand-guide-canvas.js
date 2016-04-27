/**
 * @license
 * Copyright (c) 2015 MediaMath Inc. All rights reserved.
 * This code may only be used under the BSD style license found at http://mediamath.github.io/strand/LICENSE.txt

*/
(function(scope) {

	scope.Guide = Polymer({
		is: 'strand-guide-canvas',

		behaviors:[
			StrandTraits.WindowNotifier
		],

		properties: {
			hidden: {
				type: Boolean
			},
			opacity: {
				type: Number,
				value: 0.3
			},
			data: {
				type: Array
			},
			currentStep: {
				type: Number,
				notify: true,
				observer: '_currentStepChanged'
			},
		},

		resize: function() {
			if (!this.hidden) this.debounce('update-canvas', this.updateCanvas);
		},

		scroll: function() {
			if (!this.hidden) this.debounce('update-canvas', this.updateCanvas);
		},

		_currentStepChanged: function(newVal, oldVal) {
			console.log('strand-guide-canvas :: _currentStepChanged: ', newVal);
			if (this.currentStep <= this.data.length-1) {
				this.updateCanvas();
			}
		},

		updateCanvas: function() {
			if (!this.data) return;
			// this.clearRect(0, 0, this.$.canvas.width, this.$.canvas.height);
			var target = this.data[this.currentStep].targetRef;
			var rect = target.getBoundingClientRect();
			var canvas = this.$.canvas;
			var ctx = canvas.getContext('2d');
			var w = ctx.canvas.width = window.innerWidth;
			var h = ctx.canvas.height = window.innerHeight;

			canvas.width = w;
			canvas.height = h;

			ctx.fillStyle = 'rgba(0,0,0,' + this.opacity + ')';
			ctx.fillRect(0, 0, w, h);

			ctx.globalCompositeOperation = 'destination-out';
			ctx.beginPath();
			ctx.fillStyle = 'red';

			var l = rect.left + (rect.width / 2);
			var t = rect.top + (rect.height / 2);
			var w = rect.width;

			ctx.arc(l, t, w, 0, 2 * Math.PI);
			ctx.fill();
		},

	});

})(window.Strand = window.Strand || {});