addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const params = new URL(request.url).searchParams;
  const question = params.get('question');

  if (!question) {
    return new Response('Please provide a question in the "question" parameter.', { status: 400 });
  }

  const apiUrl = 'https://chatgpt.apinepdev.workers.dev/?question=' + encodeURIComponent(question);

  const response = await fetch(apiUrl);

  return new Response(await response.text(), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
  });
}
