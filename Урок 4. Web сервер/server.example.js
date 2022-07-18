const server = http.createServer(async (req, res) => {
if(req.method === 'GET'){
const content = await fs.readFile(path.join(basePath, 'index.html')) // чтение данных из фала
    // res.setHeader('Content-type', 'text/html')
    res.writeHead(200, {
        'Content-type': 'text/html'
    })
    res.end(content)
} else if (req.method === 'POST'){
    const body = []
    res.writeHead(200, {
        'Content-type' : 'text/plain; charset=utf-8'
    })

    req.on('data', data => { // получаем данные прослушивая событие потока 'data'
        body.push(Buffer.from(data)) // запись в массив полученных данных
    })

    req.on('end', () => { // событие 'end' говорит о том, что все данные пришли (вызывается 1 раз)
        const title = body.toString().split('=',)[1].replaceAll('+', ' ')
        addNote(title)

        res.end(`Title = ${title}`)
    })
}
})