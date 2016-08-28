//$(document).ready(function () {



    /*!
     * classie - class helper functions
     * from bonzo https://github.com/ded/bonzo
     *
     * classie.has( elem, 'my-class' ) -> true/false
     * classie.add( elem, 'my-new-class' )
     * classie.remove( elem, 'my-unwanted-class' )
     * classie.toggle( elem, 'my-class' )
     */

    /*jshint browser: true, strict: true, undef: true */
    /*global define: false */

    (function (window) {

        'use strict';

        // class helper functions from bonzo https://github.com/ded/bonzo

        function classReg(className) {
            return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
        }

        // classList support for class management
        // altho to be fair, the api sucks because it won't accept multiple classes at once
        var hasClass, addClass, removeClass;

        if ('classList' in document.documentElement) {
            hasClass = function (elem, c) {
                return elem.classList.contains(c);
            };
            addClass = function (elem, c) {
                elem.classList.add(c);
            };
            removeClass = function (elem, c) {
                elem.classList.remove(c);
            };
        } else {
            hasClass = function (elem, c) {
                return classReg(c).test(elem.className);
            };
            addClass = function (elem, c) {
                if (!hasClass(elem, c)) {
                    elem.className = elem.className + ' ' + c;
                }
            };
            removeClass = function (elem, c) {
                elem.className = elem.className.replace(classReg(c), ' ');
            };
        }

        function toggleClass(elem, c) {
            var fn = hasClass(elem, c) ? removeClass : addClass;
            fn(elem, c);
        }

        var classie = {
            // full names
            hasClass: hasClass,
            addClass: addClass,
            removeClass: removeClass,
            toggleClass: toggleClass,
            // short names
            has: hasClass,
            add: addClass,
            remove: removeClass,
            toggle: toggleClass
        };

        // transport
        if (typeof define === 'function' && define.amd) {
            // AMD
            define(classie);
        } else {
            // browser global
            window.classie = classie;
        }

    })(window);

    /**
     * notificationFx.js v1.0.0
     * http://www.codrops.com
     *
     * Licensed under the MIT license.
     * http://www.opensource.org/licenses/mit-license.php
     *
     * Copyright 2014, Codrops
     * http://www.codrops.com
     */
    ;
    (function (window) {

        'use strict';

        var docElem = window.document.documentElement,
            support = {
                animations: Modernizr.cssanimations
            },
            animEndEventNames = {
                'WebkitAnimation': 'webkitAnimationEnd',
                'OAnimation': 'oAnimationEnd',
                'msAnimation': 'MSAnimationEnd',
                'animation': 'animationend'
            },
            // animation end event name
            animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];

        /**
         * extend obj function
         */
        function extend(a, b) {
            for (var key in b) {
                if (b.hasOwnProperty(key)) {
                    a[key] = b[key];
                }
            }
            return a;
        }

        /**
         * NotificationFx function
         */
        function NotificationFx(options) {
            this.options = extend({}, this.options);
            extend(this.options, options);
            this._init();
        }

        /**
         * NotificationFx options
         */
        NotificationFx.prototype.options = {
            // element to which the notification will be appended
            // defaults to the document.body
            wrapper: document.body,
            // the message
            message: 'yo!',
            // layout type: growl|attached|bar|other
            layout: 'growl',
            // effects for the specified layout:
            // for growl layout: scale|slide|genie|jelly
            // for attached layout: flip|bouncyflip
            // for other layout: boxspinner|cornerexpand|loadingcircle|thumbslider
            // ...
            effect: 'slide',
            // notice, warning, error, success
            // will add class ns-type-warning, ns-type-error or ns-type-success
            type: 'error',
            // if the user doesn´t close the notification then we remove it 
            // after the following time
            ttl: 2000,
            // callbacks
            onClose: function () {
                return false;
            },
            onOpen: function () {
                return false;
            }
        }

        /**
         * init function
         * initialize and cache some vars
         */
        NotificationFx.prototype._init = function () {
            // create HTML structure
            this.ntf = document.createElement('div');
            this.ntf.className = 'ns-box ns-' + this.options.layout + ' ns-effect-' + this.options.effect + ' ns-type-' + this.options.type;
            var strinner = '<div class="ns-box-inner">';
            strinner += this.options.message;
            strinner += '</div>';
            strinner += '<span class="ns-close"></span></div>';
            //strinner += '<span class="ns-close"></span></div>';
            this.ntf.innerHTML = strinner;

            // append to body or the element specified in options.wrapper
            this.options.wrapper.insertBefore(this.ntf, this.options.wrapper.firstChild);

            // dismiss after [options.ttl]ms
            var self = this;
            this.dismissttl = setTimeout(function () {
                if (self.active) {
                    self.dismiss();
                }
            }, this.options.ttl);

            // init events
            this._initEvents();
        }

        /**
         * init events
         */
        NotificationFx.prototype._initEvents = function () {
            var self = this;
            // dismiss notification
            this.ntf.querySelector('.ns-close').addEventListener('click', function () {
                self.dismiss();
            });
        }

        /**
         * show the notification
         */
        NotificationFx.prototype.show = function () {
            this.active = true;
            classie.remove(this.ntf, 'ns-hide');
            classie.add(this.ntf, 'ns-show');
            this.options.onOpen();
        }

        /**
         * dismiss the notification
         */
        NotificationFx.prototype.dismiss = function () {
            var self = this;
            this.active = false;
            clearTimeout(this.dismissttl);
            classie.remove(this.ntf, 'ns-show');
            setTimeout(function () {
                classie.add(self.ntf, 'ns-hide');

                // callback
                self.options.onClose();
            }, 25);

            // after animation ends remove ntf from the DOM
            var onEndAnimationFn = function (ev) {
                if (support.animations) {
                    if (ev.target !== self.ntf) return false;
                    this.removeEventListener(animEndEventName, onEndAnimationFn);
                }
                self.options.wrapper.removeChild(this);
            };

            if (support.animations) {
                this.ntf.addEventListener(animEndEventName, onEndAnimationFn);
            } else {
                onEndAnimationFn();
            }
        }

        /**
         * add to global namespace
         */
        window.NotificationFx = NotificationFx;

    })(window);


