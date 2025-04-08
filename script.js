document.getElementById('generate-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const prompt = document.getElementById('prompt').value;
    const resultDiv = document.getElementById('result');
    
    // Показываем загрузку
    resultDiv.innerHTML = '<div class="loading">🎨 Генерация... (20-40 сек)</div>';
    
    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });
        
        if (!response.ok) throw new Error('Сервер не отвечает');
        
        // Создаем изображение
        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        
        resultDiv.innerHTML = `
            <img src="${imgUrl}" class="generated-image">
            <a href="${imgUrl}" download="ai-image.png" class="btn">💾 Скачать</a>
        `;
    } catch (error) {
        resultDiv.innerHTML = `
            <div class="error">
                ⚠️ Ошибка: ${error.message}<br>
                Попробуйте:<br>
                1. Проверить интернет<br>
                2. Ввести другой запрос<br>
                3. Обновить страницу
            </div>
        `;
    }
});
