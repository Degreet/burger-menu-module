function makeBurgerMenu(...args) {
    var btnSelector, menuSelector, options, links

    if (args.length == 1) {
        links = args[0]
    } else if (args.length == 2) {
        if (args[0] instanceof Array) [links, options] = args
        else if (args[1] instanceof Array) [btnSelector, links] = args
        else [btnSelector, menuSelector] = args
    } else if (args.length == 3) {
        if (args[1] instanceof Array) [btnSelector, links, options] = args
        else [btnSelector, menuSelector, options] = args
    }
    
    if (links) {
        var menu = document.createElement('nav')
        menu.className = 'burger-menu-module-js'
        menuSelector = `.${menu.className}`
        menu.innerHTML = /*html*/`
            <a href="/" class="logo">Burger Menu</a>
            <ul>${links.map(buildLink).join('')}</ul>
        `
        menu.addEventListener('click', handleMenuFn)
        document.body.append(menu)
    } else if (menuSelector) {
        var menu = document.querySelector(menuSelector)
    }

    const style = document.createElement('style')
    style.innerHTML = /*css*/`
        ${menuSelector} {
            position: fixed;
            transition: ${options?.speed}ms;
        }

        ${menuSelector}.left {
            left: 0;
            transform: translateX(-150%);
        }
        
        ${menuSelector}.right {
            right: 0;
            transform: translateX(150%);
        }

        ${menuSelector}.left,
        ${menuSelector}.right {
            top: 0;
            bottom: 0;
        }

        ${menuSelector}.active {
            transform: translate(0, 0);
        }
    `
    document.head.append(style)

    menu.className = options?.side || 'left'

    menu.open = () => {
        menu.classList.add('active')
        btn?.classList.add('active')
    }

    menu.close = () => {
        menu.classList.remove('active')
        btn?.classList.remove('active')
    }

    menu.toggle = () => {
        menu.classList.toggle('active')
        btn?.classList.toggle('active')
    }

    if (btnSelector) {
        var btn = document.querySelector(btnSelector)
        btn.addEventListener('click', menu.toggle)
    }

    function handleMenuFn(e) {
        if (e.target.dataset.i) {
            links[+e.target.dataset.i][1]()
            e.preventDefault()
        }
    }

    return menu
}

function buildLink([text, value], i) {
    if (typeof value == 'function') {
        return /*html*/`<li><a href="#" data-i="${i}">${text}</a></li>`
    } else {
        return /*html*/`<li><a href="${value}">${text}</a></li>`
    }
}