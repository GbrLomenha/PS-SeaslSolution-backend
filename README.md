# Modelagem de Dados

Ao analisar as especificidades do desafio técnico, foi realizada uma breve modelagem de dados para definir de forma mais apropriada como seriam armazenados os dados necessários na aplicação. Para isso foi realizada uma modelagem conceitual![Texto Alternativo](Modelagem%20Conceitual.pdf) e uma modelagem lógica![Texto Alternativo](Modelagem%20Lógica.pdf) feitas a partir do entendimento da relação entre os dados necessários na aplicação.

Como podemos ver na modelagem, foi adotada uma entidade Pessoa como uma generalização e, Passageiro e Tripulante como especializações, visando escalabilidade para adição de possíveis atributos exclusivos para cada tipo de pessoa futuramente sem afetar o funcionamento da aplicação.

Os relacionamentos foram definidos de forma que ao fazer quaisquer remoções de dados, não houvesse qualquer tipo de incongruência ou insuficiência de informações necessárias para o entendimento de uma entidade. Por exemplo: Ao apagar uma DUV do banco de dados, a entidade Pessoa ou Navio permanece entendível e completa, ou seja, são auto suficientes. Porém ao remover um navio ou todas as pessoas de uma DUV, a mesma torna-se incompleta pois, sem tais informações, não cumpre totalmente sua função informativa.

Como trata-se de um case técnico, o qual não deve ter aplicação, por praticidade optou-se utilizar SQLite como SGBD para este projeto e Prisma como ORM, Cloudinary para registro de arquivos de imagem e Insomnia para testes de consumo de API.

## Requisitos

### API

Visando contemplar todas as funcionalidades listadas no desafio, foram definidos os seguintes endpoints documentados com Swagger: (anexar print do swagger). A biblioteca class-validator será utilizada como validador de entrada de registros de dados na API que será implementada com framework NestJs.

## Referências

### Documentações

- [Documentação do NestJs](https://docs.nestjs.com/)
- [Documentação do PrismaORM](https://www.prisma.io/docs)
- [Documentação do Cloudinary](https://cloudinary.com/)

### IAs Generativas utilizadas para sanação de dúvidas

- Gemini AI PRO 2.5
- GitHub Copilot (GPT-4.0)