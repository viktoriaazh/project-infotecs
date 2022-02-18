const url = 'data_person.json';
const aboutTh = document.querySelector('.firstname');
const aboutThLength = aboutTh.clientWidth;
const table = document.querySelector('table');


//получение данных из json
fetch(url)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        loadTableData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

    //отображение таблицы
    function loadTableData(personData) { 
        let dataHTML = '';     
        for (let person of personData) {
            dataHTML += `
                <tr>
                    <td>${person.name.firstName}</td>
                    <td>${person.name.lastName}</td>
                    <td>${person.about.slice(0, (aboutThLength / 1.1)) + '...'}</td>
                    <td>${person.eyeColor}</td>
                </tr>
            `;
        }
            tableBody.innerHTML = dataHTML;
    };

  //фильтрация столбцов таблицы
    document.addEventListener('DOMContentLoaded', () => {

        const getSort = ({ target }) => {
            const order = (target.dataset.order = -(target.dataset.order || -1));
            const index = [...target.parentNode.cells].indexOf(target);
            const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
            const comparator = (index, order) => (a, b) => order * collator.compare(
                a.children[index].innerHTML,
                b.children[index].innerHTML
            );
            
            for(const tBody of target.closest('table').tBodies)
                tBody.append(...[...tBody.rows].sort(comparator(index, order)));
    
            for(const cell of target.parentNode.cells)
                cell.classList.toggle('sorted', cell === target);
        };
        
        document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));     
    });
// редактирование строк
    const container = document.querySelector('.container');
    const editForm = document.querySelector('.form');
    const formInput = document.querySelectorAll('input');
    const textarea = document.querySelector('textarea');
    const btnEdit = document.querySelector('.btn-edit');
    const btnClose = document.querySelector('.btn-close');

    let CHANGE_ROW; // строка tr которую нужно будет редактировать

  //Используется делегирование событий. При клике на таблицу получает строку по которой кликнули и отображает рядом с ней форму редактирования
  table.addEventListener('click', function(event) {
    const row = event.target.closest('.data-row'); //возвращает ближайщего предка соответствующего селектору.
    
    CHANGE_ROW = row;

    if (!row) return; //проверка, содержит ли в себе event.target строку row
    if (!table.contains(row)) return; //проверка, прендалежит ли row нашей таблице.

    editForm.style.cssText = `display: block;  top: ${row.offsetTop}px; left: ${row.offsetWidth + 20}px;`;

    inputs[0].value = row.cells[0].innerHTML;
    inputs[1].value = row.cells[1].innerHTML;
    textarea.value = row.cells[2].innerHTML.slice(0, row.cells[2].innerHTML.length - 3);
    inputs[2].value = row.cells[3].firstChild.innerHTML;
  });