class jsHelper {

    constructor(el) {
        this.el = el
    }


    i() {
        for (let i = 0; i < this.el.length; i++) {
            return this.el[i]
        }
    }

    on(event, cb) {
        for (let i = 0; i < this.el.length; i++) {
            this.el[i].addEventListener(event, cb)
        }
        return this
    }

    // Classes
    addClass(classname) {
        for (let i = 0; i < this.el.length; i++) {
            this.el[i].classList.add(classname)
        }
        return this
    }

    removeClass(classname) {
        for (let i = 0; i < this.el.length; i++) {
            this.el[i].classList.remove(classname)
        }
        return this
    }

    toggleClass(classname) {
        for (let i = 0; i < this.el.length; i++) {
            this.el[i].classList.toggle(classname)
        }
        return this
    }

    // Text, html
    text(value) {
        for (let i = 0; i < this.el.length; i++) {
            if (value) {
                this.el[i].textContent = value
            } else {
                return this.el[i].textContent
            }
        }
        return this
    }

    html(value) {
        for (let i = 0; i < this.el.length; i++) {
            if (value) {
                this.el[i].innerHTML = value
            } else {
                return this.el[i].innerHTML
            }
        }
        return this
    }

}

let el = selector => {
    let el = document.querySelectorAll(selector)
    if (el.length > 0) {
        return new jsHelper(el)
    } else {
        console.error(`${selector} not found in DOM (jsHelper)`)
    }
}

export { el }