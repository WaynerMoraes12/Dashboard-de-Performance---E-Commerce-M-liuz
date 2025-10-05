# Case Técnico - Estágio em Estratégia - Méliuz

## Sobre a Empresa
O Méliuz é a maior plataforma de cashback do Brasil. Com mais de 40 milhões de usuários cadastrados e milhares de parceiros, movimenta anualmente mais de 4 bilhões de reais em vendas no e-commerce.

## Modelo de Negócio
O principal modelo de negócio baseia-se na geração de vendas para lojas parceiras. Para cada venda gerada, o Méliuz recebe uma comissão, que é dividida entre a empresa e o comprador, gerando cashback.

O ecossistema da empresa conta com múltiplos canais de venda e produtos, potencializando tanto as vendas quanto o cashback oferecido.

## Desafio
O time de estratégia busca otimizar os resultados da linha de negócios de E-Commerce, realizando:
- Definição de KPIs relevantes;
- Construção de dashboards de acompanhamento;
- Identificação de problemas e oportunidades de melhoria;
- Análise de causas-raiz e proposição de planos de ação.

O objetivo deste projeto é analisar a queda de performance na linha de E-Commerce usando a base de dados fornecida.

## Integração com Google Sheets
Este projeto faz **integração com Google Sheets** para leitura e análise de dados.  

### Funcionalidades:
- Conexão com planilhas do Google Sheets usando API.
- Extração de dados diretamente da planilha.
- Processamento e análise dos dados em Python/Node.js (ou outra linguagem usada).
- Visualização de KPIs e insights baseados nos dados da planilha.
- Exportação de resultados para Google Sheets ou relatórios locais.

### Configuração da API
1. Crie um projeto no [Google Cloud Console](https://console.cloud.google.com/).
2. Habilite a **Google Sheets API**.
3. Crie uma **chave de serviço (service account)** e baixe o arquivo JSON.
4. Compartilhe a planilha do Google Sheets com o email da service account.
5. Salve o arquivo JSON no diretório do projeto e configure seu código para usar essa chave.

### Exemplo de Uso
```python
import gspread
from oauth2client.service_account import ServiceAccountCredentials

# Definindo escopo
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]

# Autenticação
creds = ServiceAccountCredentials.from_json_keyfile_name("service_account.json", scope)
client = gspread.authorize(creds)

# Abrindo a planilha
sheet = client.open("NomeDaPlanilha").sheet1

# Lendo dados
data = sheet.get_all_records()
print(data)
