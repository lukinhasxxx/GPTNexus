import axios from "axios";

export const onBuscaApi = async (searchTerm, type, setIsLoading, setError) => {
    try {
        setIsLoading(true);
        setError(null);
        let prompt = "";

        // Construção do prompt conforme o tipo de busca
        if (type === 'suggestion') {
            prompt = `me forneça 5 jogos desse genero [${searchTerm}] no formato de JSON abaixo: {
                "games": [
                    {
                        "name": "",  
                        "synopsis": "",  
                        "platforms": ["", ""],  
                        "store": "",  
                        "multiplayer": true  
                    },
                    {
                        "name": "",  
                        "synopsis": "",  
                        "platforms": ["", ""],  
                        "store": "",  
                        "multiplayer": false  
                    }
                ]
            }, no parametro store retorne uma lista de lojas dispononiveis seguido do preço nessa loja retore em uma linha so separado por virgula, so retone o json sem mais nenhuma explicacao`;
        } else if (type === 'guide') {
            prompt = `Me faça um guia sobre este game [${searchTerm}] no formato de JSON abaixo: {
                "name": "",
                "story": "",
                "continuation": "",
                "maps": "",
                "equipment": ""
            }, nao retorne lista se tiver varias resposta para um camppo faça todos em uma linha coma  separacao por virgula.`;
        } else {
            setError('Ocorreu um erro ao buscar as informações. Tente novamente.');
            return;
        }

        const response = await axios.post('http://localhost:5000/api/consultar', { prompt });

        if (response.status === 200) {
            const rawData = response.data;

            try {
                // Verifique se a resposta está no formato de JSON esperado
                const completionText = rawData.completion ? rawData.completion.replace(/```json|```/g, "").trim() : '';
                if (completionText) {
                    return JSON.parse(completionText);
                } else {
                    throw new Error('Resposta da API inválida ou não contém dados');
                }
            } catch (error) {
                console.error("Erro ao parsear dados da API:", error);
                setError('Erro ao processar os dados da API. Tente novamente.');
                return;
            }
        } else {
            throw new Error('Falha ao buscar dados da API');
        }
    } catch (error) {
        console.error('Erro na busca:', error);
        setError('Ocorreu um erro ao buscar as informações. Tente novamente.');
        throw error;
    } finally {
        setIsLoading(false);
    }
};

