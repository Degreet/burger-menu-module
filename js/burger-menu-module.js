function makeBurger(menuSelector, btnSelector, links) {
    const menu = document.querySelector(menuSelector)
    const btn = document.querySelector(btnSelector)

    if (!menu) {
        console.error('Burger Menu Module: Element by menu selector not found')
        return
    }

    menu.innerHTML = /*html*/`<a href="/" class="logo">Burger Menu</a>`
    const list = document.createElement('ul')

    for (link in links) {
        list.innerHTML += /*html*/`<li><a href="${links[link]}">${link}</a></li>`
    }

    menu.append(list)

    if (btn) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('active')
            btn.classList.toggle('active')
        })
    } else {
        console.warn('Burger Menu Module: Element by btn selector not found')
    }

    menu.open = () => menu.classList.add('active')
    menu.close = () => menu.classList.remove('active')
    menu.toggle = () => menu.classList.toggle('active')

    return menu
}