const handleSidebar = () => {
    if (document.querySelector('.isopen')) {
        document.querySelector('.isopen').classList.add('isclose');
        document.querySelector('.isopen').classList.remove('isopen');
    } else {
        document.querySelector('.isclose').classList.add('isopen');
        document.querySelector('.isclose').classList.remove('isclose');
    }
}

const items = document.querySelectorAll('.list__item');

items.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        let ClassName = e.target.getAttribute('data-val');
        document.querySelector('.list__cover').classList[0];
    })
})

document.querySelector('.icon-add').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.icon-add + .dropdown').style.display = "block";
});

function submitForm(form) {
    document.querySelector(`.${form}`).submit();
}
try {
    const accordions = document.querySelectorAll('.sitem');

    accordions.forEach(e => {
        e.addEventListener("click", function (e) {
            if (e.target.classList.length === 1) {
                e.target.classList.add('acc__open');
            } else {
                e.target.classList.remove('acc__open');
            }
        });
    });
}
catch {
}
try {
    function closeModal(modal, bg) {
        document.querySelector(`#${modal}`).classList.remove('crm-show');
        document.querySelector(`#${modal}`).removeAttribute('style');
        document.querySelector(`#${bg}`).style.display = 'none';
    }
} catch { }
try {
    function openModal(modal, bg) {
        document.querySelector(`#${modal}`).classList.add('crm-show');
        document.querySelector(`#${modal}`).style.top = "0px";
        document.querySelector(`#${bg}`).style.display = 'block';
    }
} catch { }

try {
    let dropArea = document.querySelector('#drop-area');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
        document.body.addEventListener(eventName, preventDefaults, false)
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false)
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
    });

    function preventDefaults(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    function highlight(e) {
        dropArea.classList.add('highlight')
    }

    function unhighlight(e) {
        dropArea.classList.remove('active')
    }
} catch { }
try {
    const ctr = document.getElementById('dynamic')
    function addRow(e) {
        e.removeAttribute('onclick');
        const row = newEl('div', { class: 'form-item' });
        const desc = newEl('input', { type: 'text', name: 'description[]', class: 'form-control', placeholder: 'Item Description' });
        const sac = newEl('input', { type: 'text', name: 'sac_no[]', class: 'form-control', placeholder: 'HSN/SAC' });
        const qty = newEl('input', { type: 'number', name: 'qty[]', class: 'form-control', placeholder: 'Quantity' });
        const price = newEl('input', { type: 'text', name: 'rate[]', class: 'form-control', placeholder: 'Price' });
        const action = newEl('div', { class: 'item-action' });
        const add = newEl('span', { class: 'icon-plus', onclick: 'addRow(this)' });
        const remove = newEl('span', { class: 'icon-minus', onclick: 'removeRow(this)' });
        action.appendChild(add);
        action.appendChild(remove);
        row.appendChild(desc);
        row.appendChild(sac);
        row.appendChild(qty);
        row.appendChild(price);
        row.appendChild(action);
        ctr.appendChild(row);
    }
    function newEl(type, attrs = {}) {
        const el = document.createElement(type);
        for (let attr in attrs) {
            const value = attrs[attr];
            if (attr == 'innerText') el.innerText = value;
            else el.setAttribute(attr, value);
        }
        return el;
    }
    function removeRow(e) {
        const el = e.parentElement.parentElement;
        const parent_el = el.previousElementSibling;
        el.remove();
        parent_el.setAttribute('onclick', 'addRow(this)');
    }
} catch { }