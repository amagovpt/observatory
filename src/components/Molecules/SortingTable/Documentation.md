SortingTable é um componente de uma tabela dinâmica, a tabela permite ter um número infinito de colunas e uma variedade de renderizações de conteúdo na tabela. O componente também se encontra construído para facilitar a adição de novos tipos de renderizações das células.
A tabela pode ter paginação, e pode ter ordernação.

#### hasSort
True ou False, se queremos que a tabela tenha ordenação ou não

#### caption
Descrição atribuida à tabela

#### headers
Array com a informação para construir os cabeçalhos da tabela. Exemplo com 2 linhas:

    [
      [
        {icon: false, name: "Classificação", property: "rank"},
        {icon: false, bigWidth: "50%", name: "Sítio Web", property: "name"},
        {icon: true, name: "AMA-DeclaracaoDark-Line", description: "Com declaração de usabilidade e acessibilidade", property: "declaration"},
        {icon: true, name: "AMA-SeloDark-Line", description: "Com selo de usabilidade e acessibilidade", property: "stamp"},
        {icon: false, name: "Pontuação", property: "score", justifyCenter: true},
        {icon: false, name: "Páginas", property: "nPages", justifyCenter: true},
        {icon: false, name: "Páginas em conformidade*", property: "", justifyCenter: true, nCol: 3},
      ],
      [
        {icon: false, nCol: 6, name: "Vazio", empty: true},
        {icon: false, name: "A", property: "A", justifyCenter: true},
        {icon: false, name: "AA", property: "AA", justifyCenter: true},
        {icon: false, name: "AAA", property: "AAA", justifyCenter: true}
      ]
    ]

- "icon: ..." indentifica se será texto normal ou um ícon
- "name: ..." identifica o nome do ícon ou o texto a ser renderizado
- "property: ..." identifica o nome da propriedade a ser ordenada ao se clicar nessa coluna
- "description: ..." só para colunas com ícon, texto alternativo para o ícon
- "justifyCenter: ..." se é para alinhar o valor ao centro ou não
- "nCol: ..." o número de colunas de dados a ocupar
- "bigWidth: ..." o tamanho a ocupar em relação ao largura da tabela, certar colunas têm que ter uma maior número de largura
- "empty: ..." indica se a coluna se encontra vazia, pode ser uma coluna só para encher

#### dataList
Array com a informação para renderizar na tabela

#### setDataList
Função para atualizar os dados depois da ordenação for realizada

#### pagination
True ou False, se queremos que a tabela tenha paginação ou não

#### columnsOptions
Objeto complementar que indica o que é para renderizar em cada célula. Neste exemplo queremos renderizar este objeto:

    {
      "id": 22,
      "rank": 1,
      "name": "Portal Mais Transparência",
      "entity": "Agência para a Modernização Administrativa",
      "declaration": 3,
      "stamp": 3,
      "score": 9.937837837837838,
      "nPages": 37,
      "A": 0,
      "AA": 6,
      "AAA": 31
    }

Certos campos não são para aparecer na tabela, certos campos são links e não texto normal, certos campos são um icon. Então passamos este objeto complementar:

    columnsOptions = {
      id: { type: "Skip", center: false, bold: false, decimalPlace: false },
      rank: { type: "Number", center: true, bold: false, decimalPlace: false },
      name: { type: "Button", center: false, bold: false, decimalPlace: false },
      entity: { type: "Skip", center: false, bold: false, decimalPlace: false },
      declaration: { type: "Declaration", center: true, bold: false, decimalPlace: false },
      stamp: { type: "Stamp", center: true, bold: false, decimalPlace: false },
      score: { type: "Number", center: true, bold: false, decimalPlace: true },
      nPages: { type: "Number", center: true, bold: false, decimalPlace: false },
      A: { type: "Number", center: true, bold: false, decimalPlace: false },
      AA: { type: "Number", center: true, bold: false, decimalPlace: false },
      AAA: { type: "Number", center: true, bold: false, decimalPlace: false },
    }

Neste objeto complementar, podemos verificar que os atributos que não queremos renderizar na tabela têm o type como "Skip", os icons têm o seu nome respetivo "Stamp" e "Declaration", e depois temos o "Number" e o "Button", sendo o button, o texto em forma de link.
- Cada célula pode depois ter o conteúdo centrado ou não baseado no que passamos em "center: ..."
- Pode ter o texto ou números a negrito "bold: ..."
- E no caso da pontuação, damos a possíbilidade do número ser renderizado com casas decimais ou não "decimalPlace: ..."

<br>

#### nextPage
True ou False, depende do modo em que a página se encontraFunção que é usada no evento de click do type Button

#### darkTheme
True ou False, depende do modo em que a página se encontra

#### pagination
True ou False, se queremos que a tabela tenha paginação ou não

#### itemsPaginationTexts
Array com 2 textos para indicar o número de items na paginação

	Exemplo: "1 - 50 de 200 itens"
	[
  	"de",
  	"itens"
	]


#### nItemsPerPageTexts
Array com 2 textos para escolher o número de items para a paginação

	Exemplo: "Ver 50 itens por página"
	[
  	"Ver",
  	"itens por página"
	]


#### iconsAltTexts
Textos alternativos para os icons renderizados nas células da tabela

	Exemplo: [
  	"Selo Bronze",
  	"Selo Prata",
  	"Selo Ouro",
  	"Declaração não conforme",
 	 "Declaração parcialmente conforme",
  	"Declaração plenamente conforme"
	]

#### paginationButtonsTexts
Array com 4 textos com a ação que cada botão faz para os leitores de ecrã conseguirem transmitir a ação correta

	Exemplo: [
  		"Primeira página",
  		"Página anterior",
  		"Página seguinte",
  		"Última página"
	]


## Exemplo