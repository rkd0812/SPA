(function() {
    const root = document.querySelector('.app-root');
    const navigation = document.getElementById('navigation');

    function render(data) {
        const json = JSON.parse(data);
        root.innerHTML = `<h1>${json.title}</h1><p>${json.content}</p>`;
    }

    function renderHtml(html) {
        root.innerHTML = html;
    }

    function get(url) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('GET', url);
            req.send();

            req.onreadystatechange = function() {
                if (req.readyState === XMLHttpRequest.DONE) {
                    if (req.status === 200) resolve(req.response);
                    else reject(req.statusText);
                }
            };
        });
    }

    const routes = {
        'home': function() {
            get('/data/home.json').then(render);
        },
        'service': function() {
            get('/data/service.json').then(render);
        },
        'about': function() {
            get('/data/about.html').then(renderHtml);
        },
        otherWise(page) {
            root.innerHTML = `${page} Not Fount`;
        }
    };

    function router(page) {
        (routes[page] || routes.otherWise)(page);
    }

    navigation.addEventListener('click', e => {
        if(!e.target || e.target.nodeName !== 'A') return;
        e.preventDefault();
        router(e.target.id);
    })
    window.addEventListener('DOMContentLoaded', () => router('home'));
}());
