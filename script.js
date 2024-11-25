const excelURL = 'https://raw.githubusercontent.com/transformar-educacao/2/main/teste.xlsx?v=' + new Date().getTime();
    

//colocar o ?v=' + new Date().getTime() para forçar o cache do navegador a atualizar, assim atualizando automaticamente o arquivo excel do github

async function preencherSelects() {
    try {
     
        const response = await fetch(excelURL);
        const data = await response.arrayBuffer();0
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; 
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet);
       
        const selects = {
            "Teste 1": document.getElementById('primeiro'),
            "Teste 2": document.getElementById('segundo'),
            "Teste 3": document.getElementById('terceiro'),
            "Teste 4": document.getElementById('quarto'),
        };


        jsonData.forEach(row => {
            Object.keys(selects).forEach(key => {
                if (row[key]) {  
                    const option = document.createElement('option');
                    option.value = row[key];
                    option.textContent = row[key];
                    selects[key].appendChild(option);
                }
            });
        });
    } catch (error) {
        console.error('Erro ao carregar o arquivo Excel:', error);
    }
}

preencherSelects();
