// addEventListener('fetch', event => {
//     event.respondWith(handleRequest(event.request));
// });

// async function handleRequest(request) {
//     const { method, headers } = request;
//     const url = new URL(request.url);
//     const apiUrl = 'https://api.telegram.org/bot8105943666:AAGgey9IWLQw83cwp4bkjS15H8JC5fwMSDg/sendMessage';

//     if (method === 'POST') {
//         const body = await request.text();
//         const response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body
//         });
//         return response;
//     }
//     return new Response('Метод не поддерживается', { status: 405 });
// }


// const hookUrl = 'https://script.google.com/macros/s/AKfycbznWP41bU7q7SyN1QUujSt9U23nYaknCwqVoVHwbx__kUlj58OneFsocjds1eps7oJF/exec'

// const hookKey = 'AKfycbznWP41bU7q7SyN1QUujSt9U23nYaknCwqVoVHwbx__kUlj58OneFsocjds1eps7oJF'