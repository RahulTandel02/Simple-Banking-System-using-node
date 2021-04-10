function pagination(querySet, page, rows) {

    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows

    var trimmedData = querySet.slice(trimStart, trimEnd)

    var pages = Math.ceil(querySet.length / rows);
    return {
        'querySet': trimmedData,
        'pages': pages,
    }
}

function pageButtons1(pages) {
    var wrapper = document.getElementById('pagination-wrapper-1')

    wrapper.innerHTML = ``
    console.log('Pages:', pages)

    var maxLeft = (state.page - Math.floor(state.window / 2))
    var maxRight = (state.page + Math.floor(state.window / 2))

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }

    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)
    
        if (maxLeft < 1){
            maxLeft = 1
        }
        maxRight = pages
    }



    for (var page = maxLeft; page <= maxRight; page++) {
        wrapper.innerHTML += `<button value=${page} class="page1">${page}</button>`
    }

    if (state1.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page1">&#171; First</button>` + wrapper.innerHTML
    }

    if (state1.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page1">Last &#187;</button>`
    }

    $('.page1').on('click', function() {
        $('#table-body-1').empty()

        state1.page = Number($(this).val())

        buildTable1()
    })

}


function buildTable1() {
    var table = $('#table-body-1')

    var data = pagination(state1.querySet, state1.page, state1.rows)
    var myList = data.querySet

    for (var i = 1 in myList) {
        var row = `<tr>
                <td>${myList[i].from}</td>
                <td>${myList[i].to}</td>
                <td>${myList[i].amount}</td>
                <td>${myList[i]._id}</td>
                </tr>
                `
        table.append(row)
    }
    pageButtons1(data.pages)
}
