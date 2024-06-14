StatisticsHeader é um componente que era utilizado em várias páginas no site Observatorio. O compenente contém 10 props diferentes.

## Props
<br>

#### darkTheme
True ou False, depende do modo em que a página se encontra

#### stats
Objeto com os stats a serem mostrados, exemplo:

    {
      score: (8.486663447825674).toFixed(1),  // O valor do score
      recentPage: "16 de outubro de 2023",    // A data da avaliação mais recente
      oldestPage: "16 de outubro de 2023",    // A data da avaliação mais antiga
      statsTable: [
        1,                                    // Um Array em que cada valor é uma estatística
        24,                                   // diferente. Este array depois terá outro
        26,                                   // array complementar passado ao componente
        1423                                  // para indicar os textos de cada valor (statsTitles)
      ]
    }

#### statsTitles
Array complementar com os textos para cada valor da statsTable

    [
      "Diretórios",
      "Entidades",
      "Sítios Web",
      "Páginas"
    ]

#### doubleRow
True ou False, depende se a statsTable tem duas linhas de dados ou só uma

#### title
Título do Container

#### subtitle
Subtítulo do Container

#### oldestPage
Label a identificar o valor passado em oldestPage (stats)

#### newestPage
Label a identificar o valor passado em recentPage (stats)

#### gaugeTitle
Título atribuído ao SVG do medidor

## Exemplo