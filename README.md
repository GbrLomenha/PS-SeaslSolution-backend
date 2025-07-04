# Desafio Técnico SealsSolution 2025

## Modelagem de Dados

Ao analisar as especificidades do desafio técnico, foi realizada uma breve modelagem de dados para definir de forma mais apropriada como seriam armazenados os dados necessários na aplicação. Para isso foi realizada uma modelagem conceituale uma modelagem lógica feitas a partir do entendimento da relação entre os dados necessários na aplicação: 

<p align="center">
  <img src="./arquivos%20de%20entrega/Modelagem%20Conceitual_page-0001.jpg" alt="Modelagem Conceitual">
</p>
<p align="center">
  <img src="./arquivos%20de%20entrega/Modelagem%20Lógica_page-0001.jpg" alt="Modelagem Lógica">
</p>


Como podemos ver na modelagem, foi adotada uma entidade Pessoa como uma generalização e, Passageiro e Tripulante como especializações, visando escalabilidade para adição de possíveis atributos exclusivos para cada tipo de pessoa futuramente sem afetar o funcionamento da aplicação.

Os relacionamentos foram definidos de forma que ao fazer quaisquer remoções de dados, não houvesse qualquer tipo de incongruência ou insuficiência de informações necessárias para o entendimento de uma entidade. Por exemplo: Ao apagar uma DUV do banco de dados, a entidade Pessoa ou Navio permanece entendível e completa, ou seja, são auto suficientes. Porém ao remover um navio ou todas as pessoas de uma DUV, a mesma torna-se incompleta pois, sem tais informações, não cumpre totalmente sua função informativa.

## Requisitos

### API - Documentação e Ferramentas Utilizadas

Visando contemplar todas as funcionalidades listadas no desafio, foram definidos os seguintes endpoints documentados com Swagger: 

<p align="center">
  <img src="./arquivos%20de%20entrega/endpoints.jpeg" alt="Endpoints">
</p>

A biblioteca class-validator será utilizada como validador de entrada de registros de dados na API que será implementada com framework NestJs. Como trata-se de um case técnico, o qual não deve ter aplicação, por praticidade optou-se utilizar SQLite como SGBD para este projeto e Prisma como ORM, Cloudinary para registro de arquivos de imagem e Insomnia para testes de consumo de API.

## Referências

### Documentações

- [Documentação do NestJs](https://docs.nestjs.com/)
- [Documentação do PrismaORM](https://www.prisma.io/docs)
- [Documentação do Cloudinary](https://cloudinary.com/)

### IAs Generativas utilizadas para sanação de dúvidas

- Gemini AI PRO 2.5
- GitHub Copilot (GPT-4.0)
