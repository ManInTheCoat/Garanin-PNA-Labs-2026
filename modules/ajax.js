class Ajax {
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @returns {Promise<{data: any, status: number}>} Объект с данными и статусом ответа
     */
    async get(url) {
        try {
            const response = await fetch(url);
            const data = response.ok ? await response.json() : null;
            return { data, status: response.status };
        } catch (error) {
            console.error('Сетевая ошибка GET:', error);
            return { data: null, status: 500 };
        }
    }

    /**
     * POST запрос
     * @param {string} url - Адрес запроса
     * @param {object} bodyData - Данные для отправки
     * @returns {Promise<{data: any, status: number}>} Объект с данными и статусом ответа
     */
    async post(url, bodyData) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });
            const data = response.ok ? await response.json() : null;
            return { data, status: response.status };
        } catch (error) {
            console.error('Сетевая ошибка POST:', error);
            return { data: null, status: 500 };
        }
    }

    /**
     * PATCH запрос
     * @param {string} url - Адрес запроса
     * @param {object} bodyData - Данные для обновления
     * @returns {Promise<{data: any, status: number}>} Объект с данными и статусом ответа
     */
    async patch(url, bodyData) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });
            const data = response.ok ? await response.json() : null;
            return { data, status: response.status };
        } catch (error) {
            console.error('Сетевая ошибка PATCH:', error);
            return { data: null, status: 500 };
        }
    }

    /**
     * DELETE запрос
     * @param {string} url - Адрес запроса
     * @returns {Promise<{data: null, status: number}>} Объект со статусом ответа
     */
    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });
            return { data: null, status: response.status };
        } catch (error) {
            console.error('Сетевая ошибка DELETE:', error);
            return { data: null, status: 500 };
        }
    }
}

export const ajax = new Ajax();
