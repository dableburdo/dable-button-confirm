/**
 * @file dable-confirm/index.js
 * @brief confirm component for dable
 * @license MIT
 */
const Text     = require('dable-text');
const Dialog   = require('dable-dialog'); 
const OkCancel = require('dable-okcancel');
const HrzPos   = require('dable-effect-hrzpos');
const comutl   = dable.util.common;

module.exports = class extends Dialog {
    /**
     * initialize component
     * 
     * @param (mixed) string: message text
     *                key-value: component config
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("Confirm");
            this.shortForm("text");
	    
            /* init config */
	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
            this.frame().header().height('0.3rem');

	    let txt_wrp = new dable.class.Component({
	        style: { 'display':'flex', 'align-items':'center' },
                child: this.text()
	    });
            this.child([txt_wrp, this.okcancel()]);

	    let cfm = this;
	    this.config({
                fade:200,
                clickEvent: () => { cfm.visible(false); }
            });
	    this.size("4rem","2.3rem");
	    this.okcancel().width('1rem', '1.2rem');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    okEvent (fnc,prm) {
        try {
	    let cfm = this;
            let evt = () => {
                try {
                    if ('function' === typeof fnc) {
                        fnc(cfm,null,prm);
		    }
		} catch (e) {
                    console.error(e.stack);
                    throw e;
		}
	    };
            this.okcancel().okEvent(evt);
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }

    clickEvent (fnc,prm) {
        try {
	    let cfm = this;
	    let evt = (p1,p2) => {
                try {
                    if ('function' === typeof fnc) {
                        fnc(cfm,p2,prm);
		    }
		} catch (e) {
                    console.error(e.stack);
                    throw e;
		}
	    }
            this.okcancel().clickEvent(evt);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * button text
     * 
     * @param (mixed) string: yes button text
     *                dable-text: yes button text component
     * @param (mixed) string: no button text
     *                dable-text: no button text component
     * @type parameter
     */
    okcancel (ok, can) {
        try {
	    if ('string' === typeof ok) {
	        this.okcancel().text(ok,can);
                return;
	    //} else if (true === comutl.isinc(ok,'OkCancel')) {

	    }
	    return this.innerComp("okcancel", ok, OkCancel);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    /**
     * dialog message
     * 
     * @param (mixed) string: message text
     *                dable-text: text component for message
     * @param (dict) component config
     * @type parameter
     */
    text (prm, opt) {
        try {
            if ("string" === typeof prm) {
                prm = prm.replace("\n", "<br>");
                this.text().text(prm);
                this.text().config(opt);
                return;
            } else if (true === comutl.isinc(prm,'Text')) {
                prm.size('0.2rem');
		prm.effect(new HrzPos());
	    }
            return this.innerComp("text", prm, Text);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    height (prm, cnf) {
        try {
            let ret = super.height(prm,cnf);
            if ((undefined !== prm) && (null !== this.text().parent())) {
                let wrp_hei = comutl.sizediff(prm, this.frame().header().height());
		wrp_hei = comutl.sizediff(wrp_hei,'0.6rem');
		this.text().parent().height(wrp_hei);
	    }
	    return ret;
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
}
/* end of file */
