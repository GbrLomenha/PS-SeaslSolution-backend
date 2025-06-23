# Processo Seletivo - 2025
Neste repositório você encontrará instruções para o desafio técnico do processo seletivo de 2025.

# Instruções
Leia com atenção as instruções abaixo e siga os passos necessários para completar o desafio.

1. O desafio é para uma vaga FullStack, entretanto, você pode optar por fazer os dois (API e Front) ou apenas um dos dois projetos. No caso do front-end, você pode decidir entre fazer uma versão Web ou Mobile.  

2. Você pode escolher a linguagem e o framework que preferir para desenvolver a API e o Frontend. Sinta-se à vontade para utilizar as tecnologias com as quais você se sente mais confortável.

3. Na escolha do front-end, o UX/UI da interface não será passível de remoção ou adição de pontos, mas é interessante que a interface seja funcional e intuitiva.

4. Faça um fork deste repositório e desenvolva o seu projeto no seu fork. 

5. Após concluir, envie o link do seu fork para o e-mail indicado no processo seletivo.

6. Permitimos o uso de agentes como o ChatGPT, Gemini AI, entre outros durante o desenvolvimento do projeto. O uso de LLMs deve ser feito de forma responsável e ética, garantindo que o código gerado seja revisado e adaptado conforme necessário.

# Desafio Técnico 
## Entidades
As entidades envolvidas neste desafio técnico conectam DUV (Documento Único Virtual) que configura uma viagem de uma embarcação, os navios atrelados à viagem e passageiros.

### DUV
Em uma DUV estão contidas as informações de uma viagem de um navio, incluindo os passageiros e tripulantes que embarcaram nessa viagem, que pode ser estruturada da seguinte forma:

- Id
- Número da DUV
- Data da viagem
- Navio 
- Lista de Passageiros

### Navio
Em uma DUV, o navio é o meio de transporte utilizado na viagem, que pode ser estruturado da seguinte forma:

- Id
- Nome
- Bandeira
- Imagem

### Passageiro
Em uma DUV, o passageiro é a pessoa que embarca na viagem, que pode ser estruturada da seguinte forma:

- Id
- Nome
- Tipo: 
  - Passageiro
  - Tripulante -> é caracterizado pela existência de um documento chamado SID (Seafarers' Identity Document)
- Nacionalidade
- Foto

## Objetivo do desafio
Esperamos que o desenvolvedor ao participar do processo seletivo consiga demonstrar suas habilidades de desenvolvimento, tanto no back-end quanto no front-end, criando uma aplicação que consuma uma e apresente as informações de forma clara e organizada ou um sistema bem estruturado e com uma arquitetura limpa fazendo parte de bons processos de Engenharia de Software.


### Front-End
- Listar todas as DUVs cadastradas na tela inicial
- Ao visualizar a DUV selecionada, exibir as informações do navio e dos passageiros
- Separar visualmente os passageiros e tripulantes

### Back-End
- Modelagem de dados relacional para as entidades DUV, Navio e Passageiro
- Endpoints para CRUD das entidades DUV, Navio e Passageiro
- Endpoint para listar uma determinada DUV e os passageiros relacionados


# Recursos Fornecidos
Se você optar por desenvolver somente o front-end, utilize os dados mockados no arquivo `mock.json`. O arquivo contém:

- Lista de 10 DUVs
- Dados de 5 passageiros por DUVs
- URLs de imagens geradas e autorizadas via randomuser.me e Unsplash


# Entrega
Após o recebimento do desafio, o candidato terá até 7 dias para concluir o desafio e enviar o link do fork do repositório para o e-mail indicado no processo seletivo.