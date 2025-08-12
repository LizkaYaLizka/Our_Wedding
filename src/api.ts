export async function sendToBot(message: string) {

    const botToken = '8105943666:AAGgey9IWLQw83cwp4bkjS15H8JC5fwMSDg';
    const chatId = '6022528057'; // Ваш chat_id из ответа бота

    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}