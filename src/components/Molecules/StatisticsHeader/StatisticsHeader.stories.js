import React from "react";
import { StatisticsHeader } from "./index";
import Documentation from './Documentation.md'

const directoriesStats = {
  score: (8.486663447825674).toFixed(1),
  recentPage: "16 de outubro de 2023",
  oldestPage: "16 de outubro de 2023",
  statsTable: [
    1,
    24,
    26,
    1423,
  ]
}

const statsTitles = [
  "Diretórios",
  "Entidades",
  "Sítios Web",
  "Páginas"
]

export default {
  title: "components/Molecules/StatisticsHeader",
  component: StatisticsHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
};

export const HeaderStatistics = (args) => <StatisticsHeader {...args} />;

HeaderStatistics.args = {
  darkTheme: false,
  title: "Estatísticas",
  subtitle: "Metadados",
  oldestPage: "Avaliação mais antiga de uma página:",
  newestPage: "Avaliação mais recente de uma página:",
  gaugeTitle: "Pontuação média",
  statsTitles: statsTitles,
  stats: directoriesStats
}
