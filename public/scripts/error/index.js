fetch('http://localhost:3000/error/play', {
    method: 'GET',
    keepalive: true,
}).then(async res => {
    const events = await res.json();
    console.log('events', events);
    const replayer = new rrwebPlayer({
        target: document.getElementById('player'), // customizable root element
        props: {
            events: events.record,
            // unpackFn: rrweb.unpack, 默认解码
        },
    })
});

